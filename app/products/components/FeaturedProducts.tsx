"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

type FeaturedProduct = {
  id: string
  name: string
  category: string
  subcategory: string
  image: string
  badge?: string
}

export default function FeaturedProducts() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" })
    }
  }
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" })
    }
  }
  
  return (
    <div className="relative">
      <div 
        ref={scrollContainerRef}
        className="flex space-x-5 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}
      >
        {featuredProducts.map((product) => (
          <Link 
            key={product.id}
            href={`/products/${product.id}`}
            className="relative flex-shrink-0 w-[280px] group"
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 mb-3">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {product.badge && (
                <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  {product.badge}
                </span>
              )}
            </div>
            <h3 className="font-medium text-gray-900 mb-1 group-hover:text-orange-500 transition-colors">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category}</p>
          </Link>
        ))}
      </div>
      
      <button
        onClick={scrollLeft}
        className="absolute top-1/3 -left-3 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 focus:outline-none hover:bg-gray-100 disabled:opacity-50"
        aria-label="Scroll left"
      >
        <ChevronLeft className="h-5 w-5 text-gray-500" />
      </button>
      
      <button
        onClick={scrollRight}
        className="absolute top-1/3 -right-3 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 focus:outline-none hover:bg-gray-100 disabled:opacity-50"
        aria-label="Scroll right"
      >
        <ChevronRight className="h-5 w-5 text-gray-500" />
      </button>
    </div>
  )
}

const featuredProducts: FeaturedProduct[] = [
  {
    id: "porto-chair-premium",
    name: "Porto Chair Premium",
    category: "Exterior",
    subcategory: "Cadeiras",
    image: "/placeholder.svg?height=400&width=400",
    badge: "New Arrival",
  },
  {
    id: "lisbon-table",
    name: "Lisbon Table",
    category: "Interior",
    subcategory: "Mesas Madeira",
    image: "/placeholder.svg?height=400&width=400",
    badge: "Bestseller",
  },
  {
    id: "madeira-barstool",
    name: "Madeira Barstool",
    category: "Interior",
    subcategory: "Bancos",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "algarve-chair",
    name: "Algarve Chair",
    category: "Exterior",
    subcategory: "Cadeiras",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "cascais-sofa",
    name: "Cascais Sofa",
    category: "Interior",
    subcategory: "Sofás e Pufs",
    image: "/placeholder.svg?height=400&width=400",
  },
] 