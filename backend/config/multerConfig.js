const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig');

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // Cloudinary folder name
        allowedFormats: ['jpg', 'jpeg', 'png', 'pdf'],// Allowed formats
        public_id: (req, file) => Date.now() + '-' + file.originalname, 
    },
});

// Configure Multer with Cloudinary Storage
const upload = multer({ storage: storage });

module.exports = upload;
