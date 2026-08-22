require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function checkOfferPrice() {
  try {
    const res = await pool.query("SELECT id, name, price, offer_price FROM products ORDER BY created_at DESC LIMIT 5;");
    console.log("Recent Products:");
    console.table(res.rows);
  } catch(e) {
    console.error(e);
  } finally {
    pool.end();
  }
}
checkOfferPrice();
