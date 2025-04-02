const express = require('express');
const {createDocument, 
    uploadFile, 
    getAllDocuments, 
    uploadMultipleFiles, 
    getDocumentById, 
    searchDocuments, 
    updateDocumentById, 
    archiveDocumentById, 
    restoreDocumentById, 
    deleteDocumentById,
    downloadDocumentById,
    getDocumentsByBranch,
    getUserDocuments
} = require('../controllers/docController');
const upload = require('../config/multerConfig');
const isUserAuthenticated = require('../middlewares/auth');


const router = express.Router();



// Example route to handle document creation with an uploaded file
router.post('/createdocument',isUserAuthenticated, createDocument);
// Upload single file (e.g., image or PDF)
router.post('/uploadsingle', upload.single('file'), uploadFile);
//Upload multiple files
router.post('/uploadmultiple', upload.array('file', 10), uploadMultipleFiles);

router.get("/getalldocuments", getAllDocuments);
router.get("/getalldocumentsbybranch", getDocumentsByBranch);
router.get("/getdocument/:id", getDocumentById);
router.get("/search", searchDocuments);
router.get("/documents/:id/download", downloadDocumentById);
router.get("/userdocuments",isUserAuthenticated, getUserDocuments);


router.put("update/:id",isUserAuthenticated, updateDocumentById);
router.put("archive/:id",isUserAuthenticated, archiveDocumentById);
router.put("restore/:id",isUserAuthenticated, restoreDocumentById);

router.delete("/delete/:id",isUserAuthenticated, deleteDocumentById);






module.exports = router;
