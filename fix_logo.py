import os
import glob

html_files = glob.glob('public/*.html')

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Replace logo image source
    content = content.replace('src="/assets/images/logo-icon.png"', 'src="/assets/images/logo-icon.jpg"')
    
    # Replace logo classes to prevent cropping/distortion
    content = content.replace(
        'class="w-12 h-12 group-hover:scale-105 transition-transform duration-500 rounded-md"',
        'class="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-500 rounded-md"'
    )
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed logo image src and styling across all HTML files.")
