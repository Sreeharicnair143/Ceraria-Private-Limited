const fs = require('fs');

function updateFile(file) {
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/\/assets\/images\/new_logos\/logo_icon\.jpg/g, '/assets/images/new_logos/logo_icon_transparent_v2.png');
  fs.writeFileSync(file, html, 'utf8');
  console.log('Fixed', file);
}

updateFile('public/management-portal-v9-x72.html');
try { updateFile('public/sys-auth-99.html'); } catch(e){}
