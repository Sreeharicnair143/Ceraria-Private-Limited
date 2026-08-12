-- ============================================================
--  CERARIA — PostgreSQL Database Schema + Seed Data
--  Run:  psql -U postgres -f db/schema.sql
-- ============================================================

SELECT 'CREATE DATABASE ceraria'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'ceraria')\gexec

\connect ceraria;

-- ────────────────────────────────────────────────────────────
--  DROP EXISTING TABLES
-- ────────────────────────────────────────────────────────────
DROP TABLE IF EXISTS admins CASCADE;
DROP TABLE IF EXISTS products CASCADE;

-- ────────────────────────────────────────────────────────────
--  CUSTOM TYPE: Allowed tile sizes
-- ────────────────────────────────────────────────────────────
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tile_size') THEN
    CREATE TYPE tile_size AS ENUM (
      '300x300', '75x300', '600x600', '200x1200',
      '800x1600', '1200x1800', '600x1200', '200x200'
    );
  END IF;
END $$;

-- ────────────────────────────────────────────────────────────
--  TABLE: products
-- ────────────────────────────────────────────────────────────
CREATE TABLE products (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(255)   NOT NULL,
  series        VARCHAR(255)   NOT NULL,
  category      VARCHAR(100)   NOT NULL DEFAULT 'Porcelain Tiles',
  size          tile_size      NOT NULL,
  thickness     VARCHAR(20),
  finish        VARCHAR(100),
  surface       VARCHAR(100),
  application   JSONB          DEFAULT '[]'::jsonb,
  description   TEXT,
  main_image    VARCHAR(500),
  room_scene_url VARCHAR(500),
  thumb_images  JSONB          DEFAULT '[]'::jsonb,
  video_url     VARCHAR(500),
  price         NUMERIC(10, 2),
  is_featured   BOOLEAN        DEFAULT false,
  created_at    TIMESTAMPTZ    DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────
--  TABLE: admins
-- ────────────────────────────────────────────────────────────
CREATE TABLE admins (
  id             SERIAL PRIMARY KEY,
  email          VARCHAR(255)  UNIQUE NOT NULL,
  password_hash  VARCHAR(255)  NOT NULL,
  name           VARCHAR(100),
  created_at     TIMESTAMPTZ   DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────
--  SEED: Products (10 designs across 5 series)
-- ────────────────────────────────────────────────────────────

-- Series 1: Metallic
INSERT INTO products (name, series, category, size, thickness, finish, surface, description, main_image, thumb_images, is_featured)
VALUES
(
  'Rusty Metal Coal',
  'Metallic',
  'Porcelain Tiles',
  '600x1200',
  '9 mm',
  'Matt',
  'Rustic Metal',
  'Inspired by the raw beauty of oxidized steel, Rusty Metal Coal brings an industrial-chic elegance to modern interiors. Its deeply textured surface captures the organic patina of weathered iron, offering a bold yet sophisticated palette of charcoal and rust tones. Exceptionally durable with near-zero water absorption, this tile is engineered for high-traffic environments while maintaining its striking visual depth.',
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80',
  '["https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80", "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&q=80"]'::jsonb,
  true
),
(
  'Metal Gold',
  'Metallic',
  'Porcelain Tiles',
  '600x1200',
  '9 mm',
  'Carving',
  'Metallic Carved',
  'Metal Gold redefines opulence with its carved metallic surface that shimmers with warm golden undertones. The precision-carved texture creates a three-dimensional interplay of light and shadow, making every surface a statement of refined luxury. Ideal for feature walls and exclusive residential spaces where understated grandeur is desired.',
  'https://images.unsplash.com/photo-1604076913837-52ab5f0b0748?w=1200&q=80',
  '["https://images.unsplash.com/photo-1604076913837-52ab5f0b0748?w=400&q=80", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80", "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80"]'::jsonb,
  true
);

-- Series 2: DG Matt
INSERT INTO products (name, series, category, size, thickness, finish, surface, description, main_image, thumb_images, is_featured)
VALUES
(
  'Montana Mysterious',
  'DG Matt',
  'Porcelain Tiles',
  '800x1600',
  '9 mm',
  'Matt',
  'Stone',
  'Montana Mysterious captures the primordial essence of ancient mountain stone. Its expansive 800×1600mm format creates seamless, monolithic surfaces that evoke the quiet grandeur of untouched landscapes. The matt finish delivers a velvety tactile experience while the sophisticated grey-black veining lends dramatic depth to any architectural canvas.',
  'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=1200&q=80',
  '["https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=400&q=80", "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=400&q=80", "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80"]'::jsonb,
  true
),
(
  'Montana Moss',
  'DG Matt',
  'Porcelain Tiles',
  '800x1600',
  '9 mm',
  'Matt',
  'Natural Stone',
  'Montana Moss introduces an earthy warmth with organic green-grey undertones reminiscent of moss-covered alpine rock. The large-format slab creates a sense of expansive calm, perfect for spa-inspired bathrooms and serene living areas. Its natural stone texture is faithfully reproduced through advanced digital glazing technology for an authentically organic feel.',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80',
  '["https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=80", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&q=80", "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400&q=80"]'::jsonb,
  false
);

-- Series 3: Ghr Decor
INSERT INTO products (name, series, category, size, thickness, finish, surface, description, main_image, thumb_images, is_featured)
VALUES
(
  'Décor Charming Caramel',
  'Ghr Decor',
  'Ceramic Tiles',
  '300x300',
  '8 mm',
  'Glossy',
  'Decorative',
  'Décor Charming Caramel weaves intricate geometric patterns in warm caramel and ivory tones, reminiscent of artisanal Mediterranean craftsmanship. The glossy finish amplifies the depth of each handcrafted-look motif, creating mesmerizing visual rhythms across any surface. Perfect as accent walls, kitchen backsplashes, and boutique retail interiors.',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
  '["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80", "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=80", "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80"]'::jsonb,
  false
),
(
  'Décor Quartz Nero',
  'Ghr Decor',
  'Ceramic Tiles',
  '300x300',
  '8 mm',
  'Glossy',
  'Quartz Decorative',
  'Décor Quartz Nero marries the depth of onyx with crystalline quartz flecks, creating a tile that captures and refracts light in mesmerizing patterns. The deep nero base provides a dramatic backdrop for the shimmering decorative elements, offering a jewel-like quality that transforms walls into works of art.',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80',
  '["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&q=80", "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=400&q=80", "https://images.unsplash.com/photo-1616137466211-f736a1f12588?w=400&q=80"]'::jsonb,
  false
);

-- Series 4: Moroccan
INSERT INTO products (name, series, category, size, thickness, finish, surface, description, main_image, thumb_images, is_featured)
VALUES
(
  'Damask Ecru',
  'Moroccan',
  'Ceramic Tiles',
  '200x200',
  '8 mm',
  'Matt',
  'Patterned',
  'Damask Ecru reimagines the timeless elegance of Moroccan tilework through a contemporary lens. Delicate damask patterns in soft ecru and cream tones create a refined, understated beauty perfect for heritage-inspired interiors. The matt finish ensures a warm, tactile surface that ages gracefully while maintaining its artisanal character.',
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80',
  '["https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&q=80", "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=400&q=80", "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=400&q=80"]'::jsonb,
  true
),
(
  'Ivy Blue',
  'Moroccan',
  'Ceramic Tiles',
  '200x200',
  '8 mm',
  'Glossy',
  'Patterned',
  'Ivy Blue draws from the azure beauty of Moroccan zellige tiles, presenting a contemporary interpretation of centuries-old craftsmanship. The rich cobalt and indigo tones intertwine with delicate ivy-inspired motifs, creating a tile that is at once exotic and refined. The glossy finish adds luminosity, making spaces feel vibrant and alive.',
  'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80',
  '["https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=400&q=80", "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=400&q=80", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80"]'::jsonb,
  false
);

-- Series 5: Strip Punch + Carving
INSERT INTO products (name, series, category, size, thickness, finish, surface, description, main_image, thumb_images, is_featured)
VALUES
(
  'Decor Ferro Nero',
  'Strip Punch + Carving',
  'Porcelain Tiles',
  '75x300',
  '9 mm',
  'Carving',
  'Carved / Decorative',
  'Decor Ferro Nero is a masterwork of precision carving, featuring deeply etched iron-inspired patterns on a rich nero base. Each strip tile is a sculptural element, designed to create textured accent bands and decorative borders that elevate wall compositions to gallery-worthy installations. The three-dimensional surface catches light dynamically throughout the day.',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
  '["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80", "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80", "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80"]'::jsonb,
  true
),
(
  'Décor Saturio Core',
  'Strip Punch + Carving',
  'Porcelain Tiles',
  '75x300',
  '9 mm',
  'Carving',
  'Carved',
  'Décor Saturio Core draws its design language from ancient Roman bas-relief sculpture, translating classical artistry into a modern porcelain canvas. The warm core tones — ranging from sand to terracotta — are punctuated by precise carved channels that create rhythmic shadow play. Ideal for luxury residential feature walls and high-end hospitality interiors.',
  'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&q=80',
  '["https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=400&q=80", "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=80", "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400&q=80"]'::jsonb,
  false
);

-- ────────────────────────────────────────────────────────────
--  SEED: Admin User
--  Email: admin@ceraria.in
--  Password: Ceraria@2026
--  Hash generated via: bcrypt.hashSync('Ceraria@2026', 10)
-- ────────────────────────────────────────────────────────────
INSERT INTO admins (email, password_hash, name)
VALUES (
  'admin@ceraria.in',
  '$2a$10$p8u9bIxu/1Z55x8m7SkAce79tG4q.DhJiIvDvPMzmaEHmom8MEXpe',
  'CERARIA Admin'
);

-- ────────────────────────────────────────────────────────────
--  INDEXES
-- ────────────────────────────────────────────────────────────
CREATE INDEX idx_products_series     ON products (series);
CREATE INDEX idx_products_category   ON products (category);
CREATE INDEX idx_products_is_featured ON products (is_featured);
CREATE INDEX idx_admins_email        ON admins (email);

-- ────────────────────────────────────────────────────────────
--  DONE
-- ────────────────────────────────────────────────────────────
SELECT '✅ CERARIA database initialized with ' || COUNT(*) || ' products' AS status FROM products;

CREATE TABLE IF NOT EXISTS catalogues (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    pdf_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
