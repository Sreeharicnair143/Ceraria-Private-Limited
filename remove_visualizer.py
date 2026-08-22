"""
Remove all Virtual Visualiser references from the CERARIA site.
This script:
1. Removes the desktop nav "Visualizer" button (the bronze gradient CTA) from all pages
2. Removes the mobile nav "Virtual Visualizer" link from all pages
3. Removes the embedded Visualizer iframe section from gallery.html
4. Removes the "Virtual Visualizer" link from product.html sidebar nav
5. Deletes visualizer.html
"""
import re
import os

PUBLIC = 'public'

# List of all HTML files to process
html_files = [f for f in os.listdir(PUBLIC) if f.endswith('.html') and f != 'visualizer.html']

for fname in html_files:
    path = os.path.join(PUBLIC, fname)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # 1. Remove the desktop nav Visualizer button (bronze gradient CTA)
    # Pattern: starts with whitespace + <a href="/visualizer.html" ... and ends with </a>
    # This is a multi-line block with the SVG icon
    content = re.sub(
        r'\s*<a href="/visualizer\.html" class="ml-4 px-7 py-3\.5 bg-gradient-to-r from-bronze-600.*?</a>',
        '',
        content,
        flags=re.DOTALL
    )
    
    # 2. Remove the mobile nav "Virtual Visualizer" link
    # Pattern: <a href="/visualizer.html" class="block px-4 py-3 ...">...</a>
    content = re.sub(
        r'\s*<a href="/visualizer\.html" class="block px-4 py-3.*?</a>',
        '',
        content,
        flags=re.DOTALL
    )
    
    # 3. Remove embedded Visualizer iframe section from gallery.html
    # Pattern: <!-- AI Visualizer Section --> ... </section>
    content = re.sub(
        r'\s*<!-- AI Visualizer Section -->.*?</section>',
        '',
        content,
        flags=re.DOTALL
    )
    
    # 4. Remove product.html sidebar "Virtual Visualizer" link
    # Pattern: <a href="/visualizer.html" class="block py-3 ...">Virtual Visualizer</a>
    content = re.sub(
        r'\s*<a href="/visualizer\.html" class="block py-3.*?</a>',
        '',
        content,
        flags=re.DOTALL
    )
    
    # 5. Clean up the meta description in product.html that mentions "visualizations"
    # This is fine to keep as "interior visualizations" is a generic term, not the feature name
    
    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated: {fname}')
    else:
        print(f'No changes: {fname}')

# 6. Delete visualizer.html
viz_path = os.path.join(PUBLIC, 'visualizer.html')
if os.path.exists(viz_path):
    os.remove(viz_path)
    print(f'Deleted: visualizer.html')
else:
    print('visualizer.html not found')

print('\nDone! All Visualiser references removed.')
