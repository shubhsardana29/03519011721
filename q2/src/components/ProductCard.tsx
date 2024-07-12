import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border rounded p-4 shadow-md">
      <img src={`https://picsum.photos/seed/${product.id}/200/200`} alt={product.name} className="w-full h-48 object-cover mb-2" />
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p>Company: {product.company}</p>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}</p>
      <p>Discount: {product.discount}%</p>
      <p>Availability: {product.availability}</p>
      <Link to={`/product/${product.id}`} className="text-blue-500 hover:underline">View Details</Link>
    </div>
  );
};

export default ProductCard;