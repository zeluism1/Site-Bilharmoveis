import { PrismaClient } from '../src/generated/prisma';
import { productModels, ProductModel as DataProductModel, ProductVariant as DataProductVariant, I18nString } from '../lib/products/data';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  for (const modelData of productModels) {
    console.log(`Processing model: ${modelData.modelName}`);

    const createdProductModel = await prisma.productModel.create({
      data: {
        modelName: modelData.modelName,
        displayNamePT: modelData.displayName?.pt || '',
        displayNameEN: modelData.displayName?.en || '',
        displayNameES: modelData.displayName?.es || '',
        category: modelData.category,
        subcategory: modelData.subcategory,
        productType: modelData.productType,
        baseDescriptionPT: modelData.baseDescription?.pt || '',
        baseDescriptionEN: modelData.baseDescription?.en || '',
        baseDescriptionES: modelData.baseDescription?.es || '',
        baseFeatures: JSON.stringify(modelData.baseFeatures || []),
        baseMaterials: JSON.stringify(modelData.baseMaterials || []),
        dimensionsWidth: modelData.dimensions.width,
        dimensionsHeight: modelData.dimensions.height,
        dimensionsDepth: modelData.dimensions.depth,
        dimensionsUnit: modelData.dimensions.unit,
        weight: modelData.weight,
        relatedProductModelIds: JSON.stringify(modelData.relatedProductModelIds || []),
        // defaultVariantId will be updated later after variants are created
      },
    });
    console.log(`  Created product model '${createdProductModel.modelName}' with DB id: ${createdProductModel.id}`);

    const createdVariantsWithOriginalId: { originalIdInData: string; newPrismaId: string; colorKey: string; }[] = [];

    for (const variantData of modelData.variants) {
      const colorKeyToUse = variantData.color.key || variantData.id; // Fallback to variantData.id if color.key is missing
      const createdVariant = await prisma.productVariant.create({
        data: {
          modelId: createdProductModel.id, // Link to the created ProductModel
          colorKey: colorKeyToUse,
          colorNamePT: variantData.color.name?.pt || '',
          colorNameEN: variantData.color.name?.en || '',
          colorNameES: variantData.color.name?.es || '',
          colorHex: variantData.color.hex,
          mainImageURL: variantData.images.main,
          angleImageURLs: JSON.stringify(variantData.images.angles || []),
        },
      });
      createdVariantsWithOriginalId.push({
        originalIdInData: variantData.id, // ID from data.ts
        newPrismaId: createdVariant.id,   // New ID from database
        colorKey: createdVariant.colorKey
      });
      console.log(`    Created variant with DB id: ${createdVariant.id} (original id: ${variantData.id}, colorKey: ${colorKeyToUse}) for model ${createdProductModel.modelName}`);
    }

    let finalDefaultVariantDbId: string | null = null;

    if (modelData.defaultVariantId) {
      const matchingVariantInfo = createdVariantsWithOriginalId.find(
        v => v.originalIdInData === modelData.defaultVariantId
      );
      if (matchingVariantInfo) {
        finalDefaultVariantDbId = matchingVariantInfo.newPrismaId;
        console.log(`    Found mapping for defaultVariantId: original '${modelData.defaultVariantId}' maps to new DB id '${finalDefaultVariantDbId}'.`);
      } else {
        console.warn(`    WARNING: Could not find a created variant corresponding to defaultVariantId '${modelData.defaultVariantId}' from data.ts for model ${createdProductModel.modelName}.`);
      }
    }

    // If no specific defaultVariantId was resolved, or if none was specified in data.ts, and there are variants, set the first one as default.
    if (!finalDefaultVariantDbId && createdVariantsWithOriginalId.length > 0) {
      finalDefaultVariantDbId = createdVariantsWithOriginalId[0].newPrismaId;
      console.log(`    Setting first created variant (DB id: ${finalDefaultVariantDbId}) as default for model ${createdProductModel.modelName}.`);
    }

    if (finalDefaultVariantDbId) {
      await prisma.productModel.update({
        where: { id: createdProductModel.id },
        data: { defaultVariantId: finalDefaultVariantDbId },
      });
      console.log(`  Updated model ${createdProductModel.modelName} with defaultVariantId: ${finalDefaultVariantDbId}`);
    } else if (modelData.variants.length > 0) {
      console.warn(`    WARNING: Model ${createdProductModel.modelName} has variants but no default variant could be set.`);
    }
  }

  console.log(`Seeding finished.`);
}

main()
  .catch(async (e) => {
    console.error('Error during seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 