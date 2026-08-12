const { Pool } = require('pg');
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'ceraria',
});
pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'products';").then(res => {
  console.log(res.rows);
  pool.end();
}).catch(console.error);
