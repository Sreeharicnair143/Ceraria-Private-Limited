const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ceraria',
  password: 'admin',
  port: 5432,
});

// Curated room scene images per application type
const ROOM_SCENES = {
  'Bathroom': [
    'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=85',
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=85',
    'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&q=85',
    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&q=85',
  ],
  'Kitchen': [
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=85',
    'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?w=1200&q=85',
    'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1200&q=85',
  ],
  'Living Room': [
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=85',
    'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1200&q=85',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=85',
  ],
  'Bedroom': [
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=85',
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=85',
    'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1200&q=85',
  ],
  'Outdoor': [
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=85',
    'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=85',
    'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1200&q=85',
  ],
  'Commercial Spaces': [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=85',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=85',
  ],
  'Staircases': [
    'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=1200&q=85',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=85',
    'https://images.unsplash.com/photo-1567767292278-a204e3eda24e?w=1200&q=85',
  ],
  'Counter Slabs': [
    'https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=1200&q=85',
    'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1200&q=85',
    'https://images.unsplash.com/photo-1556909060-3d31c6eefbcc?w=1200&q=85',
  ],
  'Elevation Tiles': [
    'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?w=1200&q=85',
    'https://images.unsplash.com/photo-1524230659092-07f99a75c013?w=1200&q=85',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=85',
  ],
  'default': [
    'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=85',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=85',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=85',
    'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=1200&q=85',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85',
  ]
};

function getRoomSceneUrl(applications) {
  let apps = [];
  if (typeof applications === 'string') {
    try { apps = JSON.parse(applications); } catch(e) { apps = []; }
  } else if (Array.isArray(applications)) {
    apps = applications;
  }

  for (const app of apps) {
    if (ROOM_SCENES[app]) {
      const list = ROOM_SCENES[app];
      return list[Math.floor(Math.random() * list.length)];
    }
  }
  const defaults = ROOM_SCENES['default'];
  return defaults[Math.floor(Math.random() * defaults.length)];
}

async function migrate() {
  try {
    // 1. Add room_scene_url column if not exists
    await pool.query(`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='room_scene_url') THEN
          ALTER TABLE products ADD COLUMN room_scene_url VARCHAR(500);
        END IF;
      END $$;
    `);
    console.log('✅ Column room_scene_url ensured');

    // 2. Update all products without a room_scene_url
    const { rows } = await pool.query('SELECT id, application FROM products WHERE room_scene_url IS NULL OR room_scene_url = \'\'');
    console.log(`🔄 Updating ${rows.length} products with room scene images...`);

    let updated = 0;
    for (const row of rows) {
      const sceneUrl = getRoomSceneUrl(row.application);
      await pool.query('UPDATE products SET room_scene_url = $1 WHERE id = $2', [sceneUrl, row.id]);
      updated++;
    }

    console.log(`✅ Updated ${updated} products with room scene images`);
  } catch (err) {
    console.error('Migration error:', err);
  } finally {
    pool.end();
  }
}

// Export helper for use in server.js
module.exports = { getRoomSceneUrl, ROOM_SCENES };

migrate();
