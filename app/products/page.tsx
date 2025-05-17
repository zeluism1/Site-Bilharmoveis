"use client"

import { useState } from "react"
import CategoryNav from "./components/CategoryNav"
import ProductGrid from "./components/ProductGrid"
import { useTranslation } from 'react-i18next'

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")
  const { t, i18n } = useTranslation()
  
  const handleCategoryChange = (category: string, subcategory: string, color?: string) => {
    setSelectedCategory(category)
    setSelectedSubcategory(subcategory)
    
    // If the color is explicitly provided, update it
    if (color !== undefined) {
      setSelectedColor(color)
    }
    // If changing to a new category/subcategory and no color is provided, reset color
    else if (category !== selectedCategory || subcategory !== selectedSubcategory) {
      setSelectedColor("")
    }
  }
  
  // Get current language from i18n
  const language = i18n.language as "pt" | "en" | "es"
  
  return (
    <main className="container mx-auto px-4 py-8 lg:py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {t('products')}
      </h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left sidebar for categories and filters */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <CategoryNav 
            onCategoryChange={handleCategoryChange} 
            language={language}
          />
        </div>
        
        {/* Main content area with product grid */}
        <div className="flex-1">
          <ProductGrid 
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
            selectedColor={selectedColor}
          />
        </div>
      </div>
    </main>
  )
}

// These will be moved to separate components in the implementation

const productCategories = [
  {
    id: "chairs",
    name: "Chairs & Seating",
    description: "Comfortable, durable chairs designed for restaurants, cafes, and hotels.",
    image: "/placeholder.svg?height=450&width=600",
  },
  {
    id: "tables",
    name: "Tables",
    description: "Elegant dining tables in various shapes, sizes, and materials.",
    image: "/placeholder.svg?height=450&width=600",
  },
  {
    id: "outdoor",
    name: "Outdoor Furniture",
    description: "Weather-resistant furniture for terraces, patios, and outdoor dining areas.",
    image: "/placeholder.svg?height=450&width=600",
  },
  {
    id: "barstools",
    name: "Bar & Counter Stools",
    description: "Stylish and comfortable stools for bars and counter-height dining.",
    image: "/placeholder.svg?height=450&width=600",
  },
  {
    id: "lounge",
    name: "Lounge Furniture",
    description: "Comfortable sofas and armchairs for hotel lobbies and waiting areas.",
    image: "/placeholder.svg?height=450&width=600",
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Complementary items to complete your hospitality space.",
    image: "/placeholder.svg?height=450&width=600",
  },
]

const products = [
  {
    id: "porto-chair",
    name: "Porto Chair",
    category: "Chairs & Seating",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "algarve-table",
    name: "Algarve Table",
    category: "Tables",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "lisboa-barstool",
    name: "Lisboa Barstool",
    category: "Bar & Counter Stools",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "cascais-outdoor-chair",
    name: "Cascais Outdoor Chair",
    category: "Outdoor Furniture",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "douro-armchair",
    name: "Douro Armchair",
    category: "Lounge Furniture",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "braga-dining-chair",
    name: "Braga Dining Chair",
    category: "Chairs & Seating",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "coimbra-table",
    name: "Coimbra Table",
    category: "Tables",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "faro-lounge-sofa",
    name: "Faro Lounge Sofa",
    category: "Lounge Furniture",
    image: "/placeholder.svg?height=400&width=400",
  },
]

