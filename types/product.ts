// types/product.ts

// Represents an I18n string object
export interface I18nString {
  pt: string;
  en: string;
  es: string;
  [langCode: string]: string; // Index signature for compatibility
}

// Represents a product color, similar to what might be in lib/products/data
// but tailored for API and client-side use if different from Prisma schema directly.
export interface ProductColorData {
  key: string;
  name: I18nString;
  hex: string;
}

// Type for ProductVariant as expected from the API
export interface ApiProductVariant {
  id: string;
  modelId: string;
  colorKey: string;
  colorName: I18nString; 
  colorHex: string;
  mainImageURL: string | null;
  angleImageURLs: string[]; 
  createdAt: string; // Dates are strings from JSON
  updatedAt: string;
  // If seatColors are part of the variant from the API directly and transformed:
  seatColors?: ProductColorData[]; // Assuming seatColors are also transformed if they exist
}

// Type for ProductModel as expected from the API
export interface ApiProductModel {
  id: string;
  modelName: string;
  displayName: I18nString;
  category: string;
  subcategory: string;
  productType: string;
  baseDescription: I18nString;
  baseFeatures: string[];
  baseMaterials: string[];
  // Dimensions are flat from the API transformation
  dimensionsWidth: number;
  dimensionsHeight: number;
  dimensionsDepth: number;
  dimensionsUnit: string;
  weight: number;
  defaultVariantId: string | null;
  relatedProductModelIds: string[];
  createdAt: string; // Dates are strings from JSON
  updatedAt: string;
  variants: ApiProductVariant[];
  defaultVariant?: ApiProductVariant | null; // Populated by API logic
}

// Type for the API response structure for a list of products
export interface ApiProductsResponse {
  data: ApiProductModel[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalItems: number;
  };
} 