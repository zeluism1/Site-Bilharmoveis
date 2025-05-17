# Product Page Refactoring Plan

## Overview
We will refactor the Products page to create a premium, professional experience that better organizes our furniture collections and emphasizes product visibility and customization options.

## Product Categories Structure
We will organize products into two main sections with subcategories:

### Exterior
- Cadeiras
- Bancos Altos
- Mesas
- Tampos

### Interior
- Cadeiras Metal
- Cadeiras Madeira
- Bancos
- Mesas Madeira
- Mesas Metal
- Sofás e Pufs

## Main Products Page Layout

1. **Clean, Product-Focused Header**
   - Minimal header with company logo and navigation
   - Subtle breadcrumb navigation
   - No large hero section to maximize product visibility

2. **Side Navigation Panel**
   - Left-aligned category navigation
   - Collapsible category sections (Exterior/Interior)
   - Visual indicators for active category
   - Sticky positioning for easy navigation as user scrolls
   - Filter options for materials, price range, etc.

3. **Compact Featured Products Row**
   - Horizontally scrollable section below header
   - 4-5 featured products with premium styling
   - "New Arrival" or "Bestseller" badges
   - Subtle animations on hover

4. **Main Product Grid**
   - Primary focus of the page
   - Responsive grid with consistent card sizing
   - High-quality product thumbnails
   - Quick-view functionality
   - Clean typography with adequate spacing
   - Subtle transitions and hover effects

5. **Premium UI Elements**
   - Refined color palette with neutral tones and accent colors
   - Elegant typography pairing (serif for headings, sans-serif for body)
   - Micro-interactions that feel sophisticated
   - Consistent spacing and alignment
   - High-contrast text for readability
   - Subtle shadows and depth effects

## Individual Product Page Enhancements

1. **Color Selection System**
   - Interactive color swatches prominently displayed
   - Real-time image updates when color is changed
   - Visual indication of selected color
   - Available color options specific to each product
   - Smooth image transitions between color changes

2. **Product Image Gallery**
   - Large primary image that updates based on color selection
   - Thumbnail gallery for different angles/views
   - Zoom functionality on hover
   - Optional 360° view for premium products

3. **Product Information**
   - Clear product name and category
   - Detailed specifications (dimensions, materials, weight)
   - Features and benefits
   - Care instructions

4. **Enhanced CTA Section**
   - Clean, prominent "Request Quote" button
   - Display of currently selected options (color, quantity)
   - "Add to Project" functionality
   - Related products section

## Folder Structure & Technical Implementation

1. **Project Organization**
   ```
   app/
   ├── products/
   │   ├── page.tsx                    # Main products listing page
   │   ├── [category]/                 # Category-specific pages
   │   │   └── page.tsx
   │   ├── [productId]/                # Individual product pages
   │   │   └── page.tsx
   │   └── components/                 # Product-specific components
   │       ├── ProductCard.tsx
   │       ├── CategoryNav.tsx
   │       ├── ProductGrid.tsx
   │       ├── ColorSelector.tsx
   │       └── ProductGallery.tsx
   ├── lib/
   │   └── products/
   │       ├── types.ts                # Product type definitions
   │       ├── actions.ts              # Server actions for products
   │       └── utils.ts                # Utility functions
   └── public/
       └── products/
           ├── [productId]/            # Product images by ID
           │   ├── main.jpg
           │   ├── angle1.jpg
           │   ├── angle2.jpg
           │   └── colors/             # Color variants
           │       ├── red/
           │       │   ├── main.jpg
           │       │   ├── angle1.jpg
           │       │   └── angle2.jpg
           │       ├── blue/
           │       │   ├── main.jpg
           │       │   └── ...
           │       └── ...
   ```

2. **Color Switching Implementation**
   - Each product will have a `colors` array in its data model
   - Images for each color variant will be organized in folders by color name
   - Client component for color selection with state management
   - Image paths will follow a predictable pattern: `/products/${productId}/colors/${colorName}/${view}.jpg`
   - Preloading of color variants for smooth transitions
   - Fallback for missing color variants

3. **Data Model for Products**
   ```typescript
   type Product = {
     id: string;
     name: string;
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
     materials: string[];
     colors: {
       name: string;
       hex: string;
       available: boolean;
     }[];
     images: {
       main: string;
       angles: string[];
       thumbnails: string[];
     };
     related: string[]; // IDs of related products
   };
   ```

4. **ColorSelector Component**
   - Client component with color state management
   - Smooth image transition effects
   - Accessibility considerations for color selection
   - Handling of color variants image loading

## Implementation Phases

1. **Phase 1: Data Structure & Base Components**
   - Define product schema
   - Set up folder structure for product images
   - Create sample products with color variants
   - Build reusable components (ProductCard, CategoryNav)

2. **Phase 2: Main Product Page**
   - Implement left-side category navigation
   - Create responsive product grid
   - Add compact featured products section
   - Implement filtering functionality

3. **Phase 3: Individual Product Pages**
   - Build product detail layout
   - Implement color selection component
   - Create product gallery with color-switching
   - Develop enhanced CTA section

4. **Phase 4: Testing & Optimization**
   - Performance testing for image loading
   - Optimize color variant switching
   - SEO optimization
   - Cross-browser/device testing 