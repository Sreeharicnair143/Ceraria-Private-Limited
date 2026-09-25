const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html') && f !== 'admin.html' && f !== 'admin-login.html');

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Regex to match the floating buttons block
  const floatingBtnRegex = /<!-- ═══ FLOATING CONTACT BUTTONS ═══ -->[\s\S]*?<div id="floating-contact"[\s\S]*?<\/div>\s*/g;

  if (floatingBtnRegex.test(content)) {
    content = content.replace(floatingBtnRegex, '');
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`REMOVED buttons from: ${file}`);
  } else {
    console.log(`SKIP (No buttons found): ${file}`);
  }
});

console.log('\nDone!');
