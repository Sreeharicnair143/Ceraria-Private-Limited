const { Pool } = require('pg');

const pool = new Pool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     process.env.DB_PORT     || 5432,
  user:     process.env.DB_USER     || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME     || 'ceraria',
});

async function run() {
  try {
    const result = await pool.query(
      "UPDATE admins SET password_hash = $1 WHERE email = 'admin@ceraria.in' RETURNING *",
      ['$2a$10$p8u9bIxu/1Z55x8m7SkAce79tG4q.DhJiIvDvPMzmaEHmom8MEXpe']
    );
    if (result.rows.length > 0) {
      console.log('Admin password updated successfully.');
    } else {
      console.log('Admin not found in DB! Inserting...');
      await pool.query(
        "INSERT INTO admins (email, password_hash, name) VALUES ('admin@ceraria.in', $1, 'CERARIA Admin')",
        ['$2a$10$p8u9bIxu/1Z55x8m7SkAce79tG4q.DhJiIvDvPMzmaEHmom8MEXpe']
      );
      console.log('Admin inserted successfully.');
    }
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}
run();
