'use client';

import { useCart, CartItem as CartItemType } from '@/contexts/CartContext';
import Image from 'next/image';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="relative py-6 border-b border-gray-100 last:border-b-0">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="relative h-24 w-24 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1 pr-2">
              <h3 className="text-base font-medium text-gray-900 mb-1">
                {item.name}
              </h3>
              {item.category && (
                <p className="text-sm text-gray-500">Color: {item.category}</p>
              )}
            </div>
            
            <div className="flex items-start gap-3">
              <p className="text-base font-semibold text-gray-900 whitespace-nowrap">
                {item.price.toFixed(2)}TL
              </p>
              
              {/* Remove Button */}
              <button
                onClick={() => removeItem(item.id)}
                className="text-gray-400 hover:text-gray-600 transition-colors -mt-1"
                aria-label="Remove item"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3 mt-3">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Decrease quantity"
            >
              <span className="text-lg leading-none">−</span>
            </button>

            <span className="text-base font-normal min-w-[2rem] text-center">
              {item.quantity}
            </span>

            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Increase quantity"
            >
              <span className="text-lg leading-none">+</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 