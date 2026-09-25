const fs = require('fs');

function updateFile(file) {
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/logo_icon_transparent_v2\.png/g, 'logo_icon_transparent_v3.png');
  html = html.replace(/logo_full_transparent_v2\.png/g, 'logo_full_transparent_v3.png');
  fs.writeFileSync(file, html, 'utf8');
  console.log('Fixed', file);
}

updateFile('public/index.html');
updateFile('public/management-portal-v9-x72.html');
try { updateFile('public/sys-auth-99.html'); } catch(e){}
