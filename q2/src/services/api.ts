
export interface Product {
    id: number;
    productName: string;
    price: number;
    rating: number;
    discount: number;
    availability: string;
  }
  
  const API_BASE_URL = 'http://20.244.56.144/test';
  
  export const fetchProducts = async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: Product[] = await response.json();
    return data;
  };
  