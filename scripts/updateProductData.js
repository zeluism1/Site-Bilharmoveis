const fs = require('fs');
const path = require('path');

// File paths
const productsDataFile = 'lib/products/data.ts';
const imageDir = 'public/images/products';

// Function to normalize product names to match folder names
function normalizeProductName(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, '-');
}

// Function to map product name to its corresponding image folder
function findProductImageFolder(productName) {
  const normalizedName = normalizeProductName(productName);
  
  // Categories to search in
  const categories = ['interior', 'exterior'];
  const subcategories = ['chairs', 'stools', 'tables', 'sofas'];
  
  // Search for the product folder in all category/subcategory combinations
  for (const category of categories) {
    for (const subcategory of subcategories) {
      const searchPath = path.join(imageDir, category, subcategory, normalizedName);
      if (fs.existsSync(searchPath)) {
        return {
          path: `/images/products/${category}/${subcategory}/${normalizedName}`,
          files: fs.readdirSync(searchPath)
            .filter(file => !file.startsWith('.') && file.match(/\.(jpg|jpeg|png|webp)$/i))
            .map(file => `${searchPath}/${file}`)
        };
      }
    }
  }
  
  return null;
}

// Generate image paths for a product
function generateProductImagePaths(productName) {
  const imageFolder = findProductImageFolder(productName);
  
  if (!imageFolder) {
    console.log(`No image folder found for product: ${productName}`);
    return null;
  }
  
  const { path: folderPath, files } = imageFolder;
  
  // Sort files to ensure consistent ordering
  const sortedFiles = [...files].sort();
  
  // Find main image (usually the first one without 'back' or 'detail' in the name)
  let mainImage = sortedFiles.find(file => 
    !file.toLowerCase().includes('back') && 
    !file.toLowerCase().includes('detail')
  ) || sortedFiles[0];
  
  // Get all angle images (excluding detail images)
  const angleImages = sortedFiles
    .filter(file => 
      file !== mainImage && 
      !file.toLowerCase().includes('detail')
    )
    .slice(0, 3); // Limit to 3 angles
  
  // Get thumbnails (can be the same as the main images in many cases)
  // Using the main image plus up to 3 other images
  const thumbnails = [mainImage, ...sortedFiles.filter(file => file !== mainImage)]
    .slice(0, 4); // Limit to 4 thumbnails
  
  return {
    main: mainImage,
    angles: angleImages,
    thumbnails: thumbnails
  };
}

// Update the product data file
function updateProductData() {
  console.log('Starting product data update...');
  
  if (!fs.existsSync(productsDataFile)) {
    console.error(`Products data file not found: ${productsDataFile}`);
    return;
  }
  
  // Read the current data file
  let content = fs.readFileSync(productsDataFile, 'utf8');
  
  // Find the products array in the file
  const productsMatch = content.match(/const\s+products\s*:\s*Product\[\]\s*=\s*\[([\s\S]*?)\];/);
  
  if (!productsMatch) {
    console.error('Could not find products array in the data file');
    return;
  }
  
  // Parse the products array to extract individual products
  const productsArrayContent = productsMatch[1];
  const productBlocks = productsArrayContent.split(/},\s*{/).map((block, index) => {
    if (index === 0) return block + '}';
    if (index === productsArrayContent.split(/},\s*{/).length - 1) return '{' + block;
    return '{' + block + '}';
  });
  
  const updatedProductBlocks = productBlocks.map(block => {
    // Extract product name
    const nameMatch = block.match(/name:\s*"([^"]+)"/);
    if (!nameMatch) return block;
    
    const productName = nameMatch[1];
    console.log(`Processing product: ${productName}`);
    
    // Find image paths for this product
    const imagePaths = generateProductImagePaths(productName);
    
    if (!imagePaths) {
      console.log(`No image paths found for product: ${productName}`);
      return block;
    }
    
    // Replace placeholder images with real images
    let updatedBlock = block.replace(
      /images:\s*{[^}]*}/,
      `images: {
      main: "${imagePaths.main}",
      angles: [
        ${imagePaths.angles.map(img => `"${img}"`).join(',\n        ')}
      ],
      thumbnails: [
        ${imagePaths.thumbnails.map(img => `"${img}"`).join(',\n        ')}
      ]
    }`
    );
    
    return updatedBlock;
  });
  
  // Reconstruct the products array
  const updatedProductsArray = updatedProductBlocks.join(',\n  ');
  
  // Replace the old products array with the updated one
  const updatedContent = content.replace(
    /const\s+products\s*:\s*Product\[\]\s*=\s*\[([\s\S]*?)\];/,
    `const products: Product[] = [${updatedProductsArray}];`
  );
  
  // Write the updated content back to the file
  fs.writeFileSync(productsDataFile, updatedContent);
  
  console.log('Product data update complete!');
}

// Run the script
updateProductData(); 