const fs = require('fs');

const file = 'public/index.html';
let html = fs.readFileSync(file, 'utf8');

// Update Tailwind config
html = html.replace(
  /fontFamily: \{/,
  `fontFamily: {\n   logo: ['"Cinzel Decorative"', 'serif'],`
);

// Update Logo URLs and sizes, remove the text span
html = html.replace(
  /<img src="\/assets\/images\/new_logos\/logo_icon_transparent\.png"[\s\S]*?CERAMIC LUXURY\s*<\/span>/,
  `<img src="/assets/images/new_logos/logo_icon_transparent_v2.png"
   alt="CERARIA logo"
   class="h-10 sm:h-12 md:h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-500" />
   <img src="/assets/images/new_logos/logo_full_transparent_v2.png" alt="CERARIA" class="h-10 sm:h-12 md:h-16 w-auto object-contain group-hover:opacity-80 transition-opacity duration-500 " />`
);

// Update Footer text
html = html.replace(
  /<h3 class="font-serif text-2xl font-bold mb-4 tracking-wide text-bronze-400">CERARIA<\/h3>/,
  `<h3 class="font-logo text-3xl mb-4 tracking-[0.15em] text-bronze-400">CERARIA</h3>`
);

fs.writeFileSync(file, html, 'utf8');
console.log('Fixed index.html logos and footer');
