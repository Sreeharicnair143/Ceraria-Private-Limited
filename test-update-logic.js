require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function testUpdate() {
  try {
    const id = 21;
    const offer_price = "39.99"; // simulated req.body.offer_price

    const result = await pool.query(
      `UPDATE products SET
        offer_price = COALESCE($1, offer_price)
       WHERE id = $2
       RETURNING *`,
      [
        offer_price ? parseFloat(offer_price) : null,
        id
      ]
    );

    console.log("Updated Product:");
    console.log(result.rows[0]);
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

testUpdate();
