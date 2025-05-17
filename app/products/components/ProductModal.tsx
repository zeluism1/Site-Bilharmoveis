"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Product } from "@/lib/products/data"

type ColorOption = {
  name: string
  hex: string
  available: boolean
}

type ProductModalProps = {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Set initial selected color when product changes
  useEffect(() => {
    if (product?.colors.length) {
      const availableColor = product.colors.find(c => c.available)
      setSelectedColor(availableColor?.hex || product.colors[0].hex)
    } else {
      setSelectedColor(null)
    }
    setCurrentImageIndex(0)
  }, [product])
  
  // Close modal with Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (isOpen) {
      window.addEventListener('keydown', handleEsc)
      // Prevent scrolling on body when modal is open
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])
  
  if (!isOpen || !product) return null
  
  // Use the actual images from the product data
  const imagePaths = [
    product.images.main,
    ...product.images.angles
  ]
  
  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % imagePaths.length)
  }
  
  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + imagePaths.length) % imagePaths.length)
  }
  
  // Get color name from hex
  const selectedColorName = product.colors.find(c => c.hex === selectedColor)?.name || ''

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div 
        className="relative bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        
        {/* Modal content */}
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                <Image 
                  src={imagePaths[currentImageIndex]}
                  alt={`${product.name} - ${selectedColorName}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Navigation arrows */}
                {imagePaths.length > 1 && (
                  <>
                    <button 
                      className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 rounded-full p-1.5 shadow-sm hover:bg-white"
                      onClick={prevImage}
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-700" />
                    </button>
                    
                    <button 
                      className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 rounded-full p-1.5 shadow-sm hover:bg-white"
                      onClick={nextImage}
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5 text-gray-700" />
                    </button>
                  </>
                )}
              </div>
              
              {/* Thumbnails */}
              {product.images.thumbnails.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {product.images.thumbnails.map((path, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-16 h-16 rounded-md overflow-hidden border-2 ${
                        currentImageIndex === index ? 'border-orange-500' : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <Image 
                        src={path}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              )}
              
              {/* Color selection */}
              {product.colors.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Available Colors</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.hex}
                        className={`
                          w-8 h-8 rounded-full flex items-center justify-center
                          ${!color.available ? 'opacity-50 cursor-not-allowed' : ''}
                          ${selectedColor === color.hex ? 'ring-2 ring-orange-500 ring-offset-2' : 'hover:ring-1 hover:ring-gray-300 hover:ring-offset-1'}
                        `}
                        disabled={!color.available}
                        onClick={() => color.available && setSelectedColor(color.hex)}
                        aria-label={`Select ${color.name} color`}
                      >
                        <span 
                          className="block w-6 h-6 rounded-full" 
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    ))}
                  </div>
                  {selectedColor && (
                    <p className="text-sm text-gray-600 mt-2">
                      Selected: <span className="font-medium">{selectedColorName}</span>
                    </p>
                  )}
                </div>
              )}
            </div>
            
            {/* Product info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-1">{product.name}</h1>
                <p className="text-gray-500">{product.category} • {product.subcategory}</p>
              </div>
              
              <div className="prose prose-gray">
                <p>{product.description}</p>
              </div>
              
              {/* Features */}
              {product.features.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Features</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Specifications */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Specifications</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Dimensions</p>
                    <p className="font-medium">{product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} {product.dimensions.unit}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Weight</p>
                    <p className="font-medium">{product.weight} kg</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Materials</p>
                    <p className="font-medium">{product.materials.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Made In</p>
                    <p className="font-medium">{product.madeIn}</p>
                  </div>
                </div>
              </div>
              
              {/* CTA */}
              <div className="bg-gray-50 rounded-lg p-5 mt-auto">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Interested in this product?</h3>
                <p className="text-gray-600 mb-4">
                  Contact us to learn more and get a personalized quote.
                </p>
                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  asChild
                >
                  <Link
                    href={{
                      pathname: "/contact",
                      query: { 
                        product: product.name,
                        category: product.category,
                        subcategory: product.subcategory,
                        color: selectedColorName
                      }
                    }}
                  >
                    Talk to us about this product
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 