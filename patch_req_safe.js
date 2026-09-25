const fs = require('fs');
let c = fs.readFileSync('server.js', 'utf8');

const regex = /if \(!name \|\| !series \|\| !size\) \{[\s\S]{1,100}error: 'Name, series, and size are required'[\s\S]{1,30}\}/;

c = c.replace(regex, `if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Name is required'
      });
    }`);

fs.writeFileSync('server.js', c);
console.log('Fixed server.js');
