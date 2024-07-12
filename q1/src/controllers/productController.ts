import { Request, Response } from 'express';
import { getProducts, getProductById } from '../services/productService';
import { Product } from '../types';

export const getProductsController = async (req: Request, res: Response): Promise<void> => {
  const { categoryname } = req.params;
  const { n, page, sortBy, sortOrder, minPrice, maxPrice } = req.query;
  const token = (req as any).token;
  if (!token) {
    res.status(400).json({ error: 'Authorization token is required' });
    return;
  }

  try {
    const products = await getProducts(categoryname, {
      n: n ? parseInt(n as string) : undefined,
      page: page ? parseInt(page as string) : undefined,
      sortBy: sortBy as keyof Product,
      sortOrder: sortOrder as 'asc' | 'desc',
      minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined
    }, token);
    res.json(products);
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid category') {
      res.status(400).json({ error: 'Invalid category' });
    } else {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export const getProductByIdController = async (req: Request, res: Response): Promise<void> => {
  const { categoryname, productid } = req.params;
  const token = (req as any).token;

  if (!token) {
    res.status(400).json({ error: 'Authorization token is required' });
    return;
  }

  try {
    const product = await getProductById(categoryname, productid, token);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid category') {
      res.status(400).json({ error: 'Invalid category' });
    } else {
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

