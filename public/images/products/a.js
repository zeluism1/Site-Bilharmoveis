const fs = require('fs');
const path = require('path');

// Configuration:
// fsRoot: Where the script looks for the top-level 'exterior' and 'interior' folders.
// If your 'exterior' and 'interior' folders are directly in 'public/images/products/',
// and you run the script from 'public/images/products/', set fsRoot = './'.
// If you run from project root, and images are in 'public/images/products/exterior',
// set fsRoot = 'public/images/products'.
const fsRoot = './'; // Assuming script is run from the directory containing 'exterior'/'interior'

// webRootPrefix: How image paths should start in the generated data.ts.
// If images are served from yourdomain.com/images/products/exterior/..., set this to '/images/products'.
const webRootPrefix = '/images/products';

// Map folder names to categories
const categoryMap = {
  'interior': 'Interior',
  'exterior': 'Exterior'
};

// Map folder names to subcategories and infer product type
const subcategoryMap = {
  'chairs': { name: 'Cadeiras', type: 'silla' },
  'stools': { name: 'Bancos', type: 'banqueta' },
  'tables': { name: 'Mesas', type: 'mesa' },
  'sofas': { name: 'Sofás', type: 'sofa' } // Includes 'sillon'
};

const materialsMap = {
  'silla': ['Madeira', 'Estofamento de qualidade'],
  'banqueta': ['Madeira', 'Metal reforçado', 'Estofamento premium'],
  'mesa': ['Madeira maciça', 'Metal', 'Tampo em melamina/compact'],
  'sofa': ['Madeira', 'Corda trançada à mão', 'Estrutura reforçada', 'Estofamento de alta durabilidade']
};

const colorMap = {
  // Multi-word colors first (lowercase keys)
  'negro-y-blanco': { name: 'Preto e Branco', hex: '#000000' },
  'verde-y-blanco': { name: 'Verde e Branco', hex: '#008000' },
  'azul-y-blanco': { name: 'Azul e Branco', hex: '#0000FF' },
  'rojo-y-blanco': { name: 'Vermelho e Branco', hex: '#FF0000' },
  'marron-y-blanco': { name: 'Marrom e Branco', hex: '#8B4513' },
  'roble-natural': { name: 'Carvalho Natural', hex: '#D2B48C' },
  'nogal-claro': { name: 'Nogueira Clara', hex: '#C19A6B' },
  // Single-word colors
  'negro': { name: 'Preto', hex: '#000000' },
  'blanco': { name: 'Branco', hex: '#FFFFFF' },
  'roble': { name: 'Carvalho', hex: '#D2B48C' },
  'nogal': { name: 'Nogueira', hex: '#654321' },
  'marron': { name: 'Marrom', hex: '#8B4513' },
  'crema': { name: 'Creme', hex: '#F5F5DC' },
  'arena': { name: 'Areia', hex: '#E0D4B4' },
  'teja': { name: 'Teja', hex: '#B87333' },
  'esmeralda': { name: 'Esmeralda', hex: '#50C878' },
  'celeste': { name: 'Celeste', hex: '#B0E0E6' },
  'zafiro': { name: 'Zafiro', hex: '#082567' },
  'mekong': { name: 'Mekong', hex: '#6B705C' },
  'vesubio': { name: 'Vesúvio', hex: '#A9A9A9' },
  'terracota': { name: 'Terracota', hex: '#E2725B' },
  'verde': { name: 'Verde', hex: '#008000' },
  'rojo': { name: 'Vermelho', hex: '#FF0000' },
  'azul': { name: 'Azul', hex: '#0000FF' },
  'mostaza': { name: 'Mostarda', hex: '#FFDB58' },
  'gris': { name: 'Cinza', hex: '#808080' },
  'burdeos': { name: 'Bordô', hex: '#800020' },
  'latte': { name: 'Latte', hex: '#C8A2C8' },
  'soho': { name: 'Soho', hex: '#87CEEB' }, // Sky blue, adjust if known
  'budeos': { name: 'Budeos', hex: '#A52A2A' }, // Brown, may be 'burdeos'
  'atlas': { name: 'Atlas', hex: '#F0E68C' }, // Khaki
  'karamel': { name: 'Karamel', hex: '#D2691E' },
  'rural': {name: 'Rural', hex: '#A0522D'},
  'piedra': { name: 'Pedra', hex: '#8A795D'},
  'dorado': { name: 'Dourado', hex: '#FFD700' }
  // Add any other specific color names from filenames if they are colors.
  // Olimpo, Samas, Tafu, Bianco, Zeus seem like material patterns, not primary colors for this logic.
};
const knownColorKeys = Object.keys(colorMap);

