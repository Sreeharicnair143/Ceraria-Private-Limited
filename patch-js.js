const fs = require('fs');
let html = fs.readFileSync('public/admin.html', 'utf8');

// Replace form submission
let searchRegex = /function initFormSubmission\(\) {[\s\S]*?}\n\n/g;
let replacement = `function initFormSubmission() {
      const form = document.getElementById('upload-form');
      const submitBtn = document.getElementById('modal-submit-btn');

      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Build FormData
        const formData = new FormData();

        // File uploads
        const mainImageFile = document.getElementById('main_image_file');
        if (mainImageFile.files.length > 0) {
          formData.append('main_image', mainImageFile.files[0]);
        }
        
        const roomSceneFile = document.getElementById('room_scene_file');
        if (roomSceneFile.files.length > 0) {
          formData.append('room_scene_url', roomSceneFile.files[0]);
        }

        // Basic fields
        formData.append('name', document.getElementById('tile-name').value);
        formData.append('series', document.getElementById('tile-series').value);
        formData.append('category', document.getElementById('tile-category').value);
        formData.append('size', document.getElementById('tile-size').value);
        formData.append('thickness', document.getElementById('tile-thickness').value || '');
        formData.append('finish', document.getElementById('tile-finish').value || '');
        formData.append('surface', document.getElementById('tile-surface').value || '');
        formData.append('description', document.getElementById('tile-description').value);
        formData.append('video_url', document.getElementById('tile-video-url').value || '');
        formData.append('price', document.getElementById('tile-price').value || '');

        // Applications (checkboxes)
        const selectedApps = [...document.querySelectorAll('.application-check:checked')].map(cb => cb.value);
        formData.append('application', JSON.stringify(selectedApps));

        // URL fallbacks
        const thumbUrl = document.getElementById('thumbnail-url').value;
        if (!mainImageFile.files.length && thumbUrl) {
          formData.append('image_url', thumbUrl);
        }
        
        const roomUrlText = document.getElementById('room-scene-url-text').value;
        if (!roomSceneFile.files.length && roomUrlText) {
          formData.append('room_scene_url_text', roomUrlText);
        }

        // Featured flag
        const isFeatured = document.getElementById('tile-banner').checked;
        formData.append('is_featured', isFeatured.toString());

        // Submit
        submitBtn.disabled = true;
        submitBtn.innerHTML = \`
          <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Saving...
        \`;

        try {
          const editId = document.getElementById('edit-product-id').value;
          const url = editId ? \`\${API_BASE}/api/products/\${editId}\` : \`\${API_BASE}/api/products\`;
          const method = editId ? 'PUT' : 'POST';

          const res = await fetch(url, {
            method: method,
            body: formData,
          });

          const json = await res.json();

          if (json.success) {
            showToast(\`"\${json.data.name}" \${editId ? 'updated' : 'added'} successfully!\`, 'success');
            closeModal();
            fetchAllProducts();
            fetchStats();
          } else {
            showToast(json.error || 'Failed to save product', 'error');
          }
        } catch (err) {
          console.error('Form submission error:', err);
          showToast('Network error. Is the server running?', 'error');
        } finally {
          submitBtn.disabled = false;
          submitBtn.innerHTML = \`
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Save Product
          \`;
        }
      });
    }

    // Global variable to hold all products for easy editing
    let allProductsData = [];

    async function editProduct(id) {
      const product = allProductsData.find(p => p.id === id);
      if(!product) return;
      
      document.getElementById('upload-form').reset();
      document.getElementById('edit-product-id').value = product.id;
      
      document.getElementById('tile-name').value = product.name || '';
      document.getElementById('tile-series').value = product.series || '';
      document.getElementById('tile-category').value = product.category || 'Porcelain Tiles';
      document.getElementById('tile-size').value = product.size || '';
      document.getElementById('tile-thickness').value = product.thickness || '';
      document.getElementById('tile-finish').value = product.finish || '';
      document.getElementById('tile-surface').value = product.surface || '';
      document.getElementById('tile-description').value = product.description || '';
      document.getElementById('tile-video-url').value = product.video_url || '';
      document.getElementById('tile-price').value = product.price || '';
      
      document.getElementById('thumbnail-url').value = product.main_image || '';
      document.getElementById('room-scene-url-text').value = product.room_scene_url || '';
      
      document.getElementById('tile-banner').checked = product.is_featured || false;
      
      // Applications
      document.querySelectorAll('.application-check').forEach(cb => cb.checked = false);
      if(product.application && Array.isArray(product.application)) {
         product.application.forEach(app => {
            const cb = document.querySelector(\`.application-check[value="\${app}"]\`);
            if(cb) cb.checked = true;
         });
      }
      
      const modal = document.getElementById('upload-modal');
      modal.classList.add('active');
    }

`;

html = html.replace(searchRegex, replacement);

// Hook into fetchAllProducts to populate allProductsData
const fetchAllRegex = /const json = await res\.json\(\);\n\s*if \(json\.success\) {\n\s*const products = json\.data;/g;
const fetchAllReplacement = `const json = await res.json();
          if (json.success) {
            allProductsData = json.data;
            const products = json.data;`;
html = html.replace(fetchAllRegex, fetchAllReplacement);


// Remove the old clearFileInput and showFilePreview (since we changed the HTML inputs)
const removeOldInputRegex = /const dropZone = document.getElementById\('drop-zone'\);[\s\S]*?function clearFileInput\(\) {[\s\S]*?}/g;
html = html.replace(removeOldInputRegex, `// File inputs simplified`);

fs.writeFileSync('public/admin.html', html);
console.log('Patched admin JS successfully!');
