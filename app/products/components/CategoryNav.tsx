"use client"

import { useState } from "react"

type Category = {
  name: {
    en: string
    pt: string
    es: string
  }
  id: string
  subcategories: {
    name: {
      en: string
      pt: string
      es: string
    }
    id: string
  }[]
}

type Props = {
  onCategoryChange?: (category: string, subcategory: string, color?: string) => void
  language?: "en" | "pt" | "es"
}

// Define color options based on our colorMap in the script
const colorOptions = [
  { name: 'Preto', hex: '#000000', id: 'negro' },
  { name: 'Branco', hex: '#FFFFFF', id: 'blanco' },
  { name: 'Carvalho Natural', hex: '#D2B48C', id: 'roble' },
  { name: 'Nogueira', hex: '#654321', id: 'nogal' },
  { name: 'Areia', hex: '#E0D4B4', id: 'arena' },
  { name: 'Cinza', hex: '#808080', id: 'gris' },
  { name: 'Terracota', hex: '#E2725B', id: 'terracota' },
  { name: 'Esmeralda', hex: '#50C878', id: 'esmeralda' },
  { name: 'Celeste', hex: '#B0E0E6', id: 'celeste' },
  { name: 'Safira', hex: '#082567', id: 'zafiro' },
  { name: 'Mekong', hex: '#6B705C', id: 'mekong' },
  { name: 'Vesúvio', hex: '#A9A9A9', id: 'vesubio' },
];

