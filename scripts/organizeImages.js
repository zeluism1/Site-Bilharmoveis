const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Create readline interface for user interaction
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Source and destination directories
const sourceDir = '_Imagens Source';
const destDir = 'public/images/products';

// Create directories if they don't exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Function to normalize file names for web (remove accents, lowercase, etc.)
function normalizeForWeb(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, '-');
}

// Process file name to extract product details
function processFileName(fileName) {
  // Remove file extension
  const nameWithoutExt = fileName.replace(/\.[^/.]+$/, "");
  
  // Split the name by hyphens
  const parts = nameWithoutExt.split('-');
  
  // First part is always the product name
  const productName = parts[0].trim();
  
  // Initialize values
  let type = '';
  let color = '';
  let upholstery = '';
  let details = [];
  
  // Process based on common patterns in your file list
  if (parts.length > 1) {
    // The second part is typically the type (silla, banqueta, etc.)
    type = parts[1].trim();
    
    // Look for specific patterns in remaining parts
    for (let i = 2; i < parts.length; i++) {
      const part = parts[i].trim().toLowerCase();
      
      // Check for colors (common in your dataset)
      if (part === 'negro' || part === 'latonada' || part === 'roble' || 
          part.includes('nogal') || part === 'madera' || part.includes('natural')) {
        color = parts[i].trim();
      }
      // Check for upholstery
      else if (part.includes('tapizado') || part === 'asiento') {
        // Combine this part with the next one if available (for "tapizado-Mekong" etc.)
        if (i + 1 < parts.length) {
          upholstery = `${parts[i].trim()}-${parts[i+1].trim()}`;
          i++; // Skip the next part since we've used it
        } else {
          upholstery = parts[i].trim();
        }
      }
      // Other details
      else if (part.includes('trasera') || part.includes('espalda') || part.includes('detalle')) {
        details.push('back-view');
      }
      else if (part.includes('respaldo')) {
        if (i + 1 < parts.length) {
          details.push(`backrest-${normalizeForWeb(parts[i+1].trim())}`);
          i++; // Skip the next part
        } else {
          details.push('backrest');
        }
      }
      else {
        details.push(parts[i].trim());
      }
    }
  }
  
  return {
    productName,
    type,
    color,
    upholstery,
    details,
    fileName
  };
}

// Determine category based on product type
function determineCategory(type) {
  const lowerType = type.toLowerCase();
  
  if (lowerType.includes('silla') || lowerType.includes('sillon')) {
    return 'chairs';
  } else if (lowerType.includes('banqueta')) {
    return 'stools';
  } else if (lowerType.includes('mesa')) {
    return 'tables';
  } else if (lowerType.includes('sofa')) {
    return 'sofas';
  } else if (lowerType.includes('asiento')) {
    return 'seats';
  }
  
  return null; // Unknown category
}

// Generate slug for the product folder
function generateProductSlug(productInfo) {
  return normalizeForWeb(productInfo.productName);
}

// Copy the file from source to destination
function copyFile(sourcePath, destPath) {
  ensureDirectoryExists(path.dirname(destPath));
  fs.copyFileSync(sourcePath, destPath);
  console.log(`✓ Copied: ${path.basename(sourcePath)} -> ${destPath}`);
}

