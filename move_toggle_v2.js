const fs = require('fs');

const adminHtml = 'public/admin.html';
const content = fs.readFileSync(adminHtml, 'utf-8');

const lines = content.split('\n');
let toggleLines = [];
let startIdx = -1;
let endIdx = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('Mark as Featured') && lines[i].includes('text-charcoal-900')) {
    // Found the core. The div starts 3 lines above
    startIdx = i - 3;
    // The div ends around i + 6
    for (let j = i; j < i + 10; j++) {
      if (lines[j] && lines[j].includes('</div>') && lines[j-1] && lines[j-1].includes('</div>')) {
        endIdx = j;
        break;
      }
    }
    break;
  }
}

if (startIdx !== -1 && endIdx !== -1) {
  // Extract lines
  for (let i = startIdx; i <= endIdx; i++) {
    toggleLines.push(lines[i]);
  }
  
  // Remove lines
  lines.splice(startIdx, endIdx - startIdx + 1);
  
  // Find where to insert it: After Tile Name + Series
  // Look for <!-- ── Category + Size + Price + Offer Price ── -->
  let insertIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('<!-- ── Category + Size + Price')) {
      insertIdx = i;
      break;
    }
  }
  
  if (insertIdx !== -1) {
    // Wrap it in a nice container if needed, but it already has its own structure.
    // Actually let's put it in a card right before the Category.
    const wrapper = [
      '        <div class="bg-sand-100/50 rounded-2xl border border-sand-200 p-4 mb-4">',
      ...toggleLines,
      '        </div>'
    ];
    lines.splice(insertIdx, 0, ...wrapper);
    fs.writeFileSync(adminHtml, lines.join('\n'), 'utf-8');
    console.log('Successfully moved the toggle!');
  } else {
    console.log('Insert location not found.');
  }
} else {
  console.log('Toggle not found.');
}
