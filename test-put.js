require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function testPut() {
  try {
    const res = await pool.query(
      `UPDATE products SET offer_price = COALESCE($1, offer_price) WHERE id = $2 RETURNING *`,
      [39.99, 21]
    );
    console.log(res.rows[0]);
  } catch (e) {
    console.error(e);
  } finally {
    pool.end();
  }
}
testPut();
