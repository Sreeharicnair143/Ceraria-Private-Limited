const fs = require('fs');

const file = 'server.js';
let content = fs.readFileSync(file, 'utf8');

// Replace using regex to ignore whitespace differences
content = content.replace(/if \(!name \|\| !series \|\| !size\) \{[\s\S]*?error: 'Name, series, and size are required'[\s\S]*?\}/g, 
`if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Name is required'
      });
    }`);

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated server.js');
