import { Request, Response } from 'express';
import { fetchProducts, fetchProductDetails } from '../services/productService';

export const getProducts = async (req: Request, res: Response) => {
    try {
      const { categoryname } = req.params;
      const { n, page, sort } = req.query;
      const token = req.headers.authorization?.split(' ')[1] || '';
  
      const products = await fetchProducts(categoryname, Number(n), Number(page), String(sort), token);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export const getProductDetails = async (req: Request, res: Response) => {
    try {
      const { categoryname, productid } = req.params;
      const token = req.headers.authorization?.split(' ')[1] || '';
  
      const product = await fetchProductDetails(categoryname, productid, token);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };