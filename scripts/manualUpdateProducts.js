const fs = require('fs');
const path = require('path');

const imageDir = 'public/images/products';

// Map folder names to categories
const categoryMap = {
  'interior': 'Interior',
  'exterior': 'Exterior'
};

// Map folder names to subcategories
const subcategoryMap = {
  'chairs': 'Cadeiras',
  'stools': 'Bancos',
  'tables': 'Mesas',
  'sofas': 'Sofás'
};

// Materials mapping based on product types
const materialsMap = {
  'silla': ['Madeira', 'Estofamento de qualidade'],
  'banqueta': ['Madeira', 'Metal reforçado', 'Estofamento premium'],
  'mesa': ['Madeira maciça', 'Metal', 'Tampo em melamina/compact'],
  'sillon': ['Madeira', 'Corda trançada à mão', 'Estrutura reforçada'],
  'sofa': ['Madeira maciça', 'Estofamento de alta durabilidade', 'Corda de exterior']
};

// Colors mapping based on image names
const colorMap = {
  'negro': { name: 'Preto', hex: '#000000' },
  'roble': { name: 'Carvalho Natural', hex: '#D2B48C' },
  'nogal': { name: 'Nogueira', hex: '#654321' },
  'marron': { name: 'Marrom', hex: '#8B4513' },
  'crema': { name: 'Creme', hex: '#F5F5DC' },
  'blanco': { name: 'Branco', hex: '#FFFFFF' },
  'arena': { name: 'Areia', hex: '#E0D4B4' },
  'teja': { name: 'Terracota', hex: '#CD5C5C' },
  'esmeralda': { name: 'Esmeralda', hex: '#50C878' },
  'celeste': { name: 'Celeste', hex: '#B0E0E6' },
  'zafiro': { name: 'Safira', hex: '#082567' },
  'mekong': { name: 'Mekong', hex: '#6B705C' },
  'vesubio': { name: 'Vesúvio', hex: '#A9A9A9' },
  'terracota': { name: 'Terracota', hex: '#E2725B' },
  'verde': { name: 'Verde', hex: '#008000' },
  'rojo': { name: 'Vermelho', hex: '#FF0000' },
  'azul': { name: 'Azul', hex: '#0000FF' },
  'mostaza': { name: 'Mostarda', hex: '#FFDB58' },
  'gris': { name: 'Cinza', hex: '#808080' },
  'burdeos': { name: 'Bordô', hex: '#800020' }
};

// Function to format product name for display
function formatProductName(name) {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Function to extract colors from image folder
function extractColorsFromImages(folderPath) {
  const colors = new Set();
  const files = fs.readdirSync(folderPath);
  
  files.forEach(file => {
    // Extract color information from filenames
    Object.keys(colorMap).forEach(colorKey => {
      if (file.toLowerCase().includes(colorKey.toLowerCase())) {
        colors.add(colorKey);
      }
    });
  });
  
  return Array.from(colors).map(colorKey => ({
    name: colorMap[colorKey]?.name || colorKey,
    hex: colorMap[colorKey]?.hex || '#CCCCCC',
    available: true
  }));
}

// Function to extract materials based on product type
function extractMaterials(productType) {
  let materials = ['Madeira'];
  
  // Check if the product type matches any of our known types
  for (const [type, mats] of Object.entries(materialsMap)) {
    if (productType.toLowerCase().includes(type)) {
      materials = mats;
      break;
    }
  }
  
  return materials;
}

// Function to generate mock dimensions based on product type
function generateDimensions(productType) {
  let dimensions = {
    width: 50,
    height: 80,
    depth: 55,
    unit: 'cm'
  };
  
  if (productType.toLowerCase().includes('banqueta')) {
    dimensions = {
      width: 45,
      height: 105,
      depth: 47,
      unit: 'cm'
    };
  } else if (productType.toLowerCase().includes('mesa')) {
    dimensions = {
      width: 80,
      height: 75,
      depth: 80,
      unit: 'cm'
    };
  } else if (productType.toLowerCase().includes('sillon')) {
    dimensions = {
      width: 60,
      height: 82,
      depth: 65,
      unit: 'cm'
    };
  } else if (productType.toLowerCase().includes('sofa')) {
    dimensions = {
      width: 140,
      height: 75,
      depth: 70,
      unit: 'cm'
    };
  }
  
  return dimensions;
}

// Function to generate a product ID from name and type
function generateProductId(name, type) {
  // Normalize the name
  const normalizedName = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, '-');
  
  // Normalize the type if provided
  if (type) {
    const normalizedType = type
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    
    // Create a combined ID that includes the type
    if (normalizedType.includes('silla')) {
      return `${normalizedName}-chair`;
    } else if (normalizedType.includes('banqueta')) {
      return `${normalizedName}-stool`;
    } else if (normalizedType.includes('mesa')) {
      return `${normalizedName}-table`;
    } else if (normalizedType.includes('sillon') || normalizedType.includes('sofa')) {
      return `${normalizedName}-sofa`;
    } else {
      return `${normalizedName}-${normalizedType}`;
    }
  }
  
  return normalizedName;
}

