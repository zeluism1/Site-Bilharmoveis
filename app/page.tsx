// app/page.tsx (Homepage)
"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import "@/lib/i18n" // Ensure i18n is initialized

// Define the structure for a category grid item
interface CategoryGridItemDef {
  id: string;
  titleKey: string; 
  imageSrc: string; 
  href: string; 
  gridConfig: {
    mobileOrder: string;
    desktop: string; 
  };
}

// Component for a single category card in the new grid
const CategoryGridCard: React.FC<{ item: CategoryGridItemDef }> = ({ item }) => {
  const { t } = useTranslation();
  const cardClasses = `group relative overflow-hidden rounded-lg shadow-lg block h-full 
                       ${item.gridConfig.mobileOrder} ${item.gridConfig.desktop} 
                       transition-all duration-300 ease-in-out hover:shadow-2xl transform hover:-translate-y-1`;

  return (
    <Link href={item.href} className={cardClasses}>
      <Image
        src={item.imageSrc}
        alt={t(item.titleKey)}
        fill
        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 left-0 p-5 md:p-8">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white transition-colors duration-300 group-hover:text-[#F15A29]">
          {t(item.titleKey)}
        </h3>
      </div>
    </Link>
  );
};


export default function Home() {
  const { t } = useTranslation()
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  const highlightHeroTitle = () => {
    const title = t('heroTitle');
    if (title.includes('Hospitality')) return title.replace('Hospitality', '<span class="text-[#F15A29]">Hospitality</span>');
    if (title.includes('Hotelaria')) return title.replace('Hotelaria', '<span class="text-[#F15A29]">Hotelaria</span>');
    if (title.includes('Hostelería')) return title.replace('Hostelería', '<span class="text-[#F15A29]">Hostelería</span>');
    return title;
  };

  const categoryGridItems: CategoryGridItemDef[] = [
    {
      id: 'grid-interior-chairs',
      titleKey: 'categoryGrid.interiorChairs', 
      imageSrc: '/images/placeholder-cat-chairs-armchairs.jpg', // REPLACE
      href: '/products?category=Interior&subcategory=Cadeiras',
      gridConfig: { mobileOrder: 'order-1', desktop: 'md:col-span-3 md:row-start-1' },
    },
    {
      id: 'grid-interior-tables',
      titleKey: 'categoryGrid.interiorTables', 
      imageSrc: '/images/placeholder-cat-coffee-tables.jpg', // REPLACE
      href: '/products?category=Interior&subcategory=Mesas',
      gridConfig: { mobileOrder: 'order-3', desktop: 'md:col-span-3 md:row-start-2' },
    },
    {
      id: 'grid-interior-stools',
      titleKey: 'categoryGrid.interiorStools', 
      imageSrc: '/images/placeholder-cat-bar-stools.jpg', // REPLACE
      href: '/products?category=Interior&subcategory=Bancos Altos', // Or 'Bancos'
      gridConfig: { mobileOrder: 'order-2', desktop: 'md:col-start-4 md:col-span-2 md:row-span-2 md:row-start-1' },
    },
    {
      id: 'grid-exterior-sofas',
      titleKey: 'categoryGrid.exteriorSofas', 
      imageSrc: '/images/placeholder-cat-lounge.jpg', // REPLACE
      href: '/products?category=Exterior&subcategory=Sofás',
      gridConfig: { mobileOrder: 'order-4', desktop: 'md:col-start-6 md:col-span-3 md:row-start-1' },
    },
    {
      id: 'grid-exterior-chairs',
      titleKey: 'categoryGrid.exteriorChairs', 
      imageSrc: '/images/placeholder-cat-ottomans.jpg', // REPLACE
      href: '/products?category=Exterior&subcategory=Cadeiras',
      gridConfig: { mobileOrder: 'order-5', desktop: 'md:col-start-6 md:col-span-3 md:row-start-2' },
    },
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[65vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-image.png" // PLACEHOLDER
            alt={t('heroTitle')}
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
            <p className="mt-6 text-xl">{t('heroSubtitle')}</p>
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

      {/* New Catalogue Feature Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
         <div className="container mx-auto px-4 md:px-6">
          <div className="relative overflow-hidden rounded-xl shadow-2xl">
            <div className="absolute inset-0 -z-10">
              <Image
                src="/images/catalogue-cover.png" // PLACEHOLDER
                alt={t('discoverCollection')}
                fill
                className="object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 md:p-12">
              <div className="lg:col-span-5 lg:pr-12">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{t('discoverCollection')}</h2>
                <div className="w-20 h-1 bg-[#F15A29] mb-6"></div>
                <h3 className="text-xl font-medium mb-6 text-gray-300">{t('newDesignsTitle')}</h3>
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
                    src="/images/catalogue-cover.png" // PLACEHOLDER
                    alt={t('discoverCollection')}
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

      {/* New Category Grid Section */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-gray-900">
              {t('categoryGrid.mainTitle')}
            </h2>
            <div className="w-24 h-1 bg-[#F15A29] mx-auto mb-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-8 auto-rows-[300px] sm:auto-rows-[340px] md:auto-rows-[280px] lg:auto-rows-[320px] xl:auto-rows-[350px] gap-5 md:gap-8">
            {categoryGridItems.map((item) => (
              <CategoryGridCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
         <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2 text-gray-900">{t('featuredProducts')}</h2>
            <div className="w-24 h-1 bg-[#F15A29] mx-auto mb-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all border border-gray-100 bg-white">
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={product.image || "/images/placeholder.jpg"} // PLACEHOLDER
                    alt={product.name} // Should be translated if names are multilingual
                    width={500}
                    height={500}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="mt-2 text-gray-600">{product.description}</p>
                  <Link 
                    href={`/products/${product.id}`} // Assuming product detail pages exist
                    className="mt-4 inline-flex items-center text-[#F15A29] hover:text-[#d14a1e] font-medium"
                  >
                    {t('viewDetails')} <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild className="bg-[#F15A29] hover:bg-[#d14a1e] text-white">
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
              <h2 className="text-xl font-semibold text-[#5A7D89] mb-3">{t('portugueseCraftsmanship')}</h2>
              <h3 className="text-3xl font-bold tracking-tight mb-4 text-gray-900">{t('craftsmanshipTitle')}</h3>
              <div className="w-20 h-1 bg-[#F15A29] mb-6"></div>
              <p className="text-lg text-gray-600 mb-8">{t('craftsmanshipDesc')}</p>
              <Button asChild className="bg-[#F15A29] hover:bg-[#d14a1e] text-white">
                <Link href="/company/process">{t('learnAboutProcess')}</Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/craftsmanship.jpg" // PLACEHOLDER
                alt={t('craftsmanshipTitle')}
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

// Dummy data for featured products, replace with actual data fetching or props
const featuredProducts = [
  { id: "1", name: "Premium Chair", description: "Elegant and comfortable seating.", image: "/images/placeholder.jpg" },
  { id: "2", name: "Modern Table", description: "Sleek design for contemporary spaces.", image: "/images/placeholder.jpg" },
  { id: "3", name: "Outdoor Sofa", description: "Durable and stylish for exterior use.", image: "/images/placeholder.jpg" },
];