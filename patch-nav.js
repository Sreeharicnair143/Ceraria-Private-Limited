const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const removeGlobalExportRegex = /<a href="[^"]*global-export\.html"[^>]*>Global Export<\/a>\s*/g;
const removeGlobalExportListRegex = /<li>\s*<a href="[^"]*global-export\.html"[^>]*>Global Export<\/a>\s*<\/li>\s*/g;
const removeGlobalExportHashRegex = /<li><a href="#"[^>]*>Global Export<\/a><\/li>/g;
const renameWhereToBuyRegex = /<a href="[^"]*where-to-buy\.html"([^>]*)>Where To Buy<\/a>/g;
const renameWhereToBuyHashRegex = /<a href="#"([^>]*)>Where To Buy<\/a>/g;
const renameWhereToBuyListRegex = /<li><a href="#"([^>]*)>Where To Buy<\/a><\/li>/g;

// Logo replacement regexes
const logoDesktopRegex = /<div class="hidden lg:flex items-center gap-3">\s*<div class="w-10 h-10 bg-bronze-500 rounded-xl flex items-center justify-center">\s*<span class="font-serif text-xl font-bold text-cream-50">C<\/span>\s*<\/div>\s*<span class="font-serif text-2xl font-bold text-charcoal-900 tracking-wide">CERARIA<\/span>\s*<\/div>/g;

const logoMobileRegex = /<div class="lg:hidden flex items-center gap-2">\s*<div class="w-8 h-8 bg-bronze-500 rounded-lg flex items-center justify-center">\s*<span class="font-serif text-lg font-bold text-cream-50">C<\/span>\s*<\/div>\s*<span class="font-serif text-xl font-bold text-charcoal-900">CERARIA<\/span>\s*<\/div>/g;

const logoDesktopReplacement = `<div class="hidden lg:flex items-center">
          <img src="/assets/images/logo-full.jpg" alt="CERARIA" class="h-10 w-auto" />
        </div>`;

const logoMobileReplacement = `<div class="lg:hidden flex items-center">
          <img src="/assets/images/logo-icon.png" alt="CERARIA" class="h-8 w-auto rounded-lg" />
        </div>`;

for (const file of files) {
  let content = fs.readFileSync(path.join(publicDir, file), 'utf8');
  
  // Remove Global export
  content = content.replace(removeGlobalExportRegex, '');
  content = content.replace(removeGlobalExportListRegex, '');
  content = content.replace(removeGlobalExportHashRegex, '');
  // Specifically for index.html where it has href="#"
  content = content.replace(/<a href="#"[^>]*>Global Export<\/a>\s*/g, '');
  
  // Rename Where To buy
  content = content.replace(renameWhereToBuyRegex, '<a href="/contact.html"$1>Contact Us</a>');
  content = content.replace(renameWhereToBuyHashRegex, '<a href="/contact.html"$1>Contact Us</a>');
  content = content.replace(renameWhereToBuyListRegex, '<li><a href="/contact.html"$1>Contact Us</a></li>');
  
  // Replace logos
  content = content.replace(logoDesktopRegex, logoDesktopReplacement);
  content = content.replace(logoMobileRegex, logoMobileReplacement);
  
  fs.writeFileSync(path.join(publicDir, file), content);
}

// Check admin.html for its specific sidebar and header logos
let adminContent = fs.readFileSync(path.join(publicDir, 'admin.html'), 'utf8');

const adminSidebarLogoRegex = /<div class="w-10 h-10 bg-bronze-500 rounded-xl flex items-center justify-center">\s*<span class="font-serif text-xl font-bold text-cream-50">C<\/span>\s*<\/div>\s*<div>\s*<p class="font-serif text-lg font-bold">CERARIA<\/p>\s*<p class="text-\[10px\] tracking-widest uppercase text-sand-400">Admin Panel<\/p>\s*<\/div>/g;

const adminSidebarLogoReplacement = `<div class="w-10 h-10 flex items-center justify-center bg-white rounded-xl overflow-hidden p-1">
          <img src="/assets/images/logo-icon.png" alt="C" class="w-full h-full object-contain" />
        </div>
        <div>
          <p class="font-serif text-lg font-bold">CERARIA</p>
          <p class="text-[10px] tracking-widest uppercase text-sand-400">Admin Panel</p>
        </div>`;
        
const adminHeaderLogoRegex = /<div class="w-9 h-9 bg-bronze-500 rounded-lg flex items-center justify-center">\s*<span class="font-serif text-lg font-bold text-cream-50">C<\/span>\s*<\/div>\s*<span class="font-serif text-lg font-bold text-charcoal-900">CERARIA<\/span>/g;
const adminHeaderLogoReplacement = `<img src="/assets/images/logo-icon.png" alt="CERARIA" class="h-9 w-auto rounded-lg" />`;

adminContent = adminContent.replace(adminSidebarLogoRegex, adminSidebarLogoReplacement);
adminContent = adminContent.replace(adminHeaderLogoRegex, adminHeaderLogoReplacement);

fs.writeFileSync(path.join(publicDir, 'admin.html'), adminContent);

console.log("Navigation and logos patched!");
