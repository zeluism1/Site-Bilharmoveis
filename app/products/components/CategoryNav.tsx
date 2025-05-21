// app/products/components/CategoryNav.tsx
"use client"

import { useEffect, useState } from "react"
import useSWR from "swr"
import { getLocalizedField, I18nString } from "@/lib/products/data" // Ensure this path is correct

// Using your types from @/types/product that worked for the API call
import { 
    ApiProductModel, 
    ApiProductVariant, 
    ApiProductsResponse, // Expects { data: ApiProductModel[], pagination?: any }
    ProductColorData    // Expects { key: string, name: I18nString, hex: string }
} from "@/types/product" // Ensure this path is correct

// Mappings (from your working version)
const defaultCategoryNameMappings: Record<string, I18nString> = {
  Interior: { en: "Indoor", pt: "Interior", es: "Interior" },
  Exterior: { en: "Outdoor", pt: "Exterior", es: "Exterior" },
};
const commonSubcategoryMappings: Record<string, I18nString> = {
  Bancos: { en: "Stools", pt: "Bancos", es: "Banquetas" },
  Cadeiras: { en: "Chairs", pt: "Cadeiras", es: "Sillas" },
  Mesas: { en: "Tables", pt: "Mesas", es: "Mesas" },
  Sofás: { en: "Sofas", pt: "Sofás", es: "Sofás" },
  "Mesas de Centro": { en: "Coffee Tables", pt: "Mesas de Centro", es: "Mesas de Centro" },
  "Mesas Laterais": { en: "Side Tables", pt: "Mesas Laterais", es: "Mesas Auxiliares" },
  "Mesas de Jantar": { en: "Dining Tables", pt: "Mesas de Jantar", es: "Mesas de Comedor" },
  "Bancos Altos": { en: "Bar Stools", pt: "Bancos Altos", es: "Taburetes Altos" },
  "Bancos de Bar": { en: "Bar Stools", pt: "Bancos de Bar", es: "Taburetes de Bar" },
  "Mesas Altas": { en: "High Tables", pt: "Mesas Altas", es: "Mesas Altas" },
};

// Display types (from your working version)
interface DisplaySubCategory { id: string; name: I18nString }
interface DisplayCategory { id: string; name: I18nString; subcategories: DisplaySubCategory[] }
interface DisplayColor extends ProductColorData {}

type Props = {
  onCategoryChange?: (category: string | null, subcategory: string | null, colorKey: string | null) => void;
  language?: "en" | "pt" | "es";
  initialCategory?: string | null;      // NEW: For URL-driven initial state
  initialSubcategory?: string | null;   // NEW: For URL-driven initial state
  initialColorKey?: string | null;      // NEW: For URL-driven initial state
  onClearAllFilters?: () => void;       // NEW: To notify parent to clear URL etc.
}

// SWR fetcher (from your working version)
const fetcher = async (url: string): Promise<ApiProductsResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    let errorInfo = `Failed to fetch from ${url}. Status: ${res.status}`;
    try { 
      const errJson = await res.json();
      errorInfo += ` - ${JSON.stringify(errJson)}`;
    } catch (e) { /* ignore if response is not json */ }
    const error = new Error("An error occurred while fetching filter data.") as any;
    error.info = errorInfo; 
    error.status = res.status;
    console.error("CategoryNav Fetcher Error:", error.info);
    throw error;
  }
  return res.json();
};

