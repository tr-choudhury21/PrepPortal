const mongoose = require('mongoose');
const Document = require('../models/docModel');
const User = require('../models/userModel');
const upload = require('../config/multerConfig');
const ObjectId = mongoose.Types.ObjectId;
const path = require("path");


// Create a new document along with attached file

module.exports.createDocument = [

    upload.single("file"),    
    async (req, res) => {
        try {
            // console.log("Request Body:", req.body);
            // console.log("Uploaded File:", req.file);

            const { subject,semester, year, content, branch } = req.body;
            const document = new Document({
                _id: new ObjectId(),
                subject,
                semester, 
                year,
                content,
                branch,
                uploadedBy: req.user._id,
                fileUrl: req.file ? req.file.path : null,
                fileOriginalName: req.file ? req.file.originalname : null,
                fileName: req.file ? req.file.filename : null, // File URL from Cloudinary
            });
            await document.save();
            await document.populate('uploadedBy', 'fullName');
            res.status(201).json({
                success: true,
                message: "Document created successfully",
                document,
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                error: error.message,
            });
        }
    }

];








//Simply for uploading files

module.exports.uploadFile = async(req, res) => {
    if (req.file) {
        res.status(200).json({ url: req.file.path }); // Cloudinary URL
    } else {
        res.status(400).json({ error: 'No file uploaded' });
    }
};





// Upload multiple files
module.exports.uploadMultipleFiles = async (req, res) => {
    if (req.files && req.files.length > 0) {
        const fileUrls = req.files.map(file => file.path); // Assuming file URLs are stored in file.path
        res.status(200).json({ urls: fileUrls });
    } else {
        res.status(400).json({ error: 'No files uploaded' });
    }
};








// Get all documents
module.exports.getAllDocuments = async (req, res) => {
    try {
        const { branch } = req.query;
        const filter = branch ? { branch } : {};
        const documents = await Document.find(filter);
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};







// Get a document by branch
module.exports.getDocumentsByBranch = async (req, res) => {
    // const { branch } = req.query;
    try {
        const branch = req.query.branch

        const documents = await Document.find({ branch: branch });
            

        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};







// Get a document by ID
module.exports.getDocumentById = async (req, res) => {
    try {
        const document = await Document.findById(req.params.id).populate('uploadedBy', 'fullName');
        if (!document) {
        return res.status(404).json({ error: 'Document not found' });
        }
        res.status(200).json(document);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};







// Update a document by ID
module.exports.updateDocumentById = async (req, res) => {
    try {
        const document = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!document) {
        return res.status(404).json({ error: 'Document not found' });
        }
        res.status(200).json(document);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};







// Delete a document by ID
module.exports.deleteDocumentById = async (req, res) => {
    try {
        const document = await Document.findByIdAndDelete(req.params.id);
        if (!document) {
        return res.status(404).json({ error: 'Document not found' });
        }
        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};







// Search documents by query parameters
module.exports.searchDocuments = async (req, res) => {
    try {
        const { subject, semester, year, branch } = req.query;
        const query = {};
        if (subject) query.subject = subject;
        if (semester) query.semester = semester;
        if (year) query.year = year;
        if (branch) query.branch = branch;
        
        const documents = await Document.find(query);
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};






// Archive a document by ID
module.exports.archiveDocumentById = async (req, res) => {
    try {
        const document = await Document.findByIdAndUpdate(req.params.id, { archived: true }, { new: true });
        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }
        res.status(200).json(document);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};






// Restore an archived document by ID
module.exports.restoreDocumentById = async (req, res) => {
    try {
        const document = await Document.findByIdAndUpdate(req.params.id, { archived: false }, { new: true });
        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }
        res.status(200).json(document);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};






module.exports.downloadDocumentById = async(req, res) => {

    try{
        const document = await Document.findById(req.params.id);

        if(!document || !document.fileUrl){
            return res.status(404).json({
                error: "Document Not Found!"
            });
        }

        const filePath = path.resolve(document.fileUrl);

        res.download(filePath, document.fileOriginalName, (err) => {
            if (err) {
                res.status(500).json({ error: 'Failed to download the file' });
            }
        });
    }
    catch(error){
        res.status(500).json({
            error: error.message
        });
    }
};





//Get the user's uploaded document
module.exports.getUserDocuments = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming you have middleware to set req.user
        const documents = await Document.find({ uploadedBy: userId });
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
