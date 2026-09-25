const fs = require('fs');
const path = require('path');

// The file might be gallery.html, let's patch it there.
const galleryPath = path.join(__dirname, 'public', 'gallery.html');
let content = fs.readFileSync(galleryPath, 'utf8');

// We use regex to find the entire "Why Choose Ceraria Section"
const regex = /<!-- Why Choose Ceraria Section -->[\s\S]*?<\/section>/;

const newSection = `<!-- Architectural Workflow Section -->
  <section class="w-full bg-[#121212] py-20 lg:py-32 border-y border-[#222] font-sans">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Header -->
      <div class="mb-16 md:mb-24" data-aos="fade-up">
        <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-cream-50 tracking-tight">The Ceraria Experience</h2>
        <p class="text-stone-400 text-lg md:text-xl font-light max-w-2xl">Uncompromising quality from curation to delivery.</p>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" data-aos="fade-up" data-aos-delay="100">
        
        <!-- Card 01 -->
        <div class="group flex flex-col p-8 md:p-10 min-h-[320px] rounded-2xl bg-[#1A1A1A] hover:bg-[#222222] transition-colors duration-500 border border-[#2A2A2A] hover:border-[#444] cursor-pointer">
          <div class="mb-auto">
            <span class="text-5xl lg:text-6xl font-serif text-stone-700 group-hover:text-bronze-400 transition-colors duration-500">01</span>
          </div>
          <div class="mt-8">
            <h3 class="text-2xl font-serif text-white group-hover:-translate-y-2 transition-transform duration-500">Global Aesthetics</h3>
            <div class="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
              <div class="overflow-hidden">
                <p class="text-stone-400 text-sm md:text-base leading-relaxed pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                  We curate the most exquisite designs from around the world, ensuring our collections reflect the pinnacle of contemporary and classic luxury.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 02 -->
        <div class="group flex flex-col p-8 md:p-10 min-h-[320px] rounded-2xl bg-[#1A1A1A] hover:bg-[#222222] transition-colors duration-500 border border-[#2A2A2A] hover:border-[#444] cursor-pointer">
          <div class="mb-auto">
            <span class="text-5xl lg:text-6xl font-serif text-stone-700 group-hover:text-bronze-400 transition-colors duration-500">02</span>
          </div>
          <div class="mt-8">
            <h3 class="text-2xl font-serif text-white group-hover:-translate-y-2 transition-transform duration-500">Precision Craftsmanship</h3>
            <div class="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
              <div class="overflow-hidden">
                <p class="text-stone-400 text-sm md:text-base leading-relaxed pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                  Manufactured with cutting-edge technology to achieve flawless finishes, unmatched durability, and perfect dimensional accuracy.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 03 -->
        <div class="group flex flex-col p-8 md:p-10 min-h-[320px] rounded-2xl bg-[#1A1A1A] hover:bg-[#222222] transition-colors duration-500 border border-[#2A2A2A] hover:border-[#444] cursor-pointer">
          <div class="mb-auto">
            <span class="text-5xl lg:text-6xl font-serif text-stone-700 group-hover:text-bronze-400 transition-colors duration-500">03</span>
          </div>
          <div class="mt-8">
            <h3 class="text-2xl font-serif text-white group-hover:-translate-y-2 transition-transform duration-500">Bespoke Sampling</h3>
            <div class="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
              <div class="overflow-hidden">
                <p class="text-stone-400 text-sm md:text-base leading-relaxed pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                  Experience our premium materials in your own space before committing, ensuring perfect harmony with your architectural vision.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 04 -->
        <div class="group flex flex-col p-8 md:p-10 min-h-[320px] rounded-2xl bg-[#1A1A1A] hover:bg-[#222222] transition-colors duration-500 border border-[#2A2A2A] hover:border-[#444] cursor-pointer">
          <div class="mb-auto">
            <span class="text-5xl lg:text-6xl font-serif text-stone-700 group-hover:text-bronze-400 transition-colors duration-500">04</span>
          </div>
          <div class="mt-8">
            <h3 class="text-2xl font-serif text-white group-hover:-translate-y-2 transition-transform duration-500">Reliable Supply</h3>
            <div class="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
              <div class="overflow-hidden">
                <p class="text-stone-400 text-sm md:text-base leading-relaxed pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                  A meticulously managed supply chain guarantees that your premium selections arrive safely and exactly when your project demands them.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>`;

if (regex.test(content)) {
  content = content.replace(regex, newSection);
  fs.writeFileSync(galleryPath, content, 'utf8');
  console.log('✅ Replaced "Why Choose Us" accordion with new "Architectural Workflow" in gallery.html');
} else {
  console.log('⚠️ Could not find "Why Choose Ceraria Section" in gallery.html');
}

// Just in case it's in index.html too
const indexPath = path.join(__dirname, 'public', 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');
if (regex.test(indexContent)) {
  indexContent = indexContent.replace(regex, newSection);
  fs.writeFileSync(indexPath, indexContent, 'utf8');
  console.log('✅ Replaced in index.html as well');
}
