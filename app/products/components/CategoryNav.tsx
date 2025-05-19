"use client"

import { useEffect, useState } from "react"
import useSWR from "swr"
import { getLocalizedField, I18nString } from "@/lib/products/data"

// Import shared types
import { ApiProductModel, ApiProductVariant, ApiProductsResponse, ProductColorData } from "@/types/product"

// Define mappings for category and subcategory names to I18nString
// These will be used as fallbacks if no translation is found in the database
const defaultCategoryNameMappings: Record<string, I18nString> = {
  Interior: { en: "Indoor", pt: "Interior", es: "Interior" },
  Exterior: { en: "Outdoor", pt: "Exterior", es: "Exterior" },
}

// Common subcategory translations
const commonSubcategoryMappings: Record<string, I18nString> = {
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

// New type definitions for display
interface DisplaySubCategory {
  id: string
  name: I18nString
}

interface DisplayCategory {
  id: string
  name: I18nString
  subcategories: DisplaySubCategory[]
}

interface DisplayColor extends ProductColorData {
  // id is 'key' from ProductColorData
}

type Props = {
  onCategoryChange?: (
    category: string | null,
    subcategory: string | null,
    colorKey: string | null
  ) => void
  language?: "en" | "pt" | "es"
}

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    const error = new Error("An error occurred while fetching filter data.") as any
    error.info = await res.json()
    error.status = res.status
    throw error
  }
  return res.json() as Promise<ApiProductsResponse>
}

