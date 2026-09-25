const fs = require('fs');
const path = require('path');

const galleryPath = path.join(__dirname, 'public', 'gallery.html');
let content = fs.readFileSync(galleryPath, 'utf8');

content = content.replace('https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop', '/assets/images/generated/ghr_decor_tile.jpg');

fs.writeFileSync(galleryPath, content, 'utf8');
console.log('gallery.html updated successfully with new GHR decor image.');
