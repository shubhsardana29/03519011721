import { Router } from 'express';
import { getProductsController, getProductByIdController } from '../controllers/productController';

const router = Router();

router.get('/categories/:categoryname/products', getProductsController);
router.get('/categories/:categoryname/products/:productid', getProductByIdController);

export default router;