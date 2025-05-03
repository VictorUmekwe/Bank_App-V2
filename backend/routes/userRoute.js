import express from 'express';
import { deleteUser, getBalance, getUsers, suspendUser, updateUser } from '../controllers/userController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
const router = express.Router();

router.use(protect);
router.get('/', adminOnly, getUsers);
router.get('/balance/me', getBalance);
router.put('/:id', adminOnly, updateUser);
router.patch('/suspend/:id', adminOnly, suspendUser);
router.delete('/:id', adminOnly, deleteUser);

export {router as userRoute}