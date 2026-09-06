import { Router } from 'express';
import { createOrder, myOrders, getOrder, allOrders, updateStatus } from '../controllers/orderController.js';
import { protect, adminOnly } from '../middleware/auth.js';
const router = Router();
router.post('/', protect, createOrder); router.get('/my-orders', protect, myOrders); router.get('/', protect, adminOnly, allOrders); router.get('/:id', protect, getOrder); router.put('/:id/status', protect, adminOnly, updateStatus);
export default router;
