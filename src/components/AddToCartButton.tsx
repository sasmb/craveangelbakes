'use client';

import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
}

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  className?: string;
  showSuccess?: boolean;
}

export function AddToCartButton({ 
  product, 
  quantity = 1, 
  className = "",
  showSuccess = true 
}: AddToCartButtonProps) {
  const { addItem, openCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent navigation if button is inside a link
    
    setIsAdding(true);
    
    // Add to cart
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity
    });

    // Show success state
    if (showSuccess) {
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    }

    // Brief loading state
    setTimeout(() => {
      setIsAdding(false);
      if (showSuccess) {
        openCart(); // Open cart to show the added item
      }
    }, 300);
  };

  const defaultClassName = "bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-md hover:from-pink-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-sm";
  const finalClassName = className || defaultClassName;

  if (justAdded) {
    return (
      <button
        disabled
        className={`${finalClassName} bg-green-600 hover:bg-green-600`}
      >
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Added!</span>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={finalClassName}
    >
      {isAdding ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Adding...</span>
        </div>
      ) : (
        'Add to Cart'
      )}
    </button>
  );
} 