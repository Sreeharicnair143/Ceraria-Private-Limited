const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html') && f !== 'admin.html' && f !== 'admin-login.html');

let replaceCount = 0;

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  let changed = false;

  // Replace logo_icon.jpg with logo_icon_transparent.png
  if (content.includes('logo_icon.jpg')) {
    content = content.replace(/logo_icon\.jpg/g, 'logo_icon_transparent.png');
    changed = true;
  }
  
  // Replace logo_full.jpg with logo_full_transparent.png
  if (content.includes('logo_full.jpg')) {
    content = content.replace(/logo_full\.jpg/g, 'logo_full_transparent.png');
    changed = true;
  }

  // Remove mix-blend-multiply
  if (content.includes('mix-blend-multiply')) {
    content = content.replace(/mix-blend-multiply/g, '');
    changed = true;
  }
  
  // Make sure to clean up any double spaces created by removing the class
  content = content.replace(/  +/g, ' ');

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`PATCHED logo transparent in: ${file}`);
    replaceCount++;
  }
});

console.log(`\nDone! Patched ${replaceCount} files.`);
