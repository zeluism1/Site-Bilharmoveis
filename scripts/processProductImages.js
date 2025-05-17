const { execSync } = require('child_process');
const path = require('path');

console.log('🖼️ Starting product images processing...');

// Step 1: Organize Images
console.log('\n📂 Step 1/3: Organizing and moving images from source to public folder...');
try {
  require('./organizeImages');
  console.log('✅ Image organization completed successfully.');
} catch (error) {
  console.error('❌ Error organizing images:', error);
  process.exit(1);
}

// Step 2: Update Mock Product Data
console.log('\n📝 Step 2/3: Creating product data based on image folders...');
try {
  require('./updateMockProducts');
  console.log('✅ Product data creation completed successfully.');
} catch (error) {
  console.error('❌ Error creating product data:', error);
  process.exit(1);
}

// Step 3: Update Product Image Paths
console.log('\n🔄 Step 3/3: Updating product image paths...');
try {
  require('./updateProductData');
  console.log('✅ Product image paths updated successfully.');
} catch (error) {
  console.error('❌ Error updating product image paths:', error);
  process.exit(1);
}

console.log('\n🎉 All product image processing completed successfully!');
console.log('📊 Summary:');
console.log('- Source images processed and organized in public/images/products');
console.log('- Product data created based on discovered product images');
console.log('- Product image paths updated in the data file');
console.log('\n👀 Next steps:');
console.log('1. Review the updated product data in lib/products/data.ts');
console.log('2. Run the application to see the products with real images');
console.log('3. Make any manual adjustments to product data as needed'); 