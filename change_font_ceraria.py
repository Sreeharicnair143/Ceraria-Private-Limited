import glob
import re

html_files = glob.glob('public/*.html')

# Add Cinzel Decorative to the google fonts link
old_link = r'<link href="https://fonts.googleapis.com/css2\?family=Playfair\+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />'
new_link = r'<link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />'

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add the font link
    content = re.sub(old_link, new_link, content, flags=re.IGNORECASE)

    # Change the span for CERARIA to use Cinzel Decorative and make it slightly larger
    old_span = r'<span class="text-2xl md:text-3xl font-serif font-bold tracking-\[0\.15em\] text-charcoal-900 group-hover:text-bronze-500 transition-colors duration-500">\s*CERARIA\s*</span>'
    new_span = r'''<span class="text-3xl md:text-4xl font-bold tracking-[0.1em] text-charcoal-900 group-hover:text-bronze-500 transition-colors duration-500" style="font-family: 'Cinzel Decorative', serif;">
            CERARIA
          </span>'''
          
    content = re.sub(old_span, new_span, content, flags=re.IGNORECASE)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Updated CERARIA text to use Cinzel Decorative.")
