const fs = require('fs');
const path = require('path');

// Source and destination directories
const sourceDir = '_Imagens Source';
const destDir = 'public/images/products';

// Create directories if they don't exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Process file name to extract product details
function processFileName(fileName) {
  // Remove file extension
  const nameWithoutExt = fileName.replace(/\.[^/.]+$/, "");
  
  // Split the name by hyphens
  const parts = nameWithoutExt.split('-');
  
  // First part is always the product name
  const productName = parts[0].trim();
  
  // Default values
  let type = '';
  let color = '';
  let variations = [];
  let asiento = '';
  
  // Process remaining parts
  if (parts.length > 1) {
    type = parts[1] ? parts[1].trim() : '';
  }
  
  if (parts.length > 2) {
    color = parts[2] ? parts[2].trim() : '';
  }
  
  // Check for "asiento" in any part and add it as the last category
  const asientoIndex = parts.findIndex(part => 
    part.toLowerCase().includes('asiento') || 
    part.toLowerCase().includes('tapizado')
  );
  
  if (asientoIndex !== -1) {
    // Extract asiento info
    asiento = parts.slice(asientoIndex).join('-').trim();
    
    // Add remaining parts as variations
    if (asientoIndex > 3) {
      variations = parts.slice(3, asientoIndex);
    }
  } else if (parts.length > 3) {
    // If no asiento, assume remaining parts are variations
    variations = parts.slice(3);
  }
  
  return {
    productName,
    type,
    color,
    variations,
    asiento,
    fileName
  };
}

// Determine destination folder based on source folder and product type
function getDestFolder(sourceFolder, productType) {
  const category = sourceFolder === 'INTERIOR' ? 'interior' : 'exterior';
  
  let subcategory = 'chairs'; // default
  
  // Map product types to appropriate subfolders
  if (productType) {
    const lowerType = productType.toLowerCase();
    if (lowerType.includes('silla') || lowerType.includes('sillon')) {
      subcategory = 'chairs';
    } else if (lowerType.includes('banqueta')) {
      subcategory = 'stools';
    } else if (lowerType.includes('mesa')) {
      subcategory = 'tables';
    } else if (lowerType.includes('sofa')) {
      subcategory = 'sofas';
    }
  }
  
  return path.join(category, subcategory);
}

// Function to normalize file names for web (remove accents, lowercase, etc.)
function normalizeForWeb(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, '-');
}

// Generate slug for the product folder
function generateProductSlug(productInfo) {
  return normalizeForWeb(productInfo.productName);
}

// Copy the file from source to destination
function copyFile(sourcePath, destPath) {
  ensureDirectoryExists(path.dirname(destPath));
  fs.copyFileSync(sourcePath, destPath);
  console.log(`Copied: ${sourcePath} -> ${destPath}`);
}

// Main function to process all images
function processImages() {
  console.log('Starting image organization...');
  
  // Process INTERIOR and EXTERIOR folders
  ['INTERIOR', 'EXTERIOR'].forEach(folder => {
    const sourceFolderPath = path.join(sourceDir, folder);
    
    if (!fs.existsSync(sourceFolderPath)) {
      console.log(`Source folder does not exist: ${sourceFolderPath}`);
      return;
    }
    
    const files = fs.readdirSync(sourceFolderPath);
    
    // Group files by product name
    const productGroups = {};
    
    files.forEach(file => {
      if (file.startsWith('.') || !file.match(/\.(jpg|jpeg|png|webp)$/i)) {
        return; // Skip hidden files and non-image files
      }
      
      const productInfo = processFileName(file);
      const productSlug = generateProductSlug(productInfo);
      
      if (!productGroups[productSlug]) {
        productGroups[productSlug] = [];
      }
      
      productGroups[productSlug].push({ 
        file,
        productInfo
      });
    });
    
    // Process each product group
    Object.keys(productGroups).forEach(productSlug => {
      const productFiles = productGroups[productSlug];
      
      if (productFiles.length === 0) return;
      
      // Use the first file to determine the product type
      const firstFile = productFiles[0];
      const destSubfolder = getDestFolder(folder, firstFile.productInfo.type);
      const productFolder = path.join(destDir, destSubfolder, productSlug);
      
      ensureDirectoryExists(productFolder);
      
      // Copy each file with a standardized name
      productFiles.forEach(({ file, productInfo }) => {
        let destFileName = '';
        
        // Create a standardized file name
        if (productInfo.asiento.toLowerCase().includes('asiento')) {
          // Handle specific ASIENTO images
          destFileName = `${productSlug}-seat-detail`;
          if (productInfo.color) {
            destFileName += `-${normalizeForWeb(productInfo.color)}`;
          }
        } else {
          destFileName = productSlug;
          
          // Add type if it exists
          if (productInfo.type) {
            destFileName += `-${normalizeForWeb(productInfo.type)}`;
          }
          
          // Add color if it exists
          if (productInfo.color) {
            destFileName += `-${normalizeForWeb(productInfo.color)}`;
          }
          
          // Add variations
          if (productInfo.variations.length > 0) {
            destFileName += `-${productInfo.variations.map(v => normalizeForWeb(v)).join('-')}`;
          }
          
          // Check if it's a back/detail view
          if (file.toLowerCase().includes('trasera') || 
              file.toLowerCase().includes('espalda') || 
              file.toLowerCase().includes('detalle')) {
            destFileName += '-back';
          }
        }
        
        // Add extension from original file
        const fileExt = path.extname(file);
        destFileName += fileExt;
        
        const sourcePath = path.join(sourceFolderPath, file);
        const destPath = path.join(productFolder, destFileName);
        
        copyFile(sourcePath, destPath);
      });
    });
  });
  
  console.log('Image organization complete!');
}

// Run the script
processImages(); 