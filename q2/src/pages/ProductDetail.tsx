import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { Product } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      const data = await getProductById(productId);
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="border rounded p-4 shadow-md">
        <img src={`https://picsum.photos/seed/${product.id}/400/400`} alt={product.name} className="w-full h-64 object-cover mb-4" />
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-xl mb-2">Company: {product.company}</p>
        <p className="mb-2">Category: {product.category}</p>
        <p className="mb-2">Price: ${product.price}</p>
        <p className="mb-2">Rating: {product.rating}</p>
        <p className="mb-2">Discount: {product.discount}%</p>
        <p className="mb-4">Availability: {product.availability}</p>
        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Back to All Products
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;