import { Router } from 'express';
import { listUsers, getUser, updateUser } from '../controllers/userController.js';
import { protect, adminOnly } from '../middleware/auth.js';
const router = Router();
router.get('/', protect, adminOnly, listUsers); router.get('/:id', protect, adminOnly, getUser); router.put('/:id', protect, adminOnly, updateUser);
export default router;
