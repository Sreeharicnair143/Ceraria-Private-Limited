const fs = require('fs');
let html = fs.readFileSync('public/management-portal-v9-x72.html', 'utf8');

// Remove required from tile-name
html = html.replace('id="tile-name" name="name" required', 'id="tile-name" name="name"');

// Remove * from Tile Name
html = html.replace('>Tile Name *<', '>Tile Name<');

fs.writeFileSync('public/management-portal-v9-x72.html', html, 'utf8');
console.log('Removed required and * from Tile Name!');
