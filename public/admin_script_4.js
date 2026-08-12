
    const API_BASE = '';

    // ═══════════════════════════════════════════
    //  LOGOUT
    // ═══════════════════════════════════════════
    async function handleLogout() {
      try {
        await fetch('/api/admin/logout', { method: 'POST' });
        window.location.href = '/admin-login';
      } catch (e) {
        window.location.href = '/admin-login';
      }
    }

    // ═══════════════════════════════════════════
    //  INITIALIZATION
    // ═══════════════════════════════════════════
    document.addEventListener('DOMContentLoaded', () => {
      fetchStats();
      fetchAllProducts();
      initDropZone();
      initBannerToggle();
      initFormSubmission();
    });


    // ═══════════════════════════════════════════
    //  FETCH STATS
    // ═══════════════════════════════════════════
    async function fetchStats() {
      try {
        const res = await fetch(`${API_BASE}/api/products/stats`);
        const json = await res.json();
        if (json.success) {
          const d = json.data;
          document.getElementById('stat-total').textContent = d.total_products;
          document.getElementById('stat-active').textContent = d.active;
          document.getElementById('stat-banners').textContent = d.featured;
          document.getElementById('stat-stock').textContent = d.total_series;
        }
      } catch (err) {
        console.error('Stats fetch failed:', err);
      }
    }


    // ═══════════════════════════════════════════
    //  RENDER TABLE
    // ═══════════════════════════════════════════
    function renderTable(products) {
      const tbody = document.getElementById('products-tbody');
      if (!products || products.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="px-6 py-12 text-center text-stone-500 font-medium bg-sand-50/50">No products found. Add one to get started!</td></tr>`;
        return;
      }
      tbody.innerHTML = products.map(p => {
        const apps = Array.isArray(p.application) ? p.application : (typeof p.application === 'string' ? JSON.parse(p.application || '[]') : []);
        return `
        <tr class="border-t border-sand-100 hover:bg-sand-100/50 transition-colors cursor-pointer" onclick="editProduct(${p.id})">
          <td class="px-6 py-4">
            <div class="flex items-center gap-3">
              <div class="relative w-12 h-12 rounded-xl overflow-hidden border border-sand-200 flex-shrink-0">
                <img src="${p.room_scene_url || p.main_image || ''}" alt="${p.name}" class="w-full h-full object-cover" />
              </div>
              <div>
                <p class="font-semibold text-charcoal-900 text-sm">${p.name}</p>
                <p class="text-[10px] text-stone-400 flex gap-1">${apps.slice(0,2).map(a => `<span class="bg-sand-100 px-1.5 py-0.5 rounded">${a}</span>`).join('')}</p>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 font-semibold text-charcoal-800">${p.series}</td>
          <td class="px-6 py-4 hidden sm:table-cell capitalize text-stone-600">${p.category || '—'}</td>
          <td class="px-6 py-4 hidden md:table-cell text-stone-600">${p.size ? p.size.replace('x', ' × ') + ' mm' : '—'}</td>
          <td class="px-6 py-4 hidden lg:table-cell text-stone-600">${p.finish || '—'}</td>
          <td class="px-6 py-4">
            ${p.is_featured
              ? '<span class="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-bronze-500/10 text-bronze-600 rounded-full">Featured</span>'
              : '<span class="text-stone-300">—</span>'
            }
          </td>
          <td class="px-6 py-4 text-center" onclick="event.stopPropagation()">
            <button onclick="deleteProduct(${p.id}, '${p.name.replace(/'/g, "\\'")}')" class="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors" title="Delete">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </td>
        </tr>`;
      }).join('');
    }


    // ═══════════════════════════════════════════
    //  DELETE PRODUCT
    // ═══════════════════════════════════════════
    async function deleteProduct(id, name) {
      if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;

      try {
        const res = await fetch(`${API_BASE}/api/products/${id}`, { method: 'DELETE' });
        const json = await res.json();
        if (json.success) {
          showToast(`Deleted "${name}"`, 'success');
          fetchAllProducts();
          fetchStats();
        } else {
          showToast(json.error || 'Failed to delete', 'error');
        }
      } catch (err) {
        showToast('Network error', 'error');
      }
    }


    // ═══════════════════════════════════════════
    //  MODAL CONTROLS
    // ═══════════════════════════════════════════
    function openModal() {
      document.getElementById('upload-modal').classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      document.getElementById('upload-modal').classList.remove('open');
      document.body.style.overflow = '';
      document.getElementById('upload-form').reset();
      document.getElementById('file-preview').innerHTML = '';
      document.getElementById('campaign-video-field') && document.getElementById('campaign-video-field').classList.add('hidden');
      document.getElementById('modal-title').textContent = 'Add New Product';
      document.getElementById('modal-submit-btn').innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        Add Product
      `;
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    // Close on backdrop click
    document.getElementById('upload-modal').addEventListener('click', (e) => {
      if (e.target.id === 'upload-modal') closeModal();
    });


    // ═══════════════════════════════════════════
    //  BANNER AD TOGGLE — Show/hide campaign video field
    // ═══════════════════════════════════════════
    function initBannerToggle() {
      const checkbox = document.getElementById('tile-banner');
      const field = document.getElementById('campaign-video-field');

      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          field.classList.remove('hidden');
        } else {
          field.classList.add('hidden');
          document.getElementById('tile-campaign-video').value = '';
        }
      });
    }


    // ═══════════════════════════════════════════
    //  FETCH ALL PRODUCTS
    // ═══════════════════════════════════════════
    async function fetchAllProducts() {
      try {
        const searchInput = document.getElementById('admin-search-input');
        let url = `${API_BASE}/api/products`;
        if (searchInput && searchInput.value.trim()) {
          url += `?search=${encodeURIComponent(searchInput.value.trim())}`;
        }
        
        const res = await fetch(url);
        const json = await res.json();
        if (json.success) {
          allProductsData = json.data;
          renderTable(json.data);
          document.getElementById('product-count-label').textContent = `${json.data.length} Products`;
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    }

    // ═══════════════════════════════════════════
    //  DRAG & DROP IMAGE UPLOAD
    // ═══════════════════════════════════════════
    function setupDropZone(dropZoneId, fileInputId, previewId) {
      const dropZone = document.getElementById(dropZoneId);
      const fileInput = document.getElementById(fileInputId);
      const filePreview = document.getElementById(previewId);

      if(!dropZone || !fileInput) return;

      dropZone.addEventListener('click', () => fileInput.click());

      dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
      });

      dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
      });

      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
          fileInput.files = e.dataTransfer.files;
          updatePreview();
        }
      });

      fileInput.addEventListener('change', updatePreview);

      function updatePreview() {
        if (fileInput.files.length > 0) {
          const file = fileInput.files[0];
          filePreview.innerHTML = `<div class="text-sm text-charcoal-900 bg-sand-100 px-4 py-2 rounded-lg flex items-center gap-2">
            <svg class="w-4 h-4 text-bronze-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            Selected: ${file.name}
          </div>`;
        } else {
          filePreview.innerHTML = '';
        }
      }
    }

    function initDropZone() {
      setupDropZone('drop-zone', 'file-input', 'file-preview');
      setupDropZone('room-drop-zone', 'room-file-input', 'room-file-preview');
    }

    // ═══════════════════════════════════════════
    //  FORM SUBMISSION — POST /api/products
    // ═══════════════════════════════════════════
    function initFormSubmission() {
      const form = document.getElementById('upload-form');
      const submitBtn = document.getElementById('modal-submit-btn');

      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Build FormData
        const formData = new FormData();

        // File uploads
        const fileInput = document.getElementById('file-input');
        if (fileInput.files.length > 0) {
          formData.append('main_image', fileInput.files[0]);
        }
        
        const roomFileInput = document.getElementById('room-file-input');
        if (roomFileInput && roomFileInput.files.length > 0) {
          formData.append('room_scene_url', roomFileInput.files[0]);
        }

        // Basic fields
        formData.append('name', document.getElementById('tile-name').value);
        formData.append('series', document.getElementById('tile-series').value);
        formData.append('category', document.getElementById('tile-category').value);
        formData.append('size', document.getElementById('tile-size').value);
        formData.append('thickness', document.getElementById('tile-thickness').value || '');
        formData.append('finish', document.getElementById('tile-finish').value || '');
        formData.append('surface', document.getElementById('tile-surface').value || '');
        formData.append('color', document.getElementById('tile-color').value || '');
        formData.append('surface_texture', document.getElementById('tile-texture').value || '');
        formData.append('description', document.getElementById('tile-description').value || '');
        formData.append('price', document.getElementById('tile-price').value || '');
        formData.append('video_url', document.getElementById('tile-video-url').value || '');

        // Applications (checkboxes)
        const selectedApps = [...document.querySelectorAll('.application-check:checked')].map(cb => cb.value);
        formData.append('application', JSON.stringify(selectedApps));

        // URL fallbacks
        const thumbUrl = document.getElementById('thumbnail-url').value;
        if (!fileInput.files.length && thumbUrl) {
          formData.append('image_url', thumbUrl);
        }
        
        const roomSceneUrl = document.getElementById('tile-room-scene').value;
        if ((!roomFileInput || !roomFileInput.files.length) && roomSceneUrl) {
          formData.append('room_scene_url', roomSceneUrl); // Handled as URL fallback
        }

        // Featured flag
        const isFeatured = document.getElementById('tile-banner').checked;
        formData.append('is_featured', isFeatured.toString());

        // Submit
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Saving...
        `;

        try {
          const editId = document.getElementById('edit-product-id').value;
          const url = editId ? `${API_BASE}/api/products/${editId}` : `${API_BASE}/api/products`;
          const method = editId ? 'PUT' : 'POST';

          const res = await fetch(url, {
            method: method,
            body: formData,
          });

          const json = await res.json();

          if (json.success) {
            showToast(`"${json.data.name}" ${editId ? 'updated' : 'added'} successfully!`, 'success');
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
          submitBtn.innerHTML = `
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Save Product
          `;
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
      document.getElementById('tile-color').value = product.color || '';
      document.getElementById('tile-texture').value = product.surface_texture || '';
      document.getElementById('tile-description').value = product.description || '';
      document.getElementById('tile-price').value = product.price || '';
      document.getElementById('tile-video-url').value = product.video_url || '';
      
      document.getElementById('thumbnail-url').value = product.main_image || '';
      document.getElementById('tile-room-scene').value = product.room_scene_url || '';
      
      document.getElementById('tile-banner').checked = product.is_featured || false;
      
      // Applications
      document.querySelectorAll('.application-check').forEach(cb => cb.checked = false);
      let appsToUse = product.application;
      if (typeof appsToUse === 'string') {
         try { appsToUse = JSON.parse(appsToUse); } catch(e) {}
         if (typeof appsToUse === 'string') {
            try { appsToUse = JSON.parse(appsToUse); } catch(e) {}
         }
      }
      if(appsToUse && Array.isArray(appsToUse)) {
         appsToUse.forEach(app => {
            const cb = document.querySelector(`.application-check[value="${app}"]`);
            if(cb) cb.checked = true;
         });
      }
      
      document.getElementById('modal-title').textContent = 'Edit Product';
      document.getElementById('modal-submit-btn').innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
        Update Product
      `;
      openModal();
    }

    // ═══════════════════════════════════════════
    //  TOAST NOTIFICATIONS
    // ═══════════════════════════════════════════
    function showToast(message, type = 'success') {
      const container = document.getElementById('toast-container');
      if (!container) return;
      const toast = document.createElement('div');
      toast.className = \`toast flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg border \${
        type === 'success'
          ? 'bg-green-50 border-green-200 text-green-800'
          : 'bg-red-50 border-red-200 text-red-800'
      }\`;
      toast.innerHTML = \`
        <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          \${type === 'success'
            ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>'
            : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>'
          }
        </svg>
        <span class="text-sm font-medium">\${message}</span>
      \`;
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

    async function loadCatalogues() {
      try {
        const res = await fetch('/api/catalogues');
        const catalogues = await res.json();
        const tbody = document.getElementById('catalogues-tbody');
        tbody.innerHTML = catalogues.map(c => `
          <tr class="hover:bg-sand-50/30 transition-colors group">
            <td class="py-4 px-6 text-sm font-medium text-charcoal-800">${c.title}</td>
            <td class="py-4 px-6 text-sm text-stone-500">
              <a href="${c.pdf_url}" target="_blank" class="text-bronze-600 hover:underline flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                View PDF
              </a>
            </td>
            <td class="py-4 px-6 text-sm text-stone-500">${new Date(c.created_at).toLocaleDateString()}</td>
            <td class="py-4 px-6 text-right">
              <button onclick="deleteCatalogue(${c.id})" class="text-red-500 hover:text-red-700 transition-colors p-2 rounded-lg hover:bg-red-50">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </td>
          </tr>
        `).join('');
      } catch (err) {
        console.error('Failed to load catalogues', err);
      }
    }

        catalogueForm.addEventListener('submit', async (e) => {
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

    async function deleteCatalogue(id) {
      if(confirm('Are you sure you want to delete this catalogue?')) {
        try {
          await fetch(`/api/catalogues/${id}`, { method: 'DELETE' });
          loadCatalogues();
        } catch (err) {
          alert('Failed to delete catalogue');
        }
      }
    }

    // Call loadCatalogues alongside loadProducts
    // Ensure we trigger it when tab switches or on init.
    loadCatalogues();

