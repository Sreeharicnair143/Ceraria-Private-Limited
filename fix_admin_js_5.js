const fs = require('fs');
let html = fs.readFileSync('public/admin.html', 'utf8');

const regex = /catalogueForm\.addEventListener\('submit', async \(e\) => \{[\s\S]*?\}\);\s*\n\s*async function deleteCatalogue\(id\)/;

const replacement = `    catalogueForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('cat-save-btn');
      btn.disabled = true;
      btn.textContent = 'Uploading...';

      try {
        const formData = new FormData();
        formData.append('title', document.getElementById('cat-title').value);
        formData.append('size', document.getElementById('cat-size').value);
        formData.append('cover', document.getElementById('cat-cover').files[0]);
        formData.append('pdf', document.getElementById('cat-pdf').files[0]);

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

    async function deleteCatalogue(id)`;

html = html.replace(regex, replacement);

fs.writeFileSync('public/admin.html', html);
console.log('Fixed catalogueForm submit listener syntax error');
