const fs = require('fs');

let html = fs.readFileSync('public/management-portal-v9-x72.html', 'utf8');

const startTag = '<!-- ── Category + Size + Price + Offer Price ── -->';
const endTag = '<!-- ── Description ── -->';

const startIdx = html.indexOf(startTag);
const endIdx = html.indexOf(endTag);

if (startIdx !== -1 && endIdx !== -1) {
  const newContent = `<!-- ── Category + Size + Price + Offer Price ── -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

        <!-- ── Thickness + Finish + Surface ── -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div>
            <label for="tile-thickness" class="block text-sm font-semibold text-charcoal-900 mb-2">Thickness</label>
            <select id="tile-thickness" onchange="toggleOther(this)" name="thickness" class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 appearance-none cursor-pointer transition-all">
              <option value="" disabled selected>Select</option>
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

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label for="tile-color" class="block text-sm font-semibold text-charcoal-900 mb-2">Color</label>
            <select id="tile-color" onchange="toggleOther(this)" name="color" class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 appearance-none cursor-pointer transition-all">
              <option value="" disabled selected>Select Color</option>
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
              <option value="" disabled selected>Select Texture</option>
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

        `;

  html = html.substring(0, startIdx) + newContent + html.substring(endIdx);
  fs.writeFileSync('public/management-portal-v9-x72.html', html, 'utf8');
  console.log('Fixed HTML successfully.');
} else {
  console.log('Could not find start or end tags.');
}
