const fs = require('fs');

// Patch products.html
let productsHtml = fs.readFileSync('public/products.html', 'utf8');
let productsRegex = /(<h3 class="font-serif text-lg font-bold text-charcoal-900 mb-2 group-hover:text-bronze-600 transition-colors leading-tight">\$\{p\.name\}<\/h3>)/;
let productsReplacement = `$1
              \${p.price ? \`<div class="text-sm font-semibold text-charcoal-800 mb-2">₹\${parseFloat(p.price).toFixed(2)}</div>\` : ''}`;
productsHtml = productsHtml.replace(productsRegex, productsReplacement);
fs.writeFileSync('public/products.html', productsHtml);
console.log('Patched products.html');

// Patch product.html
let productHtml = fs.readFileSync('public/product.html', 'utf8');

// For product.html, we need to add price right below the product title/series, or in the specs section.
// Let's add it near the title.
let titleRegex = /(<h1 id="product-title" class="font-serif text-4xl lg:text-5xl font-bold text-charcoal-900 leading-tight"><\/h1>)/;
let titleReplacement = `$1
              <div id="product-price" class="text-xl font-semibold text-charcoal-800 mt-2"></div>`;
productHtml = productHtml.replace(titleRegex, titleReplacement);

// Update loadProduct in product.html
let jsRegex = /(document\.getElementById\('product-title'\)\.textContent = p\.name;)/;
let jsReplacement = `$1
      
      const priceEl = document.getElementById('product-price');
      if (priceEl) {
        if (p.price) {
          priceEl.textContent = '₹' + parseFloat(p.price).toFixed(2);
          priceEl.style.display = 'block';
        } else {
          priceEl.style.display = 'none';
        }
      }`;
productHtml = productHtml.replace(jsRegex, jsReplacement);

// Update image handling to be graceful if no image
// find `const mainImg = p.main_image || p.thumb_images?.[0] || '...';`
let imgRegex = /(const mainImg = p\.main_image \|\| [^;]+;)\s+(const roomImg = p\.room_scene_url \|\| [^;]+;)/;
let imgReplacement = `const mainImg = p.main_image || p.thumb_images?.[0] || 'https://placehold.co/1200x800/e2e8f0/64748b?text=Image+Coming+Soon';
      const roomImg = p.room_scene_url || 'https://placehold.co/1200x800/e2e8f0/64748b?text=Room+Scene+Coming+Soon';`;
productHtml = productHtml.replace(imgRegex, imgReplacement);

fs.writeFileSync('public/product.html', productHtml);
console.log('Patched product.html');
