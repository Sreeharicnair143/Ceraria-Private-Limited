// test-local-api.js
const request = require('http').request;

const data = JSON.stringify({
  name: 'Luton Dark Blue Decor',
  series: 'Metallic',
  category: 'Porcelain Tiles',
  size: '600x1200',
  price: '3000.00',
  offer_price: '45.00'
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/products/21',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
    // Wait, the API requires a token, or we can bypass it by temporarily removing requireAdmin in server.js
  }
};

// I will just modify server.js locally to bypass auth for this test.
