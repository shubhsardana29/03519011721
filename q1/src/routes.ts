import { Application } from 'express';
import { getProducts, getProductDetails } from './controllers/productController';

export const registerRoutes = (app: Application) => {
  app.get('/categories/:categoryname/products', getProducts);
  app.get('/categories/:categoryname/products/:productid', getProductDetails);
};