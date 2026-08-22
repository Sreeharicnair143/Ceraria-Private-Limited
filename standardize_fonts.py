import os
import re
import glob

standard_fonts_links = """  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />"""

standard_tailwind_fonts = """          fontFamily: {
            serif: ['"Playfair Display"', 'serif'],
            sans:  ['"Inter"', 'sans-serif'],
          }"""

html_files = glob.glob('public/*.html')

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Replace Google Fonts links robustly
    # Find the start of the preconnect to googleapis.com and the end of the stylesheet link for googleapis
    pattern = re.compile(r'<link[^>]*href="https://fonts\.googleapis\.com"[^>]*>[\s\S]*?<link[^>]*href="https://fonts\.googleapis\.com/css2[^>]*>', re.IGNORECASE)
    content = pattern.sub(standard_fonts_links, content)

    # If it was just missing the preconnects but had the font link:
    pattern_fallback = re.compile(r'<link[^>]*href="https://fonts\.googleapis\.com/css2[^>]*>', re.IGNORECASE)
    if not 'preconnect' in content and pattern_fallback.search(content):
         content = pattern_fallback.sub(standard_fonts_links, content)

    # Replace Tailwind fontFamily block
    pattern_tailwind = re.compile(r'fontFamily:\s*\{[^}]*\}', re.IGNORECASE)
    content = pattern_tailwind.sub(standard_tailwind_fonts, content)

    # Replace inline CSS for body and headings
    # body { font-family: 'Inter', ... }
    # h1, h2, ... .font-serif { font-family: ... }
    
    # Let's replace any `font-family: 'Marcellus'` with `'Playfair Display'`
    content = content.replace("'Marcellus'", "'Playfair Display'")
    content = content.replace('"Marcellus"', '"Playfair Display"')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Standardized fonts across all HTML files.")
