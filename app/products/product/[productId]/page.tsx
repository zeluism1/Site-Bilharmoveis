import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { getProductById, getRelatedProducts, Product, RelatedProduct } from "@/lib/products/data"

export async function generateMetadata({ params }: { params: { productId: string } }) {
  const product = getProductById(params.productId)
  
  if (!product) {
    return {
      title: "Product Not Found",
    }
  }
  
  return {
    title: `${product.name} | Bilharmoveis`,
    description: product.description,
  }
}

export default function ProductPage({ params }: { params: { productId: string } }) {
  const product = getProductById(params.productId)
  
  if (!product) {
    notFound()
  }
  
  const relatedProducts = getRelatedProducts(product.related, product.id)
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-8">
        <ol className="flex flex-wrap">
          <li className="flex items-center">
            <Link href="/" className="hover:text-orange-500">Home</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <Link href="/products" className="hover:text-orange-500">Products</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <Link 
              href={`/products?category=${product.category.toLowerCase()}`} 
              className="hover:text-orange-500"
            >
              {product.category}
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li className="font-medium text-gray-900">{product.name}</li>
        </ol>
      </nav>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Gallery */}
        <div>
          <ProductGallery product={product} />
        </div>
        
        {/* Product Information */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-gray-500 mb-6">{product.category} • {product.subcategory}</p>
          
          <div className="prose prose-gray mb-8">
            <p>{product.description}</p>
          </div>
          
          {/* Color Selection */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Available Colors</h3>
            <ColorSelector productColors={product.colors} />
          </div>
          
          {/* Product Specifications */}
          <div className="border-t border-gray-200 py-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Specifications</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <dt className="text-sm text-gray-500">Dimensions</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {product.dimensions.width} × {product.dimensions.depth} × {product.dimensions.height} {product.dimensions.unit}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Weight</dt>
                <dd className="mt-1 text-sm text-gray-900">{product.weight} kg</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Materials</dt>
                <dd className="mt-1 text-sm text-gray-900">{product.materials.join(", ")}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Made in</dt>
                <dd className="mt-1 text-sm text-gray-900">{product.madeIn}</dd>
              </div>
            </dl>
          </div>
          
          {/* Features */}
          <div className="border-t border-gray-200 py-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Features</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">•</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* CTA Section */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Interested in this product?</h3>
            <p className="text-gray-600 mb-6">
              Contact us to learn more about the {product.name} and get a personalized quote.
            </p>
            <Button 
              className="w-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center gap-2 h-12 text-base"
              asChild
            >
              <Link 
                href={{
                  pathname: "/contact",
                  query: { 
                    product: product.name,
                    category: product.category,
                    subcategory: product.subcategory
                  }
                }}
              >
                Talk to us about this product
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-8">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <RelatedProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Inline component for product gallery
function ProductGallery({ product }: { product: Product }) {
  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
        <Image 
          src={product.images.main}
          alt={product.name}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      
      {/* Thumbnail images */}
      {product.images.thumbnails.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {product.images.thumbnails.map((thumbnail, index) => (
            <div 
              key={index}
              className="relative aspect-square rounded-md overflow-hidden bg-gray-100 border border-gray-200"
            >
              <Image 
                src={thumbnail}
                alt={`${product.name} - view ${index + 1}`}
                fill
                className="object-cover"
                sizes="100px"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Inline component for color selector
function ColorSelector({ productColors }: { productColors: Product['colors'] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {productColors.map((color) => (
        <div
          key={color.hex}
          className={`
            w-8 h-8 rounded-full flex items-center justify-center
            ${!color.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-gray-300'}
          `}
          title={color.name}
        >
          <span 
            className="block w-6 h-6 rounded-full" 
            style={{ backgroundColor: color.hex }}
          />
        </div>
      ))}
    </div>
  )
}

// Inline component for related product card
function RelatedProductCard({ product }: { product: RelatedProduct }) {
  return (
    <Link 
      href={`/products/product/${product.id}`}
      className="group block border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 group-hover:text-orange-500 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500">{product.category} • {product.subcategory}</p>
      </div>
    </Link>
  )
} 