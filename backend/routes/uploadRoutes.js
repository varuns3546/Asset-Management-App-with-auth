import express from 'express';
import uploadController from '../controllers/uploadController.js';
const { getDocuments, getPhotos, getDocument, getPhoto, uploadDocument, uploadPhoto, deleteDocument, deletePhoto } = uploadController;
import supabaseClient from '../config/supabaseClient.js';
const {authenticateUser} = supabaseClient;
const router = express.Router();

router.use(authenticateUser);

// Get all documents
router.get('/documents', getDocuments);
// Get all photos  
router.get('/photos', getPhotos);
// Get specific document by filename
router.get('/documents/:fileName', getDocument);
// Get specific photo by filename
router.get('/photos/:fileName', getPhoto);
// Upload document
router.post('/documents', uploadDocument);
// Upload photo
router.post('/photos', uploadPhoto);
// Delete document
router.delete('/documents/:fileName', deleteDocument);
// Delete photo
router.delete('/photos/:fileName', deletePhoto);

export default router;
