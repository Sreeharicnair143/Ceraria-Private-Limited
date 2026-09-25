const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

let replaceCount = 0;

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  let changed = false;

  // Replace logo icon
  if (content.includes('/assets/images/logo-icon.jpg')) {
    content = content.replace(/\/assets\/images\/logo-icon\.jpg/g, '/assets/images/new_logos/logo_icon.jpg');
    changed = true;
  }
  
  // Replace logo text
  if (content.includes('/assets/images/ceraria-text.png')) {
    content = content.replace(/\/assets\/images\/ceraria-text\.png/g, '/assets/images/new_logos/logo_full.jpg');
    changed = true;
  }

  // Also catch in case it is somehow referenced without the leading slash
  if (content.includes('assets/images/logo-icon.jpg')) {
    content = content.replace(/assets\/images\/logo-icon\.jpg/g, 'assets/images/new_logos/logo_icon.jpg');
    changed = true;
  }
  if (content.includes('assets/images/ceraria-text.png')) {
    content = content.replace(/assets\/images\/ceraria-text\.png/g, 'assets/images/new_logos/logo_full.jpg');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`PATCHED logo in: ${file}`);
    replaceCount++;
  }
});

console.log(`\nDone! Patched ${replaceCount} files.`);
