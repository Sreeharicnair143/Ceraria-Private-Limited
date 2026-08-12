const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ceraria',
  password: 'admin',
  port: 5432,
});

const applications = ['Bathroom', 'Kitchen', 'Living Room', 'Bedroom', 'Outdoor', 'Commercial Spaces', 'Staircases', 'Counter Slabs', 'Elevation Tiles'];

function getRandomApps() {
  const shuffled = [...applications].sort(() => 0.5 - Math.random());
  return JSON.stringify(shuffled.slice(0, Math.floor(Math.random() * 3) + 2)); // 2 to 4 apps
}

const seriesData = [
  { series: 'Metallic', finish: 'Matt', size: '600x1200', thickness: '9 mm', names: ['Rusty Metal Coal', 'Rusty Metal Copper', 'Rusty Metal Fuscous', 'Metal Gold', 'Rusty Metal Moss'] },
  { series: 'DG Matt', finish: 'Matt', size: '800x1600', thickness: '9 mm', names: ['Montana Mysterious', 'Montana Million', 'Montana Moth', 'Montana Mithiril', 'Montana Moss'] },
  { series: 'DG Matt Decor', finish: 'Matt', size: '800x1600', thickness: '9 mm', names: ['Décor Montana Mysterious', 'Décor Montana Million', 'Décor Montana Moth', 'Décor Montana Mithril'] },
  { series: 'Ghr Decor', finish: 'Glossy', size: '300x300', thickness: '8 mm', names: ['Décor Charming Caramel', 'Décor Charming Bateu', 'Décor Charming Bedrock', 'Décor Charming Carlisle', 'Décor Charming Galliano', 'Décor Charming Iroko', 'Décor Charming Kamut', 'Décor Charming Thunder', 'Décor Quartz Grey', 'Décor Quartz Crema', 'Décor Quartz Nero'] },
  { series: 'Ghr', finish: 'Glossy', size: '300x300', thickness: '8 mm', names: ['Charming Area', 'Charming Bateu', 'Charming Bedrock', 'Charming Beige', 'Charming Caramel', 'Charming Carlise', 'Charming Galliano', 'Charming Iroko', 'Charming Kamut', 'Charming Thunder', 'Quartz Crema', 'Quartz Grey', 'Quartz Nero', 'G Stone Graphite', 'G Ston Grigio', 'G Stone White', 'Tessuto Aqua', 'Tessuto Steel', 'Tessuto Crema', 'Tessuto White', 'Tessuto Cotta', 'Tessuto Denim', 'Tessuto Décor 3'] },
  { series: 'Ghr Max Surface', finish: 'Carving', size: '600x1200', thickness: '9 mm', names: ['Fosil Grey', 'Fosil Pearl', 'Fosil Creama', 'Fosil Bone'] },
  { series: 'Ghr Max Decor', finish: 'Carving', size: '600x1200', thickness: '9 mm', names: ['Décor Fosil Grey', 'Décor Fosil Pearl', 'Décor Fosil Creama', 'Décor Fosil Bone'] },
  { series: 'Lush', finish: 'Matt', size: '600x600', thickness: '9 mm', names: ['Bohim Dove', 'Bohim Slate', 'Bohim Dove Décor'] },
  { series: 'Matt Granula', finish: 'Matt', size: '600x1200', thickness: '9 mm', names: ['Kilburn Lusta', 'Nara Spring', 'Décor Nara Spring', 'Paonazo Sky'] },
  { series: 'Glossy Granula', finish: 'Glossy', size: '600x1200', thickness: '9 mm', names: ['Viggo Black', 'Emerita Blan', 'Emerita Fonce', 'Capria Aqua'] },
  { series: 'Chromica & Subway Decors', finish: 'Glossy', size: '75x300', thickness: '8 mm', names: ['Terra Leaf Decor', 'Terra Décor Mix', 'Decor Terra Flower', 'Décor Spectra Teal', 'Decor Brickstacks Silver', 'Decor Brickstacks Fever', 'Decor Brick Stacks Rosy Brown', 'Florel Terra Décor'] },
  { series: 'Moroccan', finish: 'Matt', size: '200x200', thickness: '8 mm', names: ['Damask Ecru', 'Rustico Multi', 'Mahagony Royal', 'Ivy Blue', 'Conna Green', 'Esterela Bright', 'Rodin Metal'] },
  { series: 'Strip Punch + Carving', finish: 'Carving', size: '75x300', thickness: '9 mm', names: ['Decor Ferro Nero', 'Décor Ferro Snow', 'Decor Ferro Root', 'Décor Saturio Core'] },
];

async function seed() {
  try {
    // Modify table to add application column if not exists (safety net)
    await pool.query(`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='application') THEN
          ALTER TABLE products ADD COLUMN application JSONB DEFAULT '[]'::jsonb;
        END IF;
      END $$;
    `);

    await pool.query('TRUNCATE TABLE products RESTART IDENTITY CASCADE');

    const defaultImages = [
      '/assets/images/tiles/grey_stone.png',
      '/assets/images/tiles/beige_marble.png',
      '/assets/images/tiles/dark_slate.png',
      '/assets/images/tiles/rusty_copper.png',
      '/assets/images/tiles/white_porcelain.png',
      '', // No image test
    ];

    let count = 0;
    for (const s of seriesData) {
      for (const name of s.names) {
        const price = Math.floor(Math.random() * (5000 - 500 + 1)) + 500; // Random price between 500 and 5000
        await pool.query(`
          INSERT INTO products (name, series, category, size, thickness, finish, surface, application, description, main_image, room_scene_url, price)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
          [
            name, 
            s.series, 
            'Porcelain Tiles', 
            s.size, 
            s.thickness, 
            s.finish, 
            'Natural', 
            getRandomApps(), 
            `Premium tile from the ${s.series} collection. Featuring exquisite craftsmanship and durability.`, 
            '',
            '',
            price
          ]
        );
        count++;
      }
    }
    console.log(`Successfully seeded ${count} products.`);
  } catch (err) {
    console.error('Error seeding:', err);
  } finally {
    pool.end();
  }
}

seed();
