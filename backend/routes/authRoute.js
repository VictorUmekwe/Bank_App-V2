import express from 'express';
import { authUser, logoutUser, registerUser, getProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
 
router.post('/register', registerUser);
router.post('/', authUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getProfile);

export {router as authRoute};

