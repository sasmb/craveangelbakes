'use client';

import { useCart } from '@/contexts/CartContext';
import { Layout } from '@/components/Layout';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { state, updateQuantity, removeItem } = useCart();

  const subtotal = state.total;

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header */}
        <div className="bg-gray-50 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
            <p className="text-gray-600">
              {state.itemCount} {state.itemCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {state.items.length === 0 ? (
            // Empty Cart State
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Add items to get started</p>
              <Link 
                href="/products"
                className="inline-flex items-center px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
                  {state.items.map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="flex gap-6">
                        {/* Product Image */}
                        <div className="relative h-32 w-32 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="128px"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1 pr-4">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {item.name}
                              </h3>
                              {item.category && (
                                <p className="text-sm text-gray-500">Color: {item.category}</p>
                              )}
                            </div>
                            
                            <div className="flex items-start gap-4">
                              <p className="text-lg font-semibold text-gray-900 whitespace-nowrap">
                                {item.price.toFixed(2)}TL
                              </p>
                              
                              {/* Remove Button */}
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
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
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="w-10 h-10 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <span className="text-xl leading-none">−</span>
                            </button>

                            <span className="text-lg font-medium min-w-[3rem] text-center">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-10 h-10 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <span className="text-xl leading-none">+</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center text-base">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium text-gray-900">{subtotal.toFixed(2)}TL</span>
                    </div>

                    <div className="flex justify-between items-center text-base">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium text-gray-900">Calculated at checkout</span>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center text-xl font-semibold">
                        <span className="text-gray-900">Total</span>
                        <span className="text-gray-900">{state.total.toFixed(2)}TL</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-center block text-base mb-4"
                  >
                    Proceed to Checkout
                  </Link>

                  <Link
                    href="/products"
                    className="w-full border-2 border-gray-900 text-gray-900 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-center block text-base"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

