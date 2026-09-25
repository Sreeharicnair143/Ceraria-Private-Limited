const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const cssBlock = `
    /* ── NAVBAR INSTANT VISIBILITY ── */
    /* Ensure nav is always visible immediately, before any JS/CDN loads */
    #navbar { opacity: 1 !important; transform: none !important; }
    #navbar * { opacity: 1 !important; }
    #navbar [data-aos] { opacity: 1 !important; transform: none !important; }
    #mobile-menu-btn { display: flex !important; flex-direction: column; gap: 6px; padding: 8px; }
    #mobile-menu-btn span { display: block; }
    /* Hide hamburger on xl screens (matching Tailwind xl:hidden) */
    @media (min-width: 1280px) {
      #mobile-menu-btn { display: none !important; }
    }
`;

const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html') && f !== 'admin.html');

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (content.includes('NAVBAR INSTANT VISIBILITY')) {
    console.log(`SKIP (already patched): ${file}`);
    return;
  }
  
  const headEnd = content.indexOf('</head>');
  if (headEnd === -1) { console.log(`SKIP (no </head>): ${file}`); return; }
  
  const headSection = content.substring(0, headEnd);
  const lastStyleClose = headSection.lastIndexOf('</style>');
  
  if (lastStyleClose === -1) { console.log(`SKIP (no </style>): ${file}`); return; }
  
  const newContent = content.substring(0, lastStyleClose) + cssBlock + '\n' + content.substring(lastStyleClose);
  fs.writeFileSync(filePath, newContent, 'utf-8');
  console.log(`PATCHED: ${file}`);
});

console.log('Done!');
