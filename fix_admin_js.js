const fs = require('fs');
let html = fs.readFileSync('public/admin.html', 'utf8');

const correctCode = `
    function showToast(message, type = 'success') {
      const container = document.getElementById('toast-container');
      if (!container) return;
      const toast = document.createElement('div');
      toast.className = \\\`toast flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg border \\\${
        type === 'success'
          ? 'bg-green-50 border-green-200 text-green-800'
          : 'bg-red-50 border-red-200 text-red-800'
      }\\\`;
      toast.innerHTML = \\\`
        <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          \\\${type === 'success'
            ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>'
            : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>'
          }
        </svg>
        <span class="text-sm font-medium">\\\${message}</span>
      \\\`;
      container.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }, 4000);
    }
  
    // --- Catalogue Management ---
    const catalogueModal = document.getElementById('catalogue-modal');
    const catalogueForm = document.getElementById('catalogue-form');
    
    function openCatalogueModal() {
      if (catalogueForm) catalogueForm.reset();
      if (catalogueModal) catalogueModal.classList.remove('hidden');
    }
    
    function closeCatalogueModal() {
      if (catalogueModal) catalogueModal.classList.add('hidden');
    }
`;

html = html.replace(/function showToast\(message, type = 'success'\) \{[\s\S]*?catalogueModal\.classList\.add\('hidden'\);\n    \}/g, correctCode.replace(/\\\\`/g, '`').replace(/\\\\\\\${/g, '${'));

fs.writeFileSync('public/admin.html', html);
console.log('Restored JS logic');
