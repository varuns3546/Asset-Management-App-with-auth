import express from 'express';
import Entry from '../models/entryModel.js';
import entryController from '../controllers/entryController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const {getEntries, getEntry, createEntry, deleteEntry, updateEntry} = entryController
const router = express.Router();

const {protect} = authMiddleware

router.get('/', protect, getEntries)
router.get('/:id', protect, getEntry)
router.post('/', protect, createEntry)
router.delete('/:id', protect, deleteEntry)
router.put('/:id', protect, updateEntry)

export default router;

