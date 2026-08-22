import os

file_path = 'public/admin.html'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add setupGalleryDropZone to initDropZone
old_init_drop_zone = """    function initDropZone() {
      setupDropZone('drop-zone', 'file-input', 'file-preview');
      setupDropZone('room-drop-zone', 'room-file-input', 'room-file-preview');
    }"""
new_init_drop_zone = """    function initDropZone() {
      setupDropZone('drop-zone', 'file-input', 'file-preview');
      setupDropZone('room-drop-zone', 'room-file-input', 'room-file-preview');
      setupGalleryDropZone('gallery-drop-zone', 'gallery-file-input', 'gallery-file-preview');
    }

    function setupGalleryDropZone(dropZoneId, fileInputId, previewId) {
      const dropZone = document.getElementById(dropZoneId);
      const fileInput = document.getElementById(fileInputId);
      const filePreview = document.getElementById(previewId);

      if(!dropZone || !fileInput) return;

      dropZone.addEventListener('click', () => fileInput.click());
      dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
      dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
          const dt = new DataTransfer();
          for (let i = 0; i < Math.min(e.dataTransfer.files.length, 5); i++) {
            dt.items.add(e.dataTransfer.files[i]);
          }
          fileInput.files = dt.files;
          updateGalleryPreview();
        }
      });
      fileInput.addEventListener('change', updateGalleryPreview);

      function updateGalleryPreview() {
        if (fileInput.files.length > 0) {
          let html = '';
          for (let i = 0; i < fileInput.files.length; i++) {
            html += `<div class="text-sm text-charcoal-900 bg-sand-100 px-3 py-1.5 rounded-lg flex items-center gap-2 mt-1">
              <svg class="w-4 h-4 text-bronze-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              ${fileInput.files[i].name}
            </div>`;
          }
          filePreview.innerHTML = html;
        } else {
          filePreview.innerHTML = '';
        }
      }
    }"""
content = content.replace(old_init_drop_zone, new_init_drop_zone)


# 2. Append thumb_images in initFormSubmission
old_room_file_input = """        const roomFileInput = document.getElementById('room-file-input');
        if (roomFileInput && roomFileInput.files.length > 0) {
          formData.append('room_scene_url', roomFileInput.files[0]);
        }"""
new_room_file_input = """        const roomFileInput = document.getElementById('room-file-input');
        if (roomFileInput && roomFileInput.files.length > 0) {
          formData.append('room_scene_url', roomFileInput.files[0]);
        }

        const galleryFileInput = document.getElementById('gallery-file-input');
        if (galleryFileInput && galleryFileInput.files.length > 0) {
          for (let i = 0; i < galleryFileInput.files.length; i++) {
            formData.append('thumb_images', galleryFileInput.files[i]);
          }
        }"""
content = content.replace(old_room_file_input, new_room_file_input)


# 3. Pass existing thumb_images
old_room_scene_url = """        const roomSceneUrl = document.getElementById('tile-room-scene').value;
        if ((!roomFileInput || !roomFileInput.files.length) && roomSceneUrl) {
          formData.append('room_scene_url', roomSceneUrl); // Handled as URL fallback
        }"""
new_room_scene_url = """        const roomSceneUrl = document.getElementById('tile-room-scene') ? document.getElementById('tile-room-scene').value : '';
        if ((!roomFileInput || !roomFileInput.files.length) && roomSceneUrl) {
          formData.append('room_scene_url', roomSceneUrl); // Handled as URL fallback
        }

        const existingThumbsInput = document.getElementById('existing-thumb-images');
        if ((!galleryFileInput || galleryFileInput.files.length === 0) && existingThumbsInput) {
          formData.append('thumb_images_text', existingThumbsInput.value);
        }"""
content = content.replace(old_room_scene_url, new_room_scene_url)


# 4. Preview in editProduct
old_edit_product_urls = """      document.getElementById('thumbnail-url').value = product.main_image || '';
      document.getElementById('tile-room-scene').value = product.room_scene_url || '';"""
new_edit_product_urls = """      if(document.getElementById('thumbnail-url')) document.getElementById('thumbnail-url').value = product.main_image || '';
      if(document.getElementById('tile-room-scene')) document.getElementById('tile-room-scene').value = product.room_scene_url || '';
      
      let existingThumbs = product.thumb_images || '[]';
      if(typeof existingThumbs !== 'string') existingThumbs = JSON.stringify(existingThumbs);
      
      let existingThumbsInput = document.getElementById('existing-thumb-images');
      if (!existingThumbsInput) {
        existingThumbsInput = document.createElement('input');
        existingThumbsInput.type = 'hidden';
        existingThumbsInput.id = 'existing-thumb-images';
        document.getElementById('upload-form').appendChild(existingThumbsInput);
      }
      existingThumbsInput.value = existingThumbs;

      const galleryPreview = document.getElementById('gallery-file-preview');
      if(galleryPreview) {
        try {
          const thumbsArr = JSON.parse(existingThumbs);
          if(Array.isArray(thumbsArr) && thumbsArr.length > 0) {
            galleryPreview.innerHTML = thumbsArr.map((url, i) => `
              <div class="relative w-16 h-16 rounded overflow-hidden border border-sand-200">
                <img src="${url}" class="w-full h-full object-cover" />
              </div>
            `).join('');
          } else {
            galleryPreview.innerHTML = '';
          }
        } catch(e) {
          galleryPreview.innerHTML = '';
        }
      }"""
content = content.replace(old_edit_product_urls, new_edit_product_urls)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("admin.html patched successfully.")
