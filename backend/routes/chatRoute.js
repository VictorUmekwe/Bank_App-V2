import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getMessages, sendMessage } from '../controllers/chatController.js';


const router = express.Router()
router.use(protect)
router.post('/', sendMessage)
router.get('/', getMessages)

export {router as chatRoute}