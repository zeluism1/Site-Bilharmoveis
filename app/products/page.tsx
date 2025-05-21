// app/products/page.tsx
"use client"

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation"; // For App Router
import CategoryNav from "./components/CategoryNav"; // Ensure path is correct
import ProductGrid from "./components/ProductGrid";   // Ensure path is correct
import { useTranslation } from 'react-i18next';

// Client component to handle logic dependent on searchParams
function ProductsPageClientContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { t, i18n } = useTranslation('common');

  // States for currently active filters, driving ProductGrid and passed as initial to CategoryNav
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [currentSubcategory, setCurrentSubcategory] = useState<string | null>(null);
  const [currentColorKey, setCurrentColorKey] = useState<string | null>(null); // Renamed from selectedColor

  // State to track if initial params from URL have been processed
  const [initialParamsProcessed, setInitialParamsProcessed] = useState(false);

  // Effect to initialize and update active filters from URL searchParams
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    const subcategoryFromUrl = searchParams.get('subcategory');
    const colorFromUrl = searchParams.get('color'); // Assuming URL param is 'color' for colorKey

    setCurrentCategory(categoryFromUrl);
    setCurrentSubcategory(subcategoryFromUrl);
    setCurrentColorKey(colorFromUrl);
    setInitialParamsProcessed(true); // Mark as processed
  }, [searchParams]); // Re-run if searchParams object itself changes

  // Callback for when filters change in CategoryNav
  const handleFilterChange = useCallback((
    category: string | null,
    subcategory: string | null,
    colorKey: string | null // This is the new color directly from CategoryNav
  ) => {
    // Update local state which will trigger re-render and pass to ProductGrid
    setCurrentCategory(category);
    setCurrentSubcategory(subcategory);
    setCurrentColorKey(colorKey); // Directly use the colorKey from CategoryNav

    // Update URL query parameters
    const params = new URLSearchParams(); // Start fresh for clarity
    if (category) params.set('category', category);
    if (subcategory) params.set('subcategory', subcategory);
    if (colorKey) params.set('color', colorKey); // Use 'color' as URL param for colorKey
    
    // Use router.replace to avoid adding to history stack for filter changes
    // Conditional ensures we don't append '?' if params is empty
    router.replace(params.toString() ? `${pathname}?${params.toString()}` : pathname); 
  }, [router, pathname]); // Dependencies for useCallback
  
  // Callback for clearing all filters
  const handleClearAllFilters = useCallback(() => {
    setCurrentCategory(null);
    setCurrentSubcategory(null);
    setCurrentColorKey(null);
    router.replace(pathname); // Clear URL query by navigating to pathname without params
  }, [router, pathname]);

  const language = i18n.language as "pt" | "en" | "es";

  // Show skeleton or loading message until initial params are processed
  // This helps prevent CategoryNav from rendering with nulls then quickly re-rendering
  if (!initialParamsProcessed && typeof window !== 'undefined') { 
    return (
      <main className="container mx-auto px-4 py-8 lg:py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {t('products')}
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-64 flex-shrink-0"> {/* Sidebar width from original */}
            {/* Basic Skeleton for CategoryNav */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden p-4 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
          <div className="flex-1"><p>Loading products...</p></div> {/* Placeholder for ProductGrid loading */}
        </div>
      </main>
    );
  }

  return (
    // UI Structure from your original ProductsPage
    <main className="container mx-auto px-4 py-8 lg:py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {t('products')}
      </h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 flex-shrink-0"> {/* Sidebar width from original */}
          <CategoryNav
            // Keying CategoryNav with current values helps ensure it re-initializes correctly
            // when navigating directly to a filtered URL or when props change.
            key={`${currentCategory}-${currentSubcategory}-${currentColorKey}-nav`} 
            onCategoryChange={handleFilterChange} // Use the new handler
            language={language}
            initialCategory={currentCategory}   // Pass current state as initial
            initialSubcategory={currentSubcategory}
            initialColorKey={currentColorKey}
            onClearAllFilters={handleClearAllFilters} // Pass the clear handler
          />
        </div>
        
        <div className="flex-1">
          <ProductGrid 
            selectedCategory={currentCategory}
            selectedSubcategory={currentSubcategory}
            selectedColorKey={currentColorKey} // Ensure ProductGrid uses 'selectedColorKey'
            currentLang={language}
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
    <Suspense fallback={ // Fallback UI while client component (and searchParams) loads
      <main className="container mx-auto px-4 py-8 lg:py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Loading Products...</h1>
        {/* You can add a more sophisticated skeleton here */}
      </main>
    }>
      <ProductsPageClientContent />
    </Suspense>
  );
}