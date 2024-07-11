import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProducts, Product } from '../services/api';

const ProductDetail = () => {
  const { id } = useParams<{ id?: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        if (!id) {
          throw new Error('Product ID is undefined');
        }
  
        const products = await fetchProducts();
        console.log('Fetched products:', products);
  
        // Find the product by productName
        const selectedProduct = products.find((p: Product) => p.productName === id);
  
        if (!selectedProduct) {
          console.error(`Product with ID "${id}" not found`);
          throw new Error('Product not found');
        }
  
        setProduct(selectedProduct);
      } catch (error) {
        console.error('Error fetching or processing product:', error);
        setProduct(null); // Clear product state on error
      }
    };
  
    getProduct();
  }, [id]);
  

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{product.productName}</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <p>Price: <span className="font-bold">${product.price}</span></p>
          <p>Rating: <span className="text-yellow-500">{product.rating}</span></p>
          <p>Discount: <span className="text-green-500">{product.discount}%</span></p>
          <p>Availability: <span className={`font-bold ${product.availability === 'yes' ? 'text-green-600' : 'text-red-600'}`}>{product.availability}</span></p>
        </div>
        <div className="flex-1">
          <img src="https://via.placeholder.com/300" alt={product.productName} className="rounded-lg shadow" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
