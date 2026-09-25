const fs = require('fs');
const path = require('path');

const portalPath = path.join(__dirname, 'public', 'management-portal-v9-x72.html');
let content = fs.readFileSync(portalPath, 'utf8');

const targetStr = `  <script>
    const API_BASE = '';`;

const secureFetchImpl = `
    // ═══════════════════════════════════════════
    //  SECURE FETCH WRAPPER
    // ═══════════════════════════════════════════
    async function secureFetch(url, options = {}) {
      const token = sessionStorage.getItem('sys_auth_token');
      
      // If it's a FormData object, DO NOT set Content-Type manually
      if (!(options.body instanceof FormData)) {
        if (!options.headers) options.headers = {};
        if (!options.headers['Content-Type']) {
          options.headers['Content-Type'] = 'application/json';
        }
      } else if (!options.headers) {
        options.headers = {};
      }
      
      if (token) {
        options.headers['Authorization'] = \`Bearer \${token}\`;
      }
      
      const response = await fetch(url, options);
      
      // Handle session expiration or concurrent login invalidation
      if (response.status === 401 || response.status === 403) {
        sessionStorage.removeItem('sys_auth_token');
        window.location.href = '/sys-auth-99';
        throw new Error('Unauthorized or session expired');
      }
      
      return response;
    }`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, targetStr + secureFetchImpl);
  fs.writeFileSync(portalPath, content, 'utf8');
  console.log('✅ Added secureFetch definition (LF)');
} else {
  const targetCRLF = targetStr.replace(/\n/g, '\r\n');
  if (content.includes(targetCRLF)) {
    content = content.replace(targetCRLF, targetCRLF + secureFetchImpl.replace(/\n/g, '\r\n'));
    fs.writeFileSync(portalPath, content, 'utf8');
    console.log('✅ Added secureFetch definition (CRLF)');
  } else {
    console.log('⚠️ Could not find target script block to inject secureFetch');
  }
}