// Process a single file with user confirmation
async function processFile(file, sourceFolder) {
  return new Promise((resolve) => {
    console.log(`\n\nProcessing file: ${file}`);
    
    const productInfo = processFileName(file);
    console.log('Extracted information:');
    console.log(`- Product Name: ${productInfo.productName}`);
    console.log(`- Type: ${productInfo.type}`);
    console.log(`- Color: ${productInfo.color}`);
    console.log(`- Upholstery: ${productInfo.upholstery}`);
    console.log(`- Details: ${productInfo.details.join(', ')}`);
    
    // Determine category
    const suggestedCategory = determineCategory(productInfo.type);
    console.log(`- Suggested Category: ${suggestedCategory || 'Unknown'}`);
    
    rl.question('Is this information correct? (Y/n) ', (answer) => {
      if (answer.toLowerCase() === 'n') {
        rl.question('Enter corrected product name: ', (name) => {
          productInfo.productName = name || productInfo.productName;
          
          rl.question('Enter corrected type: ', (type) => {
            productInfo.type = type || productInfo.type;
            
            rl.question('Enter corrected category (chairs/stools/tables/sofas/seats): ', (category) => {
              const correctedCategory = category || suggestedCategory || 'chairs';
              
              const productSlug = generateProductSlug(productInfo);
              const destSubfolder = `interior/${correctedCategory}`;
              const productFolder = path.join(destDir, destSubfolder, productSlug);
              
              // Generate destination filename
              let destFileName = productSlug;
              
              if (productInfo.type) {
                destFileName += `-${normalizeForWeb(productInfo.type)}`;
              }
              
              if (productInfo.color) {
                destFileName += `-${normalizeForWeb(productInfo.color)}`;
              }
              
              if (productInfo.upholstery) {
                const upholsterySlug = normalizeForWeb(productInfo.upholstery);
                if (!destFileName.includes(upholsterySlug)) {
                  destFileName += `-${upholsterySlug}`;
                }
              }
              
              if (productInfo.details.length > 0) {
                destFileName += `-${productInfo.details.map(d => normalizeForWeb(d)).join('-')}`;
              }
              
              // Check for back view indicator in filename
              if (file.toLowerCase().includes('trasera') || 
                  file.toLowerCase().includes('espalda') || 
                  file.toLowerCase().includes('detalle')) {
                if (!destFileName.includes('back')) {
                  destFileName += '-back';
                }
              }
              
              // Add extension from original file
              const fileExt = path.extname(file);
              destFileName += fileExt;
              
              const sourcePath = path.join(sourceDir, sourceFolder, file);
              const destPath = path.join(productFolder, destFileName);
              
              console.log(`Will copy to: ${destPath}`);
              
              rl.question('Proceed with copy? (Y/n) ', (copyAnswer) => {
                if (copyAnswer.toLowerCase() !== 'n') {
                  copyFile(sourcePath, destPath);
                } else {
                  console.log('Skip copying this file.');
                }
                resolve();
              });
            });
          });
        });
      } else {
        // User confirmed information is correct
        const productSlug = generateProductSlug(productInfo);
        const destSubfolder = `interior/${suggestedCategory || 'chairs'}`;
        const productFolder = path.join(destDir, destSubfolder, productSlug);
        
        // Generate destination filename
        let destFileName = productSlug;
        
        if (productInfo.type) {
          destFileName += `-${normalizeForWeb(productInfo.type)}`;
        }
        
        if (productInfo.color) {
          destFileName += `-${normalizeForWeb(productInfo.color)}`;
        }
        
        if (productInfo.upholstery) {
          const upholsterySlug = normalizeForWeb(productInfo.upholstery);
          if (!destFileName.includes(upholsterySlug)) {
            destFileName += `-${upholsterySlug}`;
          }
        }
        
        if (productInfo.details.length > 0) {
          destFileName += `-${productInfo.details.map(d => normalizeForWeb(d)).join('-')}`;
        }
        
        // Check for back view indicator in filename
        if (file.toLowerCase().includes('trasera') || 
            file.toLowerCase().includes('espalda') || 
            file.toLowerCase().includes('detalle')) {
          if (!destFileName.includes('back')) {
            destFileName += '-back';
          }
        }
        
        // Add extension from original file
        const fileExt = path.extname(file);
        destFileName += fileExt;
        
        const sourcePath = path.join(sourceDir, sourceFolder, file);
        const destPath = path.join(productFolder, destFileName);
        
        console.log(`Will copy to: ${destPath}`);
        
        rl.question('Proceed with copy? (Y/n) ', (answer) => {
          if (answer.toLowerCase() !== 'n') {
            copyFile(sourcePath, destPath);
          } else {
            console.log('Skip copying this file.');
          }
          resolve();
        });
      }
    });
  });
}

