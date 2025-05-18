const fs = require('fs');
const path = require('path');

// --- CONFIGURATION ---
const projectRoot = path.resolve(__dirname, '..'); // Assumes script is in 'scripts' folder
const imageSourceDir = path.join(projectRoot, 'public', 'images', 'products');
const webRootPrefix = '/images/products'; // How image paths start in data.ts
const outputFilePath = path.join(projectRoot, 'lib', 'products', 'data.ts');
const defaultLang = 'pt';
const supportedLangs = ['pt', 'en', 'es'];
// --- END CONFIGURATION ---

const categoryMap = {
  'interior': 'Interior',
  'exterior': 'Exterior'
};

const subcategoryMap = {
  'chairs': { name: { pt: 'Cadeiras', en: 'Chairs', es: 'Sillas' }, type: 'silla' },
  'stools': { name: { pt: 'Bancos', en: 'Stools', es: 'Taburetes' }, type: 'banqueta' },
  'tables': { name: { pt: 'Mesas', en: 'Tables', es: 'Mesas' }, type: 'mesa' },
  'sofas': { name: { pt: 'Sofás', en: 'Sofas', es: 'Sofás' }, type: 'sofa' }
};

const materialsMap = {
  'silla': ['Madeira', 'Estofamento de qualidade'],
  'banqueta': ['Madeira', 'Metal reforçado', 'Estofamento premium'],
  'mesa': ['Madeira maciça', 'Metal', 'Tampo em melamina/compact'],
  'sofa': ['Madeira', 'Corda trançada à mão', 'Estrutura reforçada', 'Estofamento de alta durabilidade']
};

