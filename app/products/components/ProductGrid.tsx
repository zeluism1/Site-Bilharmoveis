"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import ProductModal from "./ProductModal"
import { getAllCategories, getAllSubcategories, getProductsByCategory, getProductsBySubcategory, Product } from "@/lib/products/data"

// Import Product type from data.ts
// type Product = {
//   id: string
//   name: string
//   category: string
//   subcategory: string
//   image: string
//   colors: {
//     name: string
//     hex: string
//     available: boolean
//   }[]
//   description: string
// }

type Props = {
  selectedCategory?: string
  selectedSubcategory?: string
  selectedColor?: string
}

export default function ProductGrid({ selectedCategory, selectedSubcategory, selectedColor }: Props) {
  const [showFilters, setShowFilters] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [visibleProducts, setVisibleProducts] = useState<number>(8)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Load products on initial render
  useEffect(() => {
    // Get all products by default
    const allProducts = getAllCategories().flatMap(category => 
      getProductsByCategory(category.name)
    );
    setFilteredProducts(allProducts);
  }, []);
  
  // Filter products when category, subcategory, or color changes
  useEffect(() => {
    let result: Product[] = [];
    
    // First, filter by category and subcategory
    if (selectedCategory) {
      // Handle special case for product-type category
      if (selectedCategory === 'product-type') {
        // When product-type is selected, we're filtering by the actual type ID like 'silla' or 'banqueta'
        if (selectedSubcategory) {
          result = getAllCategories()
            .flatMap(category => getProductsByCategory(category.name))
            .filter(product => {
              // Extract product type from ID (e.g., "lirica-chair" -> "chair")
              const productTypeInId = product.id.split('-').pop();
              // Also consider the direct match with the subcategory ID (e.g., "silla")
              return productTypeInId === selectedSubcategory || 
                    product.id.includes(`-${selectedSubcategory}`);
            });
        } else {
          // If no specific type is selected, get all products
          result = getAllCategories().flatMap(category => getProductsByCategory(category.name));
        }
      } else {
        // Normal category/subcategory filtering
        result = getProductsByCategory(selectedCategory);
        
        if (selectedSubcategory) {
          // Filter by type within the category 
          // This maps our UI category IDs to actual product types
          const typeMap: Record<string, string> = {
            'chair': 'chair',
            'stool': 'stool',
            'table': 'table',
            'sofa': 'sofa'
          };
          
          if (typeMap[selectedSubcategory]) {
            result = result.filter(product => {
              const productType = product.id.split('-').pop();
              return productType === typeMap[selectedSubcategory];
            });
          } else {
            // Fall back to subcategory if no type mapping exists
            result = getProductsBySubcategory(selectedSubcategory);
          }
        }
      }
    } else {
      // If no category is selected, get all products
      result = getAllCategories().flatMap(category => 
        getProductsByCategory(category.name)
      );
    }
    
    // Then, filter by color if selected
    if (selectedColor) {
      result = result.filter(product => 
        product.colors.some(color => 
          // Look for the color in the product's available colors
          color.name.toLowerCase().includes(selectedColor.toLowerCase()) ||
          // Also check hex codes (for direct matches)
          color.hex.toLowerCase() === selectedColor.toLowerCase() ||
          // Check if the product's images contain the color name
          product.images.main.toLowerCase().includes(selectedColor.toLowerCase())
        )
      );
    }
    
    setFilteredProducts(result)
    // Reset to show first page when filters change
    setVisibleProducts(8)
  }, [selectedCategory, selectedSubcategory, selectedColor])
  
  const loadMoreProducts = () => {
    setVisibleProducts(prev => prev + 8)
  }
  
  const hasMoreProducts = visibleProducts < filteredProducts.length
  
  const openProductModal = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }
  
  const closeProductModal = () => {
    setIsModalOpen(false)
  }
  
  return (
    <div>
      <div className="mb-6 lg:hidden">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
          <p className="text-gray-500 max-w-md mb-6">We couldn't find any products that match your selected filters.</p>
          <Button 
            variant="outline" 
            onClick={() => {
              // Load all products
              const allProducts = getAllCategories().flatMap(category => 
                getProductsByCategory(category.name)
              );
              setFilteredProducts(allProducts);
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.slice(0, visibleProducts).map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={() => openProductModal(product)}
              />
            ))}
          </div>
          
          {hasMoreProducts && (
            <div className="mt-12 flex justify-center">
              <Button 
                variant="outline" 
                className="text-gray-600 border-gray-300 hover:bg-gray-50"
                onClick={loadMoreProducts}
              >
                Load More Products
              </Button>
            </div>
          )}
        </>
      )}
      
      {/* Product Modal */}
      <ProductModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeProductModal}
      />
    </div>
  )
}

function ProductCard({ product, onClick }: { product: Product, onClick: () => void }) {
  return (
    <div 
      className="group cursor-pointer border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={product.images.main}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Quick color selection */}
        {product.colors.length > 0 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {product.colors.slice(0, 5).map((color) => (
              <span
                key={color.hex}
                className="w-5 h-5 rounded-full border border-white"
                style={{ backgroundColor: color.hex }}
                aria-hidden="true"
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1 group-hover:text-orange-500 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500">{product.category} • {product.subcategory}</p>
      </div>
    </div>
  )
}

// Remove the hardcoded products array as we're now using the real data from lib/products/data.ts 