const fs = require('fs');
const path = require('path');

const serverPath = path.join(__dirname, 'server.js');
let content = fs.readFileSync(serverPath, 'utf8');

// 1. Add crypto import after dotenv
content = content.replace(
  "require('dotenv').config();\r\n",
  "require('dotenv').config();\r\nconst crypto  = require('crypto');\r\n"
);

// If the above didn't match (LF line endings), try without \r
if (!content.includes("const crypto  = require('crypto');")) {
  content = content.replace(
    "require('dotenv').config();\n",
    "require('dotenv').config();\nconst crypto  = require('crypto');\n"
  );
}

// 2. Add env enforcement after jwt import
const jwtImportLine = "const jwt = require('jsonwebtoken');";
const envCheck = `
// 🔒 Enforce required secrets — refuse to start without them
if (!process.env.JWT_SECRET) throw new Error('FATAL: JWT_SECRET environment variable is required');
if (!process.env.SESSION_SECRET) throw new Error('FATAL: SESSION_SECRET environment variable is required');
`;

// Find the jwt line and add after it (handle both line endings)
if (content.includes(jwtImportLine + '\r\n')) {
  content = content.replace(jwtImportLine + '\r\n', jwtImportLine + '\r\n' + envCheck + '\r\n');
} else {
  content = content.replace(jwtImportLine + '\n', jwtImportLine + '\n' + envCheck + '\n');
}

fs.writeFileSync(serverPath, content, 'utf8');
console.log('✅ Added crypto import and env enforcement to server.js');
