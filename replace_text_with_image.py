import shutil
import glob
import re

# 1. Copy the uploaded text logo image
source_image = r"C:\Users\Sreehari\.gemini\antigravity-ide\brain\8c527db9-98b7-4e80-9c9f-7322fea46c2a\.user_uploaded\media_1786734666677.png"
target_image = r"public\assets\images\ceraria-text.png"

shutil.copy(source_image, target_image)
print(f"Copied text logo image to {target_image}")

html_files = glob.glob('public/*.html')

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # The span we added in the last commit:
    # <span class="text-3xl md:text-4xl font-bold tracking-[0.1em] text-charcoal-900 group-hover:text-bronze-500 transition-colors duration-500" style="font-family: 'Cinzel Decorative', serif;">
    #   CERARIA
    # </span>
    
    # We will replace it with an image tag.
    old_span_pattern = re.compile(
        r'<span class="text-3xl md:text-4xl[^>]*style="font-family: \'Cinzel Decorative\', serif;"[^>]*>\s*CERARIA\s*</span>',
        re.IGNORECASE | re.DOTALL
    )
    
    # If the file hasn't updated properly or still has old one (just in case), here's the old one pattern too:
    old_span_fallback = re.compile(
        r'<span class="text-2xl md:text-3xl font-serif font-bold tracking-\[0\.15em\] text-charcoal-900 group-hover:text-bronze-500 transition-colors duration-500">\s*CERARIA\s*</span>',
        re.IGNORECASE | re.DOTALL
    )

    new_img = r'<img src="/assets/images/ceraria-text.png" alt="CERARIA" class="h-6 sm:h-8 md:h-10 w-auto object-contain mix-blend-multiply group-hover:opacity-80 transition-opacity duration-500" />'

    new_content, count = old_span_pattern.subn(new_img, content)
    if count == 0:
        new_content, count = old_span_fallback.subn(new_img, content)
        
    if count > 0:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Replaced text with image in {file_path}")
    else:
        print(f"Could not find CERARIA span in {file_path}")

print("Done.")
