import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translations will be structured by namespace and language
const resources = {
  en: {
    common: {
      // Navbar
      home: 'Home',
      products: 'Products',
      customJobs: 'Custom Jobs',
      company: 'Company',
      talkToUs: 'Talk to Us',
      contactUs: 'Contact Us',
      mobiliarPortugues: 'Mobiliário Português',
      
      // Footer
      footerTagline: 'Premium furniture designed and manufactured in Portugal for restaurants and hotels.',
      chairsFooter: 'Chairs',
      tablesFooter: 'Tables',
      barStools: 'Bar Stools',
      loungeFurniture: 'Lounge Furniture',
      outdoorFurniture: 'Outdoor Furniture',
      aboutUs: 'About Us',
      customProjects: 'Custom Projects',
      sustainability: 'Sustainability',
      ourProcess: 'Our Process',
      contact: 'Contact',
      copyright: '© {{year}} Bilharmóveis. All rights reserved.',
      
      // Homepage - Hero Section
      heroTitle: 'Furniture for Hospitality, Indoor and Outdoor',
      heroSubtitle: 'Premium furniture designed and manufactured in Portugal for restaurants and hotels.',
      downloadCatalogue: 'Download Catalogue',
      
      // Homepage - New Catalogue Section
      discoverCollection: 'Discover Our 2025 Catalogue',
      newDesignsTitle: 'New Designs for Modern Hospitality',
      newDesignsDesc: '',
      browseProducts: 'Browse Products',
      
      // Homepage - Categories Section
      exploreCollections: 'Explore Our Collections',
      collectionsDesc: 'Premium quality furniture designed for durability and style in high-traffic hospitality environments.',
      explore: 'Explore',
      
      // Homepage - Category Names
      exteriorCollection: 'Exterior Collection',
      interiorCollection: 'Interior Collection',
      chairs: 'Chairs',
      highStools: 'High Stools',
      tables: 'Tables',
      tabletops: 'Tabletops',
      metalChairs: 'Metal Chairs',
      woodenChairs: 'Wooden Chairs',
      stools: 'Stools',
      woodenTables: 'Wooden Tables',
      metalTables: 'Metal Tables',
      sofasAndPoufs: 'Sofas and Poufs',
      
      // Homepage - Craftsmanship Section
      portugueseCraftsmanship: 'Portuguese Craftsmanship',
      craftsmanshipTitle: 'Excellence in Manufacturing',
      craftsmanshipDesc: 'We take pride in our Portuguese heritage of skilled craftsmanship, combining traditional techniques with modern innovation.',
      learnAboutProcess: 'Learn More About Our Process',
      
      // Homepage - Featured Products
      featuredProducts: 'Featured Products',
      viewDetails: 'View Details',
      viewAllProducts: 'View All Products',
    },
  },
  pt: {
    common: {
      // Navbar
      home: 'Início',
      products: 'Produtos',
      customJobs: 'Projetos Personalizados',
      company: 'Empresa',
      talkToUs: 'Fale Connosco',
      contactUs: 'Contacte-nos',
      mobiliarPortugues: 'Mobiliário Português',
      
      // Footer
      footerTagline: 'Mobiliário premium desenhado e fabricado em Portugal para restaurantes e hotéis.',
      chairsFooter: 'Cadeiras',
      tablesFooter: 'Mesas',
      barStools: 'Bancos de Bar',
      loungeFurniture: 'Mobiliário de Lounge',
      outdoorFurniture: 'Mobiliário de Exterior',
      aboutUs: 'Sobre Nós',
      customProjects: 'Projetos Personalizados',
      sustainability: 'Sustentabilidade',
      ourProcess: 'O Nosso Processo',
      contact: 'Contacto',
      copyright: '© {{year}} Bilharmóveis. Todos os direitos reservados.',
      
      // Homepage - Hero Section
      heroTitle: 'Mobiliário para Hotelaria Interior e Exterior',
      heroSubtitle: 'Mobiliário premium desenhado e fabricado em Portugal para restaurantes e hotéis.',
      downloadCatalogue: 'Transferir Catálogo',
      
      // Homepage - New Catalogue Section
      discoverCollection: 'Descubra o Nosso Catálogo de 2025',
      newDesignsTitle: 'Novos Designs para Hospitalidade Moderna',
      newDesignsDesc: '',
      browseProducts: 'Explorar Produtos',
      
      // Homepage - Categories Section
      exploreCollections: 'Explore as Nossas Coleções',
      collectionsDesc: 'Mobiliário de qualidade premium projetado para durabilidade e estilo em ambientes de hospitalidade de alto tráfego.',
      explore: 'Explorar',
      
      // Homepage - Category Names
      exteriorCollection: 'Coleção de Exterior',
      interiorCollection: 'Coleção de Interior',
      chairs: 'Cadeiras',
      highStools: 'Bancos Altos',
      tables: 'Mesas',
      tabletops: 'Tampos',
      metalChairs: 'Cadeiras Metal',
      woodenChairs: 'Cadeiras Madeira',
      stools: 'Bancos',
      woodenTables: 'Mesas Madeira',
      metalTables: 'Mesas Metal',
      sofasAndPoufs: 'Sofás e Pufs',
      
      // Homepage - Craftsmanship Section
      portugueseCraftsmanship: 'Artesanato Português',
      craftsmanshipTitle: 'Excelência em Fabricação',
      craftsmanshipDesc: 'Temos orgulho na nossa herança portuguesa de artesanato qualificado, combinando técnicas tradicionais com inovação moderna.',
      learnAboutProcess: 'Saiba Mais Sobre o Nosso Processo',
      
      // Homepage - Featured Products
      featuredProducts: 'Produtos em Destaque',
      viewDetails: 'Ver Detalhes',
      viewAllProducts: 'Ver Todos os Produtos',
    },
  },
  es: {
    common: {
      // Navbar
      home: 'Inicio',
      products: 'Productos',
      customJobs: 'Proyectos Personalizados',
      company: 'Empresa',
      talkToUs: 'Hable con Nosotros',
      contactUs: 'Contáctenos',
      mobiliarPortugues: 'Mobiliário Português',
      
      // Footer
      footerTagline: 'Muebles premium diseñados y fabricados en Portugal para restaurantes y hoteles.',
      chairsFooter: 'Sillas',
      tablesFooter: 'Mesas',
      barStools: 'Taburetes de Bar',
      loungeFurniture: 'Muebles de Lounge',
      outdoorFurniture: 'Muebles de Exterior',
      aboutUs: 'Sobre Nosotros',
      customProjects: 'Proyectos Personalizados',
      sustainability: 'Sostenibilidad',
      ourProcess: 'Nuestro Proceso',
      contact: 'Contacto',
      copyright: '© {{year}} Bilharmóveis. Todos los derechos reservados.',
      
      // Homepage - Hero Section
      heroTitle: 'Mobiliario para Hostelería Interior y Exterior',
      heroSubtitle: 'Muebles premium diseñados y fabricados en Portugal para restaurantes y hoteles.',
      downloadCatalogue: 'Descargar Catálogo',
      
      // Homepage - New Catalogue Section
      discoverCollection: 'Descubra Nuestro Catálogo de 2025',
      newDesignsTitle: 'Nuevos Diseños para Hospitalidad Moderna',
      newDesignsDesc: '',
      browseProducts: 'Explorar Productos',
      
      // Homepage - Categories Section
      exploreCollections: 'Explore Nuestras Colecciones',
      collectionsDesc: 'Muebles de calidad premium diseñados para durabilidad y estilo en entornos de hospitalidad de alto tráfico.',
      explore: 'Explorar',
      
      // Homepage - Category Names
      exteriorCollection: 'Colección de Exterior',
      interiorCollection: 'Colección de Interior',
      chairs: 'Sillas',
      highStools: 'Taburetes Altos',
      tables: 'Mesas',
      tabletops: 'Tableros',
      metalChairs: 'Sillas de Metal',
      woodenChairs: 'Sillas de Madera',
      stools: 'Taburetes',
      woodenTables: 'Mesas de Madera',
      metalTables: 'Mesas de Metal',
      sofasAndPoufs: 'Sofás y Pufs',
      
      // Homepage - Craftsmanship Section
      portugueseCraftsmanship: 'Artesanía Portuguesa',
      craftsmanshipTitle: 'Excelencia en Fabricación',
      craftsmanshipDesc: 'Nos enorgullecemos de nuestra herencia portuguesa de artesanía calificada, combinando técnicas tradicionales con innovación moderna.',
      learnAboutProcess: 'Conozca Más Sobre Nuestro Proceso',
      
      // Homepage - Featured Products
      featuredProducts: 'Productos Destacados',
      viewDetails: 'Ver Detalles',
      viewAllProducts: 'Ver Todos los Productos',
    },
  },
};

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    ns: ['common'],
    defaultNS: 'common',
    
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n; 