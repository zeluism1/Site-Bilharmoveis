// app/products/page.tsx
"use client"

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation"; // For App Router
import CategoryNav from "./components/CategoryNav"; // Ensure path is correct
import ProductGrid from "./components/ProductGrid";   // Ensure path is correct
import { useTranslation } from 'react-i18next';
// import Head from 'next/head'; // In App Router, Head is managed in layout.tsx or page metadata

// Client component to handle logic dependent on searchParams
function ProductsPageClientContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname(); // Get current pathname
  const { t, i18n } = useTranslation('common'); // Assuming 'common' namespace

  // State for currently active filters, which drive ProductGrid
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [activeColorKey, setActiveColorKey] = useState<string | null>(null);

  // State to track if initial params have been processed
  const [initialParamsProcessed, setInitialParamsProcessed] = useState(false);

  // Effect to initialize and update active filters from URL searchParams
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    const subcategoryFromUrl = searchParams.get('subcategory');
    const colorFromUrl = searchParams.get('color'); // Assuming URL param is 'color' for colorKey

    setActiveCategory(categoryFromUrl);
    setActiveSubcategory(subcategoryFromUrl);
    setActiveColorKey(colorFromUrl);
    setInitialParamsProcessed(true); // Mark as processed
  }, [searchParams]);

  // Callback for when filters change in CategoryNav
  const handleFilterUpdate = useCallback((
    category: string | null,
    subcategory: string | null,
    colorKey: string | null
  ) => {
    // Preserve the color if only category/subcategory changes, unless colorKey is explicitly null (meaning "All Colors")
    // Or if the colorKey itself is changing.
    let newColorKey = colorKey;
    if (category !== activeCategory || subcategory !== activeSubcategory) {
      // If category or subcategory changes, and a new color isn't explicitly selected,
      // we might want to reset color or keep current.
      // For now, let's assume the `colorKey` passed from CategoryNav is the desired one.
      // The old logic: if (colorKey === undefined && (category !== activeCategory || subcategory !== activeSubcategory)) newColorKey = null;
      // This is now handled by CategoryNav passing the current activeColor if only cat/subcat changes.
    }
    
    setActiveCategory(category);
    setActiveSubcategory(subcategory);
    setActiveColorKey(newColorKey); // Use the newColorKey which respects the logic above

    // Update URL query parameters
    const params = new URLSearchParams(); // Start fresh or use `searchParams.toString()` to preserve others
    if (category) params.set('category', category);
    if (subcategory) params.set('subcategory', subcategory);
    if (newColorKey) params.set('color', newColorKey); // Use 'color' as URL param for colorKey
    
    router.replace(`${pathname}?${params.toString()}`);
  }, [router, pathname, activeCategory, activeSubcategory]); // Added active states to dependencies if their change should influence newColorKey decision
  
  // Callback for clearing all filters
  const handleClearAllFilters = useCallback(() => {
    setActiveCategory(null);
    setActiveSubcategory(null);
    setActiveColorKey(null);
    router.replace(pathname); // Clear URL query by navigating to pathname without params
  }, [router, pathname]);

  const language = i18n.language as "pt" | "en" | "es";

  // Until initial params are processed, can show a loader or nothing.
  // This prevents CategoryNav from rendering with nulls then quickly re-rendering.
  if (!initialParamsProcessed && typeof window !== 'undefined') { 
    return (
      <main className="container mx-auto px-4 py-8 lg:py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {t('products')}
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-64 flex-shrink-0">
            {/* Skeleton for CategoryNav */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden p-4 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
          <div className="flex-1">
            {/* Skeleton for ProductGrid can be added here */}
            <p>Loading products...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    // UI Structure remains the same as user's original page.tsx
    <main className="container mx-auto px-4 py-8 lg:py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {t('products')}
      </h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 flex-shrink-0"> {/* Sidebar width from original */}
          <CategoryNav
            // Keying CategoryNav with active values ensures it re-initializes if URL is directly navigated to
            // and initial values are correctly picked up by its own useEffect.
            key={`${activeCategory}-${activeSubcategory}-${activeColorKey}-navwrapper`} 
            onCategoryChange={handleFilterUpdate}
            language={language}
            initialCategory={activeCategory} // Pass current active filters as initial for re-sync
            initialSubcategory={activeSubcategory}
            initialColorKey={activeColorKey}
            onClearAllFilters={handleClearAllFilters}
          />
        </div>
        
        <div className="flex-1">
          <ProductGrid 
            selectedCategory={activeCategory}
            selectedSubcategory={activeSubcategory}
            selectedColorKey={activeColorKey} // Ensure ProductGrid uses `selectedColorKey`
            currentLang={language} // Pass currentLang if ProductGrid needs it
            onFiltersClear={handleClearAllFilters} // If ProductGrid has its own clear button
          />
        </div>
      </div>
    </main>
  );
}

// Main export for the page, using Suspense for client components relying on searchParams
export default function ProductsPage() {
  return (
    // Suspense is crucial for client components that use useSearchParams
    <Suspense fallback={
      <main className="container mx-auto px-4 py-8 lg:py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Loading Products...</h1>
        {/* Basic fallback, can be more sophisticated */}
      </main>
    }>
      <ProductsPageClientContent />
    </Suspense>
  );
}