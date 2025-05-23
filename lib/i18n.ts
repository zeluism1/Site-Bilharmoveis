// lib/i18n.ts
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
      
      // Homepage - Categories Section (Old)
      exploreCollections: 'Explore Our Collections',
      collectionsDesc: 'Premium quality furniture designed for durability and style in high-traffic hospitality environments.',
      explore: 'Explore',
      
      // Homepage - Category Names (for old section, can be reused or specific)
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

      // Homepage - New Category Grid Section
      categoryGrid: {
        mainTitle: "Explore Our Furniture Ranges",
        interiorChairs: "Interior Chairs",
        interiorTables: "Interior Tables",
        interiorStools: "Interior Stools",
        exteriorSofas: "Exterior Sofas", // Lounge equivalent
        exteriorChairs: "Exterior Chairs", // Ottomans equivalent for routing
      },
      
      // Homepage - Craftsmanship Section
      portugueseCraftsmanship: 'Portuguese Craftsmanship',
      craftsmanshipTitle: 'Excellence in Manufacturing',
      craftsmanshipDesc: 'We take pride in our Portuguese heritage of skilled craftsmanship, combining traditional techniques with modern innovation.',
      learnAboutProcess: 'Learn More About Our Process',
      
      // Homepage - Featured Products
      featuredProducts: 'Featured Products',
      viewDetails: 'View Details',
      viewAllProducts: 'View All Products',
      
      // Common
      loading: 'Loading...',
      error: 'Error',
      errorLoadingData: 'Could not load data. Please try again later.',
      close: 'Close',
      toggleMenu: 'Toggle menu',
      optional: 'optional',

      // Custom Jobs Page
      customJobsPage: {
        title: "Custom Projects",
        subtitle: "We collaborate with architects, interior designers, and hospitality businesses to create bespoke furniture solutions.",
        processSection: {
          title: "Our Custom Journey",
          step1Title: "Consultation & Briefing",
          step1Desc: "Understanding your vision, needs, and project scope.",
          step2Title: "Design & Prototyping",
          step2Desc: "Crafting concepts, detailed drawings, and sample production.",
          step3Title: "Manufacturing Excellence",
          step3Desc: "Skilled artisans bring your furniture to life in our Portuguese workshop.",
          step4Title: "Delivery & Installation",
          step4Desc: "Seamless logistics and on-site setup for a perfect finish.",
        },
        gallerySection: {
          title: "Our Portfolio",
          subtitle: "Explore a selection of our realized custom projects.",
          viewProject: "View Project Details",
          viewProjectDetailsFor: "View project details for",
          noProjectsTitle: "No Custom Projects Yet",
          noProjects: "Check back soon to see our amazing custom work!",
        },
        ctaSection: {
          title: "Ready to Start Your Custom Project?",
          subtitle: "Contact our team to discuss your requirements and discover how we can create the perfect furniture solution for your space.",
          button: "Talk to Our Design Team",
          buttonFloating: "Start Your Project"
        }
      }
    },
    adminProjects: {
      title: "Custom Projects Management",
      addProject: "Add New Project",
      editProject: "Edit Project",
      projectTitle: "Project Title",
      location: "Location",
      description: "Description",
      image: "Image",
      actions: "Actions",
      confirmDeleteTitle: "Are you sure?",
      confirmDeleteDescription: "This will permanently delete the project \"{{projectTitle}}\". This action cannot be undone.",
      delete: "Delete",
      cancel: "Cancel",
      save: "Save Project",
      saving: "Saving...",
      create: "Create Project",
      creating: "Creating...",
      noProjectsFound: "No projects found. Add your first project!",
      uploadInstruction: "Upload the main image for the project.",
      titlePT: "Title (PT)",
      titleEN: "Title (EN)",
      titleES: "Title (ES)",
      descriptionPT: "Description (PT)",
      descriptionEN: "Description (EN)",
      descriptionES: "Description (ES)",
      errorFetchProject: "Failed to fetch project details.",
      errorUpdateProject: "Failed to update project.",
      errorCreateProject: "Failed to create project.",
      errorDeleteProject: "Failed to delete project.",
      successCreateProject: "Project created successfully.",
      successUpdateProject: "Project updated successfully.",
      successDeleteProject: "Project deleted successfully."
    }
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
      
      // Homepage - Categories Section (Old)
      exploreCollections: 'Explore as Nossas Coleções',
      collectionsDesc: 'Mobiliário de qualidade premium projetado para durabilidade e estilo em ambientes de hospitalidade de alto tráfego.',
      explore: 'Explorar',
      
      // Homepage - Category Names (for old section)
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

      // Homepage - New Category Grid Section
      categoryGrid: {
        mainTitle: "Explore as Nossas Gamas de Mobiliário",
        interiorChairs: "Cadeiras de Interior",
        interiorTables: "Mesas de Interior",
        interiorStools: "Bancos de Interior",
        exteriorSofas: "Sofás de Exterior",
        exteriorChairs: "Cadeiras de Exterior",
      },
      
      // Homepage - Craftsmanship Section
      portugueseCraftsmanship: 'Artesanato Português',
      craftsmanshipTitle: 'Excelência em Fabricação',
      craftsmanshipDesc: 'Temos orgulho na nossa herança portuguesa de artesanato qualificado, combinando técnicas tradicionais com inovação moderna.',
      learnAboutProcess: 'Saiba Mais Sobre o Nosso Processo',
      
      // Homepage - Featured Products
      featuredProducts: 'Produtos em Destaque',
      viewDetails: 'Ver Detalhes',
      viewAllProducts: 'Ver Todos os Produtos',
      
      // Common
      loading: 'Carregando...',
      error: 'Erro',
      errorLoadingData: 'Não foi possível carregar os dados. Tente novamente mais tarde.',
      close: 'Fechar',
      toggleMenu: 'Alternar menu',
      optional: 'opcional',

      // Custom Jobs Page
      customJobsPage: {
        title: "Projetos Personalizados",
        subtitle: "Colaboramos com arquitetos, designers de interiores e empresas de hotelaria para criar soluções de mobiliário personalizadas.",
        processSection: {
          title: "A Nossa Jornada Personalizada",
          step1Title: "Consulta & Briefing",
          step1Desc: "Compreender a sua visão, necessidades e âmbito do projeto.",
          step2Title: "Design & Prototipagem",
          step2Desc: "Criação de conceitos, desenhos detalhados e produção de amostras.",
          step3Title: "Excelência na Fabricação",
          step3Desc: "Artesãos qualificados dão vida ao seu mobiliário na nossa oficina em Portugal.",
          step4Title: "Entrega & Instalação",
          step4Desc: "Logística integrada e montagem no local para um acabamento perfeito.",
        },
        gallerySection: {
          title: "O Nosso Portfólio",
          subtitle: "Explore uma seleção dos nossos projetos personalizados realizados.",
          viewProject: "Ver Detalhes do Projeto",
          viewProjectDetailsFor: "Ver detalhes do projeto para",
          noProjectsTitle: "Ainda Não Temos Projetos Personalizados",
          noProjects: "Volte em breve para ver os nossos trabalhos incríveis!",
        },
        ctaSection: {
          title: "Pronto para Iniciar o Seu Projeto Personalizado?",
          subtitle: "Contacte a nossa equipa para discutir os seus requisitos e descubra como podemos criar a solução de mobiliário perfeita para o seu espaço.",
          button: "Fale com a Nossa Equipa de Design",
          buttonFloating: "Iniciar Projeto"
        }
      }
    },
    adminProjects: {
      title: "Gestão de Projetos Personalizados",
      addProject: "Adicionar Novo Projeto",
      editProject: "Editar Projeto",
      projectTitle: "Título do Projeto",
      location: "Localização",
      description: "Descrição",
      image: "Imagem",
      actions: "Ações",
      confirmDeleteTitle: "Tem a certeza?",
      confirmDeleteDescription: "Isto irá apagar permanentemente o projeto \"{{projectTitle}}\". Esta ação não pode ser desfeita.",
      delete: "Apagar",
      cancel: "Cancelar",
      save: "Guardar Projeto",
      saving: "A guardar...",
      create: "Criar Projeto",
      creating: "A criar...",
      noProjectsFound: "Nenhum projeto encontrado. Adicione o seu primeiro projeto!",
      uploadInstruction: "Carregue a imagem principal para o projeto.",
      titlePT: "Título (PT)",
      titleEN: "Título (EN)",
      titleES: "Título (ES)",
      descriptionPT: "Descrição (PT)",
      descriptionEN: "Descrição (EN)",
      descriptionES: "Descrição (ES)",
      errorFetchProject: "Falha ao carregar detalhes do projeto.",
      errorUpdateProject: "Falha ao atualizar projeto.",
      errorCreateProject: "Falha ao criar projeto.",
      errorDeleteProject: "Falha ao apagar projeto.",
      successCreateProject: "Projeto criado com sucesso.",
      successUpdateProject: "Projeto atualizado com sucesso.",
      successDeleteProject: "Projeto apagado com sucesso."
    }
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
      
      // Homepage - Categories Section (Old)
      exploreCollections: 'Explore Nuestras Colecciones',
      collectionsDesc: 'Muebles de calidad premium diseñados para durabilidad y estilo en entornos de hospitalidad de alto tráfico.',
      explore: 'Explorar',
      
      // Homepage - Category Names (for old section)
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

      // Homepage - New Category Grid Section
      categoryGrid: {
        mainTitle: "Explore Nuestras Gamas de Mobiliario",
        interiorChairs: "Sillas de Interior",
        interiorTables: "Mesas de Interior",
        interiorStools: "Taburetes de Interior",
        exteriorSofas: "Sofás de Exterior",
        exteriorChairs: "Sillas de Exterior",
      },
      
      // Homepage - Craftsmanship Section
      portugueseCraftsmanship: 'Artesanía Portuguesa',
      craftsmanshipTitle: 'Excelencia en Fabricación',
      craftsmanshipDesc: 'Nos enorgullecemos de nuestra herencia portuguesa de artesanía calificada, combinando técnicas tradicionales con innovación moderna.',
      learnAboutProcess: 'Conozca Más Sobre Nuestro Proceso',
      
      // Homepage - Featured Products
      featuredProducts: 'Productos Destacados',
      viewDetails: 'Ver Detalles',
      viewAllProducts: 'Ver Todos los Productos',
      
      // Common
      loading: 'Cargando...',
      error: 'Error',
      errorLoadingData: 'No se pudieron cargar los datos. Inténtelo de nuevo más tarde.',
      close: 'Cerrar',
      toggleMenu: 'Alternar menú',
      optional: 'opcional',

      // Custom Jobs Page
      customJobsPage: {
        title: "Proyectos Personalizados",
        subtitle: "Colaboramos con arquitectos, diseñadores de interiores y empresas de hostelería para crear soluciones de mobiliario a medida.",
        processSection: {
          title: "Nuestro Proceso Personalizado",
          step1Title: "Consulta y Briefing",
          step1Desc: "Entender su visión, necesidades y alcance del proyecto.",
          step2Title: "Diseño y Prototipado",
          step2Desc: "Creación de conceptos, dibujos detallados y producción de muestras.",
          step3Title: "Excelencia en Fabricación",
          step3Desc: "Artesanos cualificados dan vida a sus muebles en nuestro taller en Portugal.",
          step4Title: "Entrega e Instalación",
          step4Desc: "Logística integrada y montaje in situ para un acabado perfecto.",
        },
        gallerySection: {
          title: "Nuestro Portfolio",
          subtitle: "Explore una selección de nuestros proyectos personalizados realizados.",
          viewProject: "Ver Detalles del Proyecto",
          viewProjectDetailsFor: "Ver detalles del proyecto para",
          noProjectsTitle: "Aún No Tenemos Proyectos Personalizados",
          noProjects: "¡Vuelva pronto para ver nuestros trabajos increíbles!",
        },
        ctaSection: {
          title: "¿Listo para Iniciar su Proyecto Personalizado?",
          subtitle: "Contacte con nuestro equipo para discutir sus requisitos y descubra cómo podemos crear la solución de mobiliario perfecta para su espacio.",
          button: "Hable con Nuestro Equipo de Diseño",
          buttonFloating: "Iniciar Proyecto"
        }
      }
    },
    adminProjects: {
      title: "Gestión de Proyectos Personalizados",
      addProject: "Añadir Nuevo Proyecto",
      editProject: "Editar Proyecto",
      projectTitle: "Título del Proyecto",
      location: "Ubicación",
      description: "Descripción",
      image: "Imagen",
      actions: "Acciones",
      confirmDeleteTitle: "¿Está seguro?",
      confirmDeleteDescription: "Esto eliminará permanentemente el proyecto \"{{projectTitle}}\". Esta acción no se puede deshacer.",
      delete: "Eliminar",
      cancel: "Cancelar",
      save: "Guardar Proyecto",
      saving: "Guardando...",
      create: "Crear Proyecto",
      creating: "Creando...",
      noProjectsFound: "No se encontraron proyectos. ¡Añada su primer proyecto!",
      uploadInstruction: "Suba la imagen principal para el proyecto.",
      titlePT: "Título (PT)",
      titleEN: "Título (EN)",
      titleES: "Título (ES)",
      descriptionPT: "Descripción (PT)",
      descriptionEN: "Descripción (EN)",
      descriptionES: "Descripción (ES)",
      errorFetchProject: "Error al cargar detalles del proyecto.",
      errorUpdateProject: "Error al actualizar proyecto.",
      errorCreateProject: "Error al crear proyecto.",
      errorDeleteProject: "Error al eliminar proyecto.",
      successCreateProject: "Proyecto creado con éxito.",
      successUpdateProject: "Proyecto actualizado con éxito.",
      successDeleteProject: "Proyecto eliminado con éxito."
    }
  }
};

i18n
  .use(Backend) // If you are using HTTP backend for translations from /public/locales
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources, // Use the 'resources' object directly if not using HTTP backend for these
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    ns: ['common', 'adminProjects'],
    defaultNS: 'common',
    
    interpolation: {
      escapeValue: false, 
    },
    // backend: { // Configuration for i18next-http-backend if you load from /public/locales
    //   loadPath: '/locales/{{lng}}/{{ns}}.json',
    // },
  });

export default i18n;