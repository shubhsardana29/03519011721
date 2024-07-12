import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import { Product, QueryParams } from '../types';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';

const AllProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [queryParams, setQueryParams] = useState<QueryParams>({
    category: '',
    company: '',
    minRating: 0,
    minPrice: 0,
    maxPrice: 10000,
    availability: '',
    sortBy: 'price',
    sortOrder: 'asc',
    page: 1,
    n: 10
  });

  useEffect(() => {
    fetchProducts();
  }, [queryParams]);

  const fetchProducts = async () => {
    try {
      const response = await getProducts(queryParams);
      setProducts(response.products);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setQueryParams(prev => ({ ...prev, [name]: value }));
  };

  const handlePageChange = (page: number) => {
    setQueryParams(prev => ({ ...prev, page }));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Top Products</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <input className="border p-2 rounded" name="category" placeholder="Category" value={queryParams.category} onChange={handleInputChange} />
        <input className="border p-2 rounded" name="company" placeholder="Company" value={queryParams.company} onChange={handleInputChange} />
        <input className="border p-2 rounded" name="minRating" type="number" placeholder="Min Rating" value={queryParams.minRating} onChange={handleInputChange} />
        <input className="border p-2 rounded" name="minPrice" type="number" placeholder="Min Price" value={queryParams.minPrice} onChange={handleInputChange} />
        <input className="border p-2 rounded" name="maxPrice" type="number" placeholder="Max Price" value={queryParams.maxPrice} onChange={handleInputChange} />
        <select className="border p-2 rounded" name="availability" value={queryParams.availability} onChange={handleInputChange}>
          <option value="">All Availability</option>
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
        <select className="border p-2 rounded" name="sortBy" value={queryParams.sortBy} onChange={handleInputChange}>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
          <option value="discount">Discount</option>
        </select>
        <select className="border p-2 rounded" name="sortOrder" value={queryParams.sortOrder} onChange={handleInputChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination 
        currentPage={queryParams.page || 1}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllProducts;