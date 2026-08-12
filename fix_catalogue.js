const fs = require('fs');

let html = fs.readFileSync('public/catalogue.html', 'utf8');

const newCard = `          <div class="group relative bg-transparent overflow-hidden flex flex-col items-center">
            <div class="relative w-full aspect-[2/3] bg-sand-100 overflow-hidden mb-5 shadow-sm group-hover:shadow-lg transition-shadow duration-300">
              <img src="\\\${c.cover_image_url || '/assets/images/logo-icon.png'}" alt="\\\${c.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <!-- Hover Overlay with Icons -->
              <div class="absolute inset-0 bg-charcoal-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                <a href="\\\${c.pdf_url}" target="_blank" class="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-bronze-500 hover:text-white text-charcoal-900 transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75" title="View PDF">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </a>
                <a href="\\\${c.pdf_url}" download target="_blank" class="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-bronze-500 hover:text-white text-charcoal-900 transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300 delay-150" title="Download PDF">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                </a>
              </div>
            </div>
            <div class="w-full px-2 text-left">
              <h3 class="font-serif text-lg font-bold text-charcoal-900 mb-2 uppercase tracking-wide">\\\${c.title}</h3>
              \\\${c.size_details ? \`<div class="flex items-center gap-2"><p class="text-[11px] font-bold tracking-widest uppercase text-bronze-600">Size</p><p class="text-[13px] text-stone-600 font-medium">\\\${c.size_details}</p></div>\` : ''}
            </div>
          </div>`;

html = html.replace(/<div class="group bg-white rounded-2xl overflow-hidden border border-sand-200[\s\S]*?<\/div>\n          <\/div>/g, newCard);

fs.writeFileSync('public/catalogue.html', html);
console.log('Fixed catalogue.html');
