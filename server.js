// ============================================================
//  CERARIA — The Art of Ceramic Luxury
//  Express Backend Server
//
//  Run:  npm start   |   npm run dev (watch mode)
// ============================================================

require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const multer  = require('multer');
const session = require('express-session');
const bcrypt  = require('bcryptjs');
const { Pool } = require('pg');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Initialize Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// ── Room Scene URL helper ───────────────────────────────────
const ROOM_SCENES = {
  'Bathroom': ['https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=85','https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=85','https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&q=85'],
  'Kitchen':  ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=85','https://images.unsplash.com/photo-1565183997392-2f6f122e5912?w=1200&q=85'],
  'Living Room': ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=85','https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1200&q=85'],
  'Bedroom':  ['https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=85','https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=85'],
  'Outdoor':  ['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=85','https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=85'],
  'Commercial Spaces': ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85','https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=85'],
  'Staircases': ['https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=1200&q=85','https://images.unsplash.com/photo-1567767292278-a204e3eda24e?w=1200&q=85'],
  'Counter Slabs': ['https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=1200&q=85','https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1200&q=85'],
  'Elevation Tiles': ['https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?w=1200&q=85','https://images.unsplash.com/photo-1524230659092-07f99a75c013?w=1200&q=85'],
  'default':  ['https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=85','https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=85','https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=85','https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=1200&q=85']
};
function autoRoomScene(applications) {
  let apps = [];
  if (typeof applications === 'string') { try { apps = JSON.parse(applications); } catch(e) { apps = []; } }
  else if (Array.isArray(applications)) { apps = applications; }
  for (const app of apps) { if (ROOM_SCENES[app]) { const l = ROOM_SCENES[app]; return l[Math.floor(Math.random()*l.length)]; } }
  const d = ROOM_SCENES['default']; return d[Math.floor(Math.random()*d.length)];
}

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware for admin authentication
app.use(session({
  secret: process.env.SESSION_SECRET || 'ceraria-luxury-tiles-2026-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // Set to true in production with HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// ── Database Pool ──────────────────────────────────────────
const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
      }
    : {
        host:     process.env.DB_HOST     || 'localhost',
        port:     process.env.DB_PORT     || 5432,
        user:     process.env.DB_USER     || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME     || 'ceraria',
      }
);

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
});

pool.query('SELECT NOW()')
  .then(() => console.log('✅ PostgreSQL connected — ceraria database'))
  .catch(err => console.error('❌ PostgreSQL connection failed:', err.message));

// ── Auth Middleware ─────────────────────────────────────────
function requireAdmin(req, res, next) {
  if (req.session && req.session.adminId) {
    return next();
  }
  res.status(401).json({ success: false, error: 'Unauthorized' });
}


// ════════════════════════════════════════════════════════════
//  PUBLIC API ROUTES
// ════════════════════════════════════════════════════════════

// ── GET /api/products ──────────────────────────────────────
// Query params: series, category, size, finish, is_featured
app.get('/api/products', async (req, res) => {
  try {
    const { search, series, category, size, finish, application, is_featured, color, surface_texture } = req.query;

    let query = 'SELECT * FROM products';
    const conditions = [];
    const params = [];
    let paramIdx = 1;

    if (series)      { conditions.push(`series = $${paramIdx++}`);      params.push(series); }
    if (category)    { conditions.push(`category = $${paramIdx++}`);    params.push(category); }
    if (size)        { conditions.push(`size = $${paramIdx++}`);        params.push(size); }
    if (finish)      { conditions.push(`finish = $${paramIdx++}`);      params.push(finish); }
    if (color)       { conditions.push(`color = $${paramIdx++}`);       params.push(color); }
    if (surface_texture) { conditions.push(`surface_texture = $${paramIdx++}`); params.push(surface_texture); }
    if (is_featured) { conditions.push(`is_featured = $${paramIdx++}`); params.push(is_featured === 'true'); }
    if (search)      { conditions.push(`(name ILIKE $${paramIdx} OR series ILIKE $${paramIdx})`); params.push(`%${search}%`); paramIdx++; }
    if (application) {
      conditions.push(`application ? $${paramIdx++}`);
      params.push(application);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY id DESC';

    const result = await pool.query(query, params);
    res.json({ success: true, count: result.rows.length, data: result.rows });

  } catch (err) {
    console.error('GET /api/products error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch products' });
  }
});

// ── GET /api/products/featured ─────────────────────────────
app.get('/api/products/featured', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE is_featured = true ORDER BY id DESC'
    );
    res.json({ success: true, count: result.rows.length, data: result.rows });
  } catch (err) {
    console.error('GET /api/products/featured error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch featured products' });
  }
});

// ── GET /api/products/series ───────────────────────────────
// Returns distinct series names for filters
app.get('/api/products/series', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT DISTINCT series FROM products ORDER BY series ASC'
    );
    res.json({ success: true, data: result.rows.map(r => r.series) });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch series' });
  }
});

