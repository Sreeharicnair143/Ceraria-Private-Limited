import re

with open('public/gallery.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Add ID to discoverSwiper wrapper
content = content.replace(
    '<div class="swiper discoverSwiper">\n        <div class="swiper-wrapper">',
    '<div class="swiper discoverSwiper">\n        <div class="swiper-wrapper" id="discover-wrapper">'
)

# Append JS logic
js_logic = """
    // Discover Gallery Fetch Logic
    async function buildDiscoverGallery() {
      try {
        const res = await fetch('/api/gallery');
        const json = await res.json();
        
        // Minimum requirement is 6 photos
        if (json.success && json.data.length >= 6) {
          const wrapper = document.getElementById('discover-wrapper');
          wrapper.innerHTML = ''; // Clear demo images
          
          json.data.forEach((img, index) => {
            const delay = (index % 4) * 100; // Stagger AOS delay
            wrapper.innerHTML += `
              <div class="swiper-slide">
                <div class="discover-box" data-aos="zoom-in" data-aos-delay="${delay}">
                  <img src="${img.image_url}" alt="${img.title || 'Collection'}">
                  <div class="discover-overlay">
                    <h3 class="text-cream-50 font-serif text-2xl uppercase tracking-widest">${img.title || ''}</h3>
                  </div>
                </div>
              </div>
            `;
          });
          
          // Re-initialize AOS for the new elements
          setTimeout(() => {
            AOS.refresh();
          }, 100);
        }
      } catch (err) {
        console.error('Failed to fetch discover gallery:', err);
      }
    }
    
    // Call on load along with buildGallery
    document.addEventListener('DOMContentLoaded', () => {
      buildDiscoverGallery();
    });
"""

content = content.replace('buildGallery();\n    });\n\n    // Global click handler', 'buildGallery();\n    });\n' + js_logic + '\n    // Global click handler')

with open('public/gallery.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("gallery.html updated")
