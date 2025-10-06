import { Layout } from '@/components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import productsData from '@/data/products.json';
import { ProductAddToCartForm } from './ProductAddToCartForm';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return productsData.map((product) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = productsData.find((p) => p.id === parseInt(id));
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} - CRAVE ANGEL BAKES`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = productsData.find((p) => p.id === parseInt(id));

  if (!product) {
    notFound();
  }

  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link href="/products" className="text-gray-700 hover:text-gray-900">Products</Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-500">{product.name}</span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            {/* Image gallery */}
            <div className="flex flex-col-reverse">
              <div className="w-full aspect-w-1 aspect-h-1">
                <div className="relative h-96 lg:h-[600px] w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Product info */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
              
              {product.category && (
                <div className="mt-3">
                  <span className="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
              )}

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl font-bold tracking-tight text-gray-900">{product.price}TL</p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>
                <div className="text-base text-gray-700 space-y-6">
                  <p>{product.description}</p>
                </div>
              </div>

              {/* Product features */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900">Features</h3>
                <div className="mt-4 prose prose-sm text-gray-500">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Premium quality materials</li>
                    <li>Easy to style and maintain</li>
                    <li>Natural look and feel</li>
                    <li>Long-lasting durability</li>
                    <li>Professional grade</li>
                  </ul>
                </div>
              </div>

              {/* Add to cart form */}
              <ProductAddToCartForm product={product} />

              {/* Additional info */}
              <div className="mt-8 border-t border-gray-200 pt-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Care Instructions</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Wash with sulfate-free shampoo, condition regularly, and air dry when possible. 
                      Use heat protectant before styling with heat tools.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Shipping & Returns</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Free shipping on orders over 200TL. 30-day return policy for unworn items.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related products section */}
          <div className="mt-16 border-t border-gray-200 pt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productsData
                .filter((p) => p.id !== product.id && p.category === product.category)
                .slice(0, 4)
                .map((relatedProduct) => (
                  <div key={relatedProduct.id} className="group">
                    <a href={`/products/${relatedProduct.id}`}>
                      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                        <div className="relative h-64 w-full">
                          <Image
                            src={relatedProduct.image}
                            alt={relatedProduct.name}
                            fill
                            className="object-cover group-hover:opacity-75"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                          />
                        </div>
                      </div>
                      <h3 className="mt-4 text-sm text-gray-700">{relatedProduct.name}</h3>
                      <p className="mt-1 text-lg font-medium text-gray-900">{relatedProduct.price}TL</p>
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 