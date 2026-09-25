const fs = require('fs');

const file = 'public/management-portal-v9-x72.html';
let html = fs.readFileSync(file, 'utf8');

// Inside openModal
html = html.replace(
  /function openModal\(\) \{[\s\S]*?document\.getElementById\('upload-modal'\)\.classList\.add\('open'\);/,
  `function openModal() {
        document.getElementById('edit-product-id').value = '';
        document.getElementById('upload-modal').classList.add('open');`
);

// Inside closeModal
html = html.replace(
  /document\.getElementById\('upload-form'\)\.reset\(\);/,
  `document.getElementById('upload-form').reset();
        document.getElementById('edit-product-id').value = '';`
);

fs.writeFileSync(file, html, 'utf8');
console.log('Fixed edit-product-id bug in management-portal-v9-x72.html');
