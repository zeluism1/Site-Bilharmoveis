"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import "@/lib/i18n"

export default function Home() {
  const { t } = useTranslation()
  const [isMounted, setIsMounted] = useState(false)
  
  // Handle mounting to prevent hydration errors with SSR
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  // This approach handles translation properly
  const highlightHeroTitle = () => {
    const title = t('heroTitle');
    
    // For English
    if (title.includes('Hospitality')) {
      return title.replace('Hospitality', '<span class="text-[#F15A29]">Hospitality</span>');
    }
    // For Portuguese
    else if (title.includes('Hotelaria')) {
      return title.replace('Hotelaria', '<span class="text-[#F15A29]">Hotelaria</span>');
    }
    // For Spanish
    else if (title.includes('Hostelería')) {
      return title.replace('Hostelería', '<span class="text-[#F15A29]">Hostelería</span>');
    }
    
    return title;
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Reduced height */}
      <section className="relative h-[65vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-image.png" // PLACEHOLDER: Add a high-quality image of a stylish hospitality setting
            alt="Modern furniture in a hospitality setting"
            fill
            className="object-cover object-center"
            style={{ objectPosition: '50% 50%' }}
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-2xl text-white">
            <h1 
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
              dangerouslySetInnerHTML={{ __html: highlightHeroTitle() }}
            />
            <p className="mt-6 text-xl">
              {t('heroSubtitle')}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-[#F15A29] hover:bg-[#d14a1e] text-white">
                <Link href="/contact">
                  {t('talkToUs')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white bg-transparent hover:bg-white/10">
                <Link href="/catalog.pdf" download>
                  <Download className="mr-2 h-4 w-4" /> {t('downloadCatalogue')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* New Catalogue Feature Section - Premium redesign */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative overflow-hidden rounded-xl shadow-2xl">
            <div className="absolute inset-0 -z-10">
              <Image
                src="/images/catalogue-cover.png" // PLACEHOLDER: Add a large image of the catalogue cover
                alt="2025 Collection Catalogue"
                fill
                className="object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 md:p-12">
              <div className="lg:col-span-5 lg:pr-12">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                  {t('discoverCollection')}
                </h2>
                <div className="w-20 h-1 bg-[#F15A29] mb-6"></div>
                <h3 className="text-xl font-medium mb-6 text-gray-300">
                  {t('newDesignsTitle')}
                </h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-[#F15A29] hover:bg-[#d14a1e] text-white">
                    <Link href="/catalog.pdf" download>
                      <Download className="mr-2 h-4 w-4" /> {t('downloadCatalogue')}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-white text-black bg-white hover:bg-white/90 hover:text-black">
                    <Link href="/products">
                      {t('browseProducts')} <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="lg:col-span-7">
                <div className="relative rounded-lg overflow-hidden shadow-2xl transform hover:scale-[1.01] transition-all duration-300 border border-gray-700">
                  <Image
                    src="/images/catalogue-cover.png" // PLACEHOLDER: Add a large image of the catalogue cover
                    alt="2025 Collection Catalogue"
                    width={700}
                    height={500}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Combined Interior & Exterior Collections - Taller cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2 text-gray-900">
              {t('exploreCollections')}
            </h2>
            <div className="w-24 h-1 bg-[#F15A29] mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Exterior Collection Card */}
            <div className="group rounded-lg overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="relative h-80">
                <Image
                  src="/images/exterior-collection.jpg" // PLACEHOLDER: Add a representative image for exterior collection
                  alt={t('exteriorCollection')}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{t('exteriorCollection')}</h3>
                  <div className="flex flex-wrap gap-3">
                    {exteriorCategories.map((category) => (
                      <Link 
                        key={category.id}
                        href={`/products/${category.id}`}
                        className="inline-flex items-center text-sm font-medium text-white bg-black/30 hover:bg-[#F15A29]/80 px-3 py-1 rounded-full transition-colors"
                      >
                        {t(category.nameKey)} <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white">
                <Link 
                  href="/products/exterior"
                  className="mt-4 inline-flex items-center text-[#F15A29] hover:text-[#d14a1e] font-medium"
                >
                  {t('explore')} {t('exteriorCollection')} <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Interior Collection Card */}
            <div className="group rounded-lg overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="relative h-80">
                <Image
                  src="/images/interior-collection.jpg" // PLACEHOLDER: Add a representative image for interior collection
                  alt={t('interiorCollection')}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{t('interiorCollection')}</h3>
                  <div className="flex flex-wrap gap-3">
                    {interiorCategories.slice(0, 4).map((category) => (
                      <Link 
                        key={category.id}
                        href={`/products/${category.id}`}
                        className="inline-flex items-center text-sm font-medium text-white bg-black/30 hover:bg-[#F15A29]/80 px-3 py-1 rounded-full transition-colors"
                      >
                        {t(category.nameKey)} <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    ))}
                    {interiorCategories.length > 4 && (
                      <Link 
                        href="/products/interior"
                        className="inline-flex items-center text-sm font-medium text-white bg-[#F15A29]/80 px-3 py-1 rounded-full"
                      >
                        +{interiorCategories.length - 4} <span className="sr-only">more categories</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white">
                <Link 
                  href="/products/interior"
                  className="mt-4 inline-flex items-center text-[#F15A29] hover:text-[#d14a1e] font-medium"
                >
                  {t('explore')} {t('interiorCollection')} <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2 text-gray-900">
              {t('featuredProducts')}
            </h2>
            <div className="w-24 h-1 bg-[#F15A29] mx-auto mb-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all border border-gray-100 bg-white">
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={product.image || "/images/placeholder.jpg"} // PLACEHOLDER: Add product images
                    alt={product.name}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="mt-2 text-gray-600">{product.description}</p>
                  <Link 
                    href={`/products/${product.id}`}
                    className="mt-4 inline-flex items-center text-[#F15A29] hover:text-[#d14a1e] font-medium"
                  >
                    {t('viewDetails')} <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button
              asChild
              className="bg-[#F15A29] hover:bg-[#d14a1e] text-white"
            >
              <Link href="/products">
                {t('viewAllProducts')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-xl font-semibold text-[#5A7D89] mb-3">
                {t('portugueseCraftsmanship')}
              </h2>
              <h3 className="text-3xl font-bold tracking-tight mb-4 text-gray-900">
                {t('craftsmanshipTitle')}
              </h3>
              <div className="w-20 h-1 bg-[#F15A29] mb-6"></div>
              <p className="text-lg text-gray-600 mb-8">
                {t('craftsmanshipDesc')}
              </p>
              <Button asChild className="bg-[#F15A29] hover:bg-[#d14a1e] text-white">
                <Link href="/company/process">
                  {t('learnAboutProcess')}
                </Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/craftsmanship.jpg" // PLACEHOLDER: Add image showing craftspeople at work
                alt="Portuguese craftsmanship in furniture making"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const exteriorCategories = [
  {
    id: "chairs",
    nameKey: "chairs",
    description: "Stylish outdoor chairs designed for comfort and durability",
    image: "/images/categories/chairs.jpg",
  },
  {
    id: "high-stools",
    nameKey: "highStools",
    description: "Elegant bar stools perfect for outdoor dining experiences",
    image: "/images/categories/high-stools.jpg",
  },
  {
    id: "tables",
    nameKey: "tables",
    description: "Durable tables with modern designs for outdoor settings",
    image: "/images/categories/tables.jpg",
  },
  {
    id: "tabletops",
    nameKey: "tabletops",
    description: "Premium tabletops available in various materials and finishes",
    image: "/images/categories/tabletops.jpg",
  },
]

const interiorCategories = [
  {
    id: "metal-chairs",
    nameKey: "metalChairs",
    description: "Stylish metal chairs combining durability with modern design",
    image: "/images/categories/metal-chairs.jpg",
  },
  {
    id: "wooden-chairs",
    nameKey: "woodenChairs",
    description: "Classic wooden chairs crafted for comfort and elegance",
    image: "/images/categories/wooden-chairs.jpg",
  },
  {
    id: "stools",
    nameKey: "stools",
    description: "Versatile stools for various interior settings",
    image: "/images/categories/stools.jpg",
  },
  {
    id: "wooden-tables",
    nameKey: "woodenTables",
    description: "Elegant wooden tables crafted from premium materials",
    image: "/images/categories/wooden-tables.jpg",
  },
  {
    id: "metal-tables",
    nameKey: "metalTables",
    description: "Contemporary metal tables combining style and durability",
    image: "/images/categories/metal-tables.jpg",
  },
  {
    id: "sofas-poufs",
    nameKey: "sofasAndPoufs",
    description: "Comfortable seating solutions for lounge and waiting areas",
    image: "/images/categories/sofas-poufs.jpg",
  },
]

const featuredProducts = [
  {
    id: "premium-wooden-chair",
    name: "Premium Wooden Chair",
    description: "Elegantly designed wooden chair with premium upholstery",
    image: "/images/products/premium-wooden-chair.jpg",
  },
  {
    id: "metal-bar-stool",
    name: "Metal Bar Stool",
    description: "Modern metal bar stool with ergonomic design",
    image: "/images/products/metal-bar-stool.jpg",
  },
  {
    id: "outdoor-dining-table",
    name: "Outdoor Dining Table",
    description: "Weather-resistant dining table for outdoor hospitality spaces",
    image: "/images/products/outdoor-dining-table.jpg",
  },
]

