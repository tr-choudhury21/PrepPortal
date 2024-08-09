const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    // userId: {
    //     type: String,
    //     required: true,
    // },
    subject: {
        type: String,
        required: true,
    },
    semester: {
        type: Number,
    },
    year: {
        type: Number,
    },
    content: {
        type: String,
        trim: true,
    },
    fileUrl:{
        type: String,
    },
    fileOriginalName:{
        type: String,
    },
    fileName:{
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    // tags: [{
    //     type: String,
    // }],
});

documentSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});


module.exports = mongoose.model('Document', documentSchema);
