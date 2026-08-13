require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

cloudinary.uploader.upload('public/assets/images/tiles/grey_stone.png', (error, result) => {
  if (error) {
    console.error('Cloudinary Error Details:', error);
  } else {
    console.log('Success:', result);
  }
});
