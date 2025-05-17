"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Maximize } from "lucide-react"

type ProductGalleryProps = {
  productId: string
  initialColor?: string
}

export default function ProductGallery({ productId, initialColor = "default" }: ProductGalleryProps) {
  const [currentColorId, setCurrentColorId] = useState(initialColor)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  
  // In a real implementation, these would be fetched based on the product ID and current color
  const images = getProductImages(productId, currentColorId)
  
  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % images.length)
  }
  
  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length)
  }
  
  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index)
  }
  
  const toggleZoom = () => {
    setIsZoomed(prev => !prev)
  }
  
  // This function would be called by ColorSelector via context or prop drilling
  const updateColor = (colorId: string) => {
    setCurrentColorId(colorId)
    setCurrentImageIndex(0) // Reset to the first image when changing color
  }
  
  return (
    <div className="relative">
      {/* Main Image */}
      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
        <div className={`relative w-full h-full transition-all duration-300 ${isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`}>
          <Image 
            src={images[currentImageIndex]} 
            alt={`Product view ${currentImageIndex + 1}`}
            fill
            className="object-cover"
            onClick={toggleZoom}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        
        {/* Navigation arrows for main image */}
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
        
        {/* Zoom indicator */}
        <button 
          className="absolute bottom-4 right-4 bg-white/80 rounded-full p-1.5 shadow-sm hover:bg-white"
          onClick={toggleZoom}
          aria-label={isZoomed ? "Zoom out" : "Zoom in"}
        >
          <Maximize className="h-4 w-4 text-gray-700" />
        </button>
      </div>
      
      {/* Thumbnails */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`relative w-20 h-20 rounded-md overflow-hidden ${currentImageIndex === index ? 'ring-2 ring-orange-500' : 'ring-1 ring-gray-200'}`}
            onClick={() => handleThumbnailClick(index)}
            aria-label={`View image ${index + 1}`}
          >
            <Image 
              src={image} 
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

// This is a mock function to simulate fetching images for a product color variant
// In a real app, this would likely be an API call or data from props
function getProductImages(productId: string, colorId: string): string[] {
  // This is just sample data - in a real app, you'd have actual images for each color
  const baseImagePath = `/placeholder.svg?height=600&width=600&text=${productId}_${colorId}`
  
  // Generate different angles
  return [
    `${baseImagePath}_main`,
    `${baseImagePath}_angle1`,
    `${baseImagePath}_angle2`,
    `${baseImagePath}_angle3`,
  ]
} 