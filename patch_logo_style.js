const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html') && f !== 'admin.html' && f !== 'admin-login.html');

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  let changed = false;

  // Regex to match the logo_icon image tag
  const iconRegex = /<img[^>]*src="\/assets\/images\/new_logos\/logo_icon\.jpg"[^>]*class="([^"]*)"[^>]*>/g;
  content = content.replace(iconRegex, (match, classes) => {
    if (!classes.includes('mix-blend-multiply')) {
      changed = true;
      const newClasses = classes.replace('h-8 sm:h-10 md:h-12', 'h-8 sm:h-10 md:h-12 mix-blend-multiply');
      return match.replace(classes, newClasses);
    }
    return match;
  });

  // Regex to match the logo_full image tag
  const fullRegex = /<img[^>]*src="\/assets\/images\/new_logos\/logo_full\.jpg"[^>]*class="([^"]*)"[^>]*>/g;
  content = content.replace(fullRegex, (match, classes) => {
    if (!classes.includes('mix-blend-multiply') || classes.includes('h-5 sm:h-6 md:h-8')) {
      changed = true;
      let newClasses = classes.replace('h-5 sm:h-6 md:h-8', 'h-8 sm:h-10 md:h-12');
      if (!newClasses.includes('mix-blend-multiply')) {
          newClasses += ' mix-blend-multiply';
      }
      return match.replace(classes, newClasses);
    }
    return match;
  });

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`PATCHED logo styles in: ${file}`);
  }
});

console.log('\nDone!');
