const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig');

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // Cloudinary folder name
        allowedFormats: ['jpg', 'jpeg', 'png', 'pdf', 'docx', 'xlsx'],// Allowed formats
        public_id: (req, file) => Date.now() + '-' + file.originalname, 
    },
});

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: async (req, file) => {
//         // Remove file extension if present to avoid duplicates in `public_id`
//         const originalNameWithoutExt = file.originalname.replace(/\.[^/.]+$/, '');
        
//         return {
//             folder: 'uploads', // Cloudinary folder name
//             allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'], // Allowed formats
//             public_id: Date.now() + '-' + originalNameWithoutExt, // Unique public_id
//             resource_type: file.mimetype === 'application/pdf' ? 'raw' : 'image', // 'raw' for PDFs, 'image' for others
//         };
//     },
// });

// Configure Multer with Cloudinary Storage
const upload = multer({ storage: storage });

module.exports = upload;
