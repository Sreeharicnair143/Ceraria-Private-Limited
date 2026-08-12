const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const oldTag = `<span class="hidden sm:inline-block text-[10px] font-sans font-medium tracking-[0.25em] uppercase text-stone-400 border-l border-stone-300 pl-3 leading-relaxed">`;
const newTag = `<span class="inline-block text-[8px] sm:text-[10px] font-sans font-medium tracking-[0.15em] sm:tracking-[0.25em] uppercase text-stone-400 border-l border-stone-300 pl-2 sm:pl-3 leading-relaxed">`;

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes(oldTag)) {
    content = content.replace(oldTag, newTag);
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
});
