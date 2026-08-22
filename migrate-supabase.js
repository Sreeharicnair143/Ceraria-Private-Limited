require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function runMigration() {
  try {
    console.log("Checking columns...");
    const res = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'products';");
    const columns = res.rows.map(r => r.column_name);

    if (!columns.includes('offer_price')) {
      await pool.query("ALTER TABLE products ADD COLUMN offer_price NUMERIC;");
      console.log("Added offer_price");
    }
    if (!columns.includes('color')) {
      await pool.query("ALTER TABLE products ADD COLUMN color VARCHAR;");
      console.log("Added color");
    }
    if (!columns.includes('surface_texture')) {
      await pool.query("ALTER TABLE products ADD COLUMN surface_texture VARCHAR;");
      console.log("Added surface_texture");
    }
    console.log("Migration complete.");
  } catch(e) {
    console.error(e);
  } finally {
    pool.end();
  }
}

runMigration();
