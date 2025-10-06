'use client';

import { AddToCartButton } from '@/components/AddToCartButton';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category?: string;
}

interface ProductAddToCartFormProps {
  product: Product;
}

export function ProductAddToCartForm({ product }: ProductAddToCartFormProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="mt-8">
      <div className="flex flex-col space-y-4">
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <select
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="mt-1 block w-20 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        <AddToCartButton 
          product={product} 
          quantity={quantity}
          className="w-full bg-black text-white py-3 px-8 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors duration-200 font-medium"
        />
      </div>
    </div>
  );
} 