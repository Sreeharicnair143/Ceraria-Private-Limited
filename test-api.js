// test-api.js
const fetch = require('node-fetch');
const FormData = require('form-data');

async function testApi() {
  const form = new FormData();
  form.append('name', 'Luton Dark Blue Decor');
  form.append('series', 'Metallic');
  form.append('category', 'Porcelain Tiles');
  form.append('size', '600 x 1200 mm');
  form.append('price', '3000.00');
  form.append('offer_price', '49.99'); // Setting offer_price!
  form.append('thickness', '9 mm');
  form.append('finish', 'Matt');
  form.append('surface', 'Rustic Metal');

  try {
    // We can't hit PUT /api/products/:id directly without auth, unless we bypass it.
    // Let's modify server.js temporarily to remove requireAdmin for testing.
  } catch(e) {
    console.error(e);
  }
}
