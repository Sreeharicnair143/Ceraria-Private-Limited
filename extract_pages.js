require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function exportPages() {
  try {
    const res = await pool.query("SELECT slug, content FROM site_pages WHERE slug IN ('privacy-policy', 'terms-of-service', 'disclaimer')");
    
    let seedCode = `require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const pages = ${JSON.stringify(res.rows, null, 2)};

async function seed() {
  try {
    for (const page of pages) {
      await pool.query(
        'INSERT INTO site_pages (slug, content) VALUES ($1, $2) ON CONFLICT (slug) DO UPDATE SET content = EXCLUDED.content',
        [page.slug, page.content]
      );
      console.log(\`Seeded \${page.slug}\`);
    }
    console.log('Done!');
  } catch (err) {
    console.error('Error seeding pages:', err);
  } finally {
    pool.end();
  }
}

seed();
`;
    
    fs.writeFileSync('seed_pages.js', seedCode);
    console.log('Updated seed_pages.js with full content from Supabase!');
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

exportPages();
