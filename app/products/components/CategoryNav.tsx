"use client"

import { useEffect, useState } from "react"
import {
  getAllProductModels,
  getLocalizedField,
  I18nString,
  ProductColor,
  ProductModel,
} from "@/lib/products/data"

// Define I18nString based on your project structure if not already globally available
// export type I18nString = { [langCode: string]: string; };

// Define mappings for category and subcategory names to I18nString
const categoryNameMappings: Record<string, I18nString> = {
  Interior: { en: "Indoor", pt: "Interior", es: "Interior" },
  Exterior: { en: "Outdoor", pt: "Exterior", es: "Exterior" },
  "Por Tipo de Produto": { en: "By Product Type", pt: "Por Tipo de Produto", es: "Por Tipo de Producto"},
  // Add more mappings as needed based on your data
}

const subcategoryNameMappings: Record<string, I18nString> = {
  Cadeiras: { en: "Chairs", pt: "Cadeiras", es: "Sillas" },
  Mesas: { en: "Tables", pt: "Mesas", es: "Mesas" },
  "Mesas de Centro": { en: "Coffee Tables", pt: "Mesas de Centro", es: "Mesas de Centro" },
  "Mesas Laterais": { en: "Side Tables", pt: "Mesas Laterais", es: "Mesas Auxiliares" },
  "Mesas de Jantar": { en: "Dining Tables", pt: "Mesas de Jantar", es: "Mesas de Comedor" },
  Sofás: { en: "Sofas", pt: "Sofás", es: "Sofás" },
  Poltronas: { en: "Armchairs", pt: "Poltronas", es: "Sillones" },
  "Bancos Altos": { en: "Bar Stools", pt: "Bancos Altos", es: "Taburetes Altos" },
  "Móveis de TV": { en: "TV Units", pt: "Móveis de TV", es: "Muebles de TV" },
  Aparadores: { en: "Sideboards", pt: "Aparadores", es: "Aparadores" },
  Consolas: { en: "Console Tables", pt: "Consolas", es: "Consolas" },
  Secretárias: { en: "Desks", pt: "Secretárias", es: "Escritorios" },
  Estantes: { en: "Shelving", pt: "Estantes", es: "Estanterías" },
  Decoração: { en: "Decoration", pt: "Decoração", es: "Decoración" },
  Iluminação: { en: "Lighting", pt: "Iluminação", es: "Iluminación" },
  Têxteis: { en: "Textiles", pt: "Têxteis", es: "Textiles" },
  Infantil: { en: "Kids", pt: "Infantil", es: "Infantil" },
  Bancos: { en: "Stools", pt: "Bancos", es: "Banquetas" },
  "Cadeiras Standard": { en: "Standard Chairs", pt: "Cadeiras Standard", es: "Sillas Estándar"},
  "Bancos de Bar": { en: "Bar Stools", pt: "Bancos de Bar", es: "Taburetes de Bar" },
  "Mesas Standard": { en: "Standard Tables", pt: "Mesas Standard", es: "Mesas Estándar" },
  "Mesas Altas": { en: "High Tables", pt: "Mesas Altas", es: "Mesas Altas" },
  "Mesas Retangulares": { en: "Rectangular Tables", pt: "Mesas Retangulares", es: "Mesas Rectangulares" },
  // Add more mappings as needed based on your data
}

// New type definitions for display
type DisplaySubCategory = {
  id: string // Actual value from ProductModel.subcategory or ProductModel.productType
  name: I18nString
}

type DisplayCategory = {
  id: string // Actual value from ProductModel.category or "product-type"
  name: I18nString
  subcategories: DisplaySubCategory[]
  isProductTypeCategory?: boolean // Flag to indicate if this is "By Product Type"
}

type DisplayColor = {
  id: string // From ProductColor.key or derived
  name: I18nString
  hex?: string
}

type Props = {
  onCategoryChange?: (
    category: string | null,
    subcategory: string | null,
    colorKey: string | null
  ) => void
  language?: "en" | "pt" | "es"
}