// Function to create mock descriptions based on product type and category
function generateDescription(productName, category, type) {
  if (category === 'Interior') {
    if (type.toLowerCase().includes('silla')) {
      return `A cadeira ${productName} combina elegância e conforto em seu design exclusivo. Ideal para restaurantes e hotéis, oferece durabilidade excepcional com um visual sofisticado.`;
    } else if (type.toLowerCase().includes('banqueta')) {
      return `O banco ${productName} traz estilo e funcionalidade para balcões e mesas altas. Com materiais de alta qualidade, é perfeito para espaços de hospitalidade que valorizam design e conforto.`;
    } else if (type.toLowerCase().includes('mesa')) {
      return `A mesa ${productName} é o centro perfeito para refeições e encontros. Seu design versátil e construção robusta a tornam ideal para qualquer ambiente comercial.`;
    }
  } else {
    if (type.toLowerCase().includes('silla')) {
      return `A cadeira ${productName} para exterior combina resistência à intempéries com design elegante. Perfeita para áreas externas de restaurantes e hotéis que buscam estilo e durabilidade.`;
    } else if (type.toLowerCase().includes('sillon') || type.toLowerCase().includes('sofa')) {
      return `O sofá ${productName} oferece conforto excepcional em ambientes externos. Com materiais resistentes às condições climáticas, mantém sua beleza e funcionalidade por muito tempo.`;
    } else if (type.toLowerCase().includes('mesa')) {
      return `A mesa ${productName} para exterior é a escolha ideal para terraços e jardins. Sua construção resistente e design atemporal fazem dela um elemento indispensável para áreas externas.`;
    }
  }
  
  return `O ${productName} combina design inovador com qualidade superior, trazendo estilo e funcionalidade para ambientes comerciais.`;
}

// Function to create features based on product type and category
function generateFeatures(category, type) {
  const baseFeatures = [
    "Design exclusivo",
    "Alta durabilidade",
    "Construção reforçada para uso comercial"
  ];
  
  let additionalFeatures = [];
  
  if (category === 'Interior') {
    additionalFeatures.push("Estofamento premium");
    additionalFeatures.push("Acabamento de alta qualidade");
    
    if (type.toLowerCase().includes('silla')) {
      additionalFeatures.push("Conforto ergonômico");
      additionalFeatures.push("Empilhável para fácil armazenamento");
    } else if (type.toLowerCase().includes('banqueta')) {
      additionalFeatures.push("Descanso para pés reforçado");
      additionalFeatures.push("Disponível em altura de balcão e bar");
    }
  } else {
    additionalFeatures.push("Resistente às condições climatéricas");
    additionalFeatures.push("Tratamento UV para maior durabilidade");
    
    if (type.toLowerCase().includes('silla') || type.toLowerCase().includes('sillon')) {
      additionalFeatures.push("Secagem rápida após chuva");
      additionalFeatures.push("Peso ideal para resistir a ventos");
    }
  }
  
  return [...baseFeatures, ...additionalFeatures];
}

// Function to generate weight based on product type
function generateWeight(type) {
  if (type.toLowerCase().includes('silla')) {
    return 4.5;
  } else if (type.toLowerCase().includes('banqueta')) {
    return 6.0;
  } else if (type.toLowerCase().includes('mesa')) {
    return 15.0;
  } else if (type.toLowerCase().includes('sillon')) {
    return 7.5;
  } else if (type.toLowerCase().includes('sofa')) {
    return 12.0;
  }
  
  return 5.0;
}

