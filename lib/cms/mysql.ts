import mysql from "mysql2/promise";
import { escape } from "mysql2";

/**
 * MySQL persistence for the CMS — one real table per collection.
 *
 * Tables (visible in any MySQL client):
 *   cms_settings      single row: site settings JSON
 *   cms_destinations, cms_packages, cms_treks, cms_experiences,
 *   cms_testimonials, cms_faqs, cms_gallery, cms_services, cms_enquiries
 *                     one row per item: id/slug/status/sort_order columns
 *                     + `data` JSON holding the full document
 *   cms_content       key/value rows for page copy
 *
 * The remote Railway proxy costs ~350ms per roundtrip, so reads are 3 batched
 * queries and each save is ONE multi-statement transaction (START TRANSACTION;
 * changes; COMMIT). Saves that don't change a section skip it entirely.
 * If MySQL is unreachable we fall back to .data/cms.json so pages never fail.
 */

interface CollectionMapping {
  table: string;
  key:
    | "destinations"
    | "packages"
    | "treks"
    | "experiences"
    | "testimonials"
    | "faqs"
    | "gallery"
    | "services"
    | "enquiries";
}

const COLLECTIONS: CollectionMapping[] = [
  { table: "cms_destinations", key: "destinations" },
  { table: "cms_packages", key: "packages" },
  { table: "cms_treks", key: "treks" },
  { table: "cms_experiences", key: "experiences" },
  { table: "cms_testimonials", key: "testimonials" },
  { table: "cms_faqs", key: "faqs" },
  { table: "cms_gallery", key: "gallery" },
  { table: "cms_services", key: "services" },
  { table: "cms_enquiries", key: "enquiries" },
];

const TABLE_NAMES = ["cms_settings", "cms_content", ...COLLECTIONS.map((c) => c.table)];

const ITEM_TABLE_DDL = (table: string) => `
CREATE TABLE IF NOT EXISTS ${table} (
  id VARCHAR(128) NOT NULL PRIMARY KEY,
  slug VARCHAR(160) NULL,
  status VARCHAR(16) NOT NULL DEFAULT 'published',
  sort_order INT NOT NULL DEFAULT 0,
  pos INT NOT NULL DEFAULT 0,
  data JSON NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_${table}_slug (slug),
  KEY idx_${table}_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`;

const SETTINGS_DDL = `
CREATE TABLE IF NOT EXISTS cms_settings (
  id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
  data JSON NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`;

const CONTENT_DDL = `
CREATE TABLE IF NOT EXISTS cms_content (
  block_key VARCHAR(128) NOT NULL PRIMARY KEY,
  value MEDIUMTEXT NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`;

const MEDIA_DDL = `
CREATE TABLE IF NOT EXISTS cms_media (
  name VARCHAR(255) NOT NULL PRIMARY KEY,
  mime VARCHAR(100) NOT NULL DEFAULT 'application/octet-stream',
  size INT UNSIGNED NOT NULL DEFAULT 0,
  data MEDIUMBLOB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`;

let mediaReady = false;

async function ensureMediaTable(p: mysql.Pool): Promise<void> {
  if (mediaReady) return;
  await p.query(MEDIA_DDL);
  mediaReady = true;
}

export interface RemoteState {
  ok: boolean;
  data: Record<string, unknown> | null;
}

/** section name → canonical JSON string (used to skip unchanged sections) */
type Snapshot = Record<string, string>;

let pool: mysql.Pool | null = null;
let tablesReady = false;
let lastAttemptAt = 0;
/** last known DB state; saveState only rewrites sections that differ from it */
let persisted: Snapshot | null = null;

const RETRY_INTERVAL_MS = 15000;

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
    connectTimeout: 15000,
    connectionLimit: 5,
    waitForConnections: true,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000,
    multipleStatements: true,
  };
}

async function buildPool(url: string): Promise<mysql.Pool> {
  const cfg = configFromUrl(url);
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
    return pool;
  } catch (err) {
    console.error(
      `[cms-mysql] connection failed, using file fallback: ${err instanceof Error ? err.message : String(err)}`
    );
    return null;
  }
}

async function ensureTables(p: mysql.Pool): Promise<void> {
  if (tablesReady) return;
  const names = TABLE_NAMES.map((n) => `'${n}'`).join(",");
  const [rows] = await p.query(
    `SELECT COUNT(*) AS c FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name IN (${names})`
  );
  const count = Number((rows as { c: number }[])[0]?.c ?? 0);
  if (count === TABLE_NAMES.length) {
    tablesReady = true;
    return;
  }
  await p.query(SETTINGS_DDL);
  await p.query(CONTENT_DDL);
  for (const c of COLLECTIONS) {
    await p.query(ITEM_TABLE_DDL(c.table));
  }
  tablesReady = true;
}

function parseJson(value: unknown): unknown {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }
  return value;
}

function snapshotOf(doc: Record<string, unknown>): Snapshot {
  const snap: Snapshot = {};
  snap.settings = JSON.stringify(doc.settings ?? {});
  for (const c of COLLECTIONS) {
    snap[c.key] = JSON.stringify(Array.isArray(doc[c.key]) ? doc[c.key] : []);
  }
  snap.content = JSON.stringify(Array.isArray(doc.content) ? doc.content : []);
  return snap;
}

