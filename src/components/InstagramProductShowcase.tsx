'use client';


import { InstagramEmbed } from './InstagramEmbed';
import { BUSINESS_CONFIG, generateProductInquiryMessage, generateWhatsAppUrl } from '@/config/constants';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  inStock: boolean;
}

interface InstagramProductPost {
  instagramUrl: string;
  product: Product;
  caption: string;
  hashtags: string[];
  customerReview?: string;
}

interface InstagramProductShowcaseProps {
  posts: InstagramProductPost[];
}

export function InstagramProductShowcase({ posts }: InstagramProductShowcaseProps) {
  const handleOrderNow = (product: Product) => {
    // Here you would typically integrate with your cart/checkout system
    console.log('Order initiated for:', product);
    
    // Example: Add to cart, open checkout modal, etc.
    alert(`Added ${product.name} to cart! Price: ${BUSINESS_CONFIG.currencySymbol}${product.price}`);
  };

  const handleWhatsAppOrder = (product: Product) => {
    const message = generateProductInquiryMessage(product.name, product.price);
    const whatsappUrl = generateWhatsAppUrl(message);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Products from Instagram
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See our products in action and order directly from our Instagram showcase
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Instagram Embed Section */}
              <div className="relative">
                <InstagramEmbed 
                  url={post.instagramUrl} 
                  className="w-full"
                />
                
                {/* Overlay Badge */}
                <div className="absolute top-4 right-4 bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured Product
                </div>
              </div>

              {/* Product Information Section */}
              <div className="p-6">
                {/* Product Details */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {post.product.name}
                  </h3>
                  <p className="text-2xl font-bold text-pink-600 mb-2">
                    {BUSINESS_CONFIG.currencySymbol}{post.product.price}
                  </p>
                  <p className="text-gray-600 text-sm mb-3">
                    {post.product.description}
                  </p>
                  
                  {/* Stock Status */}
                  <div className="flex items-center mb-3">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      post.product.inStock ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <span className={`text-sm font-medium ${
                      post.product.inStock ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {post.product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>

                {/* Instagram Caption */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700 italic">
                    &quot;{post.caption}&quot;
                  </p>
                  {post.hashtags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {post.hashtags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="text-xs text-pink-600">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Customer Review */}
                {post.customerReview && (
                  <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-400">
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">Customer says:</span> &quot;{post.customerReview}&quot;
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => handleOrderNow(post.product)}
                    disabled={!post.product.inStock}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
                      post.product.inStock
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transform hover:scale-105'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {post.product.inStock ? '🛒 Order Now' : 'Out of Stock'}
                  </button>

                  <button
                    onClick={() => handleWhatsAppOrder(post.product)}
                    className="w-full py-2 px-4 border-2 border-green-500 text-green-700 rounded-lg font-medium hover:bg-green-50 transition-colors duration-200"
                  >
                    💬 WhatsApp Order
                  </button>

                  <a
                    href={post.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2 px-4 text-center border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                  >
                    📱 View on Instagram
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Love What You See? 
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Follow us on Instagram for more styling inspiration and exclusive offers!
            </p>
            <a
              href={BUSINESS_CONFIG.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white text-pink-600 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Follow @craveangelbakes
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 