// Function to get image paths for a folder
function getImagePathsForFolder(folderPath, productSlug) {
  try {
    const relativeFolderPath = folderPath.replace('public', '');
    const files = fs.readdirSync(folderPath)
      .filter(file => !file.startsWith('.') && file.match(/\.(jpg|jpeg|png|webp)$/i));
    
    if (files.length === 0) return { main: '', angles: [], thumbnails: [] };
    
    // Sort files for consistent results
    const sortedFiles = [...files].sort();
    
    // Find main image (usually the first one without 'back' or 'detail' in the name)
    let mainImageFile = sortedFiles.find(file => 
      !file.toLowerCase().includes('back') && 
      !file.toLowerCase().includes('detail') &&
      !file.toLowerCase().includes('trasera') &&
      !file.toLowerCase().includes('espalda')
    ) || sortedFiles[0];
    
    // Get all angle images (excluding detail images)
    const angleFiles = sortedFiles
      .filter(file => 
        file !== mainImageFile && 
        !file.toLowerCase().includes('detail')
      )
      .slice(0, 3); // Limit to 3 angles
    
    // Get thumbnails (can be the same as the main images in many cases)
    // Using the main image plus up to 3 other images
    const thumbnailFiles = [mainImageFile, ...sortedFiles.filter(file => file !== mainImageFile)]
      .slice(0, 4); // Limit to 4 thumbnails
    
    return {
      main: `${relativeFolderPath}/${mainImageFile}`,
      angles: angleFiles.map(file => `${relativeFolderPath}/${file}`),
      thumbnails: thumbnailFiles.map(file => `${relativeFolderPath}/${file}`)
    };
  } catch (error) {
    console.error(`Error getting image paths for ${folderPath}:`, error);
    return { main: '', angles: [], thumbnails: [] };
  }
}

// Find all products in the public/images/products directory
function discoverProducts() {
  console.log('Discovering products from image directories...');
  
  const products = [];
  
  // Keep track of product IDs to avoid duplicates
  const productIdCounts = {};
  
  // Go through each category and subcategory
  for (const category of Object.keys(categoryMap)) {
    const categoryPath = path.join(imageDir, category);
    if (!fs.existsSync(categoryPath)) continue;
    
    for (const subcategory of Object.keys(subcategoryMap)) {
      const subcategoryPath = path.join(categoryPath, subcategory);
      if (!fs.existsSync(subcategoryPath)) continue;
      
      // Get all product folders within this subcategory
      const productFolders = fs.readdirSync(subcategoryPath)
        .filter(item => 
          !item.startsWith('.') && 
          fs.statSync(path.join(subcategoryPath, item)).isDirectory()
        );
      
      for (const productFolder of productFolders) {
        const productPath = path.join(subcategoryPath, productFolder);
        const files = fs.readdirSync(productPath)
          .filter(file => !file.startsWith('.') && file.match(/\.(jpg|jpeg|png|webp)$/i));
        
        if (files.length === 0) continue;
        
        // Group files by product type
        const productTypeGroups = {};
        
        // Extract product type from each file with enhanced handling
        for (const file of files) {
          // Get parts from the filename
          const parts = file.split('.')[0].split('-');
          
          // Skip if filename doesn't have enough parts
          if (parts.length < 2) continue;
          
          // Get the product name and type
          const productName = parts[0];
          let productType = parts[1];
          
          // Handle special cases
          if (productName.toLowerCase() === 'asiento') {
            // This is a seat detail, let's add it to the corresponding main product
            // Format typically: ASIENTO-PRODUCTNAME-Tapizado-color
            if (parts.length > 1) {
              const mainProduct = parts[1]; // The product this detail belongs to
              // We'll mark it as a special "asiento" type for this product
              productType = 'asiento';
            } else {
              // If we can't determine the main product, just categorize it as seat
              productType = 'asiento';
            }
          }
          
          // Handle table variants like alta-mesa, rectangular-mesa
          if (productType.includes('mesa') && parts.length > 2) {
            // Check if it has a prefix like "alta-" or "rectangular-"
            if (parts.length > 2 && (parts[1] === 'alta' || parts[1] === 'rectangular')) {
              // This is a table variant - set the correct type
              productType = 'mesa';
            }
          }
          
          // Skip views that aren't actual product types
          if (productType.toLowerCase() === 'back' || 
              productType.toLowerCase() === 'detail' ||
              productType.toLowerCase() === 'trasera' ||
              productType.toLowerCase() === 'detalle' ||
              productType.toLowerCase() === 'espalda') {
            continue;
          }
          
          // Process color information
          let color = null;
          for (let i = 2; i < parts.length; i++) {
            const part = parts[i].toLowerCase();
            if (Object.keys(colorMap).includes(part)) {
              color = part;
              break;
            }
          }
          
          // Initialize group if doesn't exist
          if (!productTypeGroups[productType]) {
            productTypeGroups[productType] = [];
          }
          
          // Add file to the group with additional info
          productTypeGroups[productType].push({
            file,
            color,
            isDetailView: file.toLowerCase().includes('back') || 
                         file.toLowerCase().includes('trasera') || 
                         file.toLowerCase().includes('espalda') || 
                         file.toLowerCase().includes('detalle'),
            parts  // Include the full parts array for complex processing if needed
          });
        }
        
        // Process each product type group
        for (const [productType, typeFiles] of Object.entries(productTypeGroups)) {
          // Skip if no files for this type
          if (typeFiles.length === 0) continue;
          
          // Get product name from the first file
          const productName = formatProductName(productFolder);
          
          // Extract colors for this product type using the enhanced file objects
          const colors = extractColorsFromFileObjects(typeFiles);
          
          // Generate related products using file product type
          const relatedProducts = productFolders
            .filter(folder => folder !== productFolder)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            .map(folder => generateProductId(formatProductName(folder), productType));
          
          // Get image paths specific to this type
          const imagePaths = getImagePathsForSpecificType(productPath, productFolder, productType, typeFiles);
          
          // Determine actual product type from subcategory
          const subcategoryProductType = getProductTypeFromSubcategory(subcategory);
          
          // Generate base product ID directly from the file's product type
          let baseProductId = generateProductId(productName, productType);
          
          // Check if this product ID already exists and add suffix if needed
          if (productIdCounts[baseProductId]) {
            productIdCounts[baseProductId]++;
            baseProductId = `${baseProductId}-${productIdCounts[baseProductId]}`;
          } else {
            productIdCounts[baseProductId] = 1;
          }
          
          // Get the correct display type directly from the subcategory folder
          const displayType = getDisplayTypeFromSubcategory(subcategory);
          
          // Use the product type from the filename directly
          const fileTypeDisplay = formatProductType(productType);
          
          // Create a simple product name with type from the filename
          const enhancedName = `${productName} ${fileTypeDisplay}`;
          
          // Create a standard product object
          const product = {
            id: baseProductId,
            name: enhancedName,
            category: categoryMap[category],
            subcategory: subcategoryMap[subcategory],
            description: generateDescription(productName, categoryMap[category], productType),
            features: generateFeatures(categoryMap[category], productType),
            dimensions: generateDimensions(productType),
            weight: generateWeight(productType),
            materials: extractMaterials(productType),
            madeIn: "Portugal",
            colors: colors.length > 0 ? colors : [
              { name: "Preto", hex: "#000000", available: true },
              { name: "Carvalho", hex: "#D2B48C", available: true }
            ],
            images: imagePaths,
            related: relatedProducts
          };
          
          products.push(product);
        }
      }
    }
  }
  
  return products;
}