/** Reads and assembles the full CMS document from the tables. Never throws. */
export async function loadState(): Promise<RemoteState> {
  const p = await getPool();
  if (!p) return { ok: false, data: null };
  try {
    await ensureTables(p);

    const [settingsRows] = await p.query("SELECT data FROM cms_settings WHERE id = 1");
    const settingsRow = (settingsRows as { data: unknown }[])[0];
    if (!settingsRow) {
      persisted = null;
      return { ok: true, data: null }; // empty database — caller seeds defaults
    }
    const settings = parseJson(settingsRow.data);

    const unions = COLLECTIONS.map(
      (c) => `SELECT '${c.table}' AS tbl, pos, data FROM ${c.table}`
    ).join(" UNION ALL ");
    const [itemRows] = await p.query(`${unions} ORDER BY tbl ASC, pos ASC`);

    const doc: Record<string, unknown> = { settings };
    for (const c of COLLECTIONS) doc[c.key] = [];
    const tableToKey: Record<string, string> = {};
    for (const c of COLLECTIONS) tableToKey[c.table] = c.key;
    for (const row of itemRows as { tbl: string; pos: number; data: unknown }[]) {
      const item = parseJson(row.data);
      if (item && typeof item === "object") {
        (doc[tableToKey[row.tbl]] as Record<string, unknown>[]).push(item as Record<string, unknown>);
      }
    }

    const [contentRows] = await p.query(
      "SELECT block_key, value, updated_at FROM cms_content ORDER BY block_key ASC"
    );
    doc.content = (contentRows as { block_key: string; value: string; updated_at: Date | string }[]).map(
      (r) => ({
        key: r.block_key,
        value: r.value,
        updatedAt:
          typeof r.updated_at === "string"
            ? r.updated_at
            : new Date(r.updated_at).toISOString(),
      })
    );

    persisted = snapshotOf(doc);
    return { ok: true, data: doc };
  } catch (err) {
    console.error(
      `[cms-mysql] load failed, using file fallback: ${err instanceof Error ? err.message : String(err)}`
    );
    tablesReady = false;
    persisted = null;
    return { ok: false, data: null };
  }
}

type ItemRow = [string, string | null, string, number, number, string];

function rowFor(item: Record<string, unknown>, index: number): ItemRow {
  const id = String(item.id ?? "");
  const slug = typeof item.slug === "string" && item.slug ? item.slug : null;
  const status = typeof item.status === "string" && item.status ? item.status : "published";
  const sort = Number.isFinite(Number(item.order)) ? Number(item.order) : 0;
  return [id, slug, status, sort, index, JSON.stringify(item)];
}

function valuesClause(rows: ItemRow[]): string {
  return rows
    .map((r) => `(${r.map((v) => escape(v)).join(",")})`)
    .join(",");
}

/**
 * Rewrites ONLY the sections that changed since the last load/save, as one
 * multi-statement transaction (1 network roundtrip). Never throws.
 */
export async function saveState(doc: unknown): Promise<boolean> {
  const p = await getPool();
  if (!p) return false;

  const d = doc as Record<string, unknown>;
  const next = snapshotOf(d);
  const prev = persisted;
  const changed = (key: string) => !prev || prev[key] !== next[key];

  const statements: string[] = ["START TRANSACTION"];

  if (changed("settings")) {
    statements.push(
      `INSERT INTO cms_settings (id, data) VALUES (1, ${escape(next.settings)}) ON DUPLICATE KEY UPDATE data = VALUES(data)`
    );
  }

  for (const c of COLLECTIONS) {
    if (!changed(c.key)) continue;
    statements.push(`DELETE FROM ${c.table}`);
    const items = Array.isArray(d[c.key]) ? (d[c.key] as Record<string, unknown>[]) : [];
    if (items.length > 0) {
      statements.push(
        `INSERT INTO ${c.table} (id, slug, status, sort_order, pos, data) VALUES ${valuesClause(
          items.map((item, index) => rowFor(item, index))
        )}`
      );
    }
  }

  if (changed("content")) {
    statements.push("DELETE FROM cms_content");
    const blocks = Array.isArray(d.content) ? (d.content as Record<string, unknown>[]) : [];
    if (blocks.length > 0) {
      const values = blocks
        .map(
          (b) =>
            `(${escape(String(b.key ?? ""))},${escape(String(b.value ?? ""))},${escape(
              b.updatedAt ? new Date(String(b.updatedAt)) : new Date()
            )})`
        )
        .join(",");
      statements.push(`INSERT INTO cms_content (block_key, value, updated_at) VALUES ${values}`);
    }
  }

  if (statements.length === 1) {
    persisted = next;
    return true; // nothing changed — skip the network entirely
  }

  statements.push("COMMIT");
  const sql = statements.join(";");

  // Send with one retry: transient proxy/network blips are common, and a
  // half-applied batch must never stay half-applied (ROLLBACK first).
  let conn: mysql.PoolConnection | null = null;
  try {
    await ensureTables(p);
    try {
      conn = await p.getConnection();
      await conn.query(sql);
    } catch (firstErr) {
      if (conn) {
        try {
          await conn.query("ROLLBACK");
        } catch {
          conn.destroy();
        }
        try {
          conn.release();
        } catch {
          // already destroyed
        }
        conn = null;
      }
      console.warn(
        `[cms-mysql] save attempt failed, retrying once: ${firstErr instanceof Error ? firstErr.message : String(firstErr)}`
      );
      await new Promise((r) => setTimeout(r, 400));
      conn = await p.getConnection();
      await conn.query(sql);
    }
    persisted = next;
    return true;
  } catch (err) {
    // Both attempts failed: the DB is now stale vs file/memory. Clear the
    // last-good snapshot so the NEXT save rewrites every section (full
    // resync) instead of skipping "unchanged" ones — that is what heals
    // rows left behind by a rolled-back delete.
    persisted = null;
    console.error(
      `[cms-mysql] save failed after retry (file copy still updated; MySQL will fully resync on next save): ${err instanceof Error ? err.message : String(err)}`
    );
    tablesReady = false;
    if (conn) {
      try {
        await conn.query("ROLLBACK");
      } catch {
        conn.destroy();
        conn = null;
      }
    }
    return false;
  } finally {
    if (conn) {
      try {
        await conn.release();
      } catch {
        // destroyed above
      }
    }
  }
}

