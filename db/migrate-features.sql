ALTER TABLE products ADD COLUMN IF NOT EXISTS surface_texture VARCHAR(100);
ALTER TABLE products ADD COLUMN IF NOT EXISTS color VARCHAR(100);

-- Seed 3 dummy products
INSERT INTO products (name, series, category, size, thickness, finish, surface, surface_texture, color, application, description, main_image, is_featured, price)
VALUES
('Terrazzo Cloud', 'Modern Art', 'Porcelain Tiles', '600x1200', '9 mm', 'Matt', 'Textured', 'Terrazzo & Chips', 'Ivory/White', '["Bathroom", "Living Room"]', 'Elegant white terrazzo with subtle grey chips.', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', true, 120.00),
('Marble Noir', 'Premium Elite', 'Porcelain Tiles', '800x1600', '9 mm', 'Glossy', 'Polished', 'Premium Marble', 'Charcoal/Black', '["Living Room", "Commercial Spaces"]', 'Deep black marble with striking white veins.', 'https://images.unsplash.com/photo-1604076913837-52ab5f0b0748?w=1200&q=80', true, 180.00),
('Rustic Timber', 'Natura', 'Ceramic Tiles', '200x1200', '10 mm', 'Matt', 'Wood Texture', 'Wood Planks', 'Natural Brown', '["Bedroom", "Outdoor"]', 'Warm natural brown wood look tiles.', 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=1200&q=80', false, 85.00);
