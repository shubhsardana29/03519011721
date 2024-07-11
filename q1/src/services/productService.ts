import { fetchFromAPI } from '../utils/apiUtils';

const cache: { [key: string]: any } = {};

export const fetchProducts = async (
  categoryname: string,
  n: number,
  page: number,
    sort: string,
  token: string
) => {
  const cacheKey = `${categoryname}_${n}_${page}_${sort}`;
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
  const products: any[] = [];

  for (const company of companies) {
    const url = `http://20.244.56.144/test/companies/${company}/categories/${categoryname}/products?top=${n}&page=${page}`;
    const data = await fetchFromAPI(url,token);
    products.push(...data);
  }

  // Sort products based on the provided sort parameter
  products.sort((a, b) => {
    if (sort === 'price') {
      return a.price - b.price;
    } else if (sort === 'rating') {
      return b.rating - a.rating;
    } else if (sort === 'discount') {
      return b.discount - a.discount;
    } else {
      return 0;
    }
  });

  const topProducts = products.slice(0, n);

  cache[cacheKey] = topProducts;
  return topProducts;
};

export const fetchProductDetails = async (
  categoryname: string,
    productid: string,
  token: string
) => {
  const cacheKey = `${categoryname}_${productid}`;
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];

  for (const company of companies) {
    const url = `http://20.244.56.144/test/companies/${company}/categories/${categoryname}/products/${productid}`;
    try {
      const data = await fetchFromAPI(url,token);
      cache[cacheKey] = data;
      return data;
    } catch (error) {
      // Product not found in the current company, continue to the next one
    }
  }

  return null;
};