/* ---------------------------------------------------------------------------
 * cms_media — durable image storage.
 *
 * Serverless hosts (Lambda-style /var/task + /tmp) have per-instance,
 * ephemeral disks: a file written by one instance/restart is invisible to the
 * next, which made freshly uploaded CMS images render as placeholders on the
 * live site. The bytes therefore live in MySQL (shared + durable); the local
 * upload dir is only a fast cache checked first when serving.
 * ------------------------------------------------------------------------- */

export interface MediaRow {
  name: string;
  mime: string;
  data: Buffer;
}

export interface MediaMeta {
  name: string;
  size: number;
  createdAt: string;
}

/** Store (or replace) an uploaded image. Returns false when MySQL is down —
 *  the caller may still keep a local-disk copy for this instance. */
export async function saveMedia(name: string, mime: string, data: Buffer): Promise<boolean> {
  const p = await getPool();
  if (!p) return false;
  try {
    await ensureMediaTable(p);
    await p.query(
      "INSERT INTO cms_media (name, mime, size, data) VALUES (?, ?, ?, ?) " +
        "ON DUPLICATE KEY UPDATE mime = VALUES(mime), size = VALUES(size), data = VALUES(data)",
      [name, mime, data.length, data]
    );
    return true;
  } catch (err) {
    mediaReady = false;
    console.error(
      `[cms-mysql] media save failed for ${name}: ${err instanceof Error ? err.message : String(err)}`
    );
    return false;
  }
}

/** Fetch image bytes by stored file name (null when absent/MySQL down). */
export async function fetchMedia(name: string): Promise<MediaRow | null> {
  const p = await getPool();
  if (!p) return null;
  try {
    await ensureMediaTable(p);
    const [rows] = await p.query("SELECT mime, data FROM cms_media WHERE name = ? LIMIT 1", [
      name,
    ]);
    const row = (rows as { mime: string; data: Buffer }[])[0];
    if (!row) return null;
    return { name, mime: row.mime, data: row.data };
  } catch (err) {
    mediaReady = false;
    console.error(
      `[cms-mysql] media fetch failed for ${name}: ${err instanceof Error ? err.message : String(err)}`
    );
    return null;
  }
}

/** Delete an image row; true when a row was removed. */
export async function deleteMediaRow(name: string): Promise<boolean> {
  const p = await getPool();
  if (!p) return false;
  try {
    await ensureMediaTable(p);
    const [res] = await p.query("DELETE FROM cms_media WHERE name = ?", [name]);
    return Number((res as { affectedRows?: number }).affectedRows ?? 0) > 0;
  } catch (err) {
    mediaReady = false;
    console.error(
      `[cms-mysql] media delete failed for ${name}: ${err instanceof Error ? err.message : String(err)}`
    );
    return false;
  }
}

/** Metadata for the media library (newest first). Empty list when unavailable. */
export async function listMediaRows(): Promise<MediaMeta[]> {
  const p = await getPool();
  if (!p) return [];
  try {
    await ensureMediaTable(p);
    const [rows] = await p.query(
      "SELECT name, size, created_at FROM cms_media ORDER BY created_at DESC, name DESC"
    );
    return (rows as { name: string; size: number; created_at: Date | string }[]).map((r) => ({
      name: r.name,
      size: Number(r.size ?? 0),
      createdAt:
        typeof r.created_at === "string" ? r.created_at : new Date(r.created_at).toISOString(),
    }));
  } catch (err) {
    mediaReady = false;
    console.error(
      `[cms-mysql] media list failed: ${err instanceof Error ? err.message : String(err)}`
    );
    return [];
  }
}