// ── GET /api/products/stats ────────────────────────────────
app.get('/api/products/stats', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        COUNT(*)::int AS total_products,
        COUNT(*)::int AS active,
        COUNT(*) FILTER (WHERE is_featured = true)::int AS featured,
        COUNT(DISTINCT series)::int AS total_series
      FROM products
    `);
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('GET /api/products/stats error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch stats' });
  }
});

// ── GET /api/products/:id ──────────────────────────────────
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('GET /api/products/:id error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch product' });
  }
});


// ════════════════════════════════════════════════════════════
//  INQUIRY API
// ════════════════════════════════════════════════════════════

// ── POST /api/inquiry ──────────────────────────────────────
app.post('/api/inquiry', async (req, res) => {
  try {
    const { name, phone, email, product_name, quantity, message } = req.body;

    if (!name || !email || !product_name) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and product name are required'
      });
    }

    // Log inquiry (in production, store in DB or send email)
    console.log('📩 New Inquiry:', {
      name, phone, email, product_name, quantity, message,
      timestamp: new Date().toISOString()
    });

    res.json({ success: true, message: 'Inquiry received successfully' });
  } catch (err) {
    console.error('POST /api/inquiry error:', err);
    res.status(500).json({ success: false, error: 'Failed to submit inquiry' });
  }
});


// ════════════════════════════════════════════════════════════
//  ADMIN AUTH API
// ════════════════════════════════════════════════════════════

// ── POST /api/admin/login ──────────────────────────────────
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    const result = await pool.query(
      'SELECT * FROM admins WHERE email = $1',
      [email.toLowerCase().trim()]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const admin = result.rows[0];
    const isMatch = await bcrypt.compare(password, admin.password_hash);

    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Set session
    req.session.adminId = admin.id;
    req.session.adminEmail = admin.email;
    req.session.adminName = admin.name;

    res.json({
      success: true,
      message: 'Login successful',
      admin: { id: admin.id, email: admin.email, name: admin.name }
    });

  } catch (err) {
    console.error('POST /api/admin/login error:', err);
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});

// ── GET /api/admin/check ───────────────────────────────────
app.get('/api/admin/check', (req, res) => {
  if (req.session && req.session.adminId) {
    return res.json({
      success: true,
      admin: {
        id: req.session.adminId,
        email: req.session.adminEmail,
        name: req.session.adminName
      }
    });
  }
  res.status(401).json({ success: false, error: 'Not authenticated' });
});

// ── POST /api/settings/homepage-video ──────────────────────
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'public', 'assets', 'videos')),
  filename: (req, file, cb) => cb(null, 'homepage-video.mp4')
});
const uploadVideo = multer({ storage: videoStorage, limits: { fileSize: 250 * 1024 * 1024 } }); // 250MB limit

app.post('/api/settings/homepage-video', requireAdmin, uploadVideo.single('video'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, error: 'No video uploaded' });
    res.json({ success: true, message: 'Homepage video updated successfully!' });
  } catch (err) {
    console.error('Video upload error:', err);
    res.status(500).json({ success: false, error: 'Failed to upload video' });
  }
});

// ── CATALOGUES API ─────────────────────────────────────────

// Multer config for PDF uploads
const pdfStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ceraria/docs',
    resource_type: 'auto', // Allows both PDF (raw) and Images
  },
});
const uploadCatalogueFiles = multer({ storage: pdfStorage, limits: { fileSize: 50 * 1024 * 1024 } }).fields([
  { name: 'pdf_url', maxCount: 1 },
  { name: 'cover_image', maxCount: 1 }
]);

app.get('/api/catalogues', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM catalogues ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

app.post('/api/catalogues', requireAdmin, uploadCatalogueFiles, async (req, res) => {
  try {
    const { title, size_details } = req.body;
    if (!title || !req.files || !req.files.pdf_url || !req.files.cover_image) {
      return res.status(400).json({ success: false, error: 'Title, Size, PDF file, and Cover Image are required' });
    }
    
    const pdfUrl = req.files.pdf_url[0].path;
    const coverUrl = req.files.cover_image[0].path;
    
    const result = await pool.query(
      'INSERT INTO catalogues (title, pdf_url, cover_image_url, size_details) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, pdfUrl, coverUrl, size_details]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('Catalogue upload error:', err);
    res.status(500).json({ success: false, error: 'Failed to upload catalogue' });
  }
});

app.delete('/api/catalogues/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    // (Optional) Delete the physical file here if needed
    await pool.query('DELETE FROM catalogues WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

// ── POST /api/admin/logout ─────────────────────────────────
app.post('/api/admin/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Logout failed' });
    }
    res.clearCookie('connect.sid');
    res.json({ success: true, message: 'Logged out successfully' });
  });
});


// ════════════════════════════════════════════════════════════
//  ADMIN PRODUCT MANAGEMENT (Protected)
// ════════════════════════════════════════════════════════════

// Multer config for image uploads
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ceraria/images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB

// ── POST /api/products ─────────────────────────────────────
app.post('/api/products', requireAdmin, upload.fields([{ name: 'main_image', maxCount: 1 }, { name: 'room_scene_url', maxCount: 1 }]), async (req, res) => {
  try {
    const {
      name, series, category, size, thickness,
      finish, surface, application, description, image_url, room_scene_url_text, is_featured, price, offer_price, color, surface_texture
    } = req.body;

    if (!name || !series || !size) {
      return res.status(400).json({
        success: false,
        error: 'Name, series, and size are required'
      });
    }

    // Use uploaded files or fallback URLs
    const mainImage = req.files && req.files['main_image']
      ? req.files['main_image'][0].path
      : (image_url || '');
      
    const roomSceneUrl = req.files && req.files['room_scene_url']
      ? req.files['room_scene_url'][0].path
      : (room_scene_url_text || '');

    // Auto-assign room scene if not provided
    const computedRoomScene = roomSceneUrl || autoRoomScene(application);

    const result = await pool.query(
      `INSERT INTO products (name, series, category, size, thickness, finish, surface, application, description, main_image, room_scene_url, video_url, is_featured, price, offer_price, color, surface_texture)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
       RETURNING *`,
      [
        name, series, category || 'Porcelain Tiles', size,
        thickness || null, finish || null, surface || null,
        application || '[]',
        description || null, mainImage, computedRoomScene, req.body.video_url || null, is_featured === 'true' || is_featured === true,
        price ? parseFloat(price) : null,
        offer_price ? parseFloat(offer_price) : null,
        color || null,
        surface_texture || null
      ]
    );

    res.status(201).json({ success: true, data: result.rows[0] });

  } catch (err) {
    console.error('POST /api/products error:', err);
    res.status(500).json({ success: false, error: 'Failed to create product' });
  }
});

// ── PUT /api/products/:id ──────────────────────────────────
app.put('/api/products/:id', requireAdmin, upload.fields([{ name: 'main_image', maxCount: 1 }, { name: 'room_scene_url', maxCount: 1 }]), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, series, category, size, thickness,
      finish, surface, application, description, video_url, is_featured, price, offer_price, image_url, room_scene_url_text, color, surface_texture
    } = req.body;

    const mainImage = req.files && req.files['main_image']
      ? req.files['main_image'][0].path
      : image_url;
      
    const roomSceneUrl = req.files && req.files['room_scene_url']
      ? req.files['room_scene_url'][0].path
      : room_scene_url_text;

    const result = await pool.query(
      `UPDATE products SET
        name = COALESCE($1, name),
        series = COALESCE($2, series),
        category = COALESCE($3, category),
        size = COALESCE($4, size),
        thickness = COALESCE($5, thickness),
        finish = COALESCE($6, finish),
        surface = COALESCE($7, surface),
        application = COALESCE($8, application),
        description = COALESCE($9, description),
        main_image = COALESCE($10, main_image),
        room_scene_url = COALESCE($11, room_scene_url),
        video_url = COALESCE($12, video_url),
        is_featured = COALESCE($13, is_featured),
        price = COALESCE($14, price),
        offer_price = COALESCE($15, offer_price),
        color = COALESCE($16, color),
        surface_texture = COALESCE($17, surface_texture)
       WHERE id = $18
       RETURNING *`,
      [
        name, series, category, size, thickness, finish, surface, application || null, 
        description, mainImage, roomSceneUrl, video_url, 
        (is_featured !== undefined && is_featured !== null) ? (is_featured === 'true' || is_featured === true) : null, 
        price ? parseFloat(price) : null, 
        offer_price ? parseFloat(offer_price) : null, 
        color, surface_texture, id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.json({ success: true, data: result.rows[0] });

  } catch (err) {
    console.error('PUT /api/products/:id error:', err);
    res.status(500).json({ success: false, error: 'Failed to update product' });
  }
});

// ── DELETE /api/products/:id ───────────────────────────────
app.delete('/api/products/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM products WHERE id = $1 RETURNING id, name',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.json({ success: true, message: `Deleted "${result.rows[0].name}"` });

  } catch (err) {
    console.error('DELETE /api/products/:id error:', err);
    res.status(500).json({ success: false, error: 'Failed to delete product' });
  }
});


// ════════════════════════════════════════════════════════════
//  PAGE ROUTES
// ════════════════════════════════════════════════════════════

// Serve product detail page
app.get('/product', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'product.html'));
});

// Serve admin login page (hidden route)
app.get('/admin-login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin-login.html'));
});

// Serve admin dashboard
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// SPA fallback — serve index.html for unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ═══════════════════════════════════════════
// GLOBAL ERROR HANDLER
// ═══════════════════════════════════════════
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ success: false, error: 'File size too large. Please upload a smaller file.' });
    }
    return res.status(400).json({ success: false, error: err.message });
  }
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});

// ═══════════════════════════════════════════
// SERVER STARTUP
// ═══════════════════════════════════════════

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err);
});

app.listen(PORT, () => {
  console.log(`\n  ╔═══════════════════════════════════════════╗`);
  console.log(`  ║  CERARIA — The Art of Ceramic Luxury      ║`);
  console.log(`  ║  Server running on http://localhost:${PORT}   ║`);
  console.log(`  ╚═══════════════════════════════════════════╝\n`);
});
