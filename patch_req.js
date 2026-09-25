const fs = require('fs');

const file = 'server.js';
let content = fs.readFileSync(file, 'utf8');

// Replace the POST /api/products requirement check
content = content.replace(
  `if (!name || !series || !size) {
      return res.status(400).json({
        success: false,
        error: 'Name, series, and size are required'
      });
    }`,
  `if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Name is required'
      });
    }`
);

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated server.js to only require name');