const colorMap = {
  'negro-y-blanco': { name: { pt: 'Preto e Branco', en: 'Black and White', es: 'Negro y Blanco' }, hex: '#000000' },
  'verde-y-blanco': { name: { pt: 'Verde e Branco', en: 'Green and White', es: 'Verde y Blanco' }, hex: '#008000' },
  'azul-y-blanco': { name: { pt: 'Azul e Branco', en: 'Blue and White', es: 'Azul y Blanco' }, hex: '#0000FF' },
  'rojo-y-blanco': { name: { pt: 'Vermelho e Branco', en: 'Red and White', es: 'Rojo y Blanco' }, hex: '#FF0000' },
  'marron-y-blanco': { name: { pt: 'Marrom e Branco', en: 'Brown and White', es: 'Marrón y Blanco' }, hex: '#8B4513' },
  'roble-natural': { name: { pt: 'Carvalho Natural', en: 'Natural Oak', es: 'Roble Natural' }, hex: '#D2B48C' },
  'nogal-claro': { name: { pt: 'Nogueira Clara', en: 'Light Walnut', es: 'Nogal Claro' }, hex: '#C19A6B' },
  'negro': { name: { pt: 'Preto', en: 'Black', es: 'Negro' }, hex: '#000000' },
  'blanco': { name: { pt: 'Branco', en: 'White', es: 'Blanco' }, hex: '#FFFFFF' },
  'roble': { name: { pt: 'Carvalho', en: 'Oak', es: 'Roble' }, hex: '#D2B48C' },
  'nogal': { name: { pt: 'Nogueira', en: 'Walnut', es: 'Nogal' }, hex: '#654321' },
  'marron': { name: { pt: 'Marrom', en: 'Brown', es: 'Marrón' }, hex: '#8B4513' },
  'crema': { name: { pt: 'Creme', en: 'Cream', es: 'Crema' }, hex: '#F5F5DC' },
  'arena': { name: { pt: 'Areia', en: 'Sand', es: 'Arena' }, hex: '#E0D4B4' },
  'teja': { name: { pt: 'Teja', en: 'Tile Red', es: 'Teja' }, hex: '#B87333' },
  'esmeralda': { name: { pt: 'Esmeralda', en: 'Emerald', es: 'Esmeralda' }, hex: '#50C878' },
  'celeste': { name: { pt: 'Celeste', en: 'Sky Blue', es: 'Celeste' }, hex: '#B0E0E6' },
  'zafiro': { name: { pt: 'Zafiro', en: 'Sapphire', es: 'Zafiro' }, hex: '#082567' },
  'mekong': { name: { pt: 'Mekong', en: 'Mekong', es: 'Mekong' }, hex: '#6B705C' },
  'vesubio': { name: { pt: 'Vesúvio', en: 'Vesuvio', es: 'Vesubio' }, hex: '#A9A9A9' },
  'terracota': { name: { pt: 'Terracota', en: 'Terracotta', es: 'Terracota' }, hex: '#E2725B' },
  'verde': { name: { pt: 'Verde', en: 'Green', es: 'Verde' }, hex: '#008000' },
  'rojo': { name: { pt: 'Vermelho', en: 'Red', es: 'Rojo' }, hex: '#FF0000' },
  'azul': { name: { pt: 'Azul', en: 'Blue', es: 'Azul' }, hex: '#0000FF' },
  'mostaza': { name: { pt: 'Mostarda', en: 'Mustard', es: 'Mostaza' }, hex: '#FFDB58' },
  'gris': { name: { pt: 'Cinza', en: 'Gray', es: 'Gris' }, hex: '#808080' },
  'burdeos': { name: { pt: 'Bordô', en: 'Burgundy', es: 'Burdeos' }, hex: '#800020' },
  'latte': { name: { pt: 'Latte', en: 'Latte', es: 'Latte' }, hex: '#C8A2C8' },
  'soho': { name: { pt: 'Soho', en: 'Soho', es: 'Soho' }, hex: '#87CEEB' },
  'budeos': { name: { pt: 'Budeos', en: 'Budeos', es: 'Budeos' }, hex: '#A52A2A' },
  'atlas': { name: { pt: 'Atlas', en: 'Atlas', es: 'Atlas' }, hex: '#F0E68C' },
  'karamel': { name: { pt: 'Karamel', en: 'Karamel', es: 'Karamel' }, hex: '#D2691E' },
  'rural': { name: { pt: 'Rural', en: 'Rural', es: 'Rural' }, hex: '#A0522D'},
  'piedra': { name: { pt: 'Pedra', en: 'Stone', es: 'Piedra' }, hex: '#8A795D'},
  'dorado': { name: { pt: 'Dourado', en: 'Golden', es: 'Dorado' }, hex: '#FFD700' },
  'olimpo': { name: { pt: 'Olimpo', en: 'Olimpo', es: 'Olimpo' }, hex: '#B0C4DE' },
  'samas': { name: { pt: 'Samas', en: 'Samas', es: 'Samas' }, hex: '#C0C0C0' },
  'tafu': { name: { pt: 'Tafu', en: 'Tafu', es: 'Tafu' }, hex: '#D3D3D3' },
  'bianco': { name: { pt: 'Bianco', en: 'Bianco', es: 'Bianco' }, hex: '#FAFAFA' },
  'zeus': { name: { pt: 'Zeus', en: 'Zeus', es: 'Zeus' }, hex: '#A9A9A9' },
  'marquina': { name: { pt: 'Marquina', en: 'Marquina', es: 'Marquina' }, hex: '#36454F' },
};
const knownColorKeys = Object.keys(colorMap);

