const fs = require('fs');
let html = fs.readFileSync('public/management-portal-v9-x72.html', 'utf8');

// 1. Gallery modal
html = html.replace('<label class="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Image Files (Up to 5) <span class="text-red-500">*</span></label>', '<label class="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Image Files (Up to 5)</label>');
html = html.replace('id="g-image" accept="image/*" multiple required', 'id="g-image" accept="image/*" multiple');

// 2. Catalog modal
html = html.replace('<label class="block text-sm font-semibold text-charcoal-900 mb-2">Catalog Title *</label>', '<label class="block text-sm font-semibold text-charcoal-900 mb-2">Catalog Title</label>');
html = html.replace('id="cat-title" required', 'id="cat-title"');

html = html.replace('<label class="block text-sm font-semibold text-charcoal-900 mb-2">Size Description *</label>', '<label class="block text-sm font-semibold text-charcoal-900 mb-2\">Size Description</label>');
html = html.replace('id="cat-size" required', 'id="cat-size"');

html = html.replace('<label class="block text-sm font-semibold text-charcoal-900 mb-2">Cover Image *</label>', '<label class="block text-sm font-semibold text-charcoal-900 mb-2">Cover Image</label>');
html = html.replace('id="cat-cover" accept="image/*" required', 'id="cat-cover" accept="image/*"');

html = html.replace('<label class="block text-sm font-semibold text-charcoal-900 mb-2">PDF File *</label>', '<label class="block text-sm font-semibold text-charcoal-900 mb-2">PDF File</label>');
html = html.replace('id="cat-pdf" accept="application/pdf" required', 'id="cat-pdf" accept="application/pdf"');

// 3. Homepage Image
html = html.replace('<label class="block text-sm font-semibold text-charcoal-900 mb-2">Upload Media *</label>', '<label class="block text-sm font-semibold text-charcoal-900 mb-2">Upload Media</label>');
html = html.replace('id="upload_homepage_luxury_image" accept="image/*" required', 'id="upload_homepage_luxury_image" accept="image/*"');

fs.writeFileSync('public/management-portal-v9-x72.html', html, 'utf8');
console.log('Done');
