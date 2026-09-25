const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

const standardFooter = `  <!-- ================= FOOTER ================= -->
  <footer class="bg-charcoal-900 text-cream-50 pt-16 pb-8 border-t border-stone-600/30 mt-auto">
    <div class="max-w-[1440px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
      <div>
        <h3 class="font-serif text-2xl font-bold mb-4 tracking-wide text-bronze-400">CERARIA</h3>
        <p class="text-stone-400 text-sm leading-relaxed mb-6">The art of ceramic luxury. Curating world-class ceramic surfaces for architects, builders, and homeowners across India.</p>
      </div>
      <div>
        <h4 class="font-serif text-lg font-bold mb-4">Collections</h4>
        <ul class="space-y-2 text-sm text-stone-400">
          <li><a href="/products.html" class="hover:text-bronze-400 transition-colors">Infinia+</a></li>
          <li><a href="/products.html" class="hover:text-bronze-400 transition-colors">Solido</a></li>
          <li><a href="/products.html" class="hover:text-bronze-400 transition-colors">Evoq</a></li>
          <li><a href="/products.html" class="hover:text-bronze-400 transition-colors">Panache</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-serif text-lg font-bold mb-4">Company</h4>
        <ul class="space-y-2 text-sm text-stone-400">
          <li><a href="/about.html" class="hover:text-bronze-400 transition-colors">About Us</a></li>
          <li><a href="/gallery.html" class="hover:text-bronze-400 transition-colors">Gallery</a></li>
          <li><a href="/catalogue.html" class="hover:text-bronze-400 transition-colors">Catalogue</a></li>
          <li><a href="/contact.html" class="hover:text-bronze-400 transition-colors">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-serif text-lg font-bold mb-4">Reach Us</h4>
        <ul class="space-y-3 text-sm text-stone-400">
          <li><a href="tel:+919995311459" class="hover:text-bronze-400 transition-colors">+91 9995311459</a></li>
          <li><a href="tel:+919847311459" class="hover:text-bronze-400 transition-colors">+91 9847311459</a></li>
          <li><a href="mailto:cerariatile@gmail.com" class="hover:text-bronze-400 transition-colors">cerariatile@gmail.com</a></li>
          <li class="text-stone-500 leading-relaxed">Gottigere, Bengaluru,<br/>Karnataka 560083</li>
        </ul>
      </div>
    </div>
    <div class="max-w-[1440px] mx-auto px-6 mt-12 pt-8 border-t border-stone-600/30 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500">
      <p>&copy; 2026 CERARIA PRIVATE LIMITED. All rights reserved.</p>
      <div class="flex gap-4 mt-4 md:mt-0">
        <a href="/privacy-policy.html" class="hover:text-bronze-400 transition-colors">Privacy Policy</a>
        <a href="/terms-of-service.html" class="hover:text-bronze-400 transition-colors">Terms of Service</a>
        <a href="/disclaimer.html" class="hover:text-bronze-400 transition-colors">Disclaimer</a>
      </div>
    </div>
  </footer>`;

const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html') && f !== 'admin.html' && f !== 'admin-login.html');

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Match any <footer>...</footer> tag
  const anyFooterRegex = /<footer[\s\S]*?<\/footer>/i;

  if (anyFooterRegex.test(content)) {
    // Check if it's already the standardized footer to avoid redundant work
    if (!content.includes('Curating world-class ceramic surfaces for architects')) {
      content = content.replace(anyFooterRegex, standardFooter);
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`PATCHED any footer: ${file}`);
    } else {
      console.log(`SKIP (Already standardized): ${file}`);
    }
  } else {
    console.log(`SKIP (No footer tag at all): ${file}`);
  }
});

console.log('\nDone!');
