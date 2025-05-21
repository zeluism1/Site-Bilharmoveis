"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslation } from 'react-i18next'

import { Button } from "@/components/ui/button"
import { ApiProductModel, ApiProductVariant, ProductColorData, I18nString } from "@/types/product"

// Helper function to get localized field
function getLocalizedField(obj: I18nString | undefined | null, lang: string): string {
  if (!obj) return '';
  return obj[lang as keyof I18nString] || obj.en || obj.pt || obj.es || '';
}

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

// Helper functions for translations
function getTranslatedCategory(category: string, lang: string): string {
  return getLocalizedField(categoryNameMappings[category], lang) || category;
}

function getTranslatedSubcategory(subcategory: string, lang: string): string {
  return getLocalizedField(subcategoryNameMappings[subcategory], lang) || subcategory;
}

type ProductModalProps = {
  model: ApiProductModel | null
  isOpen: boolean
  onClose: () => void
  // currentLang prop is no longer strictly needed if we use i18n.language from react-i18next
}

export default function ProductModal({
  model,
  isOpen,
  onClose,
}: ProductModalProps) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language; // Get current language from react-i18next

  const [selectedVariant, setSelectedVariant] = useState<ApiProductVariant | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSeatColor, setSelectedSeatColor] = useState<ProductColorData | null>(null);

  useEffect(() => {
    if (isOpen && model) {
      const initialVariant = model.defaultVariant || (model.variants && model.variants[0]) || null;
      setSelectedVariant(initialVariant);
      setCurrentImageIndex(0);
      if (initialVariant && initialVariant.seatColors && initialVariant.seatColors.length > 0) {
        setSelectedSeatColor(initialVariant.seatColors[0]);
      } else {
        setSelectedSeatColor(null);
      }
    } else if (!isOpen) {
      setSelectedVariant(null);
      setCurrentImageIndex(0);
      setSelectedSeatColor(null);
    }
  }, [model, isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const imagePaths = useMemo(() => {
    if (!selectedVariant) return [];
    const paths: string[] = [];
    if (selectedVariant.mainImageURL) {
      paths.push(selectedVariant.mainImageURL);
    }
    if (selectedVariant.angleImageURLs) {
      paths.push(...selectedVariant.angleImageURLs);
    }
    return paths.filter(Boolean);
  }, [selectedVariant]);

  const handleVariantSelect = (variant: ApiProductVariant) => {
    setSelectedVariant(variant);
    setCurrentImageIndex(0);
    if (variant.seatColors && variant.seatColors.length > 0) {
        setSelectedSeatColor(variant.seatColors[0]);
    } else {
        setSelectedSeatColor(null);
    }
  };
  
  const handleSeatColorSelect = (color: ProductColorData) => {
    setSelectedSeatColor(color);
  };

  if (!isOpen || !model || !selectedVariant) return null

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % imagePaths.length)
  }
  
  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + imagePaths.length) % imagePaths.length)
  }

  const modelDisplayName = getLocalizedField(model.displayName, currentLang);
  const selectedVariantColorName = getLocalizedField(selectedVariant.colorName, currentLang);
  const selectedSeatColorName = selectedSeatColor ? getLocalizedField(selectedSeatColor.name, currentLang) : "";

  // For displaying subcategory - using the value directly from model.subcategory
  // If model.subcategory itself becomes an I18nString, use getLocalizedField(model.subcategory, currentLang)
  const subcategoryDisplayName = model.subcategory; 
  const baseDescriptionLocalized = getLocalizedField(model.baseDescription, currentLang);

  return (
    <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl xl:max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between shrink-0">
          <h2 className="text-xl font-semibold text-gray-900">{modelDisplayName}</h2>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label={getLocalizedField({pt: "Fechar", en: "Close", es: "Cerrar"}, currentLang)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 p-6 md:p-8">
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border">
                {imagePaths.length > 0 && imagePaths[currentImageIndex] ? (
                     <Image 
                        key={selectedVariant.id + '-' + currentImageIndex}
                        src={imagePaths[currentImageIndex]}
                        alt={`${modelDisplayName} - ${selectedVariantColorName} - View ${currentImageIndex + 1}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">Image not available</div>
                )}
               
                {imagePaths.length > 1 && (
                  <>
                    <button 
                      className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-white/70 rounded-full p-2 shadow-md hover:bg-white transition-colors"
                      onClick={prevImage}
                      aria-label={getLocalizedField({pt: "Imagem anterior", en: "Previous image", es: "Imagen anterior"}, currentLang)}
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-700" />
                    </button>
                    <button 
                      className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-white/70 rounded-full p-2 shadow-md hover:bg-white transition-colors"
                      onClick={nextImage}
                      aria-label={getLocalizedField({pt: "Próxima imagem", en: "Next image", es: "Siguiente imagen"}, currentLang)}
                    >
                      <ChevronRight className="h-5 w-5 text-gray-700" />
                    </button>
                  </>
                )}
              </div>
              
              {imagePaths.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {imagePaths.map((path, index) => (
                    <button
                      key={path + '-' + index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                        currentImageIndex === index ? 'border-orange-500 ring-1 ring-orange-500 ring-offset-1' : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <Image 
                        src={path}
                        alt={`Thumbnail ${modelDisplayName} ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-1">{modelDisplayName}</h1>
                <p className="text-sm text-gray-500">
                    {getTranslatedCategory(model.category, currentLang)} • {getTranslatedSubcategory(model.subcategory, currentLang)}
                </p>
              </div>

              <div className="pt-2">
                <h3 className="text-sm font-medium text-gray-900 mb-1.5">
                  {getLocalizedField({pt: "Cor", en: "Color", es: "Color"}, currentLang)}:
                  <span className="text-gray-700 font-normal ml-1">{selectedVariantColorName}</span>
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {model.variants.map(variant => (
                    <button
                      key={variant.id}
                      title={getLocalizedField(variant.colorName, currentLang)}
                      onClick={() => handleVariantSelect(variant)}
                      aria-pressed={selectedVariant.id === variant.id}
                      className={`w-7 h-7 rounded-full border-2 outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-orange-500 transition-all duration-150
                        ${selectedVariant.id === variant.id ? 'border-orange-500 scale-110 shadow-md' : 'border-gray-300 hover:border-gray-500'}`}
                      style={{ backgroundColor: variant.colorHex }}
                    />
                  ))}
                </div>
              </div>

              {selectedVariant.seatColors && selectedVariant.seatColors.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1.5">
                    {getLocalizedField({pt: "Cor do Assento", en: "Seat Color", es: "Color del Asiento"}, currentLang)}:
                    <span className="text-gray-700 font-normal ml-1">{selectedSeatColorName}</span>
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {selectedVariant.seatColors.map(sc => (
                      <button
                        key={sc.hex + (sc.key || '')}
                        title={getLocalizedField(sc.name, currentLang)}
                        onClick={() => handleSeatColorSelect(sc)}
                        aria-pressed={selectedSeatColor?.key === sc.key}
                        className={`w-7 h-7 rounded-full border-2 outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-blue-500 transition-all duration-150
                            ${selectedSeatColor?.key === sc.key ? 'border-blue-500 scale-110 shadow-md' : 'border-gray-300 hover:border-gray-500'}`}
                        style={{ backgroundColor: sc.hex }}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              <div className="prose prose-sm prose-gray max-w-none pt-2">
                <p>{baseDescriptionLocalized}</p>
              </div>
              
              {model.baseFeatures && model.baseFeatures.length > 0 && (
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-2">{getLocalizedField({pt: "Características", en: "Features", es: "Características"}, currentLang)}</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    {model.baseFeatures.map((feature: string, index: number) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div>
                <h3 className="text-base font-medium text-gray-900 mb-2">{getLocalizedField({pt: "Especificações", en: "Specifications", es: "Especificaciones"}, currentLang)}</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div>
                    <p className="text-gray-500">{getLocalizedField({pt: "Dimensões", en: "Dimensions", es: "Dimensiones"}, currentLang)}</p>
                    <p className="font-medium text-gray-700">
                        {`${model.dimensionsWidth} x ${model.dimensionsHeight} x ${model.dimensionsDepth} ${model.dimensionsUnit}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">{getLocalizedField({pt: "Peso", en: "Weight", es: "Peso"}, currentLang)}</p>
                    <p className="font-medium text-gray-700">{model.weight} kg</p>
                  </div>
                  {model.baseMaterials && model.baseMaterials.length > 0 && (
                    <div className="col-span-2">
                        <p className="text-gray-500">{getLocalizedField({pt: "Materiais", en: "Materials", es: "Materiales"}, currentLang)}</p>
                        <p className="font-medium text-gray-700">{model.baseMaterials.join(', ')}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t mt-auto shrink-0">
            <h3 className="text-md font-medium text-gray-900 mb-1.5">{getLocalizedField({pt: "Interessado neste produto?", en: "Interested in this product?", es: "¿Interesado en este producto?"}, currentLang)}</h3>
            <p className="text-sm text-gray-600 mb-3">
                {getLocalizedField({pt: "Contacte-nos para saber mais e obter um orçamento personalizado.", en: "Contact us to learn more and get a personalized quote.", es: "Contáctenos para saber más y obtener un presupuesto personalizado."}, currentLang)}
            </p>
            <Button 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                asChild
            >
                <Link
                href={{
                    pathname: "/contact",
                    query: { 
                        product_model: model.modelName,
                        product_variant_id: selectedVariant.id,
                        product_color: selectedVariantColorName,
                    }
                }}
                >
                {getLocalizedField({pt: "Contactar sobre este produto", en: "Contact us about this product", es: "Contactar sobre este producto"}, currentLang)}
                </Link>
            </Button>
        </div>
      </div>
    </div>
  )
}