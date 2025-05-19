"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Filter } from "lucide-react"
import useSWR from "swr"
import { useTranslation } from 'react-i18next'

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

// Import shared types
import { ApiProductModel, ApiProductVariant, ApiProductsResponse, I18nString } from '@/types/product'

// Category translations
const categoryNameMappings: Record<string, I18nString> = {
  Interior: { en: "Indoor", pt: "Interior", es: "Interior" },
  Exterior: { en: "Outdoor", pt: "Exterior", es: "Exterior" },
}

// Common subcategory translations
const subcategoryNameMappings: Record<string, I18nString> = {
  // Main product types
  Bancos: { en: "Stools", pt: "Bancos", es: "Banquetas" },
  Cadeiras: { en: "Chairs", pt: "Cadeiras", es: "Sillas" },
  Mesas: { en: "Tables", pt: "Mesas", es: "Mesas" },
  Sofás: { en: "Sofas", pt: "Sofás", es: "Sofás" },
  // Common variations
  "Mesas de Centro": { en: "Coffee Tables", pt: "Mesas de Centro", es: "Mesas de Centro" },
  "Mesas Laterais": { en: "Side Tables", pt: "Mesas Laterais", es: "Mesas Auxiliares" },
  "Mesas de Jantar": { en: "Dining Tables", pt: "Mesas de Jantar", es: "Mesas de Comedor" },
  "Bancos Altos": { en: "Bar Stools", pt: "Bancos Altos", es: "Taburetes Altos" },
  "Bancos de Bar": { en: "Bar Stools", pt: "Bancos de Bar", es: "Taburetes de Bar" },
  "Mesas Altas": { en: "High Tables", pt: "Mesas Altas", es: "Mesas Altas" },
}

