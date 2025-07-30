import express from 'express';
import uploadController from '../controllers/uploadController.js';
const { getUploads, getUpload, createUpload, deleteUpload, updateUpload} = entryController
import supabaseClient from '../config/supabaseClient.js';
const {authenticateUser} =supabaseClient
const router = express.Router();

router.use(authenticateUser)

router.get('/', getUploads)
router.get('/:id', getUpload)
router.post('/', createUpload)
router.delete('/:id', deleteUpload)
router.put('/:id', updateUpload)

export default router;