// Format the product type for display
function formatProductType(type) {
  if (type.toLowerCase().includes('silla')) {
    return 'Chair';
  } else if (type.toLowerCase().includes('banqueta')) {
    return 'Stool';
  } else if (type.toLowerCase().includes('mesa')) {
    return 'Table';
  } else if (type.toLowerCase().includes('sillon') || type.toLowerCase().includes('sofa')) {
    return 'Sofa';
  } else {
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  }
}

// Extract colors from specific files
function extractColorsFromSpecificFiles(files) {
  const colors = new Set();
  
  files.forEach(file => {
    // Extract color information from filenames
    Object.keys(colorMap).forEach(colorKey => {
      if (file.toLowerCase().includes(colorKey.toLowerCase())) {
        colors.add(colorKey);
      }
    });
  });
  
  return Array.from(colors).map(colorKey => ({
    name: colorMap[colorKey]?.name || colorKey,
    hex: colorMap[colorKey]?.hex || '#CCCCCC',
    available: true
  }));
}

// Extract colors from file objects with enhanced information
function extractColorsFromFileObjects(fileObjects) {
  const colors = new Set();
  
  fileObjects.forEach(obj => {
    // Use the extracted color if available
    if (obj.color && colorMap[obj.color]) {
      colors.add(obj.color);
    } else {
      // Extract color information from filenames as a fallback
      Object.keys(colorMap).forEach(colorKey => {
        if (obj.file.toLowerCase().includes(colorKey.toLowerCase())) {
          colors.add(colorKey);
        }
      });
    }
  });
  
  return Array.from(colors).map(colorKey => ({
    name: colorMap[colorKey]?.name || colorKey,
    hex: colorMap[colorKey]?.hex || '#CCCCCC',
    available: true
  }));
}

