const mongoose = require('mongoose');


const documentSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    semester: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    branch: {
        type: String,
        required: true,
        enum: ['CSE', 'ECE', 'EE', 'ME', 'CE', 'EIE', 'PE', 'BE', 'CHE'],
    },
    content: {
        type: String,
        trim: true,
    },
    fileUrl: {
        type: String,
    },
    fileOriginalName: {
        type: String,
    },
    fileName: {
        type: String,
    },
    uploadedBy: { // New field for uploader's name or ID
        type: mongoose.Schema.Types.ObjectId, // Stores reference to a User object
        ref: 'Users', // Assumes a User model exists
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

documentSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Document', documentSchema);
