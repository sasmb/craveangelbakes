"use client";

import { useState } from 'react';
import { useCart, CartItem } from '@/contexts/CartContext';
import { Layout } from '@/components/Layout';
import { generateWhatsAppUrl } from '@/config/constants';
import Link from 'next/link';
import Image from 'next/image';

export default function CheckoutPage() {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, getItemCount } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{name?: string; email?: string; address?: string}>({});

  const validateForm = () => {
    const newErrors: {name?: string; email?: string; address?: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Please enter your delivery address';
    } else if (formData.address.length > 200) {
      newErrors.address = 'Address must be less than 200 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateWhatsAppMessage = () => {
    // Generate order number (random for now)
    const orderNumber = Math.floor(Math.random() * 10000);
    
    // Get current date
    const currentDate = new Date().toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
    
    // Build items list
    const itemsList = cart.map((item: CartItem) => {
      const totalItemPrice = (item.price * item.quantity).toFixed(2);
      return `•  ${item.quantity}x ${item.name} - ${totalItemPrice} TL`;
    }).join('\n');
    
    // Create the structured message
    const message = `Hi! I've successfully placed an order on your website.

Order Details:
📋 Order Number: ${orderNumber}
📅 Order Date: ${currentDate}
📧 Email: ${formData.email}
📍 Billing Address: ${formData.name}, ${formData.address}
🛍️ Items Ordered:
${itemsList}
💰 Total Amount: ${getTotalPrice()} TL

I would like to confirm this order and proceed with any additional steps needed. Thank you!`;
    
    // Return the raw message (generateWhatsAppUrl will handle encoding)
    return message;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (cart.length === 0) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Generate WhatsApp link using the utility function
    const fullMessage = generateWhatsAppMessage();
    const whatsappUrl = generateWhatsAppUrl(fullMessage);
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.address.trim() && cart.length > 0;

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header */}
        <div className="bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
            <p className="text-gray-600">Review your order and provide delivery details</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {cart.length === 0 ? (
            // Empty Cart State
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Please add products to continue with checkout</p>
              <Link 
                href="/products"
                className="inline-flex items-center px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors duration-200"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Cart Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Your Order ({getItemCount()} {getItemCount() === 1 ? 'item' : 'items'})
                </h2>
                
                <div className="space-y-4 mb-6">
                  {cart.map((item: CartItem) => (
                    <div key={item.id} className="flex items-center space-x-4 bg-white rounded-lg p-4">
                      <Image 
                        src={item.image} 
                        alt={item.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-gray-600">{item.price}TL</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <span className="text-lg">−</span>
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, Math.min(10, item.quantity + 1))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <span className="text-lg">+</span>
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                          aria-label="Remove item"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total:</span>
                    <span>{getTotalPrice()}TL</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Final pricing and payment will be confirmed via WhatsApp
                  </p>
                </div>
              </div>

              {/* Checkout Form */}
              <div className="bg-white">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Delivery Information</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      aria-label="Enter your name for checkout"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600" role="alert">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      aria-label="Enter your email for order confirmation"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600" role="alert">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Address *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your full address, including city and country"
                      rows={4}
                      maxLength={200}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors resize-none ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      aria-label="Enter your delivery address"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600" role="alert">{errors.address}</p>
                    )}
                    <p className="mt-1 text-sm text-gray-500">
                      {formData.address.length}/200 characters
                    </p>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                      isFormValid && !isSubmitting
                        ? 'bg-green-600 hover:bg-green-700 active:bg-green-800'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Redirecting to WhatsApp...
                      </span>
                    ) : (
                      'Send Order via WhatsApp'
                    )}
                  </button>
                  
                  {!isFormValid && cart.length > 0 && (
                    <p className="text-sm text-gray-600 text-center">
                      Please fill out all fields to continue
                    </p>
                  )}
                </form>
                
                <div className="mt-8 p-4 bg-green-50 rounded-lg">
                  <div className="flex">
                    <svg className="w-5 h-5 text-green-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">What happens next?</h3>
                      <p className="mt-1 text-sm text-green-700">
                        You&apos;ll be redirected to WhatsApp with a pre-filled message containing your order details. 
                        Send the message and our team will confirm your order and provide payment instructions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 