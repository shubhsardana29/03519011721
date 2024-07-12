import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import NodeCache from 'node-cache';
import { Product } from '../types';

const BASE_URL = 'http://20.244.56.144/test';
const cache = new NodeCache({ stdTTL: 30 });

export async function fetchProductsFromCompany(company: string, category: string, top: number, minPrice: number, maxPrice: number, token: string): Promise<Product[]> {
  const cacheKey = `${company}-${category}-${top}-${minPrice}-${maxPrice}`;
  const cachedData = cache.get<Product[]>(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }

  const url = `${BASE_URL}/companies/${company}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
  const response = await axios.get(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const products = response.data.map((product: Product) => ({ ...product, id: uuidv4(), company }));
  
  cache.set(cacheKey, products);
  return products;
}

export function dynamicSort(products: Product[], sortBy: keyof Product, sortOrder: 'asc' | 'desc'): Product[] {
  return [...products].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
}