# Analytics and SEO Implementation Guide

## Analytics Implementation

### Option 1: Google Analytics 4

#### Setup Process

1. **Create Google Analytics Account**
   - Visit [Google Analytics](https://analytics.google.com/) and sign up or sign in
   - Create a new property for "Site Bilharmoveis"
   - Complete the setup wizard to get your Measurement ID (G-XXXXXXXXXX)

2. **Next.js Integration**
   - Install the package: `npm install @next/third-parties`
   - Modify `app/layout.tsx` to add the Analytics component:

```tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  )
}
```

3. **Custom Event Tracking**
   - Create a hooks/useAnalytics.ts file:

```tsx
'use client'

export const trackEvent = (eventName: string, parameters?: Record<string, string>) => {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    window.gtag('event', eventName, parameters)
  }
}

export const useAnalytics = () => {
  return {
    trackEvent,
  }
}
```

4. **Usage Example**

```tsx
'use client'
import { useAnalytics } from '@/hooks/useAnalytics'

export function DownloadButton() {
  const { trackEvent } = useAnalytics()
  
  const handleDownload = () => {
    trackEvent('catalog_download', { source: 'homepage' })
    // Download logic
  }
  
  return <Button onClick={handleDownload}>Download Catalog</Button>
}
```

### Option 2: Vercel Analytics

If deployed on Vercel, use their built-in analytics solution:

1. **Enable in Vercel Dashboard**
   - Go to your project in Vercel dashboard
   - Navigate to Analytics tab
   - Enable Web Analytics

2. **Add to your app**
   - Install the package: `npm install @vercel/analytics`
   - Add to your layout:

```tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
```

### Admin Dashboard

1. **Google Analytics Dashboard**
   - Access via [analytics.google.com](https://analytics.google.com/)
   - Grant admin access to team members
   - Create custom dashboards for key metrics:
     - Page views
     - User acquisition
     - Engagement metrics
     - Conversion events (form submissions, catalog downloads)

2. **Custom Admin Interface (Optional)**
   - Create a password-protected `/admin` route
   - Implement Google Analytics Data API to build custom dashboards
   - Display key metrics specific to furniture business

## SEO Implementation

### 1. Metadata Optimization

1. **Configure Default Metadata**
   - Update your existing metadata in `app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: {
    template: '%s | Bilharmóveis - Premium Furniture for Hospitality',
    default: 'Bilharmóveis | Premium Furniture for Hospitality',
  },
  description:
    'Portuguese B2B furniture manufacturer specializing in premium tables and chairs for restaurants and hotels.',
  keywords: ['hospitality furniture', 'restaurant furniture', 'hotel furniture', 'premium furniture', 'Portuguese furniture'],
  authors: [{ name: 'Bilharmóveis' }],
  creator: 'Bilharmóveis',
  publisher: 'Bilharmóveis',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
}
```

2. **Page-Specific Metadata**
   - Add to each page file:

```tsx
// In app/products/page.tsx
export const metadata: Metadata = {
  title: 'Premium Hospitality Furniture Products',
  description: 'Browse our collection of high-quality furniture designed for hotels and restaurants, crafted in Portugal.',
}
```

### 2. Structured Data (JSON-LD)

1. **Create JSON-LD Components**
   - Add a new component file:

```tsx
// components/structured-data.tsx
export function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Bilharmóveis",
          "url": "https://www.bilharmoveis.com",
          "logo": "https://www.bilharmoveis.com/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+351-XXX-XXXX",
            "contactType": "customer service"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Zona Industrial de Barrô",
            "addressLocality": "Águeda",
            "addressRegion": "Aveiro",
            "postalCode": "3750-353",
            "addressCountry": "PT"
          },
          "sameAs": [
            "https://www.facebook.com/bilharmoveis",
            "https://www.instagram.com/bilharmoveis"
          ]
        })
      }}
    />
  )
}

export function ProductSchema({ product }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.name,
          "image": product.imageUrl,
          "description": product.description,
          "brand": {
            "@type": "Brand",
            "name": "Bilharmóveis"
          },
          "manufacturer": {
            "@type": "Organization",
            "name": "Bilharmóveis"
          }
        })
      }}
    />
  )
}
```

2. **Add to Layout and Product Pages**
   - Include in the layout for organization-wide schema
   - Add product schema on individual product pages

### 3. Next-SEO Integration (Optional)

For more advanced SEO needs:

```bash
npm install next-seo
```

### 4. Technical SEO Improvements

1. **Sitemap Generation**
   - Install: `npm install next-sitemap`
   - Create `next-sitemap.config.js` in root:

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.bilharmoveis.com',
  generateRobotsTxt: true,
  exclude: ['/admin/*', '/api/*'],
}
```

   - Add to package.json scripts: `"postbuild": "next-sitemap"`

2. **Image Optimization**
   - Already using Next.js Image component
   - Ensure all images have proper alt text
   - Add width and height attributes when possible

3. **Internationalization**
   - Add hreflang tags for language variants:

```tsx
// components/language-alternate-links.tsx
export function LanguageAlternateLinks({ path }) {
  return (
    <>
      <link rel="alternate" hrefLang="en" href={`https://www.bilharmoveis.com/en${path}`} />
      <link rel="alternate" hrefLang="pt" href={`https://www.bilharmoveis.com/pt${path}`} />
    </>
  )
}
```

### 5. Performance Optimization

1. **Core Web Vitals**
   - Use [Lighthouse](https://developers.google.com/web/tools/lighthouse) for testing
   - Monitor scores in Google Search Console
   - Focus on LCP, FID, and CLS metrics

2. **Image Loading**
   - Use blur placeholders:

```tsx
<Image
  src="/images/product.jpg"
  alt="Product image" 
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQS..." // Generate base64 blur images
/>
```

3. **Font Loading**
   - Using `next/font` appropriately (already implemented)

## Implementation Plan

### Week 1: Analytics Setup
- Configure Google Analytics account
- Implement basic tracking
- Set up first events (page views, downloads)

### Week 2: SEO Foundations
- Update metadata across all pages
- Add structured data
- Generate sitemap

### Week 3: Advanced SEO & Performance
- Address Core Web Vitals issues
- Implement alternate language tags
- Optimize images

### Week 4: Testing & Admin Access
- Create admin dashboard
- Test tracking across site
- Verify SEO implementation

## Monitoring & Maintenance

### Regular Tasks
- Weekly analytics review
- Monthly SEO performance check
- Quarterly content updates based on analytics insights

### Tools
- Google Search Console - Monitor indexing and search performance
- Google Analytics - Track user behavior
- Lighthouse - Check performance metrics
- Screaming Frog - Audit site structure 