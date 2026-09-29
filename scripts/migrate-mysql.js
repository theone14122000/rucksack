/**
 * CMS migration to normalized MySQL tables.
 *
 * Creates one table per collection, seeds them from the .data/cms.json
 * snapshot, and drops the legacy single-row cms_state blob (if present).
 * Safe to re-run — it rebuilds the tables from the snapshot each time.
 *
 *   node scripts/migrate-mysql.js
 */
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

const COLLECTIONS = [
  ["cms_destinations", "destinations"],
  ["cms_packages", "packages"],
  ["cms_treks", "treks"],
  ["cms_experiences", "experiences"],
  ["cms_testimonials", "testimonials"],
  ["cms_faqs", "faqs"],
  ["cms_gallery", "gallery"],
  ["cms_services", "services"],
  ["cms_enquiries", "enquiries"],
];

function loadEnvLocal() {
  const file = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf-8").split("\n")) {
    const m = line.trim().match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
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

function itemTableDdl(table) {
  return `
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
}

function rowFor(item, index) {
  const id = String(item.id ?? "");
  const slug = typeof item.slug === "string" && item.slug ? item.slug : null;
  const status = typeof item.status === "string" && item.status ? item.status : "published";
  const sort = Number.isFinite(Number(item.order)) ? Number(item.order) : 0;
  return [id, slug, status, sort, index, JSON.stringify(item)];
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
  const doc = JSON.parse(fs.readFileSync(dataFile, "utf-8"));

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

  // --- create schema (drop first: rebuild tool, picks up schema changes) ---
  for (const [table] of COLLECTIONS) {
    await conn.query(`DROP TABLE IF EXISTS ${table}`);
  }
  await conn.query("DROP TABLE IF EXISTS cms_content");
  await conn.query("DROP TABLE IF EXISTS cms_settings");
  await conn.query(`
CREATE TABLE IF NOT EXISTS cms_settings (
  id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
  data JSON NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
  await conn.query(`
CREATE TABLE IF NOT EXISTS cms_content (
  block_key VARCHAR(128) NOT NULL PRIMARY KEY,
  value MEDIUMTEXT NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
  for (const [table] of COLLECTIONS) {
    await conn.query(itemTableDdl(table));
  }
  console.log("Schema ready (cms_settings, cms_content + 9 collection tables).");

  // --- seed from snapshot ---
  await conn.beginTransaction();
  try {
    await conn.query(
      "INSERT INTO cms_settings (id, data) VALUES (1, ?) ON DUPLICATE KEY UPDATE data = VALUES(data)",
      [JSON.stringify(doc.settings || {})]
    );

    for (const [table, key] of COLLECTIONS) {
      const items = Array.isArray(doc[key]) ? doc[key] : [];
      await conn.query(`DELETE FROM ${table}`);
      if (items.length > 0) {
        await conn.query(
          `INSERT INTO ${table} (id, slug, status, sort_order, pos, data) VALUES ?`,
          [items.map((item, index) => rowFor(item, index))]
        );
      }
      console.log(`  ${table}: ${items.length} rows`);
    }

    const blocks = Array.isArray(doc.content) ? doc.content : [];
    await conn.query("DELETE FROM cms_content");
    if (blocks.length > 0) {
      await conn.query("INSERT INTO cms_content (block_key, value, updated_at) VALUES ?", [
        blocks.map((b) => [String(b.key ?? ""), String(b.value ?? ""), b.updatedAt ? new Date(b.updatedAt) : new Date()]),
      ]);
    }
    console.log(`  cms_content: ${blocks.length} rows`);

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    console.error("Seed failed, rolled back:", err.message);
    await conn.end();
    process.exit(1);
  }

  // --- drop legacy blob table ---
  await conn.query("DROP TABLE IF EXISTS cms_state");
  console.log("Dropped legacy cms_state (if it existed).");

  const [tables] = await conn.query(
    "SELECT table_name AS name FROM information_schema.tables WHERE table_schema = ? AND table_name LIKE 'cms_%' ORDER BY table_name",
    [cfg.database]
  );
  console.log("\nTables in database:");
  for (const t of tables) console.log("  -", t.name);

  await conn.end();
  console.log("Migration complete.");
}

main().catch((err) => {
  console.error("FATAL", err);
  process.exit(1);
});
