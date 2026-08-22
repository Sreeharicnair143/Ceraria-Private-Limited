import shutil
import glob

# 1. Copy the uploaded image to the public assets directory
source_image = r"C:\Users\Sreehari\.gemini\antigravity-ide\brain\8c527db9-98b7-4e80-9c9f-7322fea46c2a\.user_uploaded\media_1786733558654.jpg"
target_image = r"public\assets\images\logo-horizontal.jpg"

shutil.copy(source_image, target_image)
print(f"Copied {source_image} to {target_image}")

# 2. Update all HTML files to replace the logo block
html_files = glob.glob('public/*.html')

# The old block looks roughly like this (we can use regex to replace the whole <a> tag contents safely)
import re

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the nav-logo <a> block and replace its contents.
    # The <a> tag has id="nav-logo". We can match <a href="/" ... id="nav-logo"> ... </a>
    
    # We want the replacement to be an img tag using the new horizontal logo.
    # The new logo should have mix-blend-multiply to remove the background, and have an appropriate height (e.g. h-10 or h-12).
    
    replacement_content = r'''<a href="/" class="flex items-center group" id="nav-logo">
          <img src="/assets/images/logo-horizontal.jpg"
               alt="CERARIA logo"
               class="h-10 sm:h-12 w-auto object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
        </a>'''

    # Use regex to replace the entire <a ... id="nav-logo">...</a>
    # Note: re.sub with re.DOTALL to match across newlines
    pattern = re.compile(r'<a href="/" class="[^"]*" id="nav-logo">.*?</a>', re.DOTALL)
    
    new_content, count = pattern.subn(replacement_content, content)
    
    if count > 0:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file_path}")
    else:
        print(f"Could not find nav-logo in {file_path}")

print("Done.")
