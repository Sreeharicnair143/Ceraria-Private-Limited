const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

// Floating contact buttons HTML (goes before </body>)
const floatingButtons = `
  <!-- ═══ FLOATING CONTACT BUTTONS ═══ -->
  <div id="floating-contact" style="position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:12px;">
    <a href="tel:+919995311459" aria-label="Call us" style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#B07D4F,#9A673B);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 15px rgba(176,125,79,0.4);transition:transform 0.3s,box-shadow 0.3s;text-decoration:none;" onmouseover="this.style.transform='scale(1.1)';this.style.boxShadow='0 6px 20px rgba(176,125,79,0.5)';" onmouseout="this.style.transform='scale(1)';this.style.boxShadow='0 4px 15px rgba(176,125,79,0.4)';">
      <svg width="22" height="22" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
    </a>
    <a href="mailto:cerariatile@gmail.com" aria-label="Email us" style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#2C2824,#1A1714);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 15px rgba(0,0,0,0.3);transition:transform 0.3s,box-shadow 0.3s;text-decoration:none;" onmouseover="this.style.transform='scale(1.1)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.4)';" onmouseout="this.style.transform='scale(1)';this.style.boxShadow='0 4px 15px rgba(0,0,0,0.3)';">
      <svg width="22" height="22" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
    </a>
  </div>
`;

const footerSocialHtml = `      <div>
        <h4 class="font-serif text-lg font-bold mb-4">Connect</h4>
        <div class="flex gap-4 mb-6">
          <a href="#" class="w-10 h-10 rounded-full border border-stone-600 flex items-center justify-center text-stone-400 hover:text-bronze-400 hover:border-bronze-400 transition-colors"><i class="fab fa-instagram"></i></a>
          <a href="#" class="w-10 h-10 rounded-full border border-stone-600 flex items-center justify-center text-stone-400 hover:text-bronze-400 hover:border-bronze-400 transition-colors"><i class="fab fa-linkedin-in"></i></a>
          <a href="#" class="w-10 h-10 rounded-full border border-stone-600 flex items-center justify-center text-stone-400 hover:text-bronze-400 hover:border-bronze-400 transition-colors"><i class="fab fa-pinterest-p"></i></a>
        </div>
      </div>`;

const newFooterReachUsHtml = `      <div>
        <h4 class="font-serif text-lg font-bold mb-4">Reach Us</h4>
        <ul class="space-y-3 text-sm text-stone-400">
          <li><a href="tel:+919995311459" class="hover:text-bronze-400 transition-colors">+91 9995311459</a></li>
          <li><a href="tel:+919847311459" class="hover:text-bronze-400 transition-colors">+91 9847311459</a></li>
          <li><a href="mailto:cerariatile@gmail.com" class="hover:text-bronze-400 transition-colors">cerariatile@gmail.com</a></li>
          <li class="text-stone-500 leading-relaxed">Gottigere, Bengaluru,<br/>Karnataka 560083</li>
        </ul>
      </div>`;

const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html') && f !== 'admin.html' && f !== 'admin-login.html');

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  // Insert floating buttons before </body>
  if (!content.includes('floating-contact')) {
    const bodyCloseIdx = content.lastIndexOf('</body>');
    if (bodyCloseIdx !== -1) {
      content = content.substring(0, bodyCloseIdx) + floatingButtons + '\n' + content.substring(bodyCloseIdx);
      changed = true;
      console.log(`PATCHED floating buttons: ${file}`);
    }
  }

  // Replace old social footer with new reach us
  if (content.includes('Connect</h4>') && content.includes('fa-instagram')) {
    // Basic string replacement works if formatting is mostly exact.
    // Use regex to be safe with minor whitespace differences.
    const regex = /<div>\s*<h4[^>]*>Connect<\/h4>\s*<div class="flex gap-4 mb-6">\s*<a[^>]*>.*?<\/a>\s*<a[^>]*>.*?<\/a>\s*<a[^>]*>.*?<\/a>\s*<\/div>\s*<\/div>/gims;
    if (regex.test(content)) {
      content = content.replace(regex, newFooterReachUsHtml);
      changed = true;
      console.log(`PATCHED footer reach us: ${file}`);
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
  }
});

console.log('\nDone!');
