/*
  Warnings:

  - You are about to drop the column `baseDescription` on the `ProductModel` table. All the data in the column will be lost.
  - You are about to drop the column `dimensions` on the `ProductModel` table. All the data in the column will be lost.
  - You are about to drop the column `displayName` on the `ProductModel` table. All the data in the column will be lost.
  - You are about to drop the column `modelId` on the `ProductModel` table. All the data in the column will be lost.
  - You are about to drop the column `colorData` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `seatColorsData` on the `ProductVariant` table. All the data in the column will be lost.
  - Added the required column `baseDescriptionEN` to the `ProductModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `baseDescriptionES` to the `ProductModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `baseDescriptionPT` to the `ProductModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dimensionsDepth` to the `ProductModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dimensionsHeight` to the `ProductModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dimensionsUnit` to the `ProductModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dimensionsWidth` to the `ProductModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `displayNameEN` to the `ProductModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `displayNameES` to the `ProductModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `displayNamePT` to the `ProductModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `colorHex` to the `ProductVariant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `colorKey` to the `ProductVariant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `colorNameEN` to the `ProductVariant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `colorNameES` to the `ProductVariant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `colorNamePT` to the `ProductVariant` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductModel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "modelName" TEXT NOT NULL,
    "displayNamePT" TEXT NOT NULL,
    "displayNameEN" TEXT NOT NULL,
    "displayNameES" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subcategory" TEXT NOT NULL,
    "productType" TEXT NOT NULL,
    "baseDescriptionPT" TEXT NOT NULL,
    "baseDescriptionEN" TEXT NOT NULL,
    "baseDescriptionES" TEXT NOT NULL,
    "baseFeatures" TEXT NOT NULL DEFAULT '[]',
    "baseMaterials" TEXT NOT NULL DEFAULT '[]',
    "dimensionsWidth" REAL NOT NULL,
    "dimensionsHeight" REAL NOT NULL,
    "dimensionsDepth" REAL NOT NULL,
    "dimensionsUnit" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "defaultVariantId" TEXT,
    "relatedProductModelIds" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProductModel_defaultVariantId_fkey" FOREIGN KEY ("defaultVariantId") REFERENCES "ProductVariant" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ProductModel" ("baseFeatures", "baseMaterials", "category", "createdAt", "defaultVariantId", "id", "modelName", "productType", "relatedProductModelIds", "subcategory", "updatedAt", "weight") SELECT "baseFeatures", "baseMaterials", "category", "createdAt", "defaultVariantId", "id", "modelName", "productType", "relatedProductModelIds", "subcategory", "updatedAt", "weight" FROM "ProductModel";
DROP TABLE "ProductModel";
ALTER TABLE "new_ProductModel" RENAME TO "ProductModel";
CREATE UNIQUE INDEX "ProductModel_defaultVariantId_key" ON "ProductModel"("defaultVariantId");
CREATE TABLE "new_ProductVariant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "modelId" TEXT NOT NULL,
    "colorKey" TEXT NOT NULL,
    "colorNamePT" TEXT NOT NULL,
    "colorNameEN" TEXT NOT NULL,
    "colorNameES" TEXT NOT NULL,
    "colorHex" TEXT NOT NULL,
    "mainImageURL" TEXT,
    "angleImageURLs" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProductVariant_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "ProductModel" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProductVariant" ("angleImageURLs", "createdAt", "id", "mainImageURL", "modelId", "updatedAt") SELECT "angleImageURLs", "createdAt", "id", "mainImageURL", "modelId", "updatedAt" FROM "ProductVariant";
DROP TABLE "ProductVariant";
ALTER TABLE "new_ProductVariant" RENAME TO "ProductVariant";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