// Main function to process all images
async function processImages() {
  console.log('Starting image organization...');
  
  // First, analyze all files to determine product groups
  const folderToProcess = 'INTERIOR';
  const sourceFolderPath = path.join(sourceDir, folderToProcess);
  
  if (!fs.existsSync(sourceFolderPath)) {
    console.log(`Source folder does not exist: ${sourceFolderPath}`);
    rl.close();
    return;
  }
  
  const files = fs.readdirSync(sourceFolderPath)
    .filter(file => !file.startsWith('.') && file.match(/\.(jpg|jpeg|png|webp)$/i));
  
  console.log(`Found ${files.length} image files in ${folderToProcess} folder.`);
  
  // Group files by product name
  const productGroups = {};
  files.forEach(file => {
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
  
  console.log(`Detected ${Object.keys(productGroups).length} unique products.`);
  
  // Ask if user wants to see product groups
  rl.question('Would you like to see the detected product groups? (y/N) ', async (answer) => {
    if (answer.toLowerCase() === 'y') {
      Object.keys(productGroups).forEach(productSlug => {
        console.log(`\nProduct: ${productSlug} (${productGroups[productSlug].length} files)`);
        productGroups[productSlug].forEach(({ file }) => {
          console.log(`  - ${file}`);
        });
      });
    }
    
    // Ask user how to proceed
    rl.question('How would you like to proceed?\n1. Process all files automatically\n2. Confirm each file individually\n3. Process by product group\nEnter choice (1-3): ', async (choice) => {
      if (choice === '1') {
        // Automatic processing
        for (const [productSlug, productFiles] of Object.entries(productGroups)) {
          console.log(`\nProcessing product: ${productSlug}`);
          
          const firstFile = productFiles[0];
          const suggestedCategory = determineCategory(firstFile.productInfo.type) || 'chairs';
          
          console.log(`Category: ${suggestedCategory}`);
          
          for (const { file, productInfo } of productFiles) {
            const destSubfolder = `interior/${suggestedCategory}`;
            const productFolder = path.join(destDir, destSubfolder, productSlug);
            
            // Generate destination filename
            let destFileName = productSlug;
            
            if (productInfo.type) {
              destFileName += `-${normalizeForWeb(productInfo.type)}`;
            }
            
            if (productInfo.color) {
              destFileName += `-${normalizeForWeb(productInfo.color)}`;
            }
            
            if (productInfo.upholstery) {
              const upholsterySlug = normalizeForWeb(productInfo.upholstery);
              if (!destFileName.includes(upholsterySlug)) {
                destFileName += `-${upholsterySlug}`;
              }
            }
            
            if (productInfo.details.length > 0) {
              destFileName += `-${productInfo.details.map(d => normalizeForWeb(d)).join('-')}`;
            }
            
            // Check for back view indicator in filename
            if (file.toLowerCase().includes('trasera') || 
                file.toLowerCase().includes('espalda') || 
                file.toLowerCase().includes('detalle')) {
              if (!destFileName.includes('back')) {
                destFileName += '-back';
              }
            }
            
            // Add extension from original file
            const fileExt = path.extname(file);
            destFileName += fileExt;
            
            const sourcePath = path.join(sourceFolderPath, file);
            const destPath = path.join(productFolder, destFileName);
            
            copyFile(sourcePath, destPath);
          }
        }
        
        console.log('\nImage organization complete!');
        rl.close();
      } 
      else if (choice === '2') {
        // Individual confirmation
        for (const file of files) {
          await processFile(file, folderToProcess);
        }
        
        console.log('\nImage organization complete!');
        rl.close();
      }
      else if (choice === '3') {
        // Process by product group
        for (const [productSlug, productFiles] of Object.entries(productGroups)) {
          console.log(`\n\nProduct Group: ${productSlug} (${productFiles.length} files)`);
          productFiles.forEach(({ file }) => {
            console.log(`  - ${file}`);
          });
          
          const firstFile = productFiles[0];
          const suggestedCategory = determineCategory(firstFile.productInfo.type) || 'chairs';
          
          rl.question(`\nSuggested category is "${suggestedCategory}". Is this correct? (Y/n/skip) `, async (answer) => {
            if (answer.toLowerCase() === 'skip') {
              console.log('Skipping this product group.');
              return;
            }
            
            let category = suggestedCategory;
            if (answer.toLowerCase() === 'n') {
              const categoryAnswer = await new Promise((resolve) => {
                rl.question('Enter correct category (chairs/stools/tables/sofas/seats): ', resolve);
              });
              category = categoryAnswer || suggestedCategory;
            }
            
            for (const { file, productInfo } of productFiles) {
              const destSubfolder = `interior/${category}`;
              const productFolder = path.join(destDir, destSubfolder, productSlug);
              
              // Generate destination filename
              let destFileName = productSlug;
              
              if (productInfo.type) {
                destFileName += `-${normalizeForWeb(productInfo.type)}`;
              }
              
              if (productInfo.color) {
                destFileName += `-${normalizeForWeb(productInfo.color)}`;
              }
              
              if (productInfo.upholstery) {
                const upholsterySlug = normalizeForWeb(productInfo.upholstery);
                if (!destFileName.includes(upholsterySlug)) {
                  destFileName += `-${upholsterySlug}`;
                }
              }
              
              if (productInfo.details.length > 0) {
                destFileName += `-${productInfo.details.map(d => normalizeForWeb(d)).join('-')}`;
              }
              
              // Check for back view indicator in filename
              if (file.toLowerCase().includes('trasera') || 
                  file.toLowerCase().includes('espalda') || 
                  file.toLowerCase().includes('detalle')) {
                if (!destFileName.includes('back')) {
                  destFileName += '-back';
                }
              }
              
              // Add extension from original file
              const fileExt = path.extname(file);
              destFileName += fileExt;
              
              const sourcePath = path.join(sourceFolderPath, file);
              const destPath = path.join(productFolder, destFileName);
              
              copyFile(sourcePath, destPath);
            }
          });
        }
        
        console.log('\nImage organization complete!');
        rl.close();
      }
      else {
        console.log('Invalid choice. Exiting.');
        rl.close();
      }
    });
  });
}

// Run the script
processImages();