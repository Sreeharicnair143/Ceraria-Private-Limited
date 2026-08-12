import re

with open('server.js', 'r', encoding='utf-8') as f:
    content = f.read()

# For POST /api/products
content = content.replace(
    'is_featured, price, color, surface_texture',
    'is_featured, price, offer_price, color, surface_texture'
)

content = content.replace(
    'is_featured === \'true\' || is_featured === true,\n        price ? parseFloat(price) : null,\n        color || null,\n        surface_texture || null',
    'is_featured === \'true\' || is_featured === true,\n        price ? parseFloat(price) : null,\n        offer_price ? parseFloat(offer_price) : null,\n        color || null,\n        surface_texture || null'
)

content = content.replace(
    'video_url, is_featured, price, color, surface_texture)',
    'video_url, is_featured, price, offer_price, color, surface_texture)'
)

content = content.replace(
    'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)',
    'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $17, $15, $16)'
)

# For PUT /api/products/:id
content = content.replace(
    'video_url, is_featured, price, image_url, room_scene_url_text, color, surface_texture',
    'video_url, is_featured, price, offer_price, image_url, room_scene_url_text, color, surface_texture'
)

content = content.replace(
    'price = COALESCE($14, price),',
    'price = COALESCE($14, price),\n        offer_price = COALESCE($17, offer_price),'
)

content = content.replace(
    'price ? parseFloat(price) : null,\n        color,\n        surface_texture',
    'price ? parseFloat(price) : null,\n        color,\n        surface_texture,\n        offer_price ? parseFloat(offer_price) : null'
)

with open('server.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated server.js")
