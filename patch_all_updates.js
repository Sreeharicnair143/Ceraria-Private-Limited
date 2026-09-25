const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

// List of all HTML files to patch footers
const htmlFiles = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

let changeLog = [];

for (const file of htmlFiles) {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;

  // ═══════════════════════════════════════
  // FOOTER: Replace collection names across ALL pages
  // Old: Infinia+, Solido, Evoq, Panache  →  New: Unistone, Lusido, Iris, Evardo, Metic, Poster, Diana
  // ═══════════════════════════════════════
  const oldFooterCollections = `<li><a href="/products.html" class="hover:text-bronze-400 transition-colors">Infinia+</a></li>
 <li><a href="/products.html" class="hover:text-bronze-400 transition-colors">Solido</a></li>
 <li><a href="/products.html" class="hover:text-bronze-400 transition-colors">Evoq</a></li>
 <li><a href="/products.html" class="hover:text-bronze-400 transition-colors">Panache</a></li>`;

  const newFooterCollections = `<li><a href="/products.html" class="hover:text-bronze-400 transition-colors">Unistone</a></li>
 <li><a href="/products.html" class="hover:text-bronze-400 transition-colors">Lusido</a></li>
 <li><a href="/products.html" class="hover:text-bronze-400 transition-colors">Iris</a></li>
 <li><a href="/products.html" class="hover:text-bronze-400 transition-colors">Evardo</a></li>
 <li><a href="/products.html" class="hover:text-bronze-400 transition-colors">Metic</a></li>
 <li><a href="/products.html" class="hover:text-bronze-400 transition-colors">Poster</a></li>
 <li><a href="/products.html" class="hover:text-bronze-400 transition-colors">Diana</a></li>`;

  if (content.includes('Infinia+</a></li>') && content.includes('Solido</a></li>') && content.includes('Evoq</a></li>') && content.includes('Panache</a></li>')) {
    content = content.replace(oldFooterCollections, newFooterCollections);
    // If that didn't work (whitespace differences), try line-by-line
    if (content.includes('Infinia+</a></li>')) {
      // Fallback: replace individually
      content = content.replace(/>Infinia\+<\/a><\/li>/g, '>Unistone</a></li>');
      content = content.replace(/>Solido<\/a><\/li>/g, '>Lusido</a></li>');
      content = content.replace(/>Evoq<\/a><\/li>/g, '>Iris</a></li>');
      content = content.replace(/>Panache<\/a><\/li>/g, '>Evardo</a></li>');
    }
  }

  // ═══════════════════════════════════════
  // FOOTER: Fix phone number order across ALL pages
  // Old order: 9995311459 first, 9847311459 second
  // New order: 9847311459 first, 9995311459 second
  // ═══════════════════════════════════════
  // Only swap if 9995 appears before 9847
  const phone9995Idx = content.indexOf('9995311459');
  const phone9847Idx = content.indexOf('9847311459');
  if (phone9995Idx !== -1 && phone9847Idx !== -1 && phone9995Idx < phone9847Idx) {
    // In footer "Reach Us" section
    content = content.replace(
      /<li><a href="tel:\+919995311459"([^>]*)>\+91 9995311459<\/a><\/li>\s*\n\s*<li><a href="tel:\+919847311459"([^>]*)>\+91 9847311459<\/a><\/li>/,
      `<li><a href="tel:+919847311459"$2>+91 9847311459</a></li>\n <li><a href="tel:+919995311459"$1>+91 9995311459</a></li>`
    );
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    changeLog.push(`✅ ${file}: footer updated`);
  }
}

