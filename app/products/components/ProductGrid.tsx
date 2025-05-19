"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import ProductModal from "./ProductModal" // This modal will need significant updates
import {
  productModels as allProductModelsData, // Import the new array
  ProductModel,                         // Import the new type
  ProductVariant,                       // Import for type safety if needed here
  getLocalizedField,
  // Add any other specific utility functions you might have created for ProductModel
  // e.g., getModelsByCategory, getModelsByProductType
} from "@/lib/products/data"

type Props = {
  selectedCategory?: string      // e.g., "Interior", "Exterior"
  selectedSubcategory?: string   // e.g., "Cadeiras", "Mesas" (localized from data)
  selectedProductType?: string   // e.g., "silla", "mesa" (for filtering by type directly)
  selectedColorKey?: string      // e.g., "negro", "roble-natural" (the key from colorMap)
  currentLang?: string
}

export default function ProductGrid({
  selectedCategory,
  selectedSubcategory,
  selectedProductType,
  selectedColorKey,
  currentLang = "pt", // Default language
}: Props) {
  const [showFilters, setShowFilters] = useState(false)
  const [filteredProductModels, setFilteredProductModels] = useState<ProductModel[]>([])
  const [visibleModels, setVisibleModels] = useState<number>(12)
  const [selectedModelForModal, setSelectedModelForModal] = useState<ProductModel | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    let result: ProductModel[] = [...allProductModelsData]

    // Filter by Category
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter(model => model.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Filter by Subcategory (using the default language subcategory name for matching)
    if (selectedSubcategory && selectedSubcategory !== 'all') {
      result = result.filter(model => model.subcategory.toLowerCase() === selectedSubcategory.toLowerCase());
    }
    
    // Filter by Product Type (e.g., 'silla', 'mesa')
    if (selectedProductType && selectedProductType !== 'all') {
      result = result.filter(model => model.productType === selectedProductType);
    }

    // Filter by Color Key
    // A model is included if AT LEAST ONE of its variants has the selected color
    // either as primary color or as a seat color
    if (selectedColorKey && selectedColorKey !== 'all') {
      result = result.filter(model =>
        model.variants.some(variant => 
          variant.color.key === selectedColorKey || 
          variant.seatColors?.some(seatColor => seatColor.key === selectedColorKey)
        )
      );
    }

    setFilteredProductModels(result)
    setVisibleModels(12) // Reset visible count on filter change
  }, [selectedCategory, selectedSubcategory, selectedProductType, selectedColorKey, currentLang])

  const loadMoreModels = () => {
    setVisibleModels(prev => prev + 8)
  }

  const hasMoreModels = filteredProductModels && visibleModels < filteredProductModels.length

  const openProductModal = (model: ProductModel) => {
    setSelectedModelForModal(model)
    setIsModalOpen(true)
  }

  const closeProductModal = () => {
    setIsModalOpen(false)
    setSelectedModelForModal(null)
  }

  const clearAllFilters = () => {
    // This should ideally trigger a reset in the parent component managing filter states
    setFilteredProductModels([...allProductModelsData]);
    console.log("Clear filters clicked - parent component should handle filter state reset.");
  };

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
          {getLocalizedField({pt: showFilters ? "Esconder Filtros" : "Mostrar Filtros", en: showFilters ? "Hide Filters" : "Show Filters", es: showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}, currentLang)}
        </Button>
        {/* TODO: Mobile filter UI would be revealed here if showFilters is true */}
      </div>

      {filteredProductModels.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10h.01" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            {getLocalizedField({pt: "Nenhum produto encontrado", en: "No products found", es: "No se encontraron productos"}, currentLang)}
          </h3>
          <p className="text-gray-500 max-w-md mb-6">
            {getLocalizedField({
                pt: "Não conseguimos encontrar nenhum produto que corresponda aos seus filtros selecionados.",
                en: "We couldn't find any products that match your selected filters.",
                es: "No pudimos encontrar ningún producto que coincida con los filtros seleccionados."
            }, currentLang)}
          </p>
          <Button 
            variant="outline" 
            onClick={clearAllFilters}
          >
            {getLocalizedField({pt: "Limpar Filtros", en: "Clear Filters", es: "Limpiar Filtros"}, currentLang)}
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {filteredProductModels.slice(0, visibleModels).map((model) => (
              <ProductModelCard
                key={model.modelId}
                model={model}
                currentLang={currentLang}
                onClick={() => openProductModal(model)}
              />
            ))}
          </div>

          {hasMoreModels && (
            <div className="mt-12 flex justify-center">
              <Button
                variant="outline"
                className="text-gray-600 border-gray-300 hover:bg-gray-50"
                onClick={loadMoreModels}
              >
                {getLocalizedField({pt: "Carregar Mais", en: "Load More", es: "Cargar Más"}, currentLang)}
              </Button>
            </div>
          )}
        </>
      )}

      <ProductModal
        model={selectedModelForModal}
        isOpen={isModalOpen}
        onClose={closeProductModal}
      />
    </div>
  )
}

// Renamed to ProductModelCard
function ProductModelCard({ model, onClick, currentLang }: { model: ProductModel; onClick: () => void; currentLang: string }) {
  // Display the default variant's image on the card
  const defaultVariant = useMemo(() => {
    return model.variants.find(v => v.id === model.defaultVariantId) || model.variants[0];
  }, [model.variants, model.defaultVariantId]);

  if (!defaultVariant) {
    // Fallback or skip rendering if no default variant somehow (should not happen if data is correct)
    return <div className="p-4 border border-red-500 rounded-lg text-red-700">Error: Model {model.modelName} has no default variant.</div>;
  }

  const modelDisplayName = getLocalizedField(model.displayName, currentLang);

  return (
    <div
      className="group cursor-pointer rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col bg-white"
      onClick={onClick}
    >
      <div className="relative aspect-[1/1] w-full overflow-hidden bg-gray-100">
        <Image
          src={defaultVariant.images.main}
          alt={modelDisplayName}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Color swatches for available variants on hover */}
        {model.variants.length > 1 && (
             <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5 p-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {model.variants.slice(0, 5).map((variant) => ( // Show up to 5 swatches
                    <span
                        key={variant.id}
                        className="block h-4 w-4 rounded-full border border-gray-400/50"
                        style={{ backgroundColor: variant.color.hex }}
                        title={getLocalizedField(variant.color.name, currentLang)}
                    />
                ))}
                {model.variants.length > 5 && <span className="text-xs leading-4">...</span>}
            </div>
        )}
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-sm font-medium text-gray-800 group-hover:text-orange-600 transition-colors">
          {modelDisplayName}
        </h3>
        <p className="mt-1 text-xs text-gray-500">
          {model.category}
          {/* Display subcategory if it's different from the main category display */}
          {model.subcategory !== model.category && ` • ${model.subcategory}`}
        </p>
         {/* Optional: Display number of colors if more than one */}
         {model.variants.length > 1 && (
            <p className="mt-auto pt-2 text-xs text-gray-400">
                {getLocalizedField({
                    pt: `${model.variants.length} cores disponíveis`,
                    en: `${model.variants.length} colors available`,
                    es: `${model.variants.length} colores disponibles`
                }, currentLang)}
            </p>
        )}
      </div>
    </div>
  )
}