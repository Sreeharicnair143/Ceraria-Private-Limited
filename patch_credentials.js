const fs = require('fs');
const path = require('path');

const portalPath = path.join(__dirname, 'public', 'management-portal-v9-x72.html');
let content = fs.readFileSync(portalPath, 'utf8');

const targetStr = `    async function secureFetch(url, options = {}) {
      const token = sessionStorage.getItem('sys_auth_token');`;

const replaceStr = `    async function secureFetch(url, options = {}) {
      const token = sessionStorage.getItem('sys_auth_token');
      options.credentials = 'same-origin';`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replaceStr);
} else {
  content = content.replace(targetStr.replace(/\n/g, '\r\n'), replaceStr.replace(/\n/g, '\r\n'));
}

fs.writeFileSync(portalPath, content, 'utf8');
console.log('✅ Added credentials flag to secureFetch');
