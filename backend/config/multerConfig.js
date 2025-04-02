const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryConfig");

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  // params: {
  //     folder: 'uploads', // Cloudinary folder name
  //     allowedFormats: ['jpg', 'jpeg', 'png', 'pdf', 'docx', 'xlsx'],// Allowed formats
  //     public_id: (req, file) => Date.now() + '-' + file.originalname,
  // },
  params: async (req, file) => ({
    folder: "uploads", // Cloudinary folder name
    format: file.mimetype.split("/")[1], // Extract file extension from MIME type
    public_id: Date.now() + "-" + file.originalname.replace(/\s+/g, "_"), // Unique filename
  }),
});

// Configure Multer with Cloudinary Storage
const upload = multer({ storage: storage });

module.exports = upload;
