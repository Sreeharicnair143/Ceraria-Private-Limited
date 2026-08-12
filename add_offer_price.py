import re

with open('public/admin.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Grid Cols to fit Offer Price
content = content.replace(
    '<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">',
    '<!-- ── Category + Size + Price + Offer Price ── -->\n        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">',
    1 # Only the first occurrence
)

# Insert Offer Price HTML after Price HTML
price_html = '''          <div>
            <label for="tile-price" class="block text-sm font-semibold text-charcoal-900 mb-2">Price (₹)</label>
            <input type="number" step="0.01" id="tile-price" name="price"
                   placeholder="e.g., 49.99"
                   class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 transition-all" />
          </div>'''
offer_price_html = '''          <div>
            <label for="tile-offer-price" class="block text-sm font-semibold text-charcoal-900 mb-2">Offer Price (₹)</label>
            <input type="number" step="0.01" id="tile-offer-price" name="offer_price"
                   placeholder="e.g., 39.99"
                   class="admin-input w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-charcoal-800 bg-cream-50/50 transition-all" />
          </div>'''
content = content.replace(price_html, price_html + '\n' + offer_price_html)

# Add to formData
content = content.replace(
    "formData.append('price', document.getElementById('tile-price').value || '');",
    "formData.append('price', document.getElementById('tile-price').value || '');\n        formData.append('offer_price', document.getElementById('tile-offer-price').value || '');"
)

# Add to editProduct
content = content.replace(
    "document.getElementById('tile-price').value = product.price || '';",
    "document.getElementById('tile-price').value = product.price || '';\n      document.getElementById('tile-offer-price').value = product.offer_price || '';"
)

with open('public/admin.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated admin.html safely!")
