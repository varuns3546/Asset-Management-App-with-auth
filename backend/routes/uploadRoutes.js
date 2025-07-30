import express from 'express';
import uploadController from '../controllers/uploadController.js';
const { getDocuments, getPhotos, getUpload, uploadDocument, uploadPhoto, deleteUpload } = uploadController;
import supabaseClient from '../config/supabaseClient.js';
const {authenticateUser} = supabaseClient;
const router = express.Router();

router.use(authenticateUser);

// Get all documents
router.get('/documents', getDocuments);
// Get all photos  
router.get('/photos', getPhotos);
// Get specific upload by ID
router.get('/:id', getUpload);
// Upload document
router.post('/documents', uploadDocument);
// Upload photo
router.post('/photos', uploadPhoto);
// Delete upload
router.delete('/:id', deleteUpload);

export default router;
