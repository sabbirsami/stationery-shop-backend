import express from 'express';
import { ProductController } from './product.controller';
const router = express.Router();

router.post('/', ProductController.createProduct);
router.get('/', ProductController.getAllProduct);
router.get('/:productId', ProductController.getSingleProductDetails);
router.put('/:productId', ProductController.updateProduct);
router.delete('/:productId', ProductController.deleteProduct);

export const ProductRoute = router;
