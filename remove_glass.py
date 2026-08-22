import os, re
for f in os.listdir('public'):
    if f.endswith('.html'):
        path = os.path.join('public', f)
        with open(path, 'r', encoding='utf-8') as file:
            content = file.read()
        content = re.sub(r'\.navbar-glass\s*\{[^}]*\}', '', content)
        content = content.replace('class="navbar-glass ', 'class="')
        with open(path, 'w', encoding='utf-8') as file:
            file.write(content)
print("Done")