// Get image paths for a specific product type using file objects
function getImagePathsForSpecificType(folderPath, productSlug, productType, fileObjects) {
  try {
    const relativeFolderPath = folderPath.replace('public', '');
    
    // Use the provided file objects instead of reading directory
    if (fileObjects && fileObjects.length > 0) {
      // Sort files for consistent results
      const sortedObjects = [...fileObjects].sort((a, b) => a.file.localeCompare(b.file));
      
      // Find main image (usually the first one without detail markers)
      let mainImageObject = sortedObjects.find(obj => !obj.isDetailView) || sortedObjects[0];
      
      // Get all angle images (excluding detailed views, preferring back views)
      const angleObjects = sortedObjects
        .filter(obj => 
          obj.file !== mainImageObject.file && 
          (obj.file.toLowerCase().includes('back') || 
           obj.file.toLowerCase().includes('trasera') || 
           obj.file.toLowerCase().includes('espalda'))
        )
        .slice(0, 3); // Limit to 3 angles
      
      // Get thumbnails (can be the same as the main images in many cases)
      const thumbnailObjects = [mainImageObject, 
        ...sortedObjects.filter(obj => obj.file !== mainImageObject.file)
      ].slice(0, 4); // Limit to 4 thumbnails
      
      return {
        main: `${relativeFolderPath}/${mainImageObject.file}`,
        angles: angleObjects.map(obj => `${relativeFolderPath}/${obj.file}`),
        thumbnails: thumbnailObjects.map(obj => `${relativeFolderPath}/${obj.file}`)
      };
    }
    
    // Fallback to the old method if file objects aren't provided
    const files = fs.readdirSync(folderPath)
      .filter(file => 
        !file.startsWith('.') && 
        file.match(/\.(jpg|jpeg|png|webp)$/i) && 
        file.includes(`-${productType}`)
      );
    
    if (files.length === 0) {
      return { main: '', angles: [], thumbnails: [] };
    }
    
    // Sort files for consistent results
    const sortedFiles = [...files].sort();
    
    // Find main image (usually the first one without 'back' or 'detail' in the name)
    let mainImageFile = sortedFiles.find(file => 
      !file.toLowerCase().includes('back') && 
      !file.toLowerCase().includes('detail') &&
      !file.toLowerCase().includes('trasera') &&
      !file.toLowerCase().includes('espalda') &&
      !file.toLowerCase().includes('detalle')
    ) || sortedFiles[0];
    
    // Get all angle images (excluding detail images)
    const angleFiles = sortedFiles
      .filter(file => 
        file !== mainImageFile && 
        (file.toLowerCase().includes('back') || 
         file.toLowerCase().includes('trasera') || 
         file.toLowerCase().includes('espalda'))
      )
      .slice(0, 3); // Limit to 3 angles
    
    // Get thumbnails (can be the same as the main images in many cases)
    const thumbnailFiles = [mainImageFile, ...sortedFiles.filter(file => file !== mainImageFile)]
      .slice(0, 4); // Limit to 4 thumbnails
    
    return {
      main: `${relativeFolderPath}/${mainImageFile}`,
      angles: angleFiles.map(file => `${relativeFolderPath}/${file}`),
      thumbnails: thumbnailFiles.map(file => `${relativeFolderPath}/${file}`)
    };
  } catch (error) {
    console.error(`Error getting image paths for ${productType} in ${folderPath}:`, error);
    return { main: '', angles: [], thumbnails: [] };
  }
}

