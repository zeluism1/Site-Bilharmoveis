import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, ProductModel, ProductVariant } from '../../../src/generated/prisma/client';

const prisma = new PrismaClient();

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

interface CreateProductVariant {
  colorKey: string;
  colorName: {
    pt: string;
    en: string;
    es: string;
  };
  colorHex: string;
  mainImageURL: string;
  angleImageURLs: string[];
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '12', 10);
  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');
  const colorKey = searchParams.get('colorKey');

  console.log('API - Received request:', {
    filters: { category, subcategory, colorKey },
    pagination: { page, limit }
  });

  const skip = (page - 1) * limit;

  if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1 || limit > 100) {
    return NextResponse.json({ error: 'Invalid pagination parameters' }, { status: 400 });
  }

  try {
    const whereClause: any = {};
    if (category) whereClause.category = category;
    if (subcategory) whereClause.subcategory = subcategory;

    console.log('API - Using where clause:', whereClause);

    const productsQuery = prisma.productModel.findMany({
      where: whereClause,
      skip: skip,
      take: limit,
      include: {
        variants: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    const totalProductsQuery = prisma.productModel.count({
      where: whereClause,
    });

    const [products, totalProducts] = await prisma.$transaction([
      productsQuery,
      totalProductsQuery,
    ]);

    console.log('API - Query results:', {
      filters: whereClause,
      totalProducts,
      returnedProducts: products.length,
      productNames: products.map(p => p.modelName)
    });

    let transformedProducts = products.map(transformProduct);

    if (colorKey) {
      transformedProducts = transformedProducts.filter(product =>
        product.variants.some(variant => variant.colorKey === colorKey)
      );
      console.log('API - After color filtering:', {
        colorKey,
        productsAfterColorFilter: transformedProducts.length
      });
    }

    const totalPages = Math.ceil(totalProducts / limit);

    return NextResponse.json({
      data: transformedProducts,
      pagination: {
        page,
        limit,
        totalItems: totalProducts,
        totalPages,
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    if (error instanceof Error && error.name === 'PrismaClientInitializationError') {
        return NextResponse.json({ error: 'Database connection error' }, { status: 503 });
    }
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const defaultVariant = data.variants[data.defaultVariantIndex];

    // Create the product model first
    const product = await prisma.productModel.create({
      data: {
        modelName: data.modelName,
        displayNamePT: data.displayName.pt,
        displayNameEN: data.displayName.en,
        displayNameES: data.displayName.es,
        category: data.category,
        subcategory: data.subcategory,
        baseDescriptionPT: data.baseDescription.pt,
        baseDescriptionEN: data.baseDescription.en,
        baseDescriptionES: data.baseDescription.es,
        baseFeatures: JSON.stringify(data.baseFeatures),
        baseMaterials: JSON.stringify(data.baseMaterials),
        dimensionsWidth: data.dimensions.width,
        dimensionsHeight: data.dimensions.height,
        dimensionsDepth: data.dimensions.depth,
        dimensionsUnit: data.dimensions.unit,
        weight: data.weight,
        productType: 'furniture', // Default value
        relatedProductModelIds: '[]', // Default empty array
      },
    });

    // Create all variants
    const createdVariants = await Promise.all(
      data.variants.map((variant: CreateProductVariant) =>
        prisma.productVariant.create({
          data: {
            modelId: product.id,
            colorKey: variant.colorKey,
            colorNamePT: variant.colorName.pt,
            colorNameEN: variant.colorName.en,
            colorNameES: variant.colorName.es,
            colorHex: variant.colorHex,
            mainImageURL: variant.mainImageURL,
            angleImageURLs: JSON.stringify(variant.angleImageURLs),
          },
        })
      )
    );

    // Update the product with the default variant ID
    await prisma.productModel.update({
      where: { id: product.id },
      data: {
        defaultVariantId: createdVariants[data.defaultVariantIndex].id,
      },
    });

    return NextResponse.json({ success: true, productId: product.id });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
} 