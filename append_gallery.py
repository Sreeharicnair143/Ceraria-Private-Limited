with open('public/admin_script_4.js', 'a', encoding='utf-8') as f:
    f.write('''
// ════════════════════════════════════════════════════════════
//  GALLERY MANAGEMENT
// ════════════════════════════════════════════════════════════

const galleryModal = document.getElementById('gallery-modal');

function openGalleryModal() {
  if (galleryModal) {
    galleryModal.classList.remove('hidden');
  }
}

function closeGalleryModal() {
  if (galleryModal) {
    galleryModal.classList.add('hidden');
    document.getElementById('gallery-form').reset();
  }
}

async function fetchGalleryImages() {
  try {
    const res = await fetch('/api/gallery');
    const json = await res.json();
    const tbody = document.getElementById('gallery-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    if (json.success && json.data.length > 0) {
      json.data.forEach(img => {
        const date = new Date(img.created_at).toLocaleDateString();
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-sand-50/50 transition-colors';
        tr.innerHTML = `
          <td class="py-3 px-6">
            <img src="${img.image_url}" alt="${img.title || 'Gallery Image'}" class="h-12 w-16 object-cover rounded shadow-sm" />
          </td>
          <td class="py-3 px-6 text-sm text-charcoal-900 font-medium">${img.title || '<span class="text-stone-400 italic">Untitled</span>'}</td>
          <td class="py-3 px-6 text-sm text-stone-500">${date}</td>
          <td class="py-3 px-6 text-right">
            <button onclick="deleteGalleryImage('${img.id}')" class="text-red-500 hover:text-red-700 transition-colors" title="Delete">
              <svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    } else {
      tbody.innerHTML = '<tr><td colspan="4" class="py-6 text-center text-stone-500 text-sm">No gallery images uploaded yet.</td></tr>';
    }
  } catch(e) {
    console.error('Failed to fetch gallery images', e);
  }
}

async function handleGallerySubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('g-submit-btn');
  btn.innerText = 'Uploading...';
  btn.disabled = true;
  
  const formData = new FormData();
  formData.append('title', document.getElementById('g-title').value);
  formData.append('image', document.getElementById('g-image').files[0]);
  
  try {
    const res = await fetch('/api/gallery', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    if (data.success) {
      alert('Image uploaded successfully!');
      closeGalleryModal();
      fetchGalleryImages();
    } else {
      alert('Upload failed: ' + data.error);
    }
  } catch(err) {
    alert('An error occurred during upload.');
  } finally {
    btn.innerText = 'Upload';
    btn.disabled = false;
  }
}

async function deleteGalleryImage(id) {
  if(!confirm('Are you sure you want to delete this image?')) return;
  try {
    const res = await fetch('/api/gallery/' + id, { method: 'DELETE' });
    const data = await res.json();
    if(data.success) {
      fetchGalleryImages();
    } else {
      alert('Failed to delete image: ' + data.error);
    }
  } catch(e) {
    alert('An error occurred.');
  }
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  fetchGalleryImages();
});
''')
