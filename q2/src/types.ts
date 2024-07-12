export interface Product {
    id: string;
    name: string;
    company: string;
    category: string;
    price: number;
    rating: number;
    discount: number;
    availability: string;
  }
  
  export interface ProductsResponse {
    products: Product[];
    totalPages: number;
    currentPage: number;
  }
  
  export interface QueryParams {
    category?: string;
    company?: string;
    minRating?: number;
    minPrice?: number;
    maxPrice?: number;
    availability?: string;
    sortBy?: keyof Product;
    sortOrder?: 'asc' | 'desc';
    page?: number;
    n?: number;
  }