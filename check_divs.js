const fs = require('fs');
const html = fs.readFileSync('public/management-portal-v9-x72.html', 'utf8');
const start = html.indexOf('<form id="upload-form"');
const end = html.indexOf('</form>', start);
const formHtml = html.substring(start, end);

const openDivs = (formHtml.match(/<div\b/g) || []).length;
const closeDivs = (formHtml.match(/<\/div>/g) || []).length;

console.log('Open divs:', openDivs, 'Close divs:', closeDivs);

if (openDivs !== closeDivs) {
  console.log('MISMATCH DETECTED!');
}