// UI translations
const uiTranslations: Record<string, I18nString> = {
  noProductsFound: {
    pt: "Nenhum produto encontrado",
    en: "No products found",
    es: "No se encontraron productos"
  },
  noProductsDescription: {
    pt: "Não conseguimos encontrar nenhum produto que corresponda aos seus filtros selecionados.",
    en: "We couldn't find any products that match your selected filters.",
    es: "No pudimos encontrar ningún producto que coincida con los filtros seleccionados."
  },
  clearFilters: {
    pt: "Limpar Filtros",
    en: "Clear Filters",
    es: "Limpiar Filtros"
  },
  loadMore: {
    pt: "Carregar Mais",
    en: "Load More",
    es: "Cargar Más"
  },
  loading: {
    pt: "Carregando...",
    en: "Loading...",
    es: "Cargando..."
  },
  showFilters: {
    pt: "Mostrar Filtros",
    en: "Show Filters",
    es: "Mostrar Filtros"
  },
  hideFilters: {
    pt: "Esconder Filtros",
    en: "Hide Filters",
    es: "Ocultar Filtros"
  },
  colorsAvailable: {
    pt: "cores disponíveis",
    en: "colors available",
    es: "colores disponibles"
  }
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.') as any;
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

type Props = {
  selectedCategory?: string | null;
  selectedSubcategory?: string | null;
  selectedColorKey?: string | null;
  currentLang?: string;
  // Add onFiltersClear if ProductGrid should tell parent to clear filters
  onFiltersClear?: () => void;
};

export default function ProductGrid({
  selectedCategory,
  selectedSubcategory,
  selectedColorKey,
  currentLang = "pt",
  onFiltersClear,
}: Props) {
  const { i18n } = useTranslation();
  const [showFilters, setShowFilters] = useState(false)
  const [page, setPage] = useState(1)
  const limit = 12

  // Keep track of accumulated products and last filter state
  const [accumulatedProducts, setAccumulatedProducts] = useState<ApiProductModel[]>([])
  const [selectedModelForModal, setSelectedModelForModal] = useState<ApiProductModel | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Track last filter state to force query update
  const [lastFilterState, setLastFilterState] = useState({
    category: selectedCategory,
    subcategory: selectedSubcategory,
    colorKey: selectedColorKey
  });

  // Create a unique key for SWR based on all filter parameters
  const queryKey = useMemo(() => {
    const filterKey = JSON.stringify({
      category: selectedCategory,
      subcategory: selectedSubcategory,
      colorKey: selectedColorKey,
      page
    });
    console.log('ProductGrid - Query Key Updated:', filterKey);
    return filterKey;
  }, [selectedCategory, selectedSubcategory, selectedColorKey, page]);

  // Construct query parameters for the API call
  const queryParams = useMemo(() => {
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('limit', limit.toString())
    
    console.log('ProductGrid - Building query:', {
      filters: {
        category: selectedCategory,
        subcategory: selectedSubcategory,
        colorKey: selectedColorKey
      },
      page,
      currentAccumulatedCount: accumulatedProducts.length
    });

    if (selectedCategory && selectedCategory !== 'all') {
      params.append('category', selectedCategory)
    }
    
    if (selectedSubcategory && selectedSubcategory !== 'all') {
      params.append('subcategory', selectedSubcategory)
    }
    
    if (selectedColorKey && selectedColorKey !== 'all') {
      params.append('colorKey', selectedColorKey)
    }

    return params.toString()
  }, [selectedCategory, selectedSubcategory, selectedColorKey, page, accumulatedProducts.length])

  // Check if filters have changed
  useEffect(() => {
    const filtersChanged = 
      lastFilterState.category !== selectedCategory ||
      lastFilterState.subcategory !== selectedSubcategory ||
      lastFilterState.colorKey !== selectedColorKey;

    if (filtersChanged) {
      console.log('ProductGrid - Filters changed:', {
        old: lastFilterState,
        new: {
          category: selectedCategory,
          subcategory: selectedSubcategory,
          colorKey: selectedColorKey
        }
      });

      setLastFilterState({
        category: selectedCategory,
        subcategory: selectedSubcategory,
        colorKey: selectedColorKey
      });
      setPage(1);
      setAccumulatedProducts([]);
    }
  }, [selectedCategory, selectedSubcategory, selectedColorKey, lastFilterState]);

  // Use SWR with the unique key
  const { data: apiResponse, error, isLoading } = useSWR<ApiProductsResponse>(
    [`/api/products?${queryParams}`, queryKey],
    ([url]) => fetcher(url),
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      dedupingInterval: 0, // Ensure we always fetch when filters change
    }
  );

  // Update accumulated products when new data arrives
  useEffect(() => {
    if (apiResponse?.data) {
      console.log('ProductGrid - New data received:', {
        page,
        newDataCount: apiResponse.data.length,
        currentAccumulatedCount: accumulatedProducts.length,
        totalPages: apiResponse.pagination?.totalPages,
        filters: {
          category: selectedCategory,
          subcategory: selectedSubcategory,
          colorKey: selectedColorKey
        }
      });

      if (page === 1) {
        setAccumulatedProducts(apiResponse.data);
      } else {
        setAccumulatedProducts(prev => {
          const existingIds = new Set(prev.map(p => p.id));
          const newProducts = apiResponse.data.filter(p => !existingIds.has(p.id));
          return [...prev, ...newProducts];
        });
      }
    }
  }, [apiResponse?.data, page, selectedCategory, selectedSubcategory, selectedColorKey]);

  const pagination = apiResponse?.pagination;
  const hasMoreModels = pagination ? page < pagination.totalPages : false;

  const loadMoreModels = () => {
    if (hasMoreModels) {
      console.log('ProductGrid - Loading more:', {
        currentPage: page,
        nextPage: page + 1,
        currentCount: accumulatedProducts.length
      });
      setPage(prev => prev + 1);
    }
  };

  const handleClearFilters = () => {
    if (onFiltersClear) {
      console.log('ProductGrid - Clearing filters');
      onFiltersClear();
    }
  };

  const openProductModal = (model: ApiProductModel) => {
    setSelectedModelForModal(model)
    setIsModalOpen(true)
  }

  const closeProductModal = () => {
    setIsModalOpen(false)
    setSelectedModelForModal(null)
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-lg font-medium text-red-700 mb-1">Error loading products</h3>
        <p className="text-gray-600 max-w-md mb-6">{error.info?.error || error.message || 'Could not fetch product data.'}</p>
        <Button variant="outline" onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    )
  }

  if (isLoading && !apiResponse) { // Show loading only on initial load
    return (
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {Array.from({ length: limit }).map((_, index) => (
          <ProductModelCardSkeleton key={index} />
        ))}
      </div>
    )
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
          {getLocalizedField(showFilters ? uiTranslations.hideFilters : uiTranslations.showFilters, currentLang)}
        </Button>
        {/* TODO: Mobile filter UI (if showFilters is true) - this part needs design/implementation */}
        {showFilters && <div className="mt-4 p-4 bg-gray-50 rounded-md lg:hidden">Mobile Filters Placeholder</div>}
      </div>

      {accumulatedProducts.length === 0 && !isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10h.01" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            {getLocalizedField(uiTranslations.noProductsFound, currentLang)}
          </h3>
          <p className="text-gray-500 max-w-md mb-6">
            {getLocalizedField(uiTranslations.noProductsDescription, currentLang)}
          </p>
          <Button 
            variant="outline" 
            onClick={handleClearFilters}
          >
            {getLocalizedField(uiTranslations.clearFilters, currentLang)}
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {accumulatedProducts.map((model) => (
              <ProductModelCard
                key={model.id}
                model={model}
                onClick={() => openProductModal(model)}
              />
            ))}
            {isLoading && Array.from({ length: 4 }).map((_, index) => (
              <ProductModelCardSkeleton key={`skeleton-${index}`} />
            ))}
          </div>

          {hasMoreModels && (
            <div className="mt-12 flex justify-center">
              <Button
                variant="outline"
                className="text-gray-600 border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                onClick={loadMoreModels}
                disabled={isLoading}
              >
                {isLoading ? 
                  getLocalizedField(uiTranslations.loading, currentLang) :
                  getLocalizedField(uiTranslations.loadMore, currentLang)
                }
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

// Helper function to get translated category/subcategory
function getTranslatedCategory(category: string, lang: string): string {
  return getLocalizedField(categoryNameMappings[category], lang) || category;
}

function getTranslatedSubcategory(subcategory: string, lang: string): string {
  return getLocalizedField(subcategoryNameMappings[subcategory], lang) || subcategory;
}

// Updated ProductModelCard to use ApiProductModel type
function ProductModelCard({ model, onClick }: { model: ApiProductModel; onClick: () => void }) {
  const { i18n } = useTranslation();
  const defaultVariant = useMemo(() => {
    return model.defaultVariant || model.variants[0];
  }, [model.defaultVariant, model.variants]);

  if (!defaultVariant) {
    console.error('No default variant for model:', model.modelName);
    return <div className="p-4 border border-red-500 rounded-lg text-red-700">Error: Model {model.modelName} has no displayable variant.</div>;
  }

  const modelDisplayName = getLocalizedField(model.displayName, i18n.language);
  const mainImageURL = defaultVariant.mainImageURL || '/images/placeholder.jpg';

  // Get translated category and subcategory
  const translatedCategory = getTranslatedCategory(model.category, i18n.language);
  const translatedSubcategory = getTranslatedSubcategory(model.subcategory, i18n.language);

  return (
    <div
      className="group cursor-pointer rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col bg-white"
      onClick={onClick}
    >
      <div className="relative aspect-[1/1] w-full overflow-hidden bg-gray-100">
        <Image
          src={mainImageURL}
          alt={modelDisplayName}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {model.variants.length > 1 && (
             <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5 p-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {model.variants.slice(0, 5).map((variant) => (
                    <span
                        key={variant.id}
                        className="block h-4 w-4 rounded-full border border-gray-400/50"
                        style={{ backgroundColor: variant.colorHex }}
                        title={getLocalizedField(variant.colorName, i18n.language)}
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
          {translatedCategory} • {translatedSubcategory}
        </p>
         {model.variants.length > 1 && (
            <p className="mt-auto pt-2 text-xs text-gray-400">
                {`${model.variants.length} ${getLocalizedField(uiTranslations.colorsAvailable, i18n.language)}`}
            </p>
        )}
      </div>
    </div>
  );
}

// Skeleton component for loading state
function ProductModelCardSkeleton() {
  return (
    <div className="group rounded-lg overflow-hidden border border-gray-200 bg-white animate-pulse">
      <div className="relative aspect-[1/1] w-full overflow-hidden bg-gray-200"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  );
}