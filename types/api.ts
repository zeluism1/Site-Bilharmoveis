import { z } from 'zod';

// Common Types
export type LocalizedString = {
  pt: string;
  en?: string;
  es?: string;
};

export type Dimensions = {
  width?: number;
  height?: number;
  depth?: number;
  unit: string;
};

// Product Types
export type ProductVariant = {
  id?: string;
  colorKey: string;
  colorHex?: string;
  colorName: LocalizedString;
  mainImageURL: string;
  angleImageURLs?: string[];
  seatColorsJson?: Record<string, string>; // Optional seat color configurations
};

export type ProductModel = {
  id?: string;
  modelName: string;
  displayName: LocalizedString;
  category: string;
  subcategory?: string;
  productType: 'silla' | 'mesa' | 'sofa' | 'cama' | 'armario' | 'estante' | 'otro';
  baseDescription: LocalizedString;
  baseFeatures: string[];
  baseMaterials: string[];
  dimensions?: Dimensions;
  weight?: number;
  variants: ProductVariant[];
  defaultVariantIndex: number;
  relatedProductModelIds?: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

// API Request/Response Types

// Auth API
export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  user?: {
    username: string;
  };
};

export type AuthCheckResponse = {
  authenticated: boolean;
  user?: {
    username: string;
  };
  message?: string;
};

// Products API
export type ProductsListResponse = {
  products: ProductModel[];
  total: number;
  page: number;
  pageSize: number;
};

export type ProductsListParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  category?: string;
  productType?: string;
  sortBy?: 'createdAt' | 'modelName' | 'category';
  sortOrder?: 'asc' | 'desc';
};

export type ProductResponse = {
  product: ProductModel;
};

export type ProductCreateResponse = {
  success: boolean;
  message: string;
  product?: ProductModel;
};

export type ProductUpdateResponse = {
  success: boolean;
  message: string;
  product?: ProductModel;
};

export type ProductDeleteResponse = {
  success: boolean;
  message: string;
  productId?: string;
};

// File Upload API
export type FileUploadResponse = {
  success: boolean;
  message: string;
  url?: string;
  error?: string;
};

// Project Types (for Admin and API)
export type Project = {
  id?: string;
  titlePT: string;
  titleEN?: string;
  titleES?: string;
  imageUrl: string;
  location?: string;
  descriptionPT?: string;
  descriptionEN?: string;
  descriptionES?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ProjectsListResponse = {
  data: Project[];
  // Add pagination if needed later
};

export type ProjectResponse = {
  data: Project;
};

export type ProjectCreateUpdateResponse = {
  success: boolean;
  message?: string;
  project?: Project;
  error?: any; // For validation errors
};

// Zod Schemas for Validation

export const dimensionsSchema = z.object({
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
  depth: z.number().positive().optional(),
  unit: z.string(),
});

export const localizedStringSchema = z.object({
  pt: z.string().min(1, 'Portuguese text is required'),
  en: z.string().optional(),
  es: z.string().optional(),
});

export const productVariantSchema = z.object({
  id: z.string().optional(),
  colorKey: z.string().min(1, 'Color key is required'),
  colorHex: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid hex color').optional(),
  colorName: localizedStringSchema,
  mainImageURL: z.string().url('Invalid main image URL'),
  angleImageURLs: z.array(z.string().url('Invalid angle image URL')).optional(),
  seatColorsJson: z.record(z.string()).optional(),
});

export const productModelSchema = z.object({
  id: z.string().optional(),
  modelName: z.string().min(1, 'Model name is required'),
  displayName: localizedStringSchema,
  category: z.string().min(1, 'Category is required'),
  subcategory: z.string().optional(),
  productType: z.enum(['silla', 'mesa', 'sofa', 'cama', 'armario', 'estante', 'otro']),
  baseDescription: localizedStringSchema,
  baseFeatures: z.array(z.string()),
  baseMaterials: z.array(z.string()),
  dimensions: dimensionsSchema.optional(),
  weight: z.number().positive().optional(),
  variants: z.array(productVariantSchema).min(1, 'At least one variant is required'),
  defaultVariantIndex: z.number().min(0),
  relatedProductModelIds: z.array(z.string()).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const projectSchema = z.object({
  id: z.string().optional(),
  titlePT: z.string().optional().nullable(),
  titleEN: z.string().optional().nullable(),
  titleES: z.string().optional().nullable(),
  imageUrl: z.string().min(1, 'Image URL is required'),
  location: z.string().optional().nullable(),
  descriptionPT: z.string().optional().nullable(),
  descriptionEN: z.string().optional().nullable(),
  descriptionES: z.string().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}); 