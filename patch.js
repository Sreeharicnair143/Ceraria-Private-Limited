const fs = require('fs');
let html = fs.readFileSync('public/admin.html', 'utf8');

const searchRegex = /<form id="upload-form" class="p-6 space-y-5" enctype="multipart\/form-data">[\s\S]*?<!-- \?\"\? Tile Name \+ Series \?\"\? -->/;

const replacement = `<form id="upload-form" class="p-6 space-y-5" enctype="multipart/form-data">

        <!-- Dual Image Uploads -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Tile Image -->
          <div>
            <label class="block text-sm font-semibold text-charcoal-900 mb-2">Tile Image</label>
            <input type="file" id="main_image_file" name="main_image" accept="image/jpeg,image/png,image/webp" class="admin-input w-full px-4 py-2 border border-sand-200 rounded-xl text-sm bg-cream-50/50" />
            <div class="mt-2">
              <label for="thumbnail-url" class="block text-xs text-stone-400 mb-1">Or paste an image URL</label>
              <input type="url" id="thumbnail-url" name="image_url" placeholder="https://..." class="admin-input w-full px-4 py-2 border border-sand-200 rounded-xl text-sm bg-cream-50/50" />
            </div>
          </div>
          <!-- Room Scene -->
          <div>
            <label class="block text-sm font-semibold text-charcoal-900 mb-2">Room Scene</label>
            <input type="file" id="room_scene_file" name="room_scene_url" accept="image/jpeg,image/png,image/webp" class="admin-input w-full px-4 py-2 border border-sand-200 rounded-xl text-sm bg-cream-50/50" />
            <div class="mt-2">
              <label for="room-scene-url-text" class="block text-xs text-stone-400 mb-1">Or paste an image URL</label>
              <input type="url" id="room-scene-url-text" name="room_scene_url_text" placeholder="https://..." class="admin-input w-full px-4 py-2 border border-sand-200 rounded-xl text-sm bg-cream-50/50" />
            </div>
          </div>
        </div>

        <!-- Price + Name + Series -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label for="tile-price" class="block text-sm font-semibold text-charcoal-900 mb-2">Price (₹)</label>
            <input type="number" step="0.01" id="tile-price" name="price" placeholder="e.g., 999.00" class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50" />
          </div>
          
        <!--  Tile Name + Series  -->`;

html = html.replace(searchRegex, replacement);

// We also need to add 'editProductId'
html = html.replace(/<form id="upload-form" class="p-6 space-y-5" enctype="multipart\/form-data">/, `<form id="upload-form" class="p-6 space-y-5" enctype="multipart/form-data">
        <input type="hidden" id="edit-product-id" name="editProductId" />`);

// And we need to add the Edit functionality to the row generation in JS
html = html.replace(/<button onclick="deleteProduct\(\$\{p\.id\}\)" class="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">/, 
  `<button onclick="editProduct(\$\{p\.id\})" class="p-2 text-stone-400 hover:text-bronze-600 hover:bg-bronze-50 rounded-lg transition-colors" title="Edit">
     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
   </button>
   <button onclick="deleteProduct(\$\{p\.id\})" class="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">`);

fs.writeFileSync('public/admin.html', html);
console.log('Patched public/admin.html successfully!');
