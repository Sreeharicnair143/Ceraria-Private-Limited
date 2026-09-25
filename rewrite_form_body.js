const fs = require('fs');
let html = fs.readFileSync('public/management-portal-v9-x72.html', 'utf8');

const startTag = '<!-- Form Body -->';
const endTag = '<!-- ── Form Actions ── -->';
const startIndex = html.indexOf(startTag);
const endIndex = html.indexOf(endTag);

if (startIndex === -1 || endIndex === -1) {
    console.error('Could not find form body bounds');
    process.exit(1);
}

const newBody = `<!-- Form Body -->
        <div class="p-6 overflow-y-auto" style="max-height: calc(100vh - 160px);">
          <form id="upload-form" class="space-y-6" onsubmit="event.preventDefault(); submitForm();">
            <input type="hidden" id="edit-product-id" />
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label for="tile-name" class="block text-sm font-semibold text-charcoal-900 mb-2">Tile Name</label>
                <input type="text" id="tile-name" name="name" placeholder="e.g., Rusty Metal Coal" class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 transition-all" />
              </div>
              <div>
                <label for="tile-series" class="block text-sm font-semibold text-charcoal-900 mb-2">Series</label>
                <select id="tile-series" onchange="toggleOther(this)" name="series" class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 appearance-none cursor-pointer transition-all">
                  <option value="" disabled selected>Select series</option>
                  <option value="Metallic">Metallic</option>
                  <option value="Strip Punch + Carving">Strip Punch + Carving</option>
                  <option value="other">Other...</option>
                </select>
                <input type="text" id="tile-series-other" class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 transition-all hidden mt-2" placeholder="Enter custom series" />
              </div>
            </div>

            <div class="bg-sand-100/50 rounded-2xl border border-sand-200 p-4 mb-4">
              <div class="flex items-center justify-between pt-1">
                <div>
                  <p class="text-sm font-semibold text-charcoal-900">Mark as Featured</p>
                  <p class="text-xs text-stone-400 mt-0.5">Features this tile on the homepage hero carousel</p>
                </div>
                <div class="flex items-center">
                  <input type="checkbox" id="tile-banner" name="is_featured" value="true" class="toggle-input" />
                  <label for="tile-banner" class="toggle-switch" aria-label="Toggle featured"></label>
                </div>
              </div>
            </div>

            <!-- Fix starts here: The grid div for Category, Size, Price, Offer Price -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label for="tile-category" class="block text-sm font-semibold text-charcoal-900 mb-2">Category</label>
                <select id="tile-category" onchange="toggleOther(this)" name="category" class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 appearance-none cursor-pointer transition-all">
                  <option value="" disabled selected>Select category</option>
                  <option value="Porcelain Tiles">Porcelain Tiles</option>
                  <option value="Ceramic Tiles">Ceramic Tiles</option>
                  <option value="other">Other...</option>
                </select>
                <input type="text" id="tile-category-other" class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 transition-all hidden mt-2" placeholder="Enter custom category" />
              </div>
              <div>
                <label for="tile-size" class="block text-sm font-semibold text-charcoal-900 mb-2">Size</label>
                <select id="tile-size" onchange="toggleOther(this)" name="size" class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 appearance-none cursor-pointer transition-all">
                  <option value="" disabled selected>Select size</option>
                  <option value="75x300">75 × 300 mm</option>
                  <option value="200x200">200 × 200 mm</option>
                  <option value="300x300">300 × 300 mm</option>
                  <option value="600x600">600 × 600 mm</option>
                  <option value="600x1200">600 × 1200 mm</option>
                  <option value="200x1200">200 × 1200 mm</option>
                  <option value="800x1600">800 × 1600 mm</option>
                  <option value="1200x1800">1200 × 1800 mm</option>
                  <option value="other">Other...</option>
                </select>
                <input type="text" id="tile-size-other" class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 transition-all hidden mt-2" placeholder="Enter custom size" />
              </div>
              <div>
                <label for="tile-price" class="block text-sm font-semibold text-charcoal-900 mb-2">Price (₹)</label>
                <input type="number" step="0.01" id="tile-price" name="price" placeholder="e.g., 49.99" class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 transition-all" />
              </div>
              <div>
                <label for="tile-offer-price" class="block text-sm font-semibold text-charcoal-900 mb-2">Offer Price (₹)</label>
                <input type="number" step="0.01" id="tile-offer-price" name="offer_price" placeholder="e.g., 39.99" class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 transition-all" />
              </div>
            </div>

            <!-- Fix starts here: The grid div for Thickness, Finish, Surface -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label for="tile-thickness" class="block text-sm font-semibold text-charcoal-900 mb-2">Thickness</label>
                <select id="tile-thickness" onchange="toggleOther(this)" name="thickness" class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 appearance-none cursor-pointer transition-all">
                  <option value="" disabled selected>Select thickness</option>
                  <option value="8 mm">8 mm</option>
                  <option value="9 mm">9 mm</option>
                  <option value="10 mm">10 mm</option>
                  <option value="12 mm">12 mm</option>
                  <option value="15 mm">15 mm</option>
                  <option value="other">Other...</option>
                </select>
                <input type="text" id="tile-thickness-other" class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 transition-all hidden mt-2" placeholder="Enter custom thickness" />
              </div>
              <div>
                <label for="tile-finish" class="block text-sm font-semibold text-charcoal-900 mb-2">Finish</label>
                <select id="tile-finish" onchange="toggleOther(this)" name="finish" class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 appearance-none cursor-pointer transition-all">
                  <option value="" disabled selected>Select finish</option>
                  <option value="Matt">Matt</option>
                  <option value="Glossy">Glossy</option>
                  <option value="Carving">Carving</option>
                  <option value="other">Other...</option>
                </select>
                <input type="text" id="tile-finish-other" class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 transition-all hidden mt-2" placeholder="Enter custom finish" />
              </div>
              <div>
                <label for="tile-surface" class="block text-sm font-semibold text-charcoal-900 mb-2">Surface</label>
                <input type="text" id="tile-surface" name="surface" placeholder="e.g., Rustic Metal" class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 transition-all" />
              </div>
            </div>

            <!-- Fix starts here: The grid div for Color, Texture -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label for="tile-color" class="block text-sm font-semibold text-charcoal-900 mb-2">Color</label>
                <select id="tile-color" onchange="toggleOther(this)" name="color" class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 appearance-none cursor-pointer transition-all">
                  <option value="" disabled selected>Select color</option>
                  <option value="Ivory/White">Ivory/White</option>
                  <option value="Beige/Crema">Beige/Crema</option>
                  <option value="Grey">Grey</option>
                  <option value="Charcoal/Black">Charcoal/Black</option>
                  <option value="Natural Brown">Natural Brown</option>
                  <option value="Aqua/Blue">Aqua/Blue</option>
                  <option value="other">Other...</option>
                </select>
                <input type="text" id="tile-color-other" class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 transition-all hidden mt-2" placeholder="Enter custom color" />
              </div>
              <div>
                <label for="tile-texture" class="block text-sm font-semibold text-charcoal-900 mb-2">Surface Texture</label>
                <select id="tile-texture" onchange="toggleOther(this)" name="surface_texture" class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 appearance-none cursor-pointer transition-all">
                  <option value="" disabled selected>Select texture</option>
                  <option value="Terrazzo & Chips">Terrazzo & Chips</option>
                  <option value="Premium Marble">Premium Marble</option>
                  <option value="Rustic & Earth">Rustic & Earth</option>
                  <option value="Art & Decor">Art & Decor</option>
                  <option value="Wood Planks">Wood Planks</option>
                  <option value="Natural Stone">Natural Stone</option>
                  <option value="other">Other...</option>
                </select>
                <input type="text" id="tile-texture-other" class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 transition-all hidden mt-2" placeholder="Enter custom texture" />
              </div>
            </div>

            <div class="mb-4">
              <label for="tile-description" class="block text-sm font-semibold text-charcoal-900 mb-2">Description</label>
              <textarea id="tile-description" name="description" rows="3" placeholder="Enter a brief description..." class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 transition-all"></textarea>
            </div>

            <!-- Image Upload -->
            <div class="mb-4">
              <label class="block text-sm font-semibold text-charcoal-900 mb-2">Tile Image</label>
              <div id="drop-zone" class="drop-zone border-2 border-dashed border-sand-300 rounded-2xl p-8 text-center cursor-pointer hover:border-bronze-400 transition-all">
                <input type="file" id="file-input" name="thumbnail" accept="image/jpeg,image/png,image/webp" class="hidden" />
                <div class="flex flex-col items-center gap-3">
                  <div class="w-12 h-12 rounded-full bg-sand-100 flex items-center justify-center">
                    <svg class="w-6 h-6 text-bronze-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-charcoal-900">Click to upload or drag & drop</p>
                    <p class="text-xs text-stone-500 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                  </div>
                </div>
              </div>
              <div id="file-preview" class="mt-4"></div>
              <input type="url" id="thumbnail-url" name="image_url" placeholder="Or enter image URL..." class="admin-input w-full px-4 py-2 border border-sand-200 rounded-xl text-sm bg-cream-50/50 mt-2" />
            </div>

            <!-- Room Scene Upload -->
            <div class="mb-4">
              <label class="block text-sm font-semibold text-charcoal-900 mb-2">Room Scene Image (Optional)</label>
              <div id="room-drop-zone" class="drop-zone border-2 border-dashed border-sand-300 rounded-2xl p-8 text-center cursor-pointer hover:border-bronze-400 transition-all">
                <input type="file" id="room_scene_file" name="room_scene_url" accept="image/jpeg,image/png,image/webp" class="hidden" />
                <div class="flex flex-col items-center gap-3">
                  <div class="w-12 h-12 rounded-full bg-sand-100 flex items-center justify-center">
                    <svg class="w-6 h-6 text-bronze-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-charcoal-900">Upload Room Scene</p>
                    <p class="text-xs text-stone-500 mt-1">PNG, JPG (max. 5MB)</p>
                  </div>
                </div>
              </div>
              <div id="room-file-preview" class="mt-4"></div>
              <input type="url" id="room-scene-url-text" name="room_scene_url_text" placeholder="Or enter room scene URL..." class="admin-input w-full px-4 py-2 border border-sand-200 rounded-xl text-sm bg-cream-50/50 mt-2" />
            </div>

            <!-- Multiple Gallery Images -->
            <div class="mb-4">
              <label class="block text-sm font-semibold text-charcoal-900 mb-2">Multiple Gallery Images (Optional)</label>
              <div id="gallery-drop-zone" class="drop-zone border-2 border-dashed border-sand-300 rounded-2xl p-8 text-center cursor-pointer hover:border-bronze-400 transition-all">
                <input type="file" id="gallery-file-input" name="gallery_images" multiple accept="image/jpeg,image/png,image/webp" class="hidden" />
                <div class="flex flex-col items-center gap-3">
                  <div class="w-12 h-12 rounded-full bg-sand-100 flex items-center justify-center">
                    <svg class="w-6 h-6 text-bronze-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-charcoal-900">Upload Gallery Images</p>
                    <p class="text-xs text-stone-500 mt-1">Select multiple PNG/JPG files</p>
                  </div>
                </div>
              </div>
              <div id="gallery-file-preview" class="mt-4 flex flex-wrap gap-2"></div>
            </div>

            <!-- Video URL -->
            <div class="mb-4">
              <label for="tile-video-url" class="block text-sm font-semibold text-charcoal-900 mb-1">Google Drive Video URL</label>
              <input type="url" id="tile-video-url" name="video_url" placeholder="e.g. https://drive.google.com/file/d/..." class="admin-input w-full px-4 py-2.5 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 transition-all" />
            </div>
            
          </div>

          `;

html = html.substring(0, startIndex) + newBody + html.substring(endIndex);
fs.writeFileSync('public/management-portal-v9-x72.html', html, 'utf8');
console.log('Replaced form body!');