export default function CategoryNav({
  onCategoryChange,
  language = "pt",
}: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(
    null
  )
  const [activeColor, setActiveColor] = useState<string | null>(null) // null means "all"

  const [displayCategories, setDisplayCategories] = useState<DisplayCategory[]>([])
  const [displayColors, setDisplayColors] = useState<DisplayColor[]>([])

  useEffect(() => {
    const models = getAllProductModels()

    // Process categories and subcategories from model.category and model.subcategory
    const categoryStructure = new Map<string, Set<string>>()
    models.forEach((model) => {
      if (!model.category || !model.subcategory) return;

      if (!categoryStructure.has(model.category)) {
        categoryStructure.set(model.category, new Set())
      }
      categoryStructure.get(model.category)!.add(model.subcategory)
    })

    const generatedCategories: DisplayCategory[] = []
    categoryStructure.forEach((subcategoriesSet, categoryId) => {
      const categoryName =
        categoryNameMappings[categoryId] ||
        ({ en: categoryId, pt: categoryId, es: categoryId } as I18nString)
      
      const processedSubcategories: DisplaySubCategory[] = []
      subcategoriesSet.forEach(subcategoryId => {
        processedSubcategories.push({
          id: subcategoryId,
          name: subcategoryNameMappings[subcategoryId] || ({ en: subcategoryId, pt: subcategoryId, es: subcategoryId } as I18nString),
        })
      })
      processedSubcategories.sort((a, b) => 
        getLocalizedField(a.name, language).localeCompare(getLocalizedField(b.name, language))
      );

      generatedCategories.push({
        id: categoryId,
        name: categoryName,
        subcategories: processedSubcategories,
      })
    })

    generatedCategories.sort((a, b) => 
      getLocalizedField(a.name, language).localeCompare(getLocalizedField(b.name, language))
    );

    setDisplayCategories(generatedCategories)

    // Process colors
    const uniqueColors = new Map<string, ProductColor>()
    models.forEach((model) => {
      model.variants.forEach((variant) => {
        if (variant.color && variant.color.key) {
          if (!uniqueColors.has(variant.color.key)) {
            uniqueColors.set(variant.color.key, variant.color)
          }
        }
        if (variant.seatColors) {
          variant.seatColors.forEach(seatColor => {
            if (seatColor && seatColor.key) {
              if (!uniqueColors.has(seatColor.key)) {
                uniqueColors.set(seatColor.key, seatColor);
              }
            }
          });
        }
      })
    })
    
    const generatedColors: DisplayColor[] = [
      // "All Colors" is handled implicitly by activeColor === null for UI
      // but we need an explicit button for it.
      {
        id: "all", 
        name: { en: "All Colors", pt: "Todas as Cores", es: "Todos los Colores" },
      },
    ]
    uniqueColors.forEach((color, key) => {
      generatedColors.push({
        id: key,
        name: color.name,
        hex: color.hex,
      })
    })
    generatedColors.sort((a, b) => {
      if (a.id === "all") return -1;
      if (b.id === "all") return 1;
      return getLocalizedField(a.name, language).localeCompare(getLocalizedField(b.name, language));
    });
    setDisplayColors(generatedColors)

  }, [language])

  const handleCategorySelect = (
    categoryId: string,
    subcategoryId: string | null = null
  ) => {
    let newActiveCategory = activeCategory
    let newActiveSubcategory = activeSubcategory

    if (subcategoryId) { // Clicked on a subcategory
      if (activeCategory === categoryId && activeSubcategory === subcategoryId) {
        // Clicked on the currently active subcategory: deselect subcategory
        newActiveSubcategory = null
      } else {
        // Clicked on a new/different subcategory: select it and its parent
        newActiveCategory = categoryId
        newActiveSubcategory = subcategoryId
      }
    } else { // Clicked on a main category
      if (activeCategory === categoryId && !activeSubcategory) {
        // Clicked on the currently active main category (no subcategory selected): deselect main category
        newActiveCategory = null
      } else {
        // Clicked on a new main category, or an active main category that had a subcategory selected
        newActiveCategory = categoryId
        newActiveSubcategory = null // Deselect any subcategory
      }
    }
    
    setActiveCategory(newActiveCategory)
    setActiveSubcategory(newActiveSubcategory)

    if (onCategoryChange) {
      onCategoryChange(newActiveCategory, newActiveSubcategory, activeColor)
    }
  }

  const handleColorSelect = (colorKey: string) => {
    const newActiveColor = colorKey === "all" ? null : colorKey
    setActiveColor(newActiveColor)
    if (onCategoryChange) {
      onCategoryChange(activeCategory, activeSubcategory, newActiveColor)
    }
  }

  const clearAllFilters = () => {
    setActiveCategory(null)
    setActiveSubcategory(null)
    setActiveColor(null)
    if (onCategoryChange) {
      onCategoryChange(null, null, null)
    }
  }

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
  );


  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-medium text-gray-900">
          {getLocalizedField(
            { en: "Categories", pt: "Categorias", es: "Categorías" },
            language
          )}
        </h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {displayCategories.map((category) => (
          <div key={category.id} className="overflow-hidden">
            <button
              onClick={() => handleCategorySelect(category.id, null, category.isProductTypeCategory)}
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
                      onClick={() => handleCategorySelect(category.id, subcategory.id, category.isProductTypeCategory)}
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
                key={color.id}
                title={getLocalizedField(color.name, language)}
                onClick={() => handleColorSelect(color.id)}
                className={`w-6 h-6 rounded-full hover:scale-110 transition-transform ${
                  (activeColor === color.id || (color.id === "all" && activeColor === null)) ? 'ring-2 ring-orange-500 ring-offset-2' : 'border border-gray-300'
                } ${
                  color.id === "all" ? "bg-gray-200 text-[10px] flex items-center justify-center text-gray-600 font-medium" : ""
                }`}
                style={{
                  backgroundColor: color.id !== "all" && color.hex ? color.hex : undefined,
                }}
                aria-pressed={activeColor === color.id || (color.id === "all" && activeColor === null)}
              >
                {color.id === "all" && getLocalizedField({en: "All", pt: "All", es: "All"}, language).substring(0,1)} 
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