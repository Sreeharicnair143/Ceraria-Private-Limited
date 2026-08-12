const fs = require('fs');

let adminHtml = fs.readFileSync('public/admin.html', 'utf8');

// Add "Catalogues" tab to sidebar
const sidebarProductsRegex = /(<a href="#" class="sidebar-link active flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors" data-tab="products">)/;
const cataloguesSidebarItem = `<a href="#" class="sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors" data-tab="catalogues">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          Catalogues
        </a>\n        $1`;

if (!adminHtml.includes('data-tab="catalogues"')) {
  adminHtml = adminHtml.replace(sidebarProductsRegex, cataloguesSidebarItem);
}

// Add Catalogues Section content
const productsSectionRegex = /(<div id="products-tab" class="tab-content active">[\s\S]*?<\/div>\s*<!-- End Products Tab -->)/;
const cataloguesSection = `
      <!-- Catalogues Tab -->
      <div id="catalogues-tab" class="tab-content hidden space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-serif font-bold text-charcoal-900">Catalogue Management</h2>
          <button onclick="openCatalogueModal()" class="px-5 py-2.5 bg-bronze-500 text-white rounded-xl text-sm font-medium hover:bg-bronze-600 transition-colors shadow-sm flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            Add Catalogue
          </button>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-sand-200 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-sand-50/50 border-b border-sand-200">
                  <th class="py-4 px-6 text-xs font-semibold text-stone-500 uppercase tracking-wider">Title</th>
                  <th class="py-4 px-6 text-xs font-semibold text-stone-500 uppercase tracking-wider">File</th>
                  <th class="py-4 px-6 text-xs font-semibold text-stone-500 uppercase tracking-wider">Date Added</th>
                  <th class="py-4 px-6 text-xs font-semibold text-stone-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody id="catalogues-tbody" class="divide-y divide-sand-100">
                <!-- Populated by JS -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- End Catalogues Tab -->
`;

if (!adminHtml.includes('id="catalogues-tab"')) {
  adminHtml = adminHtml.replace(productsSectionRegex, `$1\n${cataloguesSection}`);
}

// Add Catalogue Modal
const modalContainerRegex = /(<!-- ==========================================\s*MODAL\s*========================================== -->)/;
const catalogueModal = `
  <!-- Catalogue Modal -->
  <div id="catalogue-modal" class="fixed inset-0 z-[100] hidden">
    <div class="absolute inset-0 bg-charcoal-900/40 backdrop-blur-sm transition-opacity" onclick="closeCatalogueModal()"></div>
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
      <div class="relative bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:max-w-md w-full border border-sand-100">
        <div class="px-6 py-5 border-b border-sand-100 flex justify-between items-center bg-cream-50/50">
          <h3 class="text-xl font-serif font-bold text-charcoal-900">Upload Catalogue</h3>
          <button onclick="closeCatalogueModal()" class="text-stone-400 hover:text-charcoal-900 transition-colors">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <form id="catalogue-form" class="px-6 py-6 space-y-5">
          <div>
            <label class="block text-sm font-semibold text-charcoal-800 mb-1.5">Catalogue Title</label>
            <input type="text" id="cat-title" required class="w-full px-4 py-2.5 bg-cream-50 border border-sand-200 rounded-xl text-sm focus:outline-none focus:border-bronze-400 focus:ring-1 focus:ring-bronze-400" placeholder="e.g. 2026 Premium Collection">
          </div>
          <div>
            <label class="block text-sm font-semibold text-charcoal-800 mb-1.5">PDF File</label>
            <input type="file" id="cat-pdf" accept=".pdf" required class="w-full text-sm text-stone-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-bronze-50 file:text-bronze-700 hover:file:bg-bronze-100 transition-colors cursor-pointer">
          </div>

          <div class="pt-4 flex gap-3">
            <button type="button" onclick="closeCatalogueModal()" class="flex-1 px-4 py-2.5 border border-sand-300 text-charcoal-800 rounded-xl text-sm font-medium hover:bg-sand-50 transition-colors">Cancel</button>
            <button type="submit" id="cat-save-btn" class="flex-1 px-4 py-2.5 bg-charcoal-900 text-white rounded-xl text-sm font-medium hover:bg-charcoal-800 transition-colors shadow-sm">Upload PDF</button>
          </div>
        </form>
      </div>
    </div>
  </div>
`;

if (!adminHtml.includes('id="catalogue-modal"')) {
  adminHtml = adminHtml.replace(modalContainerRegex, `${catalogueModal}\n$1`);
}

// Add Catalogue JS logic
const scriptEndRegex = /(<\/script>\s*<\/body>\s*<\/html>)/;
const catalogueJs = `
    // --- Catalogue Management ---
    const catalogueModal = document.getElementById('catalogue-modal');
    const catalogueForm = document.getElementById('catalogue-form');
    
    function openCatalogueModal() {
      catalogueForm.reset();
      catalogueModal.classList.remove('hidden');
    }
    function closeCatalogueModal() {
      catalogueModal.classList.add('hidden');
    }

    async function loadCatalogues() {
      try {
        const res = await fetch('/api/catalogues');
        const catalogues = await res.json();
        const tbody = document.getElementById('catalogues-tbody');
        tbody.innerHTML = catalogues.map(c => \`
          <tr class="hover:bg-sand-50/30 transition-colors group">
            <td class="py-4 px-6 text-sm font-medium text-charcoal-800">\${c.title}</td>
            <td class="py-4 px-6 text-sm text-stone-500">
              <a href="\${c.pdf_url}" target="_blank" class="text-bronze-600 hover:underline flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                View PDF
              </a>
            </td>
            <td class="py-4 px-6 text-sm text-stone-500">\${new Date(c.created_at).toLocaleDateString()}</td>
            <td class="py-4 px-6 text-right">
              <button onclick="deleteCatalogue(\${c.id})" class="text-red-500 hover:text-red-700 transition-colors p-2 rounded-lg hover:bg-red-50">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </td>
          </tr>
        \`).join('');
      } catch (err) {
        console.error('Failed to load catalogues', err);
      }
    }

    catalogueForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('cat-save-btn');
      btn.disabled = true;
      btn.textContent = 'Uploading...';

      const formData = new FormData();
      formData.append('title', document.getElementById('cat-title').value);
      formData.append('pdf_url', document.getElementById('cat-pdf').files[0]);

      try {
        const res = await fetch('/api/catalogues', {
          method: 'POST',
          body: formData
        });

        if(res.ok) {
          closeCatalogueModal();
          loadCatalogues();
        } else {
          alert('Failed to upload catalogue');
        }
      } catch (err) {
        alert('Error uploading catalogue');
      } finally {
        btn.disabled = false;
        btn.textContent = 'Upload PDF';
      }
    });

    async function deleteCatalogue(id) {
      if(confirm('Are you sure you want to delete this catalogue?')) {
        try {
          await fetch(\`/api/catalogues/\${id}\`, { method: 'DELETE' });
          loadCatalogues();
        } catch (err) {
          alert('Failed to delete catalogue');
        }
      }
    }

    // Call loadCatalogues alongside loadProducts
    // Ensure we trigger it when tab switches or on init.
    loadCatalogues();
`;

if (!adminHtml.includes('loadCatalogues()')) {
  adminHtml = adminHtml.replace(scriptEndRegex, `${catalogueJs}\n$1`);
}

fs.writeFileSync('public/admin.html', adminHtml);
console.log('admin.html patched');
