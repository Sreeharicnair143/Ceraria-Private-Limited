const fs = require('fs');
let html = fs.readFileSync('public/admin.html', 'utf8');

// Find the modal HTML
const modalRegex = /<!-- Catalogue Modal -->[\s\S]*?<div id="catalogue-modal"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
const match = html.match(modalRegex);

if (match) {
  const modalHTML = match[0];
  // Remove it from the end
  html = html.replace(modalHTML, '');
  
  // Insert it before the <script> tag starts
  // The script tag might be <script> or <script ...>
  // Let's insert it before the last <script> tag or just before <script> 
  html = html.replace('<script>', modalHTML + '\n\n<script>');
  
  fs.writeFileSync('public/admin.html', html);
  console.log('Successfully moved modal HTML above script tag');
} else {
  console.log('Modal HTML not found');
}