export default function CategoryNav({
  onCategoryChange,
  language = "pt",
  initialCategory = null,     // Initialize from props
  initialSubcategory = null,  // Initialize from props
  initialColorKey = null,     // Initialize from props
  onClearAllFilters,          // New prop
}: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(initialSubcategory);
  const [activeColor, setActiveColor] = useState<string | null>(initialColorKey);

  const [displayCategories, setDisplayCategories] = useState<DisplayCategory[]>([]);
  const [displayColors, setDisplayColors] = useState<DisplayColor[]>([]);

  // NEW: Effect to update internal state if initial props change (e.g., URL navigation)
  useEffect(() => {
    setActiveCategory(initialCategory);
    setActiveSubcategory(initialSubcategory);
    setActiveColor(initialColorKey);
  }, [initialCategory, initialSubcategory, initialColorKey]);

  // SWR call that worked (page=1, limit=100)
  const SWR_API_URL = `/api/products?page=1&limit=100`;
  const { data: productsResponse, error: productsError, isLoading: isLoadingProducts } = 
    useSWR<ApiProductsResponse>(SWR_API_URL, fetcher);

  useEffect(() => {
    if (productsError) {
        setDisplayCategories([]);
        setDisplayColors([]);
        return;
    }
    if (!productsResponse || !productsResponse.data || productsResponse.data.length === 0) { 
      setDisplayCategories([]);
      setDisplayColors([]);
      return;
    }
    const models: ApiProductModel[] = productsResponse.data;

    // Process categories and subcategories (logic from your working version)
    const categoryStructure = new Map<string, Set<string>>();
    models.forEach((model) => {
      if (model.category && model.category.trim() !== "" && model.subcategory && model.subcategory.trim() !== "") {
        if (!categoryStructure.has(model.category)) {
          categoryStructure.set(model.category, new Set());
        }
        categoryStructure.get(model.category)!.add(model.subcategory);
      }
    });
    
    if (categoryStructure.size === 0) {
      setDisplayCategories([]);
    } else {
      const generatedCategories: DisplayCategory[] = [];
      categoryStructure.forEach((subcategoriesSet, categoryId) => {
        const categoryName = defaultCategoryNameMappings[categoryId] || 
          ({ pt: categoryId, en: categoryId, es: categoryId } as I18nString);
        const processedSubcategories: DisplaySubCategory[] = [];
        subcategoriesSet.forEach(subcategoryId => {
          const subcategoryName = commonSubcategoryMappings[subcategoryId] || 
            ({ pt: subcategoryId, en: subcategoryId, es: subcategoryId } as I18nString);
          processedSubcategories.push({ id: subcategoryId, name: subcategoryName });
        });
        processedSubcategories.sort((a, b) => 
          getLocalizedField(a.name, language).localeCompare(getLocalizedField(b.name, language))
        );
        if (processedSubcategories.length > 0) {
             generatedCategories.push({ id: categoryId, name: categoryName, subcategories: processedSubcategories });
        }
      });
      generatedCategories.sort((a, b) => 
        getLocalizedField(a.name, language).localeCompare(getLocalizedField(b.name, language))
      );
      setDisplayCategories(generatedCategories);
    }

    // Process colors from variants (logic from your working version)
    const uniqueColors = new Map<string, ProductColorData>();
    models.forEach((model) => {
      model.variants.forEach((variant: ApiProductVariant) => { 
        if (variant.colorKey && variant.colorName && variant.colorHex) { 
          if (!uniqueColors.has(variant.colorKey)) {
            uniqueColors.set(variant.colorKey, { 
              key: variant.colorKey, 
              name: variant.colorName,
              hex: variant.colorHex 
            });
          }
        }
        if (variant.seatColors && Array.isArray(variant.seatColors)) { 
          variant.seatColors.forEach(seatColor => { 
            if (seatColor.key && seatColor.name && seatColor.hex && !uniqueColors.has(seatColor.key)) {
              uniqueColors.set(seatColor.key, seatColor);
            }
          });
        }
      });
    });
    const allColorsOption: DisplayColor = {
      key: "all", 
      name: { pt: "Todas as Cores", en: "All Colors", es: "Todos los Colores" },
      hex: "#transparent"
    };
    const generatedColors: DisplayColor[] = [allColorsOption];
    uniqueColors.forEach((colorData) => { generatedColors.push(colorData) });
    generatedColors.sort((a, b) => {
      if (a.key === "all") return -1;
      if (b.key === "all") return 1;
      return getLocalizedField(a.name, language).localeCompare(getLocalizedField(b.name, language));
    });
    setDisplayColors(generatedColors);

  }, [productsResponse, productsError, language]);

  const handleCategorySelect = (
    categoryId: string,
    subcategoryId: string | null = null
  ) => {
    const newActiveCategory = activeCategory === categoryId && activeSubcategory === subcategoryId ? null : categoryId;
    const newActiveSubcategory = activeCategory === categoryId && activeSubcategory === subcategoryId ? null : subcategoryId;
    
    setActiveCategory(newActiveCategory);
    setActiveSubcategory(newActiveSubcategory);

    if (onCategoryChange) {
      // Pass current activeColor, parent will decide if it needs to be reset
      onCategoryChange(newActiveCategory, newActiveSubcategory, activeColor);
    }
  };

  const handleColorSelect = (colorKey: string) => {
    const newColorState = colorKey === "all" ? null : colorKey;
    setActiveColor(newColorState);
    if (onCategoryChange) {
      onCategoryChange(activeCategory, activeSubcategory, newColorState);
    }
  };

  // CHANGED: Renamed clearAllFilters to handleInternalClearAllFilters
  // to avoid conflict with the prop name.
  const handleInternalClearAllFilters = () => { 
    setActiveCategory(null);
    setActiveSubcategory(null);
    setActiveColor(null);
    
    if (onClearAllFilters) { // Call parent's clear function if provided
      onClearAllFilters();
    } else if (onCategoryChange) { // Fallback to old behavior
      onCategoryChange(null, null, null);
    }
  };

  // Localized texts (from your working version)
  const filterByText = getLocalizedField({ en: "Filter By", pt: "Filtrar por", es: "Filtrar por" }, language);
  const colorText = getLocalizedField({ en: "Color", pt: "Cor", es: "Color" }, language);
  const clearFiltersText = getLocalizedField({ en: "Clear All Filters", pt: "Limpar Todos os Filtros", es: "Borrar Todos los Filtros" }, language);
  const categoriesText = getLocalizedField({ en: "Categories", pt: "Categorias", es: "Categorías" }, language);

  // UI Rendering
  if (isLoadingProducts) { // Show skeleton while SWR is loading and no response yet
    return ( 
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden p-4">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
        <div className="space-y-3">{[...Array(3)].map((_, i) => (<div key={i} className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>))}</div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mt-6 mb-2 animate-pulse"></div>
        <div className="flex flex-wrap gap-2">{[...Array(5)].map((_, i) => (<div key={i} className="w-6 h-6 rounded-full bg-gray-200 animate-pulse"></div>))}</div>
      </div>
    );
  }

  if (productsError) { 
    return <div className="p-4 text-red-600">Error loading categories: {productsError.info || productsError.message}</div>;
  }
  
  return ( // UI from your working version
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200"><h2 className="font-medium text-gray-900">{categoriesText}</h2></div>
      <div className="divide-y divide-gray-200 max-h-[calc(100vh-250px)] overflow-y-auto">
        {displayCategories.length > 0 ? displayCategories.map((category) => (
          <div key={category.id} className="overflow-hidden">
            <button
              onClick={() => handleCategorySelect(category.id, null)}
              className={`flex items-center justify-between w-full p-4 text-left hover:bg-gray-50 focus:outline-none font-medium ${activeCategory === category.id && !activeSubcategory ? 'bg-orange-50 text-orange-700' : 'text-gray-900'}`}
            >
              {getLocalizedField(category.name, language)}
            </button>
            <div className="pl-4 pr-2 pb-2">
              <ul className="space-y-1">
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory.id}>
                    <button
                      onClick={() => handleCategorySelect(category.id, subcategory.id)}
                      className={`block w-full text-left py-2 px-3 text-sm rounded-md hover:bg-gray-100 ${activeCategory === category.id && activeSubcategory === subcategory.id ? 'bg-orange-50 text-orange-700 font-medium' : 'text-gray-700'}`}
                    >
                      {getLocalizedField(subcategory.name, language)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )) : (
          !isLoadingProducts && <div className="p-4 text-gray-500">No categories available.</div>
        )}
      </div>
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-3">{filterByText}</h3>
        <div>
          <label className="text-sm text-gray-700 block mb-2">{colorText}</label>
          <div className="flex flex-wrap gap-2">
            {displayColors.map((color) => (
              <button
                key={color.key}
                title={getLocalizedField(color.name, language)}
                onClick={() => handleColorSelect(color.key)}
                className={`w-6 h-6 rounded-full hover:scale-110 transition-transform ${(activeColor === color.key || (color.key === "all" && activeColor === null)) ? 'ring-2 ring-orange-500 ring-offset-2' : 'border border-gray-300'} ${color.key === "all" ? "bg-gray-200 text-[10px] flex items-center justify-center text-gray-600 font-medium" : ""}`}
                style={{ backgroundColor: color.key !== "all" && color.hex ? color.hex : undefined }}
                aria-pressed={activeColor === color.key || (color.key === "all" && activeColor === null)}
              >
                {color.key === "all" && getLocalizedField({pt: "T", en: "A", es:"T"}, language)}
              </button>
            ))}
          </div>
        </div>
      </div>
      <button onClick={handleInternalClearAllFilters} className="w-full p-3 text-sm text-center text-orange-600 hover:bg-orange-50 border-t border-gray-200">
        {clearFiltersText}
      </button>
    </div>
  );
}