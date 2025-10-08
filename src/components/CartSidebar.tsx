'use client';

import { useCart } from '@/contexts/CartContext';
import { CartItem } from '@/components/CartItem';
import { useEffect } from 'react';
import Link from 'next/link';

export function CartSidebar() {
  const { state, closeCart } = useCart();

  // Close cart when clicking outside or pressing Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeCart();
      }
    };

    if (state.isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [state.isOpen, closeCart]);

  if (!state.isOpen) return null;

  // Calculate subtotal (same as total in this case)
  const subtotal = state.total;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-[460px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900">
            Cart
          </h2>
          <button
            onClick={closeCart}
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close cart"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-sm text-gray-500 mb-6">Add items to get started</p>
              <button
                onClick={closeCart}
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div>
              {state.items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-6 space-y-4">
            {/* Subtotal */}
            <div className="flex justify-between items-center text-base">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-gray-900">{subtotal.toFixed(2)}TL</span>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center text-xl font-semibold border-t border-gray-100 pt-4">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">{state.total.toFixed(2)}TL</span>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-colors font-medium text-center block text-base"
            >
              Checkout
            </Link>

            {/* View Cart Link */}
            <Link
              href="/cart"
              onClick={closeCart}
              className="block text-center text-base font-medium text-gray-900 hover:text-gray-600 transition-colors underline"
            >
              View Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
} 