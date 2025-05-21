import { NextRequest, NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import path from 'path';
// Adjust the import path based on your project structure and prisma output setting
import { PrismaClient, ProductModel, ProductVariant } from '../../../../src/generated/prisma/client'; // Adjusted path for [modelId] folder depth


const prismaClient = new PrismaClient();

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
    const product = await prismaClient.productModel.findUnique({
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

export async function PUT(req: NextRequest, { params }: RouteContext) {
  const { modelId } = params;

  if (!modelId) {
    return NextResponse.json({ error: 'Product model ID is required' }, { status: 400 });
  }

  try {
    const data = await req.json();
    const defaultVariant = data.variants[data.defaultVariantIndex];

    // Update the product model
    const updatedProduct = await prismaClient.productModel.update({
      where: { id: modelId },
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
      },
      include: {
        variants: true,
      },
    });

    // Handle variants
    for (const variant of data.variants) {
      if (variant.id) {
        // Update existing variant
        await prismaClient.productVariant.update({
          where: { id: variant.id },
          data: {
            colorKey: variant.colorKey,
            colorNamePT: variant.colorName.pt,
            colorNameEN: variant.colorName.en,
            colorNameES: variant.colorName.es,
            colorHex: variant.colorHex,
            mainImageURL: variant.mainImageURL,
            angleImageURLs: JSON.stringify(variant.angleImageURLs),
          },
        });
      } else {
        // Create new variant
        await prismaClient.productVariant.create({
          data: {
            modelId: modelId,
            colorKey: variant.colorKey,
            colorNamePT: variant.colorName.pt,
            colorNameEN: variant.colorName.en,
            colorNameES: variant.colorName.es,
            colorHex: variant.colorHex,
            mainImageURL: variant.mainImageURL,
            angleImageURLs: JSON.stringify(variant.angleImageURLs),
          },
        });
      }
    }

    // Update default variant
    await prismaClient.productModel.update({
      where: { id: modelId },
      data: {
        defaultVariantId: defaultVariant.id,
      },
    });

    // Delete removed variants
    const existingVariantIds = updatedProduct.variants.map(v => v.id);
    const newVariantIds = data.variants.filter((v: { id?: string }) => v.id).map((v: { id: string }) => v.id);
    const removedVariantIds = existingVariantIds.filter(id => !newVariantIds.includes(id));

    if (removedVariantIds.length > 0) {
      await prismaClient.productVariant.deleteMany({
        where: {
          id: {
            in: removedVariantIds,
          },
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { modelId: string } }
) {
  try {
    const { modelId } = params;

    // First, get the product with all its variants to know which images to delete
    const product = await prismaClient.productModel.findUnique({
      where: { id: modelId },
      include: {
        variants: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Collect all image paths that need to be deleted
    const imagePaths: string[] = [];
    
    for (const variant of product.variants) {
      // Add main image if it exists and is a local file
      if (variant.mainImageURL?.startsWith('/images/')) {
        imagePaths.push(variant.mainImageURL);
      }
      
      // Add angle images if they exist and are local files
      const angleImages = JSON.parse(variant.angleImageURLs || '[]') as string[];
      angleImages.forEach(imgPath => {
        if (imgPath.startsWith('/images/')) {
          imagePaths.push(imgPath);
        }
      });
    }

    // Delete the product and all its variants (cascade delete is configured in schema)
    await prismaClient.productModel.delete({
      where: {
        id: modelId,
      },
    });

    // After successful DB deletion, delete the image files
    const publicDir = path.join(process.cwd(), 'public');
    
    for (const imagePath of imagePaths) {
      try {
        // Convert URL path to file system path
        const fullPath = path.join(publicDir, imagePath);
        await unlink(fullPath);
      } catch (err) {
        console.error(`Failed to delete image file: ${imagePath}`, err);
        // Continue with other deletions even if one fails
      }
    }

    return NextResponse.json({ 
      message: 'Product deleted successfully',
      deletedImages: imagePaths 
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
} 