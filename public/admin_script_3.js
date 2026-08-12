
    (async () => {
      try {
        const res = await fetch('/api/admin/check');
        const json = await res.json();
        if (!json.success) {
          window.location.href = '/admin-login';
        }
      } catch (e) {
        window.location.href = '/admin-login';
      }
    })();
    // Video Upload Logic
    async function uploadHomepageVideo(e) {
      e.preventDefault();
      const fileInput = document.getElementById('homepage-video-file');
      const msg = document.getElementById('video-upload-msg');
      const btn = document.getElementById('video-upload-btn');
      
      if (!fileInput.files[0]) return;
      
      const formData = new FormData();
      formData.append('video', fileInput.files[0]);
      
      btn.textContent = 'Uploading...';
      btn.disabled = true;
      msg.className = 'text-sm mt-2 text-stone-500';
      msg.textContent = 'Uploading video, please wait...';
      msg.classList.remove('hidden');

      try {
        const res = await fetch('/api/settings/homepage-video', {
          method: 'POST',
          body: formData
        });
        const json = await res.json();
        if (json.success) {
          msg.textContent = 'Video updated successfully! Refresh the homepage to see changes.';
          msg.className = 'text-sm mt-2 text-green-600 font-medium';
          fileInput.value = '';
        } else {
          msg.textContent = 'Error: ' + json.error;
          msg.className = 'text-sm mt-2 text-red-500';
        }
      } catch (err) {
        msg.textContent = 'Failed to upload video.';
        msg.className = 'text-sm mt-2 text-red-500';
      } finally {
        btn.textContent = 'Upload Video';
        btn.disabled = false;
      }
    }
  