import express from 'express';
import User from '../models/userModel.js';
import userController from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const {registerUser, loginUser, getUser} = userController
const {protect} = authMiddleware
const router = express.Router();

router.post('/', registerUser) 
router.post('/login', loginUser) 
router.get('/me', protect, getUser) 


export default router;