require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const pages = [
  {
    slug: 'privacy-policy',
    content: `<h2>1. Introduction</h2>
<p>Welcome to CERARIA Private Limited. We are committed to protecting your personal information and your right to privacy.</p>
<h2>2. Information We Collect</h2>
<p>We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products, when you participate in activities on the Website, or otherwise when you contact us.</p>
<h2>3. How We Use Your Information</h2>
<p>We use personal information collected via our Website for a variety of business purposes described below.</p>`
  },
  {
    slug: 'terms-of-service',
    content: `<h2>1. Agreement to Terms</h2>
<p>These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and CERARIA Private Limited ("Company", “we”, “us”, or “our”).</p>
<h2>2. Intellectual Property Rights</h2>
<p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site are owned or controlled by us.</p>`
  },
  {
    slug: 'disclaimer',
    content: `<h2>1. Website Disclaimer</h2>
<p>The information provided by CERARIA Private Limited on our website is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information on the Site.</p>
<h2>2. External Links Disclaimer</h2>
<p>The Site may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy by us.</p>`
  }
];

async function seed() {
  try {
    for (const page of pages) {
      await pool.query(
        'INSERT INTO site_pages (slug, content) VALUES ($1, $2) ON CONFLICT (slug) DO NOTHING',
        [page.slug, page.content]
      );
      console.log(`Seeded ${page.slug}`);
    }
    console.log('Done!');
  } catch (err) {
    console.error('Error seeding pages:', err);
  } finally {
    pool.end();
  }
}

seed();
