const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html') && f !== 'admin.html' && f !== 'admin-login.html');

const exactHeader = `<!-- ================================================================
       SECTION: NAVIGATION BAR
       ================================================================ -->
  <nav id="navbar" class="fixed top-0 left-0 right-0 z-50 border-b border-sand-200/60 shadow-sm" style="background-color: #FFFDF8;">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20 py-4">

        <!-- Logo -->
        <a href="/" class="flex items-center gap-4 group" id="nav-logo">
          <img src="/assets/images/logo-icon.png" alt="CERARIA icon" class="h-10 w-10 object-contain rounded-md" />
          <span class="text-[28px] text-charcoal-900 tracking-wide" style="font-family: 'Playfair Display', serif;">CERARIA</span>
          <div class="hidden sm:flex flex-col justify-center border-l border-stone-300 pl-4 h-8 mt-1">
            <span class="text-[9px] font-sans font-bold tracking-[0.2em] text-stone-400 leading-tight uppercase">THE ART OF</span>
            <span class="text-[9px] font-sans font-bold tracking-[0.2em] text-stone-400 leading-tight uppercase">CERAMIC LUXURY</span>
          </div>
        </a>

        <!-- Desktop Nav Links -->
        <div class="hidden lg:flex items-center gap-8" id="nav-links-desktop">
          <a href="/index.html" class="text-[14px] font-medium text-stone-500 hover:text-bronze-600 transition-colors">Home</a>
          <a href="/gallery.html" class="text-[14px] font-medium text-stone-500 hover:text-bronze-600 transition-colors">Gallery</a>
          <a href="/catalogue.html" class="text-[14px] font-medium text-stone-500 hover:text-bronze-600 transition-colors">Catalogue</a>
          <a href="/contact.html" class="text-[14px] font-medium text-stone-500 hover:text-bronze-600 transition-colors">Contact Us</a>
          <a href="/about.html" class="text-[14px] font-medium text-stone-500 hover:text-bronze-600 transition-colors">About</a>
          <a href="/visualizer.html" class="text-[14px] font-medium text-stone-500 hover:text-bronze-600 transition-colors">Virtual Visualizer</a>
          <a href="/products.html" class="text-[14px] font-medium text-stone-500 hover:text-bronze-600 transition-colors">Products</a>
        </div>

        <!-- Mobile Hamburger -->
        <button id="mobile-menu-btn"
                class="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-sand-100 transition-colors"
                aria-label="Toggle mobile menu">
          <span class="block w-6 h-0.5 bg-charcoal-800 rounded transition-all duration-300" id="burger-line-1"></span>
          <span class="block w-6 h-0.5 bg-charcoal-800 rounded transition-all duration-300" id="burger-line-2"></span>
          <span class="block w-4 h-0.5 bg-charcoal-800 rounded transition-all duration-300" id="burger-line-3"></span>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div id="mobile-menu" class="mobile-menu lg:hidden max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
        <div class="pb-4 pt-2 space-y-1 border-t border-sand-200">
          <a href="/index.html" class="block px-4 py-3 text-[14px] font-medium text-stone-600 hover:bg-sand-100 rounded-lg transition-colors">Home</a>
          <a href="/gallery.html" class="block px-4 py-3 text-[14px] font-medium text-stone-600 hover:bg-sand-100 rounded-lg transition-colors">Gallery</a>
          <a href="/catalogue.html" class="block px-4 py-3 text-[14px] font-medium text-stone-600 hover:bg-sand-100 rounded-lg transition-colors">Catalogue</a>
          <a href="/contact.html" class="block px-4 py-3 text-[14px] font-medium text-stone-600 hover:bg-sand-100 rounded-lg transition-colors">Contact Us</a>
          <a href="/about.html" class="block px-4 py-3 text-[14px] font-medium text-stone-600 hover:bg-sand-100 rounded-lg transition-colors">About</a>
          <a href="/visualizer.html" class="block px-4 py-3 text-[14px] font-medium text-stone-600 hover:bg-sand-100 rounded-lg transition-colors">Virtual Visualizer</a>
          <a href="/products.html" class="block px-4 py-3 text-[14px] font-medium text-stone-600 hover:bg-sand-100 rounded-lg transition-colors">Products</a>
        </div>
      </div>
    </div>
  </nav>
  
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const menuBtn = document.getElementById('mobile-menu-btn');
      const mobileMenu = document.getElementById('mobile-menu');
      const burgerLines = [
        document.getElementById('burger-line-1'),
        document.getElementById('burger-line-2'),
        document.getElementById('burger-line-3'),
      ];
      let menuOpen = false;

      if(menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
          menuOpen = !menuOpen;
          if (menuOpen) {
            mobileMenu.style.maxHeight = '400px';
          } else {
            mobileMenu.style.maxHeight = '0';
          }
          burgerLines[0].style.transform = menuOpen ? 'rotate(45deg) translate(4px, 4px)' : '';
          burgerLines[1].style.opacity   = menuOpen ? '0' : '1';
          burgerLines[2].style.transform = menuOpen ? 'rotate(-45deg) translate(3px, -3px)' : '';
          burgerLines[2].style.width     = menuOpen ? '1.5rem' : '1rem';
        });
      }
    });
  </script>`;

for (const file of files) {
  let content = fs.readFileSync(path.join(publicDir, file), 'utf8');
  
  // The header is currently <nav id="navbar" ...> down to </script>
  const headerRegex = /<!-- ================================================================\s*SECTION: NAVIGATION BAR\s*================================================================ -->[\s\S]*?<\/script>/;
  
  if (headerRegex.test(content)) {
    content = content.replace(headerRegex, exactHeader);
    fs.writeFileSync(path.join(publicDir, file), content);
    console.log('Successfully patched header in', file);
  } else {
    console.log('Regex did not match in', file);
  }
}
