/**
 * One-time migration: pushes the current .data/cms.json snapshot into the
 * cms_state table of the MySQL database named by DATABASE_URL (read from the
 * environment or from .env.local). Safe to re-run — it overwrites the row.
 *
 *   node scripts/migrate-mysql.js
 */
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

function loadEnvLocal() {
  const file = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf-8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let value = m[2];
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(m[1] in process.env)) process.env[m[1]] = value;
  }
}

function configFromUrl(url) {
  const u = new URL(url);
  return {
    host: u.hostname,
    port: u.port ? Number(u.port) : 3306,
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: u.pathname.replace(/^\//, ""),
    connectTimeout: 15000,
  };
}

async function main() {
  loadEnvLocal();
  const url = process.env.DATABASE_URL || process.env.MYSQL_URL;
  if (!url) {
    console.error("No DATABASE_URL / MYSQL_URL set (env or .env.local).");
    process.exit(1);
  }

  const dataFile = path.join(__dirname, "..", ".data", "cms.json");
  if (!fs.existsSync(dataFile)) {
    console.error(`Missing ${dataFile} — run the app once first so the snapshot exists.`);
    process.exit(1);
  }
  const snapshot = fs.readFileSync(dataFile, "utf-8");
  JSON.parse(snapshot); // fail fast on corrupt snapshot
  const counts = JSON.parse(snapshot);
  console.log(`Snapshot: ${dataFile}`);
  for (const key of ["packages", "destinations", "gallery", "content", "enquiries"]) {
    const v = counts[key];
    console.log(`  ${key}: ${Array.isArray(v) ? v.length : typeof v}`);
  }

  const cfg = configFromUrl(url);
  const attempts = [{ ...cfg, ssl: { rejectUnauthorized: false } }, { ...cfg }];
  let conn = null;
  let lastErr = null;
  for (const opts of attempts) {
    try {
      conn = await mysql.createConnection(opts);
      await conn.query("SELECT 1");
      break;
    } catch (err) {
      lastErr = err;
      if (conn) await conn.end().catch(() => undefined);
      conn = null;
    }
  }
  if (!conn) {
    console.error("Could not connect to MySQL:", lastErr && lastErr.message);
    process.exit(1);
  }

  console.log(`Connected to ${cfg.host}:${cfg.port}/${cfg.database} as ${cfg.user}`);
  await conn.query(
    `CREATE TABLE IF NOT EXISTS cms_state (
      id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
      data LONGTEXT NOT NULL,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`
  );
  console.log("Table cms_state ready.");

  await conn.query(
    "INSERT INTO cms_state (id, data) VALUES (1, ?) ON DUPLICATE KEY UPDATE data = VALUES(data)",
    [snapshot]
  );
  const [rows] = await conn.query("SELECT LENGTH(data) AS bytes, updated_at FROM cms_state WHERE id = 1");
  console.log("Row saved:", rows[0]);
  await conn.end();
  console.log("Migration complete.");
}

main().catch((err) => {
  console.error("FATAL", err);
  process.exit(1);
});
