import { Layout } from '@/components/Layout';
import Image from 'next/image';

export default function About() {
  return (
    <Layout>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative bg-gray-50 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                About CRAVE ANGEL BAKES
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-600">
                Bringing joy through handcrafted baked goods and exceptional service.
              </p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Founded with a passion for creating delicious moments, CRAVE ANGEL BAKES began as a dream to provide premium quality baked goods that truly bring joy to people&apos;s lives. What started as a small home bakery has grown into a trusted brand serving customers worldwide.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  Our founder understood the power of handcrafted treats in bringing people together and creating lasting memories. Through years of perfecting recipes and sourcing the finest ingredients, we&apos;ve built a collection that represents the finest in artisanal baking.
                </p>
                <p className="text-lg text-gray-600">
                  Today, we continue to innovate and expand our offerings while maintaining our core commitment to quality, freshness, and customer satisfaction.
                </p>
              </div>
              <div className="mt-12 lg:mt-0">
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <Image
                    src="/images/screenshot1.png"
                    alt="CRAVE ANGEL BAKES Products"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gray-50 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything we do is guided by our core principles and commitment to excellence.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white rounded-lg p-8 shadow-md">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality First</h3>
                  <p className="text-gray-600">
                    We source only the finest ingredients, ensuring every baked good meets our exacting standards for taste, freshness, and quality.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-lg p-8 shadow-md">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Ethical Sourcing</h3>
                  <p className="text-gray-600">
                    We work exclusively with suppliers who share our commitment to ethical practices, sustainability, and fair treatment of all contributors in our supply chain.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-lg p-8 shadow-md">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Focus</h3>
                  <p className="text-gray-600">
                    Your satisfaction is our priority. We provide personalized service and support to help you enjoy the perfect treats for every occasion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 