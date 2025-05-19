import { NextRequest, NextResponse } from 'next/server';
// Adjust the import path based on your project structure and prisma output setting
import { PrismaClient, ProductModel, ProductVariant } from '../../../../src/generated/prisma/client'; // Adjusted path for [modelId] folder depth

const prisma = new PrismaClient();

// Re-using interfaces and transformProduct function from the all products route
// In a real app, you might move these to a shared types/utils file
interface TransformedProductVariant {
  id: string;
  modelId: string;
  colorKey: string;
  colorName: { pt: string; en: string; es: string };
  colorHex: string;
  mainImageURL: string | null;
  angleImageURLs: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface TransformedProductModel {
  id: string;
  modelName: string;
  displayName: { pt: string; en: string; es: string };
  category: string;
  subcategory: string;
  productType: string;
  baseDescription: { pt: string; en: string; es: string };
  baseFeatures: string[];
  baseMaterials: string[];
  dimensionsWidth: number;
  dimensionsHeight: number;
  dimensionsDepth: number;
  dimensionsUnit: string;
  weight: number;
  defaultVariantId: string | null;
  relatedProductModelIds: string[];
  createdAt: Date;
  updatedAt: Date;
  variants: TransformedProductVariant[];
  defaultVariant?: TransformedProductVariant | null;
}

function transformProduct(product: ProductModel & { variants: ProductVariant[] }): TransformedProductModel {
  const variants: TransformedProductVariant[] = product.variants.map(variant => ({
    id: variant.id,
    modelId: variant.modelId,
    colorKey: variant.colorKey,
    colorName: {
      pt: variant.colorNamePT,
      en: variant.colorNameEN,
      es: variant.colorNameES,
    },
    colorHex: variant.colorHex,
    mainImageURL: variant.mainImageURL,
    angleImageURLs: JSON.parse(variant.angleImageURLs || '[]') as string[],
    createdAt: variant.createdAt,
    updatedAt: variant.updatedAt,
  }));

  let defaultVariant: TransformedProductVariant | null = null;
  if (product.defaultVariantId) {
    defaultVariant = variants.find(v => v.id === product.defaultVariantId) || null;
  }

  return {
    id: product.id,
    modelName: product.modelName,
    displayName: {
      pt: product.displayNamePT,
      en: product.displayNameEN,
      es: product.displayNameES,
    },
    category: product.category,
    subcategory: product.subcategory,
    productType: product.productType,
    baseDescription: {
      pt: product.baseDescriptionPT,
      en: product.baseDescriptionEN,
      es: product.baseDescriptionES,
    },
    baseFeatures: JSON.parse(product.baseFeatures || '[]') as string[],
    baseMaterials: JSON.parse(product.baseMaterials || '[]') as string[],
    dimensionsWidth: product.dimensionsWidth,
    dimensionsHeight: product.dimensionsHeight,
    dimensionsDepth: product.dimensionsDepth,
    dimensionsUnit: product.dimensionsUnit,
    weight: product.weight,
    defaultVariantId: product.defaultVariantId,
    relatedProductModelIds: JSON.parse(product.relatedProductModelIds || '[]') as string[],
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    variants: variants,
    defaultVariant: defaultVariant,
  };
}

interface RouteContext {
  params: {
    modelId: string;
  }
}

export async function GET(req: NextRequest, { params }: RouteContext) {
  const { modelId } = params;

  if (!modelId) {
    return NextResponse.json({ error: 'Product model ID is required' }, { status: 400 });
  }

  try {
    const product = await prisma.productModel.findUnique({
      where: { id: modelId },
      include: {
        variants: true, // Include all variants
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const transformedProduct = transformProduct(product);

    return NextResponse.json(transformedProduct);
  } catch (error) {
    console.error(`Error fetching product ${modelId}:`, error);
    if (error instanceof Error && error.name === 'PrismaClientInitializationError') {
        return NextResponse.json({ error: 'Database connection error' }, { status: 503 });
    }
    return NextResponse.json({ error: `Failed to fetch product ${modelId}. Please check server logs.` }, { status: 500 });
  }
} 