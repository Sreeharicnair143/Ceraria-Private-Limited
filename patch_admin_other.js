const fs = require('fs');

const adminHtml = 'public/admin.html';
let content = fs.readFileSync(adminHtml, 'utf-8');

// 1. Add "Other" to category
content = content.replace(
  /<option value="Ceramic Tiles">Ceramic Tiles<\/option>\s*<\/select>/,
  `<option value="Ceramic Tiles">Ceramic Tiles</option>
              <option value="other">Other...</option>
            </select>
            <input type="text" id="tile-category-other" class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 transition-all hidden mt-2" placeholder="Enter custom category" />`
);
content = content.replace(/id="tile-category"/, 'id="tile-category" onchange="toggleOther(this)"');

// 2. Add "Other" to size
content = content.replace(
  /<option value="1200x1800">1200 × 1800 mm<\/option>\s*<\/select>/,
  `<option value="1200x1800">1200 × 1800 mm</option>
              <option value="other">Other...</option>
            </select>
            <input type="text" id="tile-size-other" class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 transition-all hidden mt-2" placeholder="Enter custom size" />`
);
content = content.replace(/id="tile-size"/, 'id="tile-size" onchange="toggleOther(this)"');

// 3. Add "Other" to thickness
content = content.replace(
  /<option value="15 mm">15 mm<\/option>\s*<\/select>/,
  `<option value="15 mm">15 mm</option>
              <option value="other">Other...</option>
            </select>
            <input type="text" id="tile-thickness-other" class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 transition-all hidden mt-2" placeholder="Enter custom thickness" />`
);
content = content.replace(/id="tile-thickness"/, 'id="tile-thickness" onchange="toggleOther(this)"');

// 4. Add "Other" to finish
content = content.replace(
  /<option value="Carving">Carving<\/option>\s*<\/select>/,
  `<option value="Carving">Carving</option>
              <option value="other">Other...</option>
            </select>
            <input type="text" id="tile-finish-other" class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 transition-all hidden mt-2" placeholder="Enter custom finish" />`
);
content = content.replace(/id="tile-finish"/, 'id="tile-finish" onchange="toggleOther(this)"');

// 5. Add "Other" to color
content = content.replace(
  /<option value="Aqua\/Blue">Aqua\/Blue<\/option>\s*<\/select>/,
  `<option value="Aqua/Blue">Aqua/Blue</option>
              <option value="other">Other...</option>
            </select>
            <input type="text" id="tile-color-other" class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 transition-all hidden mt-2" placeholder="Enter custom color" />`
);
content = content.replace(/id="tile-color"/, 'id="tile-color" onchange="toggleOther(this)"');

// 6. Add "Other" to texture
content = content.replace(
  /<option value="Natural Stone">Natural Stone<\/option>\s*<\/select>/,
  `<option value="Natural Stone">Natural Stone</option>
              <option value="other">Other...</option>
            </select>
            <input type="text" id="tile-texture-other" class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 transition-all hidden mt-2" placeholder="Enter custom texture" />`
);
content = content.replace(/id="tile-texture"/, 'id="tile-texture" onchange="toggleOther(this)"');

// 7. Add toggleOther function to <script> at the bottom of admin.html or somewhere
const scriptTag = `
<script>
function toggleOther(selectElem) {
  const otherInput = document.getElementById(selectElem.id + '-other');
  if (otherInput) {
    if (selectElem.value === 'other') {
      otherInput.classList.remove('hidden');
      otherInput.required = true;
    } else {
      otherInput.classList.add('hidden');
      otherInput.required = false;
      otherInput.value = '';
    }
  }
}
</script>
</body>`;
content = content.replace('</body>', scriptTag);

fs.writeFileSync(adminHtml, content, 'utf-8');
console.log('Patched admin.html dropdowns');
