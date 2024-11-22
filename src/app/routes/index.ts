import express from 'express';
import { ProductRoute } from '../modules/product/product.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: 'products',
    route: ProductRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
