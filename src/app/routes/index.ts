import express from 'express';
import { ProductRoute } from '../modules/product/product.routes';
import { OrderRoute } from '../modules/order/orders.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/products',
    route: ProductRoute,
  },
  {
    path: '/orders',
    route: OrderRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