export default function CategoryNav({ onCategoryChange, language = "pt" }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  const handleCategorySelect = (categoryId: string, subcategoryId: string | null = null) => {
    if (categoryId === selectedCategory && subcategoryId === selectedSubcategory) {
      // If clicking the same category/subcategory, clear the selection
      setSelectedCategory(null)
      setSelectedSubcategory(null)
      if (onCategoryChange) onCategoryChange('', '', '')
    } else {
      setSelectedCategory(categoryId)
      setSelectedSubcategory(subcategoryId)
      if (onCategoryChange) onCategoryChange(categoryId, subcategoryId || '', '')
    }
  }

  const handleColorSelect = (colorId: string) => {
    if (colorId === selectedColor) {
      // If clicking the same color, clear the selection
      setSelectedColor(null)
      // Update parent component with filter state
      if (onCategoryChange) onCategoryChange(selectedCategory || '', selectedSubcategory || '', '')
    } else {
      setSelectedColor(colorId)
      // Update parent component with filter state
      if (onCategoryChange) onCategoryChange(selectedCategory || '', selectedSubcategory || '', colorId)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-medium text-gray-900">
          {language === "en" ? "Categories" : language === "pt" ? "Categorias" : "Categorías"}
        </h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {categories.map((category) => (
          <div key={category.id} className="overflow-hidden">
            <button
              onClick={() => handleCategorySelect(category.id)}
              className={`flex items-center justify-between w-full p-4 text-left hover:bg-gray-50 focus:outline-none font-medium text-gray-900
                ${selectedCategory === category.id && !selectedSubcategory ? 'bg-orange-50 text-orange-700' : ''}`}
            >
              {category.name[language]}
            </button>
            
            {/* Always show subcategories, they're not collapsible anymore */}
            <div className="pl-4 pr-2 pb-2">
              <ul className="space-y-1">
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory.id}>
                    <button
                      onClick={() => handleCategorySelect(category.id, subcategory.id)}
                      className={`block w-full text-left py-2 px-3 text-sm rounded-md hover:bg-gray-100
                        ${selectedCategory === category.id && selectedSubcategory === subcategory.id ? 'bg-orange-50 text-orange-700' : ''}`}
                    >
                      {subcategory.name[language]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-gray-50">
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          {language === "en" ? "Filter By" : language === "pt" ? "Filtrar por" : "Filtrar por"}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-700 block mb-2">
              {language === "en" ? "Material" : language === "pt" ? "Material" : "Material"}
            </label>
            <select className="w-full text-sm border-gray-200 rounded-md p-2 focus:ring-orange-500 focus:border-orange-500">
              <option value="">
                {language === "en" ? "All Materials" : language === "pt" ? "Todos os Materiais" : "Todos los Materiales"}
              </option>
              <option value="wood">
                {language === "en" ? "Wood" : language === "pt" ? "Madeira" : "Madera"}
              </option>
              <option value="metal">
                {language === "en" ? "Metal" : language === "pt" ? "Metal" : "Metal"}
              </option>
              <option value="upholstered">
                {language === "en" ? "Upholstered" : language === "pt" ? "Estofado" : "Tapizado"}
              </option>
            </select>
          </div>
          
          <div>
            <label className="text-sm text-gray-700 block mb-2">
              {language === "en" ? "Color" : language === "pt" ? "Cor" : "Color"}
            </label>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleColorSelect(color.id)}
                  title={color.name}
                  className={`w-6 h-6 rounded-full hover:scale-110 transition-transform
                    ${selectedColor === color.id ? 'ring-2 ring-orange-500 ring-offset-2' : 'border border-gray-200'}`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => {
          setSelectedCategory(null)
          setSelectedSubcategory(null)
          if (onCategoryChange) {
            onCategoryChange('', '', '')
          }
        }}
        className="w-full p-3 text-sm text-center text-orange-600 hover:bg-orange-50 border-t border-gray-200"
      >
        {language === "en" ? "Clear All Filters" : language === "pt" ? "Limpar Todos os Filtros" : "Borrar Todos los Filtros"}
      </button>
    </div>
  )
}

const categories: Category[] = [
  {
    name: {
      en: "Exterior",
      pt: "Exterior",
      es: "Exterior"
    },
    id: "exterior",
    subcategories: [
      { 
        name: { 
          en: "Chairs", 
          pt: "Cadeiras", 
          es: "Sillas" 
        }, 
        id: "chair" 
      },
      { 
        name: { 
          en: "Bar Stools", 
          pt: "Bancos", 
          es: "Taburetes" 
        }, 
        id: "stool" 
      },
      { 
        name: { 
          en: "Tables", 
          pt: "Mesas", 
          es: "Mesas" 
        }, 
        id: "table" 
      },
      { 
        name: { 
          en: "Sofas", 
          pt: "Sofás", 
          es: "Sofás" 
        }, 
        id: "sofa" 
      },
    ],
  },
  {
    name: {
      en: "Interior",
      pt: "Interior",
      es: "Interior"
    },
    id: "interior",
    subcategories: [
      { 
        name: { 
          en: "Chairs", 
          pt: "Cadeiras", 
          es: "Sillas" 
        }, 
        id: "chair" 
      },
      { 
        name: { 
          en: "Bar Stools", 
          pt: "Bancos", 
          es: "Taburetes" 
        }, 
        id: "stool" 
      },
      { 
        name: { 
          en: "Tables", 
          pt: "Mesas", 
          es: "Mesas" 
        }, 
        id: "table" 
      },
      { 
        name: { 
          en: "Sofas", 
          pt: "Sofás", 
          es: "Sofás" 
        }, 
        id: "sofa" 
      },
    ],
  },
  {
    name: {
      en: "By Product Type",
      pt: "Por Tipo de Produto",
      es: "Por Tipo de Producto"
    },
    id: "product-type",
    subcategories: [
      { 
        name: { 
          en: "Standard Chairs", 
          pt: "Cadeiras Standard", 
          es: "Sillas Estándar" 
        }, 
        id: "silla" 
      },
      { 
        name: { 
          en: "Bar Stools", 
          pt: "Bancos de Bar", 
          es: "Taburetes de Bar" 
        }, 
        id: "banqueta" 
      },
      { 
        name: { 
          en: "Standard Tables", 
          pt: "Mesas Standard", 
          es: "Mesas Estándar" 
        }, 
        id: "mesa" 
      },
      { 
        name: { 
          en: "High Tables", 
          pt: "Mesas Altas", 
          es: "Mesas Altas" 
        }, 
        id: "alta-mesa" 
      },
      { 
        name: { 
          en: "Rectangular Tables", 
          pt: "Mesas Retangulares", 
          es: "Mesas Rectangulares" 
        }, 
        id: "rectangular-mesa" 
      },
      { 
        name: { 
          en: "Sofas", 
          pt: "Sofás", 
          es: "Sofás" 
        }, 
        id: "sillon" 
      },
    ],
  }
] 