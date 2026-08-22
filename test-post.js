const fs = require('fs');

// We need a test image. Let's create a dummy file.
fs.writeFileSync('dummy.jpg', 'fake image content');

const FormData = require('form-data');
const fetch = require('node-fetch');

async function testUpload() {
  const form = new FormData();
  form.append('name', 'Test Tile');
  form.append('series', 'Test Series');
  form.append('size', '600x600');
  form.append('main_image', fs.createReadStream('dummy.jpg'));
  // also add thumb_images to trigger the code path
  form.append('thumb_images', fs.createReadStream('dummy.jpg'));
  form.append('thumb_images', fs.createReadStream('dummy.jpg'));

  try {
    const res = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      body: form,
      // Note: we need admin auth. Oh, the API might have `requireAdmin`.
      // Let's check server.js for how requireAdmin works.
    });
    
    const text = await res.text();
    console.log("Response:", res.status, text);
  } catch(e) {
    console.error(e);
  }
}

testUpload();
