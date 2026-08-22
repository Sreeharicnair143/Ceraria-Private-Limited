import glob
import re

html_files = glob.glob('public/*.html')

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update the inline style for main-header (scrolled or default)
    # Old: background: rgba(255,253,248,0.95);
    # New: background: rgba(232,227,223,0.95);
    content = re.sub(r'background:\s*rgba\(255,\s*253,\s*248,\s*0\.95\)', 'background: rgba(232, 227, 223, 0.95)', content)

    # 2. Update navbar tailwind class bg-cream-50/90 to bg-[#E8E3DF]/90
    content = content.replace('bg-cream-50/90', 'bg-[#E8E3DF]/90')

    # 3. Remove mix-blend-multiply from the logo icon and text image
    content = content.replace('mix-blend-multiply ', '')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Updated header background colors and removed mix-blend-multiply.")
