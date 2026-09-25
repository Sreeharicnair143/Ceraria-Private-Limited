const fs = require('fs');

const adminHtml = 'public/admin.html';
let content = fs.readFileSync(adminHtml, 'utf-8');

const toggleHTML = `
          <!-- Toggle -->
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
`;

// Remove it from its current place
if (content.includes(toggleHTML)) {
  content = content.replace(toggleHTML, '');
  
  // Find where to insert it: maybe after the Category+Size+Price section
  // Look for: <!-- ── Thickness + Finish + Surface ── -->
  const insertTarget = '<!-- ── Thickness + Finish + Surface ── -->';
  if (content.includes(insertTarget)) {
    content = content.replace(insertTarget, toggleHTML + '\n\n        ' + insertTarget);
    fs.writeFileSync(adminHtml, content, 'utf-8');
    console.log('Moved Mark as Featured toggle');
  } else {
    console.log('Insert target not found');
  }
} else {
  console.log('Toggle HTML not found exactly. It might be formatted differently.');
}
