const fs = require('fs');
const path = require('path');

// File paths
const productsDataFile = 'lib/products/data.ts';
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

// Function to generate a product ID from name
function generateProductId(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, '-');
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

// Find all products in the public/images/products directory
function discoverProducts() {
  console.log('Discovering products from image directories...');
  
  const products = [];
  
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
        
        // Determine product type from files
        const productType = files[0].split('-')[1] || '';
        
        // Extract colors
        const colors = extractColorsFromImages(productPath);
        
        // Generate related products (up to 3 random products from same category)
        const relatedProducts = productFolders
          .filter(folder => folder !== productFolder)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map(folder => generateProductId(formatProductName(folder)));
        
        // Create a standard product object
        const product = {
          id: generateProductId(formatProductName(productFolder)),
          name: formatProductName(productFolder),
          category: categoryMap[category],
          subcategory: subcategoryMap[subcategory],
          description: generateDescription(formatProductName(productFolder), categoryMap[category], productType),
          features: generateFeatures(categoryMap[category], productType),
          dimensions: generateDimensions(productType),
          weight: generateWeight(productType),
          materials: extractMaterials(productType),
          madeIn: "Portugal",
          colors: colors.length > 0 ? colors : [
            { name: "Preto", hex: "#000000", available: true },
            { name: "Carvalho", hex: "#D2B48C", available: true }
          ],
          images: {
            main: "",  // Will be filled by updateProductData.js
            angles: [],
            thumbnails: []
          },
          related: relatedProducts
        };
        
        products.push(product);
      }
    }
  }
  
  return products;
}

// Update the products in the data file
function updateMockProducts() {
  console.log('Starting mock products update...');
  
  if (!fs.existsSync(productsDataFile)) {
    console.error(`Products data file not found: ${productsDataFile}`);
    return;
  }
  
  // Discover products from the image folders
  const discoveredProducts = discoverProducts();
  
  if (discoveredProducts.length === 0) {
    console.log('No products discovered from image folders.');
    return;
  }
  
  console.log(`Discovered ${discoveredProducts.length} products.`);
  
  // Read the current data file
  let content = fs.readFileSync(productsDataFile, 'utf8');
  
  // Find the products array in the file
  const productsMatch = content.match(/const\s+products\s*:\s*Product\[\]\s*=\s*\[([\s\S]*?)\];/);
  
  if (!productsMatch) {
    console.error('Could not find products array in the data file');
    return;
  }
  
  // Format the products as a JSON-like string for the TS file
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
        "${product.images.main}"
      ],
      thumbnails: [
        "${product.images.main}"
      ]
    },
    related: [${product.related.map(id => `"${id}"`).join(', ')}]
  }`
  }).join(',\n');
  
  // Replace the old products array with the new one
  const updatedContent = content.replace(
    /const\s+products\s*:\s*Product\[\]\s*=\s*\[([\s\S]*?)\];/,
    `const products: Product[] = [\n${productsString}\n];`
  );
  
  // Write the updated content back to the file
  fs.writeFileSync(productsDataFile, updatedContent);
  
  console.log('Mock products update complete!');
}

// Run the script
updateMockProducts(); 