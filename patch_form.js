const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'management-portal-v9-x72.html');
let content = fs.readFileSync(file, 'utf8');

// 1. Tile Image * -> Tile Image
content = content.replace(
  '<label class="block text-sm font-semibold text-charcoal-900 mb-2">Tile Image *</label>',
  '<label class="block text-sm font-semibold text-charcoal-900 mb-2">Tile Image</label>'
);

// 2. Series * -> Series
content = content.replace(
  '<label for="tile-series" class="block text-sm font-semibold text-charcoal-900 mb-2">Series *</label>',
  '<label for="tile-series" class="block text-sm font-semibold text-charcoal-900 mb-2">Series</label>'
);

// 3. Update Series select to remove required, add toggleOther, and add "other" option + hidden input
const oldSeriesSelect = `<select id="tile-series" name="series" required
                    class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 appearance-none cursor-pointer transition-all">
              <option value="" disabled selected>Select series</option>
              <option value="Metallic">Metallic</option>
              <option value="DG Matt">DG Matt</option>
              <option value="DG Matt Decor">DG Matt Decor</option>
              <option value="Ghr Decor">Ghr Decor</option>
              <option value="Ghr">Ghr</option>
              <option value="Ghr Max Surface">Ghr Max Surface</option>
              <option value="Ghr Max Decor">Ghr Max Decor</option>
              <option value="Lush">Lush</option>
              <option value="Matt Granula">Matt Granula</option>
              <option value="Glossy Granula">Glossy Granula</option>
              <option value="Chromica & Subway Decors">Chromica & Subway Decors</option>
              <option value="Moroccan">Moroccan</option>
              <option value="Strip Punch + Carving">Strip Punch + Carving</option>
            </select>`;

const newSeriesSelect = `<select id="tile-series" onchange="toggleOther(this)" name="series"
                    class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 appearance-none cursor-pointer transition-all">
              <option value="" disabled selected>Select series</option>
              <option value="Metallic">Metallic</option>
              <option value="DG Matt">DG Matt</option>
              <option value="DG Matt Decor">DG Matt Decor</option>
              <option value="Ghr Decor">Ghr Decor</option>
              <option value="Ghr">Ghr</option>
              <option value="Ghr Max Surface">Ghr Max Surface</option>
              <option value="Ghr Max Decor">Ghr Max Decor</option>
              <option value="Lush">Lush</option>
              <option value="Matt Granula">Matt Granula</option>
              <option value="Glossy Granula">Glossy Granula</option>
              <option value="Chromica & Subway Decors">Chromica & Subway Decors</option>
              <option value="Moroccan">Moroccan</option>
              <option value="Strip Punch + Carving">Strip Punch + Carving</option>
              <option value="other">Other...</option>
            </select>
            <input type="text" id="tile-series-other" class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 transition-all hidden mt-2" placeholder="Enter custom series" />`;

if (content.includes(oldSeriesSelect)) {
  content = content.replace(oldSeriesSelect, newSeriesSelect);
} else {
  content = content.replace(oldSeriesSelect.replace(/\n/g, '\r\n'), newSeriesSelect.replace(/\n/g, '\r\n'));
}

// 4. Category * -> Category
content = content.replace(
  '<label for="tile-category" class="block text-sm font-semibold text-charcoal-900 mb-2">Category *</label>',
  '<label for="tile-category" class="block text-sm font-semibold text-charcoal-900 mb-2">Category</label>'
);

// 5. Remove required from Category select
const oldCategorySelect = `<select id="tile-category" onchange="toggleOther(this)" name="category" required`;
const newCategorySelect = `<select id="tile-category" onchange="toggleOther(this)" name="category"`;
content = content.replace(oldCategorySelect, newCategorySelect);

// 6. Size * -> Size
content = content.replace(
  '<label for="tile-size" class="block text-sm font-semibold text-charcoal-900 mb-2">Size *</label>',
  '<label for="tile-size" class="block text-sm font-semibold text-charcoal-900 mb-2">Size</label>'
);

// 7. Remove required from Size select
const oldSizeSelect = `<select id="tile-size" onchange="toggleOther(this)" name="size" required`;
const newSizeSelect = `<select id="tile-size" onchange="toggleOther(this)" name="size"`;
content = content.replace(oldSizeSelect, newSizeSelect);

fs.writeFileSync(file, content, 'utf8');
console.log('✅ Form fields successfully updated.');