function writeNewProductsToFile() {
  console.log('Discovering and writing new products...');
  
  // Discover products from image folders
  const discoveredProducts = discoverProducts();
  
  if (discoveredProducts.length === 0) {
    console.log('No products discovered from image folders.');
    return;
  }
  
  console.log(`Discovered ${discoveredProducts.length} products.`);
  
  // Format products for TypeScript output
  const productsString = discoveredProducts.map(product => {
    return `  {
    id: "${product.id}",
    name: "${product.name}",
    category: "${product.category}",
    subcategory: "${product.subcategory}",
    description: "${product.description}",
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
    madeIn: "${product.madeIn}",
    colors: [
      ${product.colors.map(color => `{ name: "${color.name}", hex: "${color.hex}", available: ${color.available} }`).join(',\n      ')}
    ],
    images: {
      main: "${product.images.main}",
      angles: [
        ${product.images.angles.map(angle => `"${angle}"`).join(',\n        ')}
      ],
      thumbnails: [
        ${product.images.thumbnails.map(thumb => `"${thumb}"`).join(',\n        ')}
      ]
    },
    related: [${product.related.map(id => `"${id}"`).join(', ')}]
  }`
  }).join(',\n');
  
  // Create a complete new data.ts file
  const dataFileContent = `export type Product = {
  id: string
  name: string
  category: string
  subcategory: string
  description: string
  features: string[]
  dimensions: {
    width: number
    height: number
    depth: number
    unit: string
  }
  weight: number
  materials: string[]
  madeIn: string
  colors: {
    name: string
    hex: string
    available: boolean
  }[]
  images: {
    main: string
    angles: string[]
    thumbnails: string[]
  }
  related: string[] // IDs of related products
}

export type RelatedProduct = {
  id: string
  name: string
  category: string
  subcategory: string
  image: string
}

// Mock product data
const products: Product[] = [
${productsString}
]

// Utility functions for product data

/**
 * Get a product by its ID
 */
export function getProductById(productId: string): Product | undefined {
  return products.find(product => product.id === productId)
}

/**
 * Get related products based on IDs
 */
export function getRelatedProducts(relatedIds: string[], currentId: string): RelatedProduct[] {
  // Filter out any products that don't exist or match the current product
  const validRelatedIds = relatedIds.filter(id => id !== currentId && products.some(p => p.id === id))
  
  return validRelatedIds.map(id => {
    const product = products.find(p => p.id === id)!
    return {
      id: product.id,
      name: product.name,
      category: product.category,
      subcategory: product.subcategory,
      image: product.images.main
    }
  })
}

/**
 * Get products by category
 */
export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  )
}

/**
 * Get products by subcategory
 */
export function getProductsBySubcategory(subcategory: string): Product[] {
  return products.filter(product => 
    product.subcategory.toLowerCase() === subcategory.toLowerCase()
  )
}

/**
 * Get all available categories
 */
export function getAllCategories(): { name: string, id: string }[] {
  const categories = new Set(products.map(product => product.category))
  return Array.from(categories).map(category => ({
    name: category,
    id: category.toLowerCase()
  }))
}

/**
 * Get all available subcategories
 */
export function getAllSubcategories(): { name: string, id: string, parentCategory: string }[] {
  const subcategories = new Set(products.map(product => product.subcategory))
  return Array.from(subcategories).map(subcategory => {
    // Find a product with this subcategory to get its parent category
    const product = products.find(p => p.subcategory === subcategory)!
    return {
      name: subcategory,
      id: subcategory.toLowerCase().replace(/\\s+/g, '-'),
      parentCategory: product.category
    }
  })
}`;
  
  // Make sure the lib/products directory exists
  const dir = 'lib/products';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Write the file
  fs.writeFileSync('lib/products/data.ts', dataFileContent);
  
  console.log('Product data file created successfully with all discovered products.');
}

// Run the script
writeNewProductsToFile();

// Map subcategory to product type
function subcategoryToProductType(subcategory) {
  switch(subcategory.toLowerCase()) {
    case 'chairs':
      return 'silla';
    case 'stools':
      return 'banqueta'; 
    case 'tables':
      return 'mesa';
    case 'sofas':
      return 'sofa';
    default:
      return subcategory;
  }
}

// Correct product type based on subcategory
function correctProductTypeBasedOnSubcategory(productType, subcategory) {
  // If the product is in a specific subcategory folder, we should respect that
  // regardless of what's in the filename
  const subcategoryType = subcategoryToProductType(subcategory);
  
  // Log for debugging
  console.log(`File has product type: ${productType}, Subcategory suggests: ${subcategoryType}`);
  
  // Return the subcategory-based type
  return subcategoryType;
}

// Determine actual product type from subcategory
function getProductTypeFromSubcategory(subcategory) {
  const subcategoryType = subcategoryToProductType(subcategory);
  return subcategoryType;
}

// Get display type directly from subcategory
function getDisplayTypeFromSubcategory(subcategory) {
  switch(subcategory.toLowerCase()) {
    case 'chairs':
      return 'Chair';
    case 'stools':
      return 'Stool';
    case 'tables':
      return 'Table';
    case 'sofas':
      return 'Sofa';
    default:
      return subcategory.charAt(0).toUpperCase() + subcategory.slice(1).toLowerCase();
  }
}