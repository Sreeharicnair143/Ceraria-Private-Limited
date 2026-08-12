const fs = require('fs');

let html = fs.readFileSync('public/admin.html', 'utf8');

const submitLogic = `    catalogueForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('cat-save-btn');
      btn.disabled = true;
      btn.textContent = 'Uploading...';

      const formData = new FormData();
      formData.append('title', document.getElementById('cat-title').value);
      formData.append('size_details', document.getElementById('cat-size').value);
      formData.append('pdf_url', document.getElementById('cat-pdf').files[0]);
      formData.append('cover_image', document.getElementById('cat-cover').files[0]);

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
`;

html = html.replace(/catalogueForm\.addEventListener\('submit', async \(e\) => \{[\s\S]*?btn\.textContent = 'Upload PDF';\s*\}\n    \}\);/g, submitLogic);

const modalForm = `<form id="catalogue-form" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Catalogue Title</label>
            <input type="text" id="cat-title" required class="w-full px-4 py-3 bg-sand-50 border border-sand-200 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-bronze-400 transition-all placeholder:text-stone-400" placeholder="e.g. 2026 Premium Collection">
          </div>
          <div>
            <label class="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Size Details</label>
            <input type="text" id="cat-size" required class="w-full px-4 py-3 bg-sand-50 border border-sand-200 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-bronze-400 transition-all placeholder:text-stone-400" placeholder="e.g. 800x2400mm, 600x1200mm">
          </div>
          <div>
            <label class="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Cover Image (Thumbnail)</label>
            <input type="file" id="cat-cover" accept="image/*" required class="block w-full text-sm text-stone-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-sand-100 file:text-charcoal-900 hover:file:bg-sand-200 transition-colors">
          </div>
          <div>
            <label class="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">PDF File</label>
            <input type="file" id="cat-pdf" accept="application/pdf" required class="block w-full text-sm text-stone-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-sand-100 file:text-charcoal-900 hover:file:bg-sand-200 transition-colors">
          </div>
        </form>`;

html = html.replace(/<form id="catalogue-form" class="space-y-4">[\s\S]*?<\/form>/g, modalForm);

fs.writeFileSync('public/admin.html', html);
console.log('Fixed admin.html');
