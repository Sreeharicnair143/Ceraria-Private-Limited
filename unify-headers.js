const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html') && f !== 'admin.html' && f !== 'admin-login.html');

const headerHTML = `<!-- ================================================================
       SECTION: NAVIGATION BAR
       ================================================================ -->
  <nav id="navbar" class="navbar-glass fixed top-0 left-0 right-0 z-50 border-b border-sand-200/60 shadow-sm transition-all duration-300 bg-cream-50/90 backdrop-blur-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20 py-4">

        <!-- Logo -->
        <a href="/" class="flex items-center gap-3 group" id="nav-logo">
          <img src="/assets/images/logo-icon.png"
               alt="CERARIA logo"
               class="w-10 h-10 group-hover:scale-110 transition-transform duration-300 rounded-md" />
          <span class="text-2xl md:text-3xl font-serif font-bold tracking-[0.15em] text-charcoal-900 group-hover:text-bronze-500 transition-colors duration-400">
            CERARIA
          </span>
          <span class="hidden sm:inline-block text-[10px] font-sans font-medium tracking-[0.25em] uppercase text-stone-400 border-l border-stone-300 pl-3">
            THE ART OF<br/>CERAMIC LUXURY
          </span>
        </a>

        <!-- Desktop Nav Links -->
        <div class="hidden lg:flex items-center gap-8" id="nav-links-desktop">
          <a href="/gallery.html" class="text-sm font-medium tracking-wide text-stone-500 hover:text-bronze-600 transition-colors">Gallery</a>
          <a href="/catalogue.html" class="text-sm font-medium tracking-wide text-stone-500 hover:text-bronze-600 transition-colors">Catalogue</a>
          <a href="/contact.html" class="text-sm font-medium tracking-wide text-stone-500 hover:text-bronze-600 transition-colors">Contact Us</a>
          <a href="/about.html" class="text-sm font-medium tracking-wide text-stone-500 hover:text-bronze-600 transition-colors">About</a>
          <a href="/visualizer.html" class="text-sm font-medium tracking-wide text-stone-500 hover:text-bronze-600 transition-colors">Virtual Visualizer</a>
          <a href="/products.html" class="text-sm font-medium tracking-wide text-stone-500 hover:text-bronze-600 transition-colors">Products</a>
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
          <a href="/gallery.html" class="block px-4 py-3 text-sm font-medium text-stone-600 hover:bg-sand-100 rounded-lg transition-colors">Gallery</a>
          <a href="/catalogue.html" class="block px-4 py-3 text-sm font-medium text-stone-600 hover:bg-sand-100 rounded-lg transition-colors">Catalogue</a>
          <a href="/contact.html" class="block px-4 py-3 text-sm font-medium text-stone-600 hover:bg-sand-100 rounded-lg transition-colors">Contact Us</a>
          <a href="/about.html" class="block px-4 py-3 text-sm font-medium text-stone-600 hover:bg-sand-100 rounded-lg transition-colors">About</a>
          <a href="/visualizer.html" class="block px-4 py-3 text-sm font-medium text-stone-600 hover:bg-sand-100 rounded-lg transition-colors">Virtual Visualizer</a>
          <a href="/products.html" class="block px-4 py-3 text-sm font-medium text-stone-600 hover:bg-sand-100 rounded-lg transition-colors">Products</a>
        </div>
      </div>
    </div>
  </nav>
  
  <script>
    // Inline script for mobile menu in case it's missing in some files
    document.addEventListener('DOMContentLoaded', () => {
      const menuBtn = document.getElementById('mobile-menu-btn');
      const mobileMenu = document.getElementById('mobile-menu');
      const burgerLines = [
        document.getElementById('burger-line-1'),
        document.getElementById('burger-line-2'),
        document.getElementById('burger-line-3'),
      ];
      let menuOpen = false;

      if(menuBtn) {
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

// Iterate over each file, find <nav> or <header> block and replace it.
for (const file of files) {
  let content = fs.readFileSync(path.join(publicDir, file), 'utf8');
  
  // Find <nav> or <header> block (assuming it doesn't contain another nested nav/header)
  // We'll use a regex that matches from <nav or <header up to </nav> or </header>
  const headerRegex = /(?:<!--.*?HEADER.*?-->\s*)?(?:<header\b[^>]*>[\s\S]*?<\/header>|<nav\b[^>]*>[\s\S]*?<\/nav>)/i;
  
  if (headerRegex.test(content)) {
    content = content.replace(headerRegex, headerHTML);
    fs.writeFileSync(path.join(publicDir, file), content);
    console.log('Patched header in', file);
  } else {
    console.log('No header found in', file);
  }
}
