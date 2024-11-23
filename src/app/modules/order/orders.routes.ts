import express from 'express';
import { OrderController } from './orders.controller';
const router = express.Router();

router.post('/', OrderController.createUserOrder);
router.get('/revenue', OrderController.getTotalRevenue);

export const OrderRoute = router;
