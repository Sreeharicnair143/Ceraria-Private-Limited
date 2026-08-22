import os

file_path = 'server.js'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix INSERT statement
old_insert_query = """    const result = await pool.query(
      `INSERT INTO products (name, series, category, size, thickness, finish, surface, application, description, main_image, room_scene_url, video_url, is_featured, price, thumb_images)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
       RETURNING *`,
      [
        name, series, category || 'Porcelain Tiles', size,
        thickness || null, finish || null, surface || null,
        application || '[]',
        description || null, mainImage, computedRoomScene, req.body.video_url || null, is_featured === 'true' || is_featured === true,
        price ? parseFloat(price) : null,
        JSON.stringify(thumbImagesArray)
      ]
    );"""
new_insert_query = """    const result = await pool.query(
      `INSERT INTO products (name, series, category, size, thickness, finish, surface, application, description, main_image, room_scene_url, video_url, is_featured, price, offer_price, color, surface_texture, thumb_images)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
       RETURNING *`,
      [
        name, series, category || 'Porcelain Tiles', size,
        thickness || null, finish || null, surface || null,
        application || '[]',
        description || null, mainImage, computedRoomScene, req.body.video_url || null, is_featured === 'true' || is_featured === true,
        price ? parseFloat(price) : null,
        offer_price ? parseFloat(offer_price) : null,
        color || null,
        surface_texture || null,
        JSON.stringify(thumbImagesArray)
      ]
    );"""
content = content.replace(old_insert_query, new_insert_query)


# Fix UPDATE statement
old_update_query = """    const result = await pool.query(
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
        thumb_images = COALESCE($15, thumb_images)
       WHERE id = $16
       RETURNING *`,
      [
        name, series, category, size, thickness, finish, surface, application || null, 
        description, mainImage, roomSceneUrl, video_url, 
        (is_featured !== undefined && is_featured !== null) ? (is_featured === 'true' || is_featured === true) : null, 
        price ? parseFloat(price) : null, 
        thumbImagesArray ? JSON.stringify(thumbImagesArray) : null,
        id
      ]
    );"""
new_update_query = """    const result = await pool.query(
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
        surface_texture = COALESCE($17, surface_texture),
        thumb_images = COALESCE($18, thumb_images)
       WHERE id = $19
       RETURNING *`,
      [
        name, series, category, size, thickness, finish, surface, application || null, 
        description, mainImage, roomSceneUrl, video_url, 
        (is_featured !== undefined && is_featured !== null) ? (is_featured === 'true' || is_featured === true) : null, 
        price ? parseFloat(price) : null, 
        offer_price ? parseFloat(offer_price) : null,
        color || null,
        surface_texture || null,
        thumbImagesArray ? JSON.stringify(thumbImagesArray) : null,
        id
      ]
    );"""
content = content.replace(old_update_query, new_update_query)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("server.js patched successfully.")
