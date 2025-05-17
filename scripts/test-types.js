const fs = require('fs');
const path = require('path');

// Map folder names to subcategories
const subcategoryMap = {
  'chairs': 'Cadeiras',
  'stools': 'Bancos',
  'tables': 'Mesas',
  'sofas': 'Sofás'
};

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

// Determine actual product type from subcategory
function getProductTypeFromSubcategory(subcategory) {
  const subcategoryType = subcategoryToProductType(subcategory);
  return subcategoryType;
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

// Test each subcategory mapping
console.log("Testing subcategory to product type mapping:");
for (const subcategory of Object.keys(subcategoryMap)) {
  const productType = getProductTypeFromSubcategory(subcategory);
  const displayType = formatProductType(productType);
  console.log(`Subcategory: ${subcategory} => Product Type: ${productType} => Display Name: ${displayType}`);
}

// Read a product directory and see what files and types exist
const testDirectory = 'public/images/products/interior/stools/lirica';
console.log(`\nExamining files in ${testDirectory}:`);

if (fs.existsSync(testDirectory)) {
  const files = fs.readdirSync(testDirectory)
    .filter(file => !file.startsWith('.') && file.match(/\.(jpg|jpeg|png|webp)$/i));
  
  files.forEach(file => {
    const parts = file.split('.')[0].split('-');
    const productName = parts[0] || 'unknown';
    const productType = parts[1] || 'unknown';
    console.log(`${file}: Product=${productName}, Type=${productType}`);
  });
  
  // Group by product type
  const productTypeGroups = {};
  files.forEach(file => {
    const parts = file.split('.')[0].split('-');
    if (parts.length < 2) return;
    
    const productType = parts[1];
    if (!productTypeGroups[productType]) {
      productTypeGroups[productType] = [];
    }
    productTypeGroups[productType].push(file);
  });
  
  console.log("\nFiles grouped by product type:");
  for (const [type, typeFiles] of Object.entries(productTypeGroups)) {
    console.log(`Type: ${type}`);
    typeFiles.forEach(file => console.log(`  - ${file}`));
  }
} else {
  console.log("Directory not found");
}

// Test how we would identify products
console.log("\nTesting product identification logic:");
const subcategory = 'stools';
console.log(`Subcategory from directory: ${subcategory}`);
const subcategoryType = getProductTypeFromSubcategory(subcategory);
console.log(`Product type determined from subcategory: ${subcategoryType}`);
console.log(`Formatted display type: ${formatProductType(subcategoryType)}`);

// Test against the bug reported - lirica products in stools folder
console.log("\nSpecific test for lirica products in stools folder:");
const liricaTypes = ['silla', 'banqueta'];
liricaTypes.forEach(productType => {
  const subcategoryType = getProductTypeFromSubcategory('stools');
  console.log(`File product type: ${productType}`);
  console.log(`Subcategory product type: ${subcategoryType}`);
  console.log(`Formatted subcategory type: ${formatProductType(subcategoryType)}`);
  console.log(`Does file type match subcategory type? ${productType === subcategoryType}`);
}); 