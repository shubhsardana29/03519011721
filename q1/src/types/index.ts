export interface Product {
    id: string;
    productName: string;
    price: number;
    rating: number;
    company: string;
    discount: number;
    availability: string;
  }
  
  export interface ApiResponse {
    products: Product[];
    totalPages: number;
    currentPage: number;
  }
  
  export interface QueryParams {
    n?: number;
    page?: number;
    sortBy?: keyof Product;
    sortOrder?: 'asc' | 'desc';
    minPrice?: number;
    maxPrice?: number;
  }