-- CreateTable
CREATE TABLE "ProductModel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "modelId" TEXT NOT NULL,
    "modelName" TEXT NOT NULL,
    "displayName" TEXT NOT NULL DEFAULT '{}',
    "category" TEXT NOT NULL,
    "subcategory" TEXT NOT NULL,
    "productType" TEXT NOT NULL,
    "baseDescription" TEXT NOT NULL DEFAULT '{}',
    "baseFeatures" TEXT NOT NULL DEFAULT '[]',
    "baseMaterials" TEXT NOT NULL DEFAULT '[]',
    "dimensions" TEXT NOT NULL DEFAULT '{"width":0,"height":0,"depth":0,"unit":"cm"}',
    "weight" REAL NOT NULL,
    "defaultVariantId" TEXT,
    "relatedProductModelIds" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProductModel_defaultVariantId_fkey" FOREIGN KEY ("defaultVariantId") REFERENCES "ProductVariant" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductVariant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "modelId" TEXT NOT NULL,
    "colorData" TEXT NOT NULL DEFAULT '{}',
    "seatColorsData" TEXT DEFAULT '[]',
    "mainImageURL" TEXT,
    "angleImageURLs" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProductVariant_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "ProductModel" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductModel_modelId_key" ON "ProductModel"("modelId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductModel_defaultVariantId_key" ON "ProductModel"("defaultVariantId");
