'use client';

import { InstagramEmbed } from './InstagramEmbed';

export function InstagramFeed() {
  // Array of Instagram post URLs for embedding
  const instagramPosts = [
    'https://www.instagram.com/p/C-qh-bfgQzL/?utm_source=ig_embed&utm_campaign=loading',
    'https://www.instagram.com/reel/DAI0q8ENI3-/?utm_source=ig_embed&utm_campaign=loading',
    'https://www.instagram.com/p/DFZ0uJ9tbdb/?utm_source=ig_embed&utm_campaign=loading',
  ];

  return (
    <section className="relative py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Follow Us on Instagram
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See our latest baked creations and delicious inspiration from our satisfied customers.
          </p>
          <a
            href="https://www.instagram.com/craveangelbakes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-pink-600 hover:text-pink-700 font-medium"
          >
            @craveangelbakes
          </a>
        </div>

        {instagramPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instagramPosts.map((url, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <InstagramEmbed
                  url={url}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Instagram Posts Coming Soon
              </h3>
              <p className="text-gray-600 mb-4">
                Add your Instagram post URLs to display real Instagram content here.
              </p>
              <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
                <p className="font-medium mb-2">To add Instagram posts:</p>
                <ol className="list-decimal list-inside space-y-1 text-left">
                  <li>Go to an Instagram post</li>
                  <li>Click the &apos;...&apos; menu</li>
                  <li>Select &apos;Embed&apos;</li>
                  <li>Copy the URL from data-instgrm-permalink</li>
                  <li>Add it to the instagramPosts array</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 