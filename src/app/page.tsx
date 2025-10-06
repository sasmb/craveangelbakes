import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { ProductCard } from '@/components/ProductCard';
import { InstagramFeed } from '@/components/InstagramFeed';
import { FeatureSteps } from '@/components/ui/feature-section';
import productsData from '@/data/products.json';

export default function Home() {
  // Featured products (first 3 from the data)
  const featuredProducts = productsData.slice(0, 3);

  // Baking journey features for FeatureSteps component
  const bakingJourneyFeatures = [
    { 
      step: 'Step 1', 
      title: 'Choose Your Perfect Treat',
      content: 'Browse our curated collection of handcrafted baked goods and find the perfect flavor, size, and style for your special occasion.', 
      image: '/images/screenshot1.png' 
    },
    { 
      step: 'Step 2',
      title: 'Custom Order Consultation',
      content: 'Our baking specialists provide expert consultation to customize your order, ensuring it perfectly matches your vision and taste preferences.',
      image: '/images/screenshot2.png'
    },
    { 
      step: 'Step 3',
      title: 'Fresh & Delivered',
      content: 'Receive your premium baked goods freshly made with complete care instructions and ongoing support for the perfect celebration.',
      image: '/images/screenshot3.png'
    },
    { 
      step: 'Step 4',
      title: 'Quality Assurance',
      content: 'Every item is carefully crafted and inspected to ensure the highest quality standards before reaching your hands.',
      image: '/images/screenshot4.png'
    },
    { 
      step: 'Step 5',
      title: 'Celebrate & Enjoy',
      content: 'Create unforgettable moments with our delicious treats, perfectly designed for your special celebrations.',
      image: '/images/screenshot5.png'
    },
  ];

  return (
    <Layout>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative bg-gray-900 text-white min-h-screen">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/images/2.png)' }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-black/60 to-blue-800/50"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 min-h-screen flex items-center">
            <div className="text-center w-full">
              <Link 
                href="/products"
                className="inline-block bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full font-semibold hover:from-pink-600 hover:to-pink-700 active:from-pink-700 active:to-pink-800 transition-all duration-200 shadow-lg text-base sm:text-lg touch-manipulation"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="relative py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Handpicked premium selections from our luxury collection
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center">
              <Link 
                href="/products"
                className="inline-flex items-center px-8 py-3 border-2 border-pink-500 text-base font-medium rounded-full text-pink-600 bg-white hover:bg-pink-500 hover:text-white transition-colors duration-200 shadow-lg"
              >
                View All Products
              </Link>
            </div>
          </div>
          {/* Seamless transition to Instagram section */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-gray-50/60"></div>
        </div>

        {/* Instagram Feed Section */}
        <InstagramFeed />

        {/* Baking Journey Steps Section */}
        <div className="bg-gray-50">
          <FeatureSteps 
            features={bakingJourneyFeatures}
            title="Your Sweet Journey Starts Here"
            autoPlayInterval={4000}
            className="py-16 lg:py-24"
          />
        </div>
      </div>
    </Layout>
  );
}
