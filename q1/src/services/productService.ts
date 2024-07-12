import { Product, ApiResponse, QueryParams } from '../types';
import { fetchProductsFromCompany, dynamicSort } from '../utils/apiUtils';

const COMPANIES = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
const CATEGORIES = ['Phone', 'Computer', 'TV', 'Earphone', 'Tablet', 'Charger', 'Mouse', 'Keypad', 'Bluetooth', 'Pendrive', 'Remote', 'Speaker', 'Headset', 'Laptop', 'PC'];

export async function getProducts(category: string, queryParams: QueryParams, token: string): Promise<ApiResponse> {
  const { n = 10, page = 1, sortBy = 'price', sortOrder = 'asc', minPrice = 0, maxPrice = Number.MAX_SAFE_INTEGER } = queryParams;

  if (!CATEGORIES.includes(category)) {
    throw new Error('Invalid category');
  }

  let allProducts: Product[] = [];
  for (const company of COMPANIES) {
    const products = await fetchProductsFromCompany(company, category, n * page, minPrice, maxPrice, token);
    allProducts = allProducts.concat(products);
  }

  const sortedProducts = dynamicSort(allProducts, sortBy as keyof Product, sortOrder);
  const totalProducts = sortedProducts.length;
  const totalPages = Math.ceil(totalProducts / n);
  const paginatedProducts = sortedProducts.slice((page - 1) * n, page * n);

  return {
    products: paginatedProducts,
    totalPages,
    currentPage: page
  };
}

export async function getProductById(category: string, productId: string, token: string): Promise<Product | null> {
  if (!CATEGORIES.includes(category)) {
    throw new Error('Invalid category');
  }

  for (const company of COMPANIES) {
    const products = await fetchProductsFromCompany(company, category, 1, 0, Number.MAX_SAFE_INTEGER, token);
    const product = products.find(p => p.id === productId);
    if (product) return product;
  }

  return null;
}