function formatModelName(name) {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function parseFilenameDetails(filename, modelNamePartsLower) {
    const ext = path.extname(filename);
    let nameSansExt = filename.substring(0, filename.length - ext.length);
    
    let isAngleExplicit = false; // Changed name for clarity
    let baseNameForColorParsing = nameSansExt;

    const angleSuffixes = ['_trasera', '_espalda', '_detalle-soldadura-latonada'];
    const angleKeywords = ['trasera', 'espalda'];

    for (const suffix of angleSuffixes) {
        if (baseNameForColorParsing.toLowerCase().endsWith(suffix)) {
            baseNameForColorParsing = baseNameForColorParsing.substring(0, baseNameForColorParsing.length - suffix.length);
            isAngleExplicit = true;
            break;
        }
    }
    if (!isAngleExplicit) {
        const lowerBaseName = baseNameForColorParsing.toLowerCase();
        if (angleKeywords.some(kw => {
            const kwIndex = lowerBaseName.lastIndexOf(kw);
            // Check if kw is a whole word suffix or followed by non-alphanumeric, and not part of model name
            return kwIndex > 0 && 
                   (lowerBaseName.length === kwIndex + kw.length || !(/[a-z0-9]/i.test(lowerBaseName[kwIndex+kw.length]))) && 
                   !modelNamePartsLower.includes(kw);
        })) {
           isAngleExplicit = true;
        }
        if (lowerBaseName.includes('_detalle') && !modelNamePartsLower.some(p => p.includes('detalle'))){
            isAngleExplicit = true;
        }
    }

    let parts = baseNameForColorParsing.split('-');
    let colorInfo = null;
    let partsBeforeColor = [...parts];

    for (let len = Math.min(3, partsBeforeColor.length); len >= 1; len--) {
        const potentialColorKey = partsBeforeColor.slice(-len).join('-').toLowerCase();
        if (knownColorKeys.includes(potentialColorKey)) {
            colorInfo = { key: potentialColorKey, ...colorMap[potentialColorKey] };
            partsBeforeColor = partsBeforeColor.slice(0, -len);
            break;
        }
    }
    
    // variantDefiningId is based on the name *after* angle indicators are removed but *before* color is removed (if any).
    // This ensures that "product-color.jpg" and "product-color_trasera.jpg" refer to the same variant.
    const variantDefiningId = baseNameForColorParsing.toLowerCase().replace(/[^a-z0-9-_]/g, '-').replace(/-+/g, '-');
    
    // The key used to group all images for a single variant (e.g. "Insbruck chair in cream")
    // It's the parts *before* color, plus the color key itself.
    const variantGroupKey = `${partsBeforeColor.join('-').toLowerCase()}_colorkey_${colorInfo ? colorInfo.key : 'default'}`;

    return {
        originalFilename: filename,
        variantDefiningId: variantDefiningId,
        variantGroupKey: variantGroupKey,
        colorInfo: colorInfo,
        isAngleExplicit: isAngleExplicit,
    };
}

function getProductTypeFromSubcategory(subcategoryKey) {
    return subcategoryMap[subcategoryKey] ? subcategoryMap[subcategoryKey].type : 'unknown';
}

function generateMockDimensions(productType) {
  let dims = { width: 50, height: 80, depth: 55, unit: 'cm' };
  if (productType === 'banqueta') dims = { width: 45, height: 105, depth: 47, unit: 'cm' };
  else if (productType === 'mesa') dims = { width: 80, height: 75, depth: 80, unit: 'cm' };
  else if (productType === 'sofa') dims = { width: 140, height: 75, depth: 70, unit: 'cm' };
  return dims;
}

function generateModelDescriptionI18n(modelName, categoryName, productTypeNameDefaultLang) {
    const i18nDesc = {};
    const productTypeEn = productTypeNameDefaultLang === 'Cadeira' ? 'Chair' : productTypeNameDefaultLang === 'Mesa' ? 'Table' : productTypeNameDefaultLang === 'Banco' ? 'Stool' : productTypeNameDefaultLang === 'Sofá' ? 'Sofa' : productTypeNameDefaultLang;
    const productTypeEs = productTypeNameDefaultLang === 'Cadeira' ? 'Silla' : productTypeNameDefaultLang === 'Mesa' ? 'Mesa' : productTypeNameDefaultLang === 'Banco' ? 'Taburete' : productTypeNameDefaultLang === 'Sofá' ? 'Sofá' : productTypeNameDefaultLang;

    i18nDesc['pt'] = `Conheça ${productTypeNameDefaultLang} ${modelName}, uma peça de design versátil da nossa coleção ${categoryName.toLowerCase()}. Ideal para adicionar estilo e funcionalidade a qualquer ambiente.`;
    i18nDesc['en'] = `Meet the ${modelName} ${productTypeEn}, a versatile design piece from our ${categoryName.toLowerCase()} collection. Ideal for adding style and functionality to any setting.`;
    i18nDesc['es'] = `Descubre ${productTypeEs} ${modelName}, una pieza de diseño versátil de nuestra colección de ${categoryName.toLowerCase()}. Ideal para añadir estilo y funcionalidad a cualquier ambiente.`;
    return i18nDesc;
}

function generateFeatures(categoryName, productType) { return ["Design exclusivo", "Alta durabilidade", "Construção robusta"]; } // These should ideally be i18n keys
function generateWeight(productType) { 
    if (productType === 'silla') return 4.5;
    if (productType === 'banqueta') return 6.0;
    if (productType === 'mesa') return 15.0;
    if (productType === 'sofa') return 12.0;
    return 5.0;
 }
function extractMaterials(productType) { // These should ideally be i18n keys
    return materialsMap[productType] || ['Madeira de alta qualidade'];
}

function getSeatColors(seatFolderDir, modelNamePartsLowerForSeatfiles) {
    const seatColorObjects = [];
    const foundColorKeys = new Set();

    const asientoSingularPath = path.join(seatFolderDir, 'asiento');
    const asientoPluralPath = path.join(seatFolderDir, 'asientos');
    
    let actualSeatPath = null;
    if (fs.existsSync(asientoSingularPath) && fs.statSync(asientoSingularPath).isDirectory()) {
        actualSeatPath = asientoSingularPath;
    } else if (fs.existsSync(asientoPluralPath) && fs.statSync(asientoPluralPath).isDirectory()) {
        actualSeatPath = asientoPluralPath;
    }

    if (actualSeatPath) {
        try {
            const seatFiles = fs.readdirSync(actualSeatPath)
                .filter(file => !file.startsWith('.') && file.match(/\.(jpg|jpeg|png|webp)$/i));

            for (const seatFile of seatFiles) {
                let effectiveModelNameParts = ['asiento']; // For seat files, the "model name" part for color parsing context is 'asiento'
                
                const parsedSeatFile = parseFilenameDetails(seatFile, effectiveModelNameParts); // Pass ['asiento'] as model context
                if (parsedSeatFile.colorInfo && !foundColorKeys.has(parsedSeatFile.colorInfo.key)) {
                    seatColorObjects.push({ name: parsedSeatFile.colorInfo.name, hex: parsedSeatFile.colorInfo.hex, key: parsedSeatFile.colorInfo.key });
                    foundColorKeys.add(parsedSeatFile.colorInfo.key);
                }
            }
        } catch (error) {
            console.error(`Error reading seat colors from ${actualSeatPath}:`, error);
        }
    }
    return seatColorObjects.length > 0 ? seatColorObjects : undefined;
}

const productModelsList = [];
const relatedModelMap = new Map();

function discoverProductModels() {
    console.log(`Discovering product models from: ${imageSourceDir}`);
    if (!fs.existsSync(imageSourceDir)) {
        console.error(`ERROR: Image source directory not found: ${imageSourceDir}`);
        return [];
    }

    const categoryFolders = fs.readdirSync(imageSourceDir).filter(dir => fs.statSync(path.join(imageSourceDir, dir)).isDirectory() && categoryMap[dir]);

    for (const categoryKey of categoryFolders) {
        const categoryPath = path.join(imageSourceDir, categoryKey);
        const subcategoryFolders = fs.readdirSync(categoryPath).filter(dir => fs.statSync(path.join(categoryPath, dir)).isDirectory() && subcategoryMap[dir]);

        for (const subcategoryKey of subcategoryFolders) {
            const subcategoryPathDir = path.join(categoryPath, subcategoryKey);
            const productModelBaseFolders = fs.readdirSync(subcategoryPathDir).filter(item => !item.startsWith('.') && fs.statSync(path.join(subcategoryPathDir, item)).isDirectory());

            for (const productModelBaseFolder of productModelBaseFolders) {
                const modelFilesPath = path.join(subcategoryPathDir, productModelBaseFolder);
                const modelNamePartsLower = productModelBaseFolder.toLowerCase().split('-');
                const modelNameFormatted = formatModelName(productModelBaseFolder);
                const productType = getProductTypeFromSubcategory(subcategoryKey);

                let imageFiles = [];
                try {
                    imageFiles = fs.readdirSync(modelFilesPath).filter(file =>
                        !file.startsWith('.') &&
                        fs.statSync(path.join(modelFilesPath, file)).isFile() &&
                        file.match(/\.(jpg|jpeg|png|webp|textclipping)$/i)
                    );
                } catch (error) { console.error(`Error reading image files in ${modelFilesPath}:`, error); continue; }

                const imageAggregatorByVariantGroup = new Map();

                for (const imageFile of imageFiles) {
                    if (imageFile.toLowerCase().endsWith('.textclipping') || imageFile.toLowerCase().endsWith('.ds_store')) {
                        console.warn(`Skipping system/meta file: ${path.join(modelFilesPath, imageFile)}`);
                        continue;
                    }

                    const parsedFile = parseFilenameDetails(imageFile, modelNamePartsLower);

                    if (!imageAggregatorByVariantGroup.has(parsedFile.variantGroupKey)) {
                        const defaultColorNameI18n = {};
                        supportedLangs.forEach(lang => defaultColorNameI18n[lang] = (lang === 'pt' ? 'Padrão' : (lang === 'en' ? 'Default' : 'Estándar')));
                        
                        imageAggregatorByVariantGroup.set(parsedFile.variantGroupKey, {
                            variantDefiningId: parsedFile.variantDefiningId,
                            colorInfo: parsedFile.colorInfo || { name: defaultColorNameI18n, hex: "#CCCCCC", key: "default" },
                            imageList: [],
                            webPathBase: path.join(webRootPrefix, categoryKey, subcategoryKey, productModelBaseFolder).replace(/\\/g, '/')
                        });
                    }
                    
                    const variantGroupData = imageAggregatorByVariantGroup.get(parsedFile.variantGroupKey);
                    variantGroupData.imageList.push({
                        path: path.join(variantGroupData.webPathBase, parsedFile.originalFilename).replace(/\\/g, '/'),
                        isAngleExplicit: parsedFile.isAngleExplicit
                    });
                }

                const finalProductVariants = [];
                for (const [groupKey, groupData] of imageAggregatorByVariantGroup.entries()) {
                    if (groupData.imageList.length === 0) continue;

                    let mainImage = null;
                    const angleImages = [];

                    groupData.imageList.sort((a, b) => {
                        if (a.isAngleExplicit === b.isAngleExplicit) return a.path.localeCompare(b.path);
                        return a.isAngleExplicit ? 1 : -1;
                    });
                    
                    for (const img of groupData.imageList) {
                        if (!img.isAngleExplicit && !mainImage) {
                            mainImage = img.path;
                        } else {
                            // Add to angles if it's explicitly an angle OR if it's another non-angle image after main is set
                            angleImages.push(img.path);
                        }
                    }
                    
                    if (!mainImage && groupData.imageList.length > 0) { // If all images were explicit angles or only one image
                        mainImage = groupData.imageList[0].path; // Take the first one as main
                        if(groupData.imageList.length > 1) { // If there were others, they are now angles
                           angleImages.push(...groupData.imageList.slice(1).map(img => img.path));
                        }
                         console.warn(`Model ${modelNameFormatted}, Variant Group ${groupKey}: No clear non-angle main image. Using ${mainImage}.`);
                    }
                    
                    if (!mainImage) {
                        console.warn(`Skipping variant group ${groupKey} in model ${modelNameFormatted} - no main image could be determined.`);
                        continue;
                    }

                    const seatColorsForModel = getSeatColors(modelFilesPath, modelNamePartsLower);

                    finalProductVariants.push({
                        id: groupData.variantDefiningId,
                        color: groupData.colorInfo,
                        images: {
                            main: mainImage,
                            angles: [...new Set(angleImages.filter(p => p !== mainImage))] // Ensure main is not in angles, and unique
                        },
                        ...(seatColorsForModel && { seatColors: seatColorsForModel }),
                    });
                }

                if (finalProductVariants.length === 0) {
                    console.warn(`No valid variants processed for model ${modelNameFormatted} (folder: ${productModelBaseFolder}). Skipping model.`);
                    continue;
                }
                
                finalProductVariants.sort((a, b) => a.id.localeCompare(b.id));

                const modelId = `${modelNameFormatted.toUpperCase().replace(/\s+/g, '-')}-${productType.toUpperCase()}-MODEL`;
                
                const productTypeNameDefaultLang = subcategoryMap[subcategoryKey].name[defaultLang] || formatModelName(productType);
                const displayNameI18n = {};
                supportedLangs.forEach(lang => {
                    displayNameI18n[lang] = modelNameFormatted; 
                });

                const modelEntry = {
                    modelId: modelId,
                    modelName: modelNameFormatted,
                    displayName: displayNameI18n,
                    category: categoryMap[categoryKey],
                    subcategory: subcategoryMap[subcategoryKey].name[defaultLang],
                    productType: productType,
                    baseDescription: generateModelDescriptionI18n(modelNameFormatted, categoryMap[categoryKey], productTypeNameDefaultLang),
                    baseFeatures: generateFeatures(categoryMap[categoryKey], productType),
                    baseMaterials: extractMaterials(productType),
                    dimensions: generateMockDimensions(productType),
                    weight: generateWeight(productType),
                    variants: finalProductVariants,
                    defaultVariantId: finalProductVariants[0].id,
                };
                productModelsList.push(modelEntry);
                if (!relatedModelMap.has(modelNameFormatted)) {
                    relatedModelMap.set(modelNameFormatted, modelId);
                }
            }
        }
    }
    
    productModelsList.forEach(pm => {
        pm.relatedProductModelIds = Array.from(relatedModelMap.keys())
            .filter(relatedModelName => relatedModelName !== pm.modelName && relatedModelMap.get(relatedModelName) !== pm.modelId)
            .slice(0, 3)
            .map(relatedModelName => relatedModelMap.get(relatedModelName))
            .filter(id => id !== undefined);
    });

    return productModelsList;
}

function writeProductModelsToFile(models) {
    if (models.length === 0) {
        console.log("No product models discovered. Not writing data.ts file.");
        return;
    }
    console.log(`Generating data.ts with ${models.length} product models...`);

    const modelsString = models.map(model => {
        const displayNameStrings = supportedLangs.map(lang => `        "${lang}": "${(model.displayName[lang] || model.modelName).replace(/"/g, '\\"')}"`).join(',\n');
        const descriptionStrings = supportedLangs.map(lang => `        "${lang}": "${(model.baseDescription[lang] || '').replace(/"/g, '\\"')}"`).join(',\n');

        const variantsString = model.variants.map(variant => {
            const colorNameStrings = supportedLangs.map(lang => `              "${lang}": "${(variant.color.name[lang] || variant.color.key || 'Color').replace(/"/g, '\\"')}"`).join(',\n');
            
            let seatColorsVariantString = "";
            if (variant.seatColors && variant.seatColors.length > 0) {
                const seatColorEntries = variant.seatColors.map(sc => {
                    const seatColorNameStrings = supportedLangs.map(lang => `                  "${lang}": "${(sc.name[lang] || 'Seat Color').replace(/"/g, '\\"')}"`).join(',\n');
                    return `          { 
                name: {
${seatColorNameStrings}
                }, 
                hex: "${sc.hex}",
                key: "${sc.key || ''}"
              }`;
                }).join(',\n');
                seatColorsVariantString = `,\n          seatColors: [
${seatColorEntries}
          ]`;
            }

            const angleStrings = variant.images.angles.map(angle => `            "${angle}"`).join(',\n');

            return `      {
        id: "${variant.id}",
        color: { 
          name: {
${colorNameStrings}
          }, 
          hex: "${variant.color.hex}",
          key: "${variant.color.key || ''}"
        },
        images: {
          main: "${variant.images.main}",
          angles: [
${angleStrings}
          ]
        }${seatColorsVariantString}
      }`;
        }).join(',\n');
        
        let relatedIdsString = "";
        if (model.relatedProductModelIds && model.relatedProductModelIds.length > 0) {
            relatedIdsString = `,\n    relatedProductModelIds: [${model.relatedProductModelIds.map(id => `"${id}"`).join(', ')}]`;
        }

        // Ensure defaultVariantId is valid
        let defaultVariantId = model.defaultVariantId;
        if (!model.variants.find(v => v.id === defaultVariantId) && model.variants.length > 0) {
            console.warn(`Default variant ID "${defaultVariantId}" not found for model "${model.modelName}". Falling back to first variant.`);
            defaultVariantId = model.variants[0].id;
        } else if (model.variants.length === 0) {
            console.error(`Model "${model.modelName}" has no variants. Cannot set defaultVariantId.`);
            defaultVariantId = "NO_VARIANTS_ERROR"; // Placeholder to indicate error
        }


        return `  {
    modelId: "${model.modelId}",
    modelName: "${model.modelName}",
    displayName: {
${displayNameStrings}
    },
    category: "${model.category}",
    subcategory: "${model.subcategory}",
    productType: "${model.productType}",
    baseDescription: {
${descriptionStrings}
    },
    baseFeatures: [
      ${model.baseFeatures.map(feature => `"${feature.replace(/"/g, '\\"')}"`).join(',\n      ')}
    ],
    baseMaterials: [
      ${model.baseMaterials.map(material => `"${material.replace(/"/g, '\\"')}"`).join(',\n      ')}
    ],
    dimensions: { width: ${model.dimensions.width}, height: ${model.dimensions.height}, depth: ${model.dimensions.depth}, unit: "${model.dimensions.unit}" },
    weight: ${model.weight},
    variants: [
${variantsString}
    ],
    defaultVariantId: "${defaultVariantId}"${relatedIdsString}
  }`;
    }).join(',\n');

    const dataFileContent = `// Generated by script