function formatModelName(name) {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function formatDescriptiveName(parts) {
    return parts
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(' ');
}

function parseFilenameDetails(filename, modelNamePartsLower) {
    const ext = path.extname(filename);
    let nameSansExt = filename.substring(0, filename.length - ext.length);
    const originalFilenameForId = nameSansExt; // Keep original for ID generation consistency

    let isAngle = false;
    const angleSuffixes = ['_trasera', '_espalda', '_detalle-soldadura-latonada']; // Must be lowercase
    const angleKeywords = ['trasera', 'espalda']; // 'detalle' is too ambiguous as a keyword here

    for (const suffix of angleSuffixes) {
        if (nameSansExt.toLowerCase().endsWith(suffix)) {
            nameSansExt = nameSansExt.substring(0, nameSansExt.length - suffix.length);
            isAngle = true;
            break;
        }
    }
    
    // Specific check for "trasera" or "espalda" in name as per user request
    if (!isAngle) {
        const lowerName = nameSansExt.toLowerCase();
        if (angleKeywords.some(kw => lowerName.includes(kw))) {
           isAngle = true;
        }
        if (lowerName.includes('_detalle')){ // Catch general _detalle as angle
            isAngle = true;
        }
    }

    let parts = nameSansExt.split('-');
    let color = null;
    let partsBeforeColor = [...parts];

    for (let len = 3; len >= 1; len--) { // Max 3 words for a color phrase
        if (partsBeforeColor.length >= len) {
            const potentialColorKey = partsBeforeColor.slice(-len).join('-').toLowerCase();
            if (knownColorKeys.includes(potentialColorKey)) {
                color = { key: potentialColorKey, ...colorMap[potentialColorKey] };
                partsBeforeColor = partsBeforeColor.slice(0, -len);
                break;
            }
        }
    }
    
    let descriptiveParts = [...partsBeforeColor];
    if (modelNamePartsLower.length > 0 && descriptiveParts.length >= modelNamePartsLower.length) {
        let prefixMatch = true;
        for (let i = 0; i < modelNamePartsLower.length; i++) {
            if (descriptiveParts[i].toLowerCase() !== modelNamePartsLower[i]) {
                prefixMatch = false;
                break;
            }
        }
        if (prefixMatch) {
            descriptiveParts = descriptiveParts.slice(modelNamePartsLower.length);
        }
    }
    descriptiveParts = descriptiveParts.filter(p => p && p.length > 0);

    return {
        variantKeyBase: partsBeforeColor.join('-'), // Base for grouping variants before color is applied
        color: color,
        isAngle: isAngle,
        descriptiveParts: descriptiveParts,
        originalIdString: originalFilenameForId.toLowerCase().replace(/[^a-z0-9-_]/g, '-').replace(/-+/g, '-')
    };
}

function getProductTypeFromSubcategory(subcategoryKey) {
    return subcategoryMap[subcategoryKey] ? subcategoryMap[subcategoryKey].type : 'unknown';
}

function generateMockDimensions(productType) {
  // Simplified from original, adjust per type as needed
  let dims = { width: 50, height: 80, depth: 55, unit: 'cm' }; // Default for silla
  if (productType === 'banqueta') dims = { width: 45, height: 105, depth: 47, unit: 'cm' };
  else if (productType === 'mesa') dims = { width: 80, height: 75, depth: 80, unit: 'cm' };
  else if (productType === 'sofa') dims = { width: 140, height: 75, depth: 70, unit: 'cm' };
  return dims;
}
function generateDescription(modelName, categoryName, productType) { return `Descubra ${modelName}, uma peça de design excecional da nossa coleção ${categoryName}, perfeita para adicionar estilo e funcionalidade.`; }
function generateFeatures(categoryName, productType) { return ["Design exclusivo", "Alta durabilidade", "Construção robusta"]; }
function generateWeight(productType) { 
    if (productType === 'silla') return 4.5;
    if (productType === 'banqueta') return 6.0;
    if (productType === 'mesa') return 15.0;
    if (productType === 'sofa') return 12.0; // For sillon/sofa
    return 5.0;
 }
function extractMaterials(productType) {
    return materialsMap[productType] || ['Madeira de alta qualidade'];
}

function getSeatColors(seatFolderDir, modelNamePartsLowerForSeatfiles) {
    const seatColorObjects = [];
    const foundColorKeys = new Set();

    // Check both 'asiento' and 'asientos'
    const asientoSingularPath = path.join(seatFolderDir, 'asiento');
    const asientoPluralPath = path.join(seatFolderDir, 'asientos');
    
    let actualSeatPath = null;
    if (fs.existsSync(asientoSingularPath) && fs.statSync(asientoSingularPath).isDirectory()) {
        actualSeatPath = asientoSingularPath;
    } else if (fs.existsSync(asientoPluralPath) && fs.statSync(asientoPluralPath).isDirectory()) {
        actualSeatPath = asientoPluralPath;
    }

    if (actualSeatPath) {
        const seatFiles = fs.readdirSync(actualSeatPath)
            .filter(file => !file.startsWith('.') && file.match(/\.(jpg|jpeg|png|webp)$/i));

        for (const seatFile of seatFiles) {
            const parsedSeatFile = parseFilenameDetails(seatFile, modelNamePartsLowerForSeatfiles); // modelNameParts for seat files might be like 'asiento-PRODUCTMODEL'
            if (parsedSeatFile.color && !foundColorKeys.has(parsedSeatFile.color.key)) {
                seatColorObjects.push({ name: parsedSeatFile.color.name, hex: parsedSeatFile.color.hex });
                foundColorKeys.add(parsedSeatFile.color.key);
            }
        }
    }
    return seatColorObjects.length > 0 ? seatColorObjects : undefined;
}

const products = [];
const productModelIdMap = new Map(); // modelName -> first variant ID for related products

function discoverProducts() {
    console.log('Discovering products...');
    
    const categoryFolders = fs.readdirSync(fsRoot).filter(dir => fs.statSync(path.join(fsRoot, dir)).isDirectory() && categoryMap[dir]);

    for (const categoryKey of categoryFolders) {
        const categoryPath = path.join(fsRoot, categoryKey);
        const subcategoryFolders = fs.readdirSync(categoryPath).filter(dir => fs.statSync(path.join(categoryPath, dir)).isDirectory() && subcategoryMap[dir]);

        for (const subcategoryKey of subcategoryFolders) {
            const subcategoryPath = path.join(categoryPath, subcategoryKey);
            const productModelFolders = fs.readdirSync(subcategoryPath)
                .filter(item => !item.startsWith('.') && fs.statSync(path.join(subcategoryPath, item)).isDirectory());

            for (const productModelFolder of productModelFolders) {
                const modelFilesPath = path.join(subcategoryPath, productModelFolder);
                const modelNamePartsLower = productModelFolder.toLowerCase().split('-');
                
                const imageFiles = fs.readdirSync(modelFilesPath)
                    .filter(file => {
                        const filePath = path.join(modelFilesPath, file);
                        // Ensure it's a file and not a directory like 'asiento'
                        return !file.startsWith('.') && 
                               fs.statSync(filePath).isFile() && 
                               file.match(/\.(jpg|jpeg|png|webp)$/i);
                    });

                const variantsInModel = new Map(); // Key: variantKeyBase + colorKey -> data

                for (const imageFile of imageFiles) {
                    const parsed = parseFilenameDetails(imageFile, modelNamePartsLower);
                    const colorKey = parsed.color ? parsed.color.key : 'default';
                    // A variant is defined by its structural name (variantKeyBase) AND its color
                    const uniqueVariantKey = `${parsed.variantKeyBase}__COLOR__${colorKey}`;

                    if (!variantsInModel.has(uniqueVariantKey)) {
                        variantsInModel.set(uniqueVariantKey, {
                            parsedFileDetails: parsed,
                            mainImage: null,
                            angleImages: [],
                            webPathBase: path.join(webRootPrefix, categoryKey, subcategoryKey, productModelFolder).replace(/\\/g, '/')
                        });
                    }
                    
                    const variantData = variantsInModel.get(uniqueVariantKey);
                    const publicImgPath = path.join(variantData.webPathBase, imageFile).replace(/\\/g, '/');

                    if (parsed.isAngle) {
                        variantData.angleImages.push(publicImgPath);
                    } else {
                        if (!variantData.mainImage) {
                            variantData.mainImage = publicImgPath;
                        } else { // If multiple non-angle images for the exact same variant, add extras to angles
                            variantData.angleImages.push(publicImgPath);
                        }
                    }
                }

                for (const [/* uniqueVariantKey */, data] of variantsInModel.entries()) {
                    if (!data.mainImage && data.angleImages.length > 0) {
                        data.mainImage = data.angleImages.shift(); 
                    }
                    if (!data.mainImage) continue; 

                    const modelName = formatModelName(productModelFolder);
                    const descriptiveNameStr = formatDescriptiveName(data.parsedFileDetails.descriptiveParts);
                    
                    let finalName = modelName;
                    if (descriptiveNameStr) { // Ensure descriptiveNameStr is not empty
                        finalName = `${modelName} ${descriptiveNameStr}`;
                    }
                     // Append color name if it's not already obviously part of the descriptive name
                    if (data.parsedFileDetails.color && !finalName.includes(data.parsedFileDetails.color.name)) {
                       // finalName += ` ${data.parsedFileDetails.color.name}`; // Decided to keep color separate in its own field
                    }
                    finalName = finalName.replace(/\s+/g, ' ').trim();

                    const productType = getProductTypeFromSubcategory(subcategoryKey);
                    const id = data.parsedFileDetails.originalIdString; // Use the original filename (sans ext) for ID

                    let seatColors;
                    if (productType === 'silla' || productType === 'banqueta' || productType === 'sofa') {
                        // modelFilesPath is the directory of the current product model e.g. public/images/products/interior/chairs/chicago
                         seatColors = getSeatColors(modelFilesPath, modelNamePartsLower);
                    }

                    const productEntry = {
                        id: id,
                        name: finalName,
                        modelName: modelName,
                        category: categoryMap[categoryKey],
                        subcategory: subcategoryMap[subcategoryKey].name,
                        description: generateDescription(finalName, categoryMap[categoryKey], productType),
                        features: generateFeatures(categoryMap[categoryKey], productType),
                        dimensions: generateMockDimensions(productType),
                        weight: generateWeight(productType),
                        materials: extractMaterials(productType),
                        color: data.parsedFileDetails.color ? { name: data.parsedFileDetails.color.name, hex: data.parsedFileDetails.color.hex } : { name: "Não especificada", hex: "#CCCCCC"},
                        images: {
                            main: data.mainImage,
                            angles: data.angleImages.filter(img => img !== data.mainImage) // Ensure main is not duplicated in angles
                        },
                        ...(seatColors && { seatColors: seatColors }),
                    };
                    products.push(productEntry);

                    if (!productModelIdMap.has(modelName)) {
                        productModelIdMap.set(modelName, id);
                    }
                }
            }
        }
    }
    
    // Populate related products
    products.forEach(p => {
        p.relatedProductIds = Array.from(productModelIdMap.keys())
            .filter(relatedModelName => relatedModelName !== p.modelName)
            .slice(0, 3) // Max 3 related
            .map(relatedModelName => productModelIdMap.get(relatedModelName))
            .filter(id => id !== undefined); // Filter out undefined if any
    });

    return products;
}

function writeProductsToFile(products) {
    console.log(`Generating data.ts with ${products.length} products...`);

    const productsString = products.map(product => {
        // Escape double quotes in description
        const escapedDescription = product.description.replace(/"/g, '\\"');

        let seatColorsString = "";
        if (product.seatColors && product.seatColors.length > 0) {
            seatColorsString = `
    seatColors: [
      ${product.seatColors.map(sc => `{ name: "${sc.name}", hex: "${sc.hex}" }`).join(',\n      ')}
    ],`;
        }
        let relatedIdsString = "";
        if (product.relatedProductIds && product.relatedProductIds.length > 0) {
            relatedIdsString = `
    relatedProductIds: [${product.relatedProductIds.map(id => `"${id}"`).join(', ')}],`;
        }


        return `  {
    id: "${product.id}",
    name: "${product.name}",
    modelName: "${product.modelName}",
    category: "${product.category}",
    subcategory: "${product.subcategory}",
    description: "${escapedDescription}",
    features: [
      ${product.features.map(feature => `"${feature}"`).join(',\n      ')}
    ],
    dimensions: {
      width: ${product.dimensions.width},
      height: ${product.dimensions.height},
      depth: ${product.dimensions.depth},
      unit: "${product.dimensions.unit}"
    },
    weight: ${product.weight},
    materials: [
      ${product.materials.map(material => `"${material}"`).join(',\n      ')}
    ],
    color: { name: "${product.color.name}", hex: "${product.color.hex}" },
    images: {
      main: "${product.images.main}",
      angles: [
        ${product.images.angles.map(angle => `"${angle}"`).join(',\n        ')}
      ]
    },${seatColorsString}${relatedIdsString}
  }`.trimEnd(); // Trim trailing comma if last optional field is not present (though JS objects allow trailing commas)
    }).join(',\n');

    const dataFileContent = `// Generated by script
export type ProductColor = {
  name: string;
  hex: string;
};

export type Product = {
  id: string;
  name: string;
  modelName: string;
  category: string;
  subcategory: string;
  description: string;
  features: string[];
  dimensions: {
    width: number;
    height: number;
    depth: number;
    unit: string;
  };
  weight: number;
  materials: string[];
  color: ProductColor;
  images: {
    main: string;
    angles: string[];
  };
  seatColors?: ProductColor[];
  relatedProductIds?: string[];
};

export const products: Product[] = [
${productsString}
];

// Utility functions
export function getProductById(productId: string): Product | undefined {
  return products.find(product => product.id === productId);
}

export function getRelatedProducts(product: Product): Product[] {
  if (!product.relatedProductIds) return [];
  return product.relatedProductIds
    .map(id => getProductById(id))
    .filter((p): p is Product => p !== undefined);
}

export function getAllCategories(): { name: string; id: string }[] {
  const categories = new Set(products.map(p => p.category));
  return Array.from(categories).map(cat => ({ name: cat, id: cat.toLowerCase() }));
}

export function getProductsByCategory(categoryName: string): Product[] {
  return products.filter(p => p.category.toLowerCase() === categoryName.toLowerCase());
}

export function getProductsBySubcategory(subcategoryName: string): Product[] {
  return products.filter(p => p.subcategory.toLowerCase() === subcategoryName.toLowerCase());
}
`;

    const outputDir = 'lib/products';
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.writeFileSync(path.join(outputDir, 'data.ts'), dataFileContent);
    console.log(`data.ts created successfully in ${outputDir}.`);
}

const discoveredProducts = discoverProducts();
writeProductsToFile(discoveredProducts);