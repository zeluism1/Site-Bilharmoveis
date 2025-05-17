"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

// We'll use mock data for now, but this would be imported from the data module in a real implementation
// import { getRelatedProducts } from "@/lib/products/data"

type RelatedProduct = {
  id: string
  name: string
  category: string
  subcategory: string
  image: string
}

type RelatedProductsProps = {
  relatedProductIds: string[]
  currentProductId: string
}

export default function RelatedProducts({ relatedProductIds, currentProductId }: RelatedProductsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  // This would fetch the actual product data in a real implementation
  const products = mockGetRelatedProducts(relatedProductIds, currentProductId)
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }
  
  if (products.length === 0) {
    return null
  }
  
  return (
    <div className="relative">
      <div 
        ref={scrollContainerRef}
        className="flex space-x-5 overflow-x-auto pb-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}
      >
        {products.map((product: RelatedProduct) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="flex-shrink-0 w-[280px] group"
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 mb-3">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="280px"
              />
            </div>
            <h3 className="font-medium text-gray-900 mb-1 group-hover:text-orange-500 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500">
              {product.category} • {product.subcategory}
            </p>
          </Link>
        ))}
      </div>
      
      {products.length > 3 && (
        <>
          <button
            onClick={scrollLeft}
            className="absolute top-1/3 -left-3 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 focus:outline-none hover:bg-gray-100"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5 text-gray-500" />
          </button>
          
          <button
            onClick={scrollRight}
            className="absolute top-1/3 -right-3 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 focus:outline-none hover:bg-gray-100"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5 text-gray-500" />
          </button>
        </>
      )}
    </div>
  )
}

// This is a mock implementation until we have the real data fetching in place
function mockGetRelatedProducts(relatedIds: string[], currentId: string): RelatedProduct[] {
  return [
    {
      id: "related-product-1",
      name: "Related Chair 1",
      category: "Interior",
      subcategory: "Cadeiras Madeira",
      image: "/placeholder.svg?height=400&width=400&text=Related1",
    },
    {
      id: "related-product-2",
      name: "Related Table",
      category: "Interior",
      subcategory: "Mesas Madeira",
      image: "/placeholder.svg?height=400&width=400&text=Related2",
    },
    {
      id: "related-product-3",
      name: "Related Stool",
      category: "Interior",
      subcategory: "Bancos",
      image: "/placeholder.svg?height=400&width=400&text=Related3",
    },
    {
      id: "related-product-4",
      name: "Related Sofa",
      category: "Interior",
      subcategory: "Sofás e Pufs",
      image: "/placeholder.svg?height=400&width=400&text=Related4",
    },
  ]
} 