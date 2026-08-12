const fs = require('fs');
const path = require('path');

const pages = [
  { file: 'gallery.html', title: 'Gallery' },
  { file: 'global-export.html', title: 'Global Export' },
  { file: 'catalogue.html', title: 'Catalogue' },
  { file: 'where-to-buy.html', title: 'Where To Buy' },
  { file: 'about.html', title: 'About' },
  { file: 'visualizer.html', title: 'Virtual Visualizer' }
];

const template = (title) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — CERARIA</title>

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            cream:    { 50: '#FFFDF8', 100: '#FFF9ED' },
            sand:     { 100: '#F5F0E8', 200: '#EDE5D8', 400: '#C4B8A3' },
            bronze:   { 400: '#C49A6C', 500: '#B07D4F', 600: '#9A673B' },
            charcoal: { 800: '#2C2824', 900: '#1A1714' },
          },
          fontFamily: {
            serif: ['"Playfair Display"', 'serif'],
            sans:  ['"Inter"', 'sans-serif'],
          }
        }
      }
    };
  </script>
  <style>
    body { font-family: 'Inter', sans-serif; background: #FFFDF8; }
    h1, h2, h3, h4, .font-serif { font-family: 'Playfair Display', serif; }
    #main-header { background: rgba(255,253,248,0.95); backdrop-filter: blur(10px); border-bottom: 1px solid #EDE5D8; }
    #main-header .nav-link { color: #2C2824; }
    #main-header .nav-link:hover { color: #B07D4F; }
    #main-header .nav-logo { color: #1A1714; border-color: #B07D4F; }
  </style>
</head>
<body class="bg-cream-50 text-charcoal-900 antialiased pt-20 flex flex-col min-h-screen">

  <header id="main-header" class="fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300">
    <div class="max-w-[1440px] mx-auto px-6 flex items-center justify-between">
      <a href="/" class="flex items-center gap-3">
        <div class="nav-logo w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors text-charcoal-900 border-bronze-500">
          <span class="font-serif font-bold text-lg">C</span>
        </div>
        <span class="nav-logo font-serif text-2xl font-bold tracking-wide transition-colors">CERARIA</span>
      </a>
      <nav class="hidden lg:flex items-center gap-8">
        <a href="/gallery.html" class="nav-link text-sm font-medium tracking-wide uppercase transition-colors">Gallery</a>
        <a href="/global-export.html" class="nav-link text-sm font-medium tracking-wide uppercase transition-colors">Global Export</a>
        <a href="/catalogue.html" class="nav-link text-sm font-medium tracking-wide uppercase transition-colors">Catalogue</a>
        <a href="/where-to-buy.html" class="nav-link text-sm font-medium tracking-wide uppercase transition-colors">Where To Buy</a>
        <a href="/about.html" class="nav-link text-sm font-medium tracking-wide uppercase transition-colors">About</a>
        <a href="/visualizer.html" class="nav-link text-sm font-medium tracking-wide uppercase transition-colors">Virtual Visualizer</a>
        <a href="/products.html" class="nav-link text-sm font-medium tracking-wide uppercase transition-colors">Products</a>
      </nav>
      <div class="flex items-center gap-4">
        <a href="/contact.html" class="hidden sm:inline-block nav-link border border-current px-5 py-2 rounded text-sm uppercase tracking-wide hover:bg-bronze-500 hover:text-white hover:border-bronze-500 transition-colors">Get Started</a>
      </div>
    </div>
  </header>

  <main class="flex-grow flex items-center justify-center py-20 px-4">
    <div class="text-center max-w-lg mx-auto">
      <div class="w-20 h-20 bg-sand-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      </div>
      <h1 class="font-serif text-4xl md:text-5xl font-bold text-charcoal-900 mb-4">${title}</h1>
      <p class="text-stone-500 text-lg">This page is currently under construction. Check back soon for updates!</p>
      <a href="/" class="inline-block mt-8 px-6 py-3 border border-bronze-500 text-bronze-600 rounded-full text-sm font-medium hover:bg-bronze-500 hover:text-white transition-colors">Back to Home</a>
    </div>
  </main>

  <footer class="bg-charcoal-900 text-cream-50 pt-16 pb-8 border-t border-stone-600/30">
    <div class="max-w-[1440px] mx-auto px-6 text-center text-xs text-stone-500">
      <p>&copy; 2026 CERARIA PRIVATE LIMITED. All rights reserved.</p>
    </div>
  </footer>

</body>
</html>`;

pages.forEach(page => {
  fs.writeFileSync(path.join(__dirname, 'public', page.file), template(page.title));
  console.log('Created ' + page.file);
});
