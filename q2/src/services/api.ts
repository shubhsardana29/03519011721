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
  try {
    const response = await fetch(`${API_BASE_URL}/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwNzEyNjcyLCJpYXQiOjE3MjA3MTIzNzIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6Ijg4MjEwODZkLTYzMmItNGFjMC04NjNiLTM3MTczYjdiZTg4NyIsInN1YiI6InNodWJoLjAzNTE5MDExNzIxQGlwdS5hYy5pbiJ9LCJjb21wYW55TmFtZSI6IjEwMHhkZXZzIiwiY2xpZW50SUQiOiI4ODIxMDg2ZC02MzJiLTRhYzAtODYzYi0zNzE3M2I3YmU4ODciLCJjbGllbnRTZWNyZXQiOiJiYXFNaVlCb0VTU1FXWE51Iiwib3duZXJOYW1lIjoiU2h1YmggU2FyZGFuYSIsIm93bmVyRW1haWwiOiJzaHViaC4wMzUxOTAxMTcyMUBpcHUuYWMuaW4iLCJyb2xsTm8iOiIwMzUxOTAxMTcyMSJ9.0KMKCIKLegoWbOilkk2RLo-6rsMTUkIaYZR4mIvYyRQ'
      }
    });

    if (!response.ok) {
      console.error('HTTP error', response.status, response.statusText);
      throw new Error(`Network response was not ok, please replace token: ${response.statusText}`);
    }

    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error', error);
    throw error;
  }
};