// ═══════════════════════════════════════
// INDEX.HTML: Series names + Collection cards
// ═══════════════════════════════════════
const indexPath = path.join(publicDir, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

// 1. Moroccan → Matt Series
indexContent = indexContent.replace(
  /href="\/products\.html\?series=Moroccan"/g,
  'href="/products.html?series=Matt"'
);
indexContent = indexContent.replace('The Moroccan Series', 'Matt Series');

// 2. Metallic → Carving Series
indexContent = indexContent.replace(
  /href="\/products\.html\?series=Metallic"/g,
  'href="/products.html?series=Carving"'
);
indexContent = indexContent.replace('Metallic Finishes', 'Carving Series');

// 3. DG Matt → Punch Series
indexContent = indexContent.replace(
  /href="\/products\.html\?series=DG\+Matt"/g,
  'href="/products.html?series=Punch"'
);
indexContent = indexContent.replace('DG Matt Collection', 'Punch Series');

// 4. Replace collection cards (INFINIA+ → UNISTONE, SOLIDO → LUSIDO, PANACHE → IRIS, EVOQ → EVARDO)
// plus add METIC, POSTER, DIANA slides
indexContent = indexContent.replace(/alt="Infinia\+"/g, 'alt="Unistone"');
indexContent = indexContent.replace('>INFINIA+<', '>UNISTONE<');
indexContent = indexContent.replace(/Exquisite large-format tiles combining grandeur with unmatched precision\. Perfect for expansive spaces\./, 
  'Premium full-body vitrified tiles with unmatched durability and timeless elegance.');

indexContent = indexContent.replace(/alt="Solido"/g, 'alt="Lusido"');
indexContent = indexContent.replace('>SOLIDO<', '>LUSIDO<');
indexContent = indexContent.replace(/Premium matt granulla structured surface that mimics the feel of real stone\./,
  'High-gloss polished vitrified tiles with a mirror-like finish for luxurious interiors.');

indexContent = indexContent.replace(/alt="Panache"/g, 'alt="Iris"');
indexContent = indexContent.replace('>PANACHE<', '>IRIS<');
indexContent = indexContent.replace(/A minimal anti-reflective surface with a natural feel and flat surface\./,
  'Delicately crafted tiles featuring intricate patterns and rich, vibrant color palettes.');

indexContent = indexContent.replace(/alt="Evoq"/g, 'alt="Evardo"');
indexContent = indexContent.replace('>EVOQ<', '>EVARDO<');
indexContent = indexContent.replace(/Consistent color and pattern throughout the thickness\. Ensures uniform appearance even on exposed edges\./,
  'Bold geometric designs with contemporary aesthetics for modern architectural spaces.');

// Add 3 more slides: METIC, POSTER, DIANA after the EVARDO slide
const evardoSlideEnd = `</div>
 </div>
 </div>
 <div class="swiper-pagination"></div>`;

const newSlides = `</div>
 </div>
 <div class="swiper-slide">
 <div class="stack-box gsap-reveal">
 <img src="/assets/images/generated/commercial_space_tile.jpg" alt="Metic" />
 <h4 class="stack-hdn">METIC</h4>
 <p class="stack-para">Precision-engineered tiles with metallic undertones and a sophisticated matte finish.</p>
 <a href="/products.html" class="btn-outline">View Collection</a>
 </div>
 </div>
 <div class="swiper-slide">
 <div class="stack-box gsap-reveal">
 <img src="/assets/images/generated/outdoor_terrazzo_tile.jpg" alt="Poster" />
 <h4 class="stack-hdn">POSTER</h4>
 <p class="stack-para">Large-format statement tiles with artistic textures that transform walls into canvases.</p>
 <a href="/products.html" class="btn-outline">View Collection</a>
 </div>
 </div>
 <div class="swiper-slide">
 <div class="stack-box gsap-reveal">
 <img src="/assets/images/generated/commercial_space_tile.jpg" alt="Diana" />
 <h4 class="stack-hdn">DIANA</h4>
 <p class="stack-para">Classic marble-inspired tiles with refined veining and a premium glossy surface.</p>
 <a href="/products.html" class="btn-outline">View Collection</a>
 </div>
 </div>
 </div>
 <div class="swiper-pagination"></div>`;

// Find the closing of the 4th slide (EVARDO) and replace
// The pattern: after EVARDO's </div></div> comes </div> (swiper-wrapper close) then pagination
indexContent = indexContent.replace(
  /(<h4 class="stack-hdn">EVARDO<\/h4>[\s\S]*?<a href="\/products\.html" class="btn-outline">View Collection<\/a>\s*<\/div>\s*<\/div>\s*)<\/div>\s*<div class="swiper-pagination"><\/div>/,
  '$1' + newSlides.trim()
);

fs.writeFileSync(indexPath, indexContent, 'utf-8');
changeLog.push('✅ index.html: series names + collection cards updated');

// ═══════════════════════════════════════
// CONTACT.HTML: Multiple changes
// ═══════════════════════════════════════
const contactPath = path.join(publicDir, 'contact.html');
let contactContent = fs.readFileSync(contactPath, 'utf-8');

// 1. Change timing
contactContent = contactContent.replace(
  'Mon – Sat, 10:00 AM – 7:00 PM IST',
  'Mon – Sat, 9:30 AM – 6:00 PM IST'
);

// 2. Remove Regional Office section (lines 453-468)
contactContent = contactContent.replace(
  /\s*<!-- Regional Office -->\s*<div class="flex items-start gap-4 group" id="detail-regional">[\s\S]*?Kerala 673019\s*<\/p>\s*<\/div>\s*<\/div>/,
  ''
);

// 3. Remove sajithmkumar@gmail.com email
contactContent = contactContent.replace(
  /\s*<a href="mailto:sajithmkumar@gmail\.com"[^>]*>sajithmkumar@gmail\.com<\/a>/,
  ''
);

// 4. Fix phone number order (9847 first, then 9995)
contactContent = contactContent.replace(
  /<a href="tel:\+919995311459"([^>]*)>\+91 9995311459<\/a>\s*\n\s*<a href="tel:\+919847311459"([^>]*)>\+91 9847311459<\/a>/,
  `<a href="tel:+919847311459"$2>+91 9847311459</a>\n <a href="tel:+919995311459"$1>+91 9995311459</a>`
);

// 5. Update social links: Add real Instagram and Facebook URLs, remove LinkedIn
contactContent = contactContent.replace(
  /<a href="#" class="w-9 h-9 rounded-lg bg-sand-100 flex items-center justify-center hover:bg-bronze-500\/20 transition-colors" aria-label="Instagram">/,
  '<a href="https://www.instagram.com/ceraria_pvt_ltd/?hl=en" target="_blank" class="w-9 h-9 rounded-lg bg-sand-100 flex items-center justify-center hover:bg-bronze-500/20 transition-colors" aria-label="Instagram">'
);

contactContent = contactContent.replace(
  /<a href="#" class="w-9 h-9 rounded-lg bg-sand-100 flex items-center justify-center hover:bg-bronze-500\/20 transition-colors" aria-label="Facebook">/,
  '<a href="https://www.facebook.com/share/18vfi1gjFN/" target="_blank" class="w-9 h-9 rounded-lg bg-sand-100 flex items-center justify-center hover:bg-bronze-500/20 transition-colors" aria-label="Facebook">'
);

// Remove LinkedIn button
contactContent = contactContent.replace(
  /\s*<a href="#" class="w-9 h-9 rounded-lg bg-sand-100 flex items-center justify-center hover:bg-bronze-500\/20 transition-colors" aria-label="LinkedIn">[\s\S]*?<\/a>/,
  ''
);

fs.writeFileSync(contactPath, contactContent, 'utf-8');
changeLog.push('✅ contact.html: timing, regional office, emails, phones, social links updated');

console.log('\n=== PATCH COMPLETE ===');
changeLog.forEach(c => console.log(c));
console.log(`\nTotal files processed: ${htmlFiles.length}`);