export default function CategoryNav({
  onCategoryChange,
  language = "pt",
}: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null)
  const [activeColor, setActiveColor] = useState<string | null>(null)

  const [displayCategories, setDisplayCategories] = useState<DisplayCategory[]>([])
  const [displayColors, setDisplayColors] = useState<DisplayColor[]>([])

  // Fetch all products to derive filters
  const { data: productsResponse, error: productsError, isLoading: isLoadingProducts } = 
    useSWR<ApiProductsResponse>("/api/products?page=1&limit=100", fetcher)

  useEffect(() => {
    if (!productsResponse || !productsResponse.data) {
      setDisplayCategories([])
      setDisplayColors([])
      return
    }

    const models: ApiProductModel[] = productsResponse.data

    // Process categories and subcategories
    const categoryStructure = new Map<string, Set<string>>()
    models.forEach((model) => {
      if (!model.category || !model.subcategory) return

      if (!categoryStructure.has(model.category)) {
        categoryStructure.set(model.category, new Set())
      }
      categoryStructure.get(model.category)!.add(model.subcategory)
    })

    const generatedCategories: DisplayCategory[] = []
    categoryStructure.forEach((subcategoriesSet, categoryId) => {
      // Use default mapping if available, otherwise create a basic I18nString
      const categoryName = defaultCategoryNameMappings[categoryId] || 
        ({ en: categoryId, pt: categoryId, es: categoryId } as I18nString)
      
      const processedSubcategories: DisplaySubCategory[] = []
      subcategoriesSet.forEach(subcategoryId => {
        // Use common mapping if available, otherwise create a basic I18nString
        const subcategoryName = commonSubcategoryMappings[subcategoryId] || 
          ({ en: subcategoryId, pt: subcategoryId, es: subcategoryId } as I18nString)
        
        processedSubcategories.push({
          id: subcategoryId,
          name: subcategoryName,
        })
      })
      processedSubcategories.sort((a, b) => 
        getLocalizedField(a.name, language).localeCompare(getLocalizedField(b.name, language))
      )

      generatedCategories.push({
        id: categoryId,
        name: categoryName,
        subcategories: processedSubcategories,
      })
    })

    generatedCategories.sort((a, b) => 
      getLocalizedField(a.name, language).localeCompare(getLocalizedField(b.name, language))
    )

    setDisplayCategories(generatedCategories)

    // Process colors from variants
    const uniqueColors = new Map<string, ProductColorData>()
    models.forEach((model) => {
      model.variants.forEach((variant) => {
        if (variant.colorKey && variant.colorName && variant.colorHex) {
          if (!uniqueColors.has(variant.colorKey)) {
            uniqueColors.set(variant.colorKey, { 
              key: variant.colorKey, 
              name: variant.colorName, 
              hex: variant.colorHex 
            })
          }
        }
        // Handle seat colors if present
        if (variant.seatColors) {
          variant.seatColors.forEach(seatColor => {
            if (seatColor.key && !uniqueColors.has(seatColor.key)) {
              uniqueColors.set(seatColor.key, seatColor)
            }
          })
        }
      })
    })
    
    const generatedColors: DisplayColor[] = [
      {
        key: "all", 
        name: { en: "All Colors", pt: "Todas as Cores", es: "Todos los Colores" },
        hex: "#transparent"
      },
    ]
    uniqueColors.forEach((colorData) => {
      generatedColors.push(colorData as DisplayColor)
    })
    generatedColors.sort((a, b) => {
      if (a.key === "all") return -1
      if (b.key === "all") return 1
      return getLocalizedField(a.name, language).localeCompare(getLocalizedField(b.name, language))
    })
    setDisplayColors(generatedColors)

  }, [productsResponse, language])

  const handleCategorySelect = (
    categoryId: string,
    subcategoryId: string | null = null
  ) => {
    // Determine new state based on current selection
    const newState = {
      category: activeCategory === categoryId && activeSubcategory === subcategoryId ? null : categoryId,
      subcategory: activeCategory === categoryId && activeSubcategory === subcategoryId ? null : subcategoryId,
      color: activeColor
    };

    console.log('CategoryNav - Selection Update:', {
      current: {
        category: activeCategory,
        subcategory: activeSubcategory,
        color: activeColor
      },
      new: newState,
      clicked: {
        categoryId,
        subcategoryId
      }
    });

    // Update local state
    setActiveCategory(newState.category);
    setActiveSubcategory(newState.subcategory);

    // Notify parent
    if (onCategoryChange) {
      onCategoryChange(newState.category, newState.subcategory, newState.color);
    }
  };

  const handleColorSelect = (colorKey: string) => {
    // Determine new color state
    const newColorState = colorKey === "all" ? null : colorKey;

    console.log('CategoryNav - Color Update:', {
      current: {
        category: activeCategory,
        subcategory: activeSubcategory,
        color: activeColor
      },
      new: {
        category: activeCategory,
        subcategory: activeSubcategory,
        color: newColorState
      },
      clicked: colorKey
    });

    // Update local state
    setActiveColor(newColorState);

    // Notify parent
    if (onCategoryChange) {
      onCategoryChange(activeCategory, activeSubcategory, newColorState);
    }
  };

  const clearAllFilters = () => {
    console.log('CategoryNav - Clearing all filters');
    
    // Reset all local state
    setActiveCategory(null);
    setActiveSubcategory(null);
    setActiveColor(null);

    // Notify parent
    if (onCategoryChange) {
      onCategoryChange(null, null, null);
    }
  };

  // Determine the localized text for "Filtrar por" (Filter By)
  const filterByText = getLocalizedField(
    { en: "Filter By", pt: "Filtrar por", es: "Filtrar por" },
    language
  )
  // Determine the localized text for "Cor" (Color)
  const colorText = getLocalizedField(
    { en: "Color", pt: "Cor", es: "Color" },
    language
  )
    // Determine the localized text for "Clear All Filters"
  const clearFiltersText = getLocalizedField(
    { en: "Clear All Filters", pt: "Limpar Todos os Filtros", es: "Borrar Todos los Filtros" },
    language
  )
  const categoriesText = getLocalizedField({ en: "Categories", pt: "Categorias", es: "Categorías" }, language)

  if (isLoadingProducts && !productsResponse) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden p-4">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          ))}
        </div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mt-6 mb-2 animate-pulse"></div>
        <div className="flex flex-wrap gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-6 h-6 rounded-full bg-gray-200 animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  if (productsError) {
    return <div className="p-4 text-red-600">Error loading categories: {productsError.message}</div>
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-medium text-gray-900">
          {categoriesText}
        </h2>
      </div>
      
      <div className="divide-y divide-gray-200 max-h-[calc(100vh-250px)] overflow-y-auto">
        {displayCategories.map((category) => (
          <div key={category.id} className="overflow-hidden">
            <button
              onClick={() => handleCategorySelect(category.id, null)}
              className={`flex items-center justify-between w-full p-4 text-left hover:bg-gray-50 focus:outline-none font-medium text-gray-900 ${activeCategory === category.id && !activeSubcategory ? 'bg-orange-50 text-orange-700' : ''}`}
            >
              {getLocalizedField(category.name, language)}
            </button>
            
            {/* Always show subcategories */}
            <div className="pl-4 pr-2 pb-2">
              <ul className="space-y-1">
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory.id}>
                    <button
                      onClick={() => handleCategorySelect(category.id, subcategory.id)}
                      className={`block w-full text-left py-2 px-3 text-sm rounded-md hover:bg-gray-100 ${
                        activeCategory === category.id && activeSubcategory === subcategory.id ? 'bg-orange-50 text-orange-700' : 'text-gray-700'
                      }`}
                    >
                      {getLocalizedField(subcategory.name, language)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          {filterByText}
        </h3>
        {/* Material filter removed as per dynamic data focus, can be re-added if needed */}
        
        <div>
          <label className="text-sm text-gray-700 block mb-2">
            {colorText}
          </label>
          <div className="flex flex-wrap gap-2">
            {displayColors.map((color) => (
              <button
                key={color.key}
                title={getLocalizedField(color.name, language)}
                onClick={() => handleColorSelect(color.key)}
                className={`w-6 h-6 rounded-full hover:scale-110 transition-transform ${
                  (activeColor === color.key || (color.key === "all" && activeColor === null)) ? 'ring-2 ring-orange-500 ring-offset-2' : 'border border-gray-300'
                } ${
                  color.key === "all" ? "bg-gray-200 text-[10px] flex items-center justify-center text-gray-600 font-medium" : ""
                }`}
                style={{
                  backgroundColor: color.key !== "all" && color.hex ? color.hex : undefined,
                }}
                aria-pressed={activeColor === color.key || (color.key === "all" && activeColor === null)}
              >
                {color.key === "all" && getLocalizedField({en: "All", pt: "All", es: "All"}, language).substring(0,1)} 
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <button 
        onClick={clearAllFilters}
        className="w-full p-3 text-sm text-center text-orange-600 hover:bg-orange-50 border-t border-gray-200"
      >
        {clearFiltersText}
      </button>
    </div>
  )
}

// Remove old hardcoded data and types
// const categoriesData: Category[] = [ ... ]
// const colorMap = [ ... ]
// type Category = { ... } 