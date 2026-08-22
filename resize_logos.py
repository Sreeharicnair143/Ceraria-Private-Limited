import os, re

for f in os.listdir('public'):
    if f.endswith('.html'):
        path = os.path.join('public', f)
        with open(path, 'r', encoding='utf-8') as file:
            content = file.read()
            
        content = content.replace(
            'class="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-500"',
            'class="h-8 sm:h-10 md:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-500"'
        )
        content = content.replace(
            'class="h-6 sm:h-8 md:h-10 w-auto object-contain group-hover:opacity-80 transition-opacity duration-500"',
            'class="h-5 sm:h-6 md:h-8 w-auto object-contain group-hover:opacity-80 transition-opacity duration-500"'
        )
        with open(path, 'w', encoding='utf-8') as file:
            file.write(content)

print("Done resizing logos")
