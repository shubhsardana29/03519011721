// import axios from 'axios';
// import { Product, ProductsResponse, QueryParams } from '../types';

// const API_BASE_URL = 'http://localhost:3000'; 

// const headers = {
//   'Content-Type': 'application/json',
//   'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwNzEyNjcyLCJpYXQiOjE3MjA3MTIzNzIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6Ijg4MjEwODZkLTYzMmItNGFjMC04NjNiLTM3MTczYjdiZTg4NyIsInN1YiI6InNodWJoLjAzNTE5MDExNzIxQGlwdS5hYy5pbiJ9LCJjb21wYW55TmFtZSI6IjEwMHhkZXZzIiwiY2xpZW50SUQiOiI4ODIxMDg2ZC02MzJiLTRhYzAtODYzYi0zNzE3M2I3YmU4ODciLCJjbGllbnRTZWNyZXQiOiJiYXFNaVlCb0VTU1FXWE51Iiwib3duZXJOYW1lIjoiU2h1YmggU2FyZGFuYSIsIm93bmVyRW1haWwiOiJzaHViaC4wMzUxOTAxMTcyMUBpcHUuYWMuaW4iLCJyb2xsTm8iOiIwMzUxOTAxMTcyMSJ9.0KMKCIKLegoWbOilkk2RLo-6rsMTUkIaYZR4mIvYyRQ'
// };

// export const getProducts = async (params: QueryParams): Promise<ProductsResponse> => {
//   try {
//     // Fetch all products from the API
//     const response = await axios.get(`${API_BASE_URL}/categories/${params.category || 'all'}/products`, {
//       headers: headers,
//       params: {
//         n: 1000 // Request a large number of products to allow client-side filtering
//       }
//     });

//     let products: Product[] = response.data.products;

//     // Apply filtering
//     const filteredProducts = products.filter(product => 
//       (!params.company || product.company === params.company) &&
//       (!params.minRating || product.rating >= params.minRating) &&
//       (!params.minPrice || product.price >= params.minPrice) &&
//       (!params.maxPrice || product.price <= params.maxPrice) &&
//       (!params.availability || product.availability === params.availability)
//     );

//     // Apply sorting
//     if (params.sortBy) {
//       filteredProducts.sort((a, b) => {
//         if (a[params.sortBy!] < b[params.sortBy!]) return params.sortOrder === 'asc' ? -1 : 1;
//         if (a[params.sortBy!] > b[params.sortBy!]) return params.sortOrder === 'asc' ? 1 : -1;
//         return 0;
//       });
//     }

//     // Apply pagination
//     const page = params.page || 1;
//     const n = params.n || 10;
//     const totalProducts = filteredProducts.length;
//     const totalPages = Math.ceil(totalProducts / n);
//     const paginatedProducts = filteredProducts.slice((page - 1) * n, page * n);

//     return {
//       products: paginatedProducts,
//       totalPages,
//       currentPage: page
//     };
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     throw error;
//   }
// };

// export const getProductById = async (id: string): Promise<Product | null> => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/categories/all/products/${id}`, {
//       headers: headers
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching product:', error);
//     return null;
//   }
// };

import { Product, ProductsResponse, QueryParams } from '../types';

// Dummy data
const dummyProducts: Product[] = [
  {
    id: '1',
    name: 'Smartphone X',
    company: 'TechCo',
    category: 'Phone',
    price: 999,
    rating: 4.5,
    discount: 10,
    availability: 'In Stock'
  },
  {
    id: '2',
    name: 'Laptop Pro',
    company: 'ComputerCorp',
    category: 'Computer',
    price: 1499,
    rating: 4.8,
    discount: 5,
    availability: 'In Stock'
  },
  {
    id: '3',
    name: 'Wireless Earbuds',
    company: 'AudioTech',
    category: 'Earphone',
    price: 199,
    rating: 4.2,
    discount: 15,
    availability: 'Out of Stock'
  },
  {
    id: '4',
    name: 'Smart TV 4K',
    company: 'VisionElec',
    category: 'TV',
    price: 799,
    rating: 4.6,
    discount: 8,
    availability: 'In Stock'
  },
  {
    id: '5',
    name: 'Gaming Mouse',
    company: 'GameGear',
    category: 'Mouse',
    price: 79,
    rating: 4.4,
    discount: 20,
    availability: 'In Stock'
  }
];

export const getProducts = async (params: QueryParams): Promise<ProductsResponse> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay

  const filteredProducts = dummyProducts.filter(product => 
    (!params.category || product.category === params.category) &&
    (!params.company || product.company === params.company) &&
    (!params.minRating || product.rating >= params.minRating) &&
    (!params.minPrice || product.price >= params.minPrice) &&
    (!params.maxPrice || product.price <= params.maxPrice) &&
    (!params.availability || product.availability === params.availability)
  );

  if (params.sortBy) {
    filteredProducts.sort((a, b) => {
      if (a[params.sortBy!] < b[params.sortBy!]) return params.sortOrder === 'asc' ? -1 : 1;
      if (a[params.sortBy!] > b[params.sortBy!]) return params.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const page = params.page || 1;
  const n = params.n || 10;
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / n);
  const paginatedProducts = filteredProducts.slice((page - 1) * n, page * n);

  return {
    products: paginatedProducts,
    totalPages,
    currentPage: page
  };
};

export const getProductById = async (id: string): Promise<Product | null> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  return dummyProducts.find(p => p.id === id) || null;
};