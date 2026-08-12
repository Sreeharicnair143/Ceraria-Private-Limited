const { Pool } = require('pg');
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'ceraria',
});

async function migrate() {
  try {
    await pool.query("ALTER TABLE products ADD COLUMN offer_price NUMERIC;");
    console.log("Migration successful: added offer_price column");
  } catch (err) {
    if (err.code === '42701') {
      console.log("Column offer_price already exists.");
    } else {
      console.error("Migration error:", err);
    }
  } finally {
    pool.end();
  }
}

migrate();
