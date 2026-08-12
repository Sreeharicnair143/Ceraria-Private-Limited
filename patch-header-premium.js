const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html') && f !== 'admin.html' && f !== 'admin-login.html');

const headerHTML = `<!-- ================================================================
       SECTION: NAVIGATION BAR
       ================================================================ -->
  <nav id="navbar" class="navbar-glass fixed top-0 left-0 right-0 z-50 border-b border-sand-200/60 shadow-sm transition-all duration-300 bg-cream-50/90 backdrop-blur-md">
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-24 py-4">

        <!-- Logo -->
        <a href="/" class="flex items-center gap-3 group" id="nav-logo">
          <img src="/assets/images/logo-icon.png"
               alt="CERARIA logo"
               class="w-12 h-12 group-hover:scale-105 transition-transform duration-500 rounded-md" />
          <span class="text-2xl md:text-3xl font-serif font-bold tracking-[0.15em] text-charcoal-900 group-hover:text-bronze-500 transition-colors duration-500">
            CERARIA
          </span>
          <span class="hidden sm:inline-block text-[10px] font-sans font-medium tracking-[0.25em] uppercase text-stone-400 border-l border-stone-300 pl-3 leading-relaxed">
            THE ART OF<br/>CERAMIC LUXURY
          </span>
        </a>

        <!-- Desktop Nav Links -->
        <div class="hidden xl:flex items-center gap-8" id="nav-links-desktop">
          <a href="/" class="relative group text-[11px] uppercase tracking-[0.2em] font-bold text-stone-500 hover:text-charcoal-900 transition-colors py-1">
            Home
            <span class="absolute bottom-0 left-0 w-0 h-[1.5px] bg-bronze-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/gallery.html" class="relative group text-[11px] uppercase tracking-[0.2em] font-bold text-stone-500 hover:text-charcoal-900 transition-colors py-1">
            Gallery
            <span class="absolute bottom-0 left-0 w-0 h-[1.5px] bg-bronze-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/products.html" class="relative group text-[11px] uppercase tracking-[0.2em] font-bold text-stone-500 hover:text-charcoal-900 transition-colors py-1">
            Products
            <span class="absolute bottom-0 left-0 w-0 h-[1.5px] bg-bronze-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/catalogue.html" class="relative group text-[11px] uppercase tracking-[0.2em] font-bold text-stone-500 hover:text-charcoal-900 transition-colors py-1">
            Catalogue
            <span class="absolute bottom-0 left-0 w-0 h-[1.5px] bg-bronze-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/about.html" class="relative group text-[11px] uppercase tracking-[0.2em] font-bold text-stone-500 hover:text-charcoal-900 transition-colors py-1">
            About
            <span class="absolute bottom-0 left-0 w-0 h-[1.5px] bg-bronze-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/contact.html" class="relative group text-[11px] uppercase tracking-[0.2em] font-bold text-stone-500 hover:text-charcoal-900 transition-colors py-1">
            Contact Us
            <span class="absolute bottom-0 left-0 w-0 h-[1.5px] bg-bronze-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
          
          <a href="/visualizer.html" class="ml-4 px-7 py-3.5 bg-gradient-to-r from-bronze-600 to-bronze-500 text-cream-50 text-[11px] uppercase tracking-[0.2em] font-bold rounded-sm hover:from-charcoal-900 hover:to-charcoal-800 hover:-translate-y-0.5 transition-all duration-300 shadow-[0_4px_14px_0_rgba(180,119,73,0.39)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            Visualizer
          </a>
        </div>

        <!-- Mobile Hamburger -->
        <button id="mobile-menu-btn"
                class="xl:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-sand-100 transition-colors"
                aria-label="Toggle mobile menu">
          <span class="block w-7 h-0.5 bg-charcoal-800 rounded transition-all duration-300" id="burger-line-1"></span>
          <span class="block w-7 h-0.5 bg-charcoal-800 rounded transition-all duration-300" id="burger-line-2"></span>
          <span class="block w-5 h-0.5 bg-charcoal-800 rounded transition-all duration-300" id="burger-line-3"></span>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div id="mobile-menu" class="mobile-menu xl:hidden max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
        <div class="pb-6 pt-2 space-y-2 border-t border-sand-200">
          <a href="/" class="block px-4 py-3 text-[11px] uppercase tracking-[0.2em] font-bold text-stone-600 hover:bg-sand-100 hover:text-bronze-600 rounded-lg transition-colors">Home</a>
          <a href="/gallery.html" class="block px-4 py-3 text-[11px] uppercase tracking-[0.2em] font-bold text-stone-600 hover:bg-sand-100 hover:text-bronze-600 rounded-lg transition-colors">Gallery</a>
          <a href="/products.html" class="block px-4 py-3 text-[11px] uppercase tracking-[0.2em] font-bold text-stone-600 hover:bg-sand-100 hover:text-bronze-600 rounded-lg transition-colors">Products</a>
          <a href="/catalogue.html" class="block px-4 py-3 text-[11px] uppercase tracking-[0.2em] font-bold text-stone-600 hover:bg-sand-100 hover:text-bronze-600 rounded-lg transition-colors">Catalogue</a>
          <a href="/about.html" class="block px-4 py-3 text-[11px] uppercase tracking-[0.2em] font-bold text-stone-600 hover:bg-sand-100 hover:text-bronze-600 rounded-lg transition-colors">About</a>
          <a href="/contact.html" class="block px-4 py-3 text-[11px] uppercase tracking-[0.2em] font-bold text-stone-600 hover:bg-sand-100 hover:text-bronze-600 rounded-lg transition-colors">Contact Us</a>
          <a href="/visualizer.html" class="block px-4 py-3 text-[11px] uppercase tracking-[0.2em] font-bold text-stone-600 hover:bg-sand-100 hover:text-bronze-600 rounded-lg transition-colors flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            Virtual Visualizer
          </a>
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
            mobileMenu.style.maxHeight = '500px';
          } else {
            mobileMenu.style.maxHeight = '0';
          }
          burgerLines[0].style.transform = menuOpen ? 'rotate(45deg) translate(5px, 6px)' : '';
          burgerLines[1].style.opacity   = menuOpen ? '0' : '1';
          burgerLines[2].style.transform = menuOpen ? 'rotate(-45deg) translate(4px, -5px)' : '';
          burgerLines[2].style.width     = menuOpen ? '1.75rem' : '1.25rem';
        });
      }
    });
  </script>`;

// Iterate over each file, find <nav> or <header> block and replace it.
for (const file of files) {
  let content = fs.readFileSync(path.join(publicDir, file), 'utf8');
  
  const headerRegex = /(?:<!--.*?HEADER.*?-->\s*)?(?:<header\b[^>]*>[\s\S]*?<\/header>|<nav\b[^>]*>[\s\S]*?<\/nav>)/i;
  
  if (headerRegex.test(content)) {
    content = content.replace(headerRegex, headerHTML);
    // Remove old inline scripts if they exist outside the replacement area to prevent duplicates.
    // The previous patches might have left some <script> tags for mobile menu at the bottom, but they are generally harmless or easily overridden.
    fs.writeFileSync(path.join(publicDir, file), content);
    console.log('Patched header in', file);
  } else {
    console.log('No header found in', file);
  }
}