export type I18nString = {
  [langCode: string]: string;
};

export type ProductColor = {
  name: I18nString;
  hex: string;
  key?: string; 
};

export type ProductVariant = {
  id: string;
  color: ProductColor;
  seatColors?: ProductColor[];
  images: {
    main: string;
    angles: string[];
  };
};

export type ProductModel = {
  modelId: string;
  modelName: string;
  displayName: I18nString;
  category: string;
  subcategory: string;
  productType: string;
  baseDescription: I18nString;
  baseFeatures: string[];
  baseMaterials: string[];
  dimensions: {
    width: number;
    height: number;
    depth: number;
    unit: string;
  };
  weight: number;
  variants: ProductVariant[];
  defaultVariantId: string;
  relatedProductModelIds?: string[];
};

export const productModels: ProductModel[] = [
${modelsString}
];

// --- Utility Functions ---
export function getProductModelById(modelId: string): ProductModel | undefined {
  return productModels.find(model => model.modelId === modelId);
}

export function getLocalizedField(item: I18nString | undefined, lang: string, fallbackLang: string = "${defaultLang}"): string {
  if (!item) return "";
  return item[lang] || item[fallbackLang] || item[Object.keys(item)[0]] || "";
}

export function getAllProductModels(): ProductModel[] {
  return productModels;
}

export function getModelsByCategory(categoryName: string): ProductModel[] {
  return productModels.filter(model => model.category.toLowerCase() === categoryName.toLowerCase());
}

export function getModelsBySubcategory(subcategoryName: string, lang: string = "${defaultLang}"): ProductModel[] {
  // Assumes subcategoryMap.name is i18n and model.subcategory stores the defaultLang version
  // For more robust matching, you might store subcategory key in model and match against that
  return productModels.filter(model => model.subcategory.toLowerCase() === subcategoryName.toLowerCase());
}

export function getModelsByProductType(productType: string): ProductModel[] {
  return productModels.filter(model => model.productType === productType);
}
`;

    const outputDir = path.dirname(outputFilePath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.writeFileSync(outputFilePath, dataFileContent);
    console.log(`data.ts created successfully at ${outputFilePath}.`);
}

// --- Main Execution ---
const discoveredProductModels = discoverProductModels();
writeProductModelsToFile(discoveredProductModels);