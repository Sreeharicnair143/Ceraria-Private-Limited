import os
import glob

html_files = glob.glob('public/*.html')

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Replace logo classes to include mix-blend-multiply
    old_class = 'class="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-500 rounded-md"'
    new_class = 'class="h-12 w-auto object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"'
    
    content = content.replace(old_class, new_class)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Added mix-blend-multiply to logo image across all HTML files.")
