import mysql from "mysql2/promise";

/**
 * MySQL persistence for the CMS document store.
 *
 * The CMS keeps its whole state as one JSON document (the same shape as
 * .data/cms.json). When DATABASE_URL / MYSQL_URL is set the document is the
 * source of truth in a single-row cms_state table; otherwise the JSON file is
 * used. Every connection attempt is best-effort: if MySQL is unreachable we
 * fall back to the file so pages and builds never hard-fail.
 */

const TABLE = "cms_state";
const RETRY_INTERVAL_MS = 15000;

export interface RemoteState {
  /** true when we are configured for MySQL and a connection could be made. */
  ok: boolean;
  /** Parsed document, or null when there is no row yet (fresh database). */
  data: Record<string, unknown> | null;
}

let pool: mysql.Pool | null = null;
let tableReady = false;
let lastAttemptAt = 0;
let lastError = "";

export function getDatabaseUrl(): string | null {
  return process.env.DATABASE_URL || process.env.MYSQL_URL || null;
}

function configFromUrl(url: string): mysql.PoolOptions {
  const u = new URL(url);
  return {
    host: u.hostname,
    port: u.port ? Number(u.port) : 3306,
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: u.pathname.replace(/^\//, ""),
    connectTimeout: 10000,
    connectionLimit: 5,
    waitForConnections: true,
  };
}

async function buildPool(url: string): Promise<mysql.Pool> {
  const cfg = configFromUrl(url);
  // Railway-style proxies usually present a cert that Node cannot verify
  // against the default CA store; try TLS with verification disabled first,
  // then plain TCP for local/dev servers that do not speak TLS at all.
  const attempts: mysql.PoolOptions[] = [
    { ...cfg, ssl: { rejectUnauthorized: false } },
    { ...cfg },
  ];
  let lastErr: unknown;
  for (const opts of attempts) {
    let candidate: mysql.Pool | null = null;
    try {
      candidate = mysql.createPool(opts);
      await candidate.query("SELECT 1");
      return candidate;
    } catch (err) {
      lastErr = err;
      if (candidate) await candidate.end().catch(() => undefined);
    }
  }
  throw lastErr;
}

async function getPool(): Promise<mysql.Pool | null> {
  const url = getDatabaseUrl();
  if (!url) return null;
  if (pool) return pool;

  const now = Date.now();
  if (lastAttemptAt && now - lastAttemptAt < RETRY_INTERVAL_MS) return null;
  lastAttemptAt = now;

  try {
    pool = await buildPool(url);
    lastError = "";
    return pool;
  } catch (err) {
    lastError = err instanceof Error ? err.message : String(err);
    console.error(`[cms-mysql] connection failed, using file fallback: ${lastError}`);
    return null;
  }
}

async function ensureTable(p: mysql.Pool): Promise<void> {
  if (tableReady) return;
  await p.query(
    `CREATE TABLE IF NOT EXISTS ${TABLE} (
      id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
      data LONGTEXT NOT NULL,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`
  );
  tableReady = true;
}

/** Reads the CMS document from MySQL. Never throws. */
export async function loadState(): Promise<RemoteState> {
  const p = await getPool();
  if (!p) return { ok: false, data: null };
  try {
    await ensureTable(p);
    const [rows] = await p.query(`SELECT data FROM ${TABLE} WHERE id = 1`);
    const row = (rows as { data: string }[])[0];
    if (!row) return { ok: true, data: null };
    return { ok: true, data: JSON.parse(row.data) as Record<string, unknown> };
  } catch (err) {
    lastError = err instanceof Error ? err.message : String(err);
    console.error(`[cms-mysql] load failed, using file fallback: ${lastError}`);
    tableReady = false;
    return { ok: false, data: null };
  }
}

/** Writes the CMS document to MySQL. Never throws; returns success. */
export async function saveState(data: unknown): Promise<boolean> {
  const p = await getPool();
  if (!p) return false;
  try {
    await ensureTable(p);
    await p.query(
      `INSERT INTO ${TABLE} (id, data) VALUES (1, ?) ON DUPLICATE KEY UPDATE data = VALUES(data)`,
      [JSON.stringify(data)]
    );
    return true;
  } catch (err) {
    lastError = err instanceof Error ? err.message : String(err);
    console.error(`[cms-mysql] save failed (file copy still updated): ${lastError}`);
    tableReady = false;
    return false;
  }
}
