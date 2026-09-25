const fs = require('fs');
const path = require('path');

const contactPath = path.join(__dirname, 'public', 'contact.html');
let content = fs.readFileSync(contactPath, 'utf-8');

// 1. Remove Pinterest button
const pinterestRegex = /\s*<a href="#" class="w-9 h-9 rounded-lg bg-sand-100 flex items-center justify-center hover:bg-bronze-500\/20 transition-colors" aria-label="Pinterest">[\s\S]*?<\/a>/;
content = content.replace(pinterestRegex, '');

// 2. Remove LinkedIn button  
const linkedinRegex = /\s*<a href="#" class="w-9 h-9 rounded-lg bg-sand-100 flex items-center justify-center hover:bg-bronze-500\/20 transition-colors" aria-label="LinkedIn">[\s\S]*?<\/a>/;
content = content.replace(linkedinRegex, '');

// 3. Add real Instagram URL
content = content.replace(
  /href="#"([^>]*aria-label="Instagram")/,
  'href="https://www.instagram.com/ceraria_pvt_ltd/?hl=en" target="_blank"$1'
);

// 4. Add real Facebook URL
content = content.replace(
  /href="#"([^>]*aria-label="Facebook")/,
  'href="https://www.facebook.com/share/18vfi1gjFN/" target="_blank"$1'
);

// 5. Change timing
content = content.replace(
  'Mon – Sat, 10:00 AM – 7:00 PM IST',
  'Mon – Sat, 9:30 AM – 6:00 PM IST'
);

// 6. Remove Regional Office
const regionalRegex = /\s*<!-- Regional Office -->\s*<div class="flex items-start gap-4 group" id="detail-regional">[\s\S]*?Kerala 673019\s*<\/p>\s*<\/div>\s*<\/div>/;
content = content.replace(regionalRegex, '');

// 7. Remove sajithmkumar@gmail.com
content = content.replace(
  /\s*<a href="mailto:sajithmkumar@gmail\.com"[^>]*>sajithmkumar@gmail\.com<\/a>/,
  ''
);

// 8. Fix phone order (9847 first, 9995 second)
const phoneBlockRegex = /(<a href="tel:\+919995311459"[^>]*>\+91 9995311459<\/a>)\s*\n\s*(<a href="tel:\+919847311459"[^>]*>\+91 9847311459<\/a>)/;
const match = content.match(phoneBlockRegex);
if (match) {
  content = content.replace(phoneBlockRegex, match[2] + '\n ' + match[1]);
}

fs.writeFileSync(contactPath, content, 'utf-8');
console.log('✅ contact.html patched successfully');
