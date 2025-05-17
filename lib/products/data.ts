export type Product = {
  id: string
  name: string
  category: string
  subcategory: string
  description: string
  features: string[]
  dimensions: {
    width: number
    height: number
    depth: number
    unit: string
  }
  weight: number
  materials: string[]
  madeIn: string
  colors: {
    name: string
    hex: string
    available: boolean
  }[]
  images: {
    main: string
    angles: string[]
    thumbnails: string[]
  }
  related: string[] // IDs of related products
}

export type RelatedProduct = {
  id: string
  name: string
  category: string
  subcategory: string
  image: string
}

// Mock product data
const products: Product[] = [
  {
    id: "asiento-asiento",
    name: "Asiento Asiento",
    category: "Interior",
    subcategory: "Cadeiras",
    description: "O Asiento combina design inovador com qualidade superior, trazendo estilo e funcionalidade para ambientes comerciais.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 5,
    materials: [
      "Madeira"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true },
      { name: "Carvalho", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/interior/chairs/asiento/asiento-seat-detail-tapizado.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/interior/chairs/asiento/asiento-seat-detail-tapizado.jpg",
        "/images/products/interior/chairs/asiento/asiento-seat-detail-textilene.jpg"
      ]
    },
    related: ["insbruck-asiento", "dublin-asiento", "zagreb-asiento"]
  },
  {
    id: "atico-chair",
    name: "Atico Chair",
    category: "Interior",
    subcategory: "Cadeiras",
    description: "A cadeira Atico combina elegância e conforto em seu design exclusivo. Ideal para restaurantes e hotéis, oferece durabilidade excepcional com um visual sofisticado.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade",
      "Conforto ergonômico",
      "Empilhável para fácil armazenamento"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 4.5,
    materials: [
      "Madeira",
      "Estofamento de qualidade"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Carvalho Natural", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/interior/chairs/atico/atico-silla-roble-natural-rope-crema.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/interior/chairs/atico/atico-silla-roble-natural-rope-crema.jpg",
        "/images/products/interior/chairs/atico/atico-silla-roble-natural-rope-gris.jpg",
        "/images/products/interior/chairs/atico/atico-silla-roble-natural.jpg"
      ]
    },
    related: ["verdi-chair", "copenhagen-chair", "dallas-chair"]
  },
  {
    id: "cafe-seat",
    name: "Cafe Seat",
    category: "Interior",
    subcategory: "Cadeiras",
    description: "O Cafe combina design inovador com qualidade superior, trazendo estilo e funcionalidade para ambientes comerciais.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 5,
    materials: [
      "Madeira"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true },
      { name: "Carvalho", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/interior/chairs/cafe/cafe-seat-detail-banqueta.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/interior/chairs/cafe/cafe-seat-detail-banqueta.jpg",
        "/images/products/interior/chairs/cafe/cafe-seat-detail-negra.jpg"
      ]
    },
    related: ["asiento-seat", "copenhagen-seat", "irlanda-seat"]
  },
  {
    id: "chicago-chair",
    name: "Chicago Chair",
    category: "Interior",
    subcategory: "Cadeiras",
    description: "A cadeira Chicago combina elegância e conforto em seu design exclusivo. Ideal para restaurantes e hotéis, oferece durabilidade excepcional com um visual sofisticado.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade",
      "Conforto ergonômico",
      "Empilhável para fácil armazenamento"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 4.5,
    materials: [
      "Madeira",
      "Estofamento de qualidade"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Nogueira", hex: "#654321", available: true },
      { name: "Carvalho Natural", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/interior/chairs/chicago/chicago-silla-nogal.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/interior/chairs/chicago/chicago-silla-nogal.jpg",
        "/images/products/interior/chairs/chicago/chicago-silla-roble-natural.jpg",
        "/images/products/interior/chairs/chicago/chicago-silla-roble-naturall.jpg"
      ]
    },
    related: ["asiento-chair", "dallas-chair", "new-chair"]
  },
  {
    id: "copenhagen-plus",
    name: "Copenhagen Plus",
    category: "Interior",
    subcategory: "Cadeiras",
    description: "O Copenhagen combina design inovador com qualidade superior, trazendo estilo e funcionalidade para ambientes comerciais.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 5,
    materials: [
      "Madeira"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true }
    ],
    images: {
      main: "/images/products/interior/chairs/copenhagen/copenhagen-plus-alta-mesa-tablero-melamina-piedra-cuadrado.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/interior/chairs/copenhagen/copenhagen-plus-alta-mesa-tablero-melamina-piedra-cuadrado.jpg",
        "/images/products/interior/chairs/copenhagen/copenhagen-plus-mesa-negro-tablero-compact-marmol-olimpo-cuadrado.jpg",
        "/images/products/interior/chairs/copenhagen/copenhagen-plus-mesa-negro-tablero-melamina-atlas-canto-pvc-dorado-cuadrado.jpg",
        "/images/products/interior/chairs/copenhagen/copenhagen-plus-mesa-negro-tablero-melamina-marmol-bianco-cuadrado.jpg"
      ]
    },
    related: ["atico-plus", "dallas-plus", "verdi-plus"]
  },
  {
    id: "cracovia-chair",
    name: "Cracovia Chair",
    category: "Interior",
    subcategory: "Cadeiras",
    description: "A cadeira Cracovia combina elegância e conforto em seu design exclusivo. Ideal para restaurantes e hotéis, oferece durabilidade excepcional com um visual sofisticado.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade",
      "Conforto ergonômico",
      "Empilhável para fácil armazenamento"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 4.5,
    materials: [
      "Madeira",
      "Estofamento de qualidade"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Nogueira", hex: "#654321", available: true }
    ],
    images: {
      main: "/images/products/interior/chairs/cracovia/cracovia-silla-nogal-claro-respaldo-rejilla.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/interior/chairs/cracovia/cracovia-silla-nogal-claro-respaldo-rejilla.jpg",
        "/images/products/interior/chairs/cracovia/cracovia-silla-nogal-claro-respaldo-soho-negro.jpg",
        "/images/products/interior/chairs/cracovia/cracovia-silla-nogal-claro-respaldo-soho.jpg"
      ]
    },
    related: ["new-chair", "nordica-chair", "cafe-chair"]
  },
  {
    id: "cracovia-sofa",
    name: "Cracovia Sofa",
    category: "Interior",
    subcategory: "Cadeiras",
    description: "O Cracovia combina design inovador com qualidade superior, trazendo estilo e funcionalidade para ambientes comerciais.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade"
    ],
    dimensions: {
      width: 60,
      height: 82,
      depth: 65,
      unit: "cm"
    },
    weight: 7.5,
    materials: [
      "Madeira",
      "Corda trançada à mão",
      "Estrutura reforçada"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Nogueira", hex: "#654321", available: true }
    ],
    images: {
      main: "/images/products/interior/chairs/cracovia/cracovia-sillon-nogal-claro-respaldo-rejilla.jpg",
      angles: [
        "/images/products/interior/chairs/cracovia/cracovia-sillon-nogal-claro-respaldo-rejilla-back.jpg"
      ],
      thumbnails: [
        "/images/products/interior/chairs/cracovia/cracovia-sillon-nogal-claro-respaldo-rejilla.jpg",
        "/images/products/interior/chairs/cracovia/cracovia-sillon-nogal-claro-respaldo-rejilla-back.jpg"
      ]
    },
    related: ["asiento-sofa", "kolonia-sofa", "atico-sofa"]
  },
  {
    id: "dallas-seat",
    name: "Dallas Seat",
    category: "Interior",
    subcategory: "Cadeiras",
    description: "O Dallas combina design inovador com qualidade superior, trazendo estilo e funcionalidade para ambientes comerciais.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 5,
    materials: [
      "Madeira"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true }
    ],
    images: {
      main: "/images/products/interior/chairs/dallas/dallas-seat-detail-negro.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/interior/chairs/dallas/dallas-seat-detail-negro.jpg"
      ]
    },
    related: ["asiento-seat", "insbruck-seat", "portico-seat"]
  },
  {
    id: "dallas-chair",
    name: "Dallas Chair",
    category: "Interior",
    subcategory: "Cadeiras",
    description: "A cadeira Dallas combina elegância e conforto em seu design exclusivo. Ideal para restaurantes e hotéis, oferece durabilidade excepcional com um visual sofisticado.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade",
      "Conforto ergonômico",
      "Empilhável para fácil armazenamento"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 4.5,
    materials: [
      "Madeira",
      "Estofamento de qualidade"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true }
    ],
    images: {
      main: "/images/products/interior/chairs/dallas/dallas-silla-negro.jpg",
      angles: [
        "/images/products/interior/chairs/dallas/dallas-silla-negro-back.jpg"
      ],
      thumbnails: [
        "/images/products/interior/chairs/dallas/dallas-silla-negro.jpg",
        "/images/products/interior/chairs/dallas/dallas-silla-negro-back.jpg"
      ]
    },
    related: ["cafe-chair", "cracovia-chair", "zagreb-chair"]
  },
  {
    id: "dublin-alta",
    name: "Dublin Alta",
    category: "Interior",
    subcategory: "Cadeiras",
    description: "O Dublin combina design inovador com qualidade superior, trazendo estilo e funcionalidade para ambientes comerciais.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 5,
    materials: [
      "Madeira"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true }
    ],
    images: {
      main: "/images/products/interior/chairs/dublin/dublin-alta-mesa-negro-tablero-compact-marmol-samas-redondo.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/interior/chairs/dublin/dublin-alta-mesa-negro-tablero-compact-marmol-samas-redondo.jpg",
        "/images/products/interior/chairs/dublin/dublin-alta-mesa-negro-tablero-melamina-marmol-bianco-canto-pvc-dorado-cuadrado.jpg"
      ]
    },
    related: ["asiento-alta", "chicago-alta", "verdi-alta"]
  },
  {
    id: "dublin-table",
    name: "Dublin Table",
    category: "Interior",
    subcategory: "Cadeiras",
    description: "A mesa Dublin é o centro perfeito para refeições e encontros. Seu design versátil e construção robusta a tornam ideal para qualquer ambiente comercial.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade"
    ],
    dimensions: {
      width: 80,
      height: 75,
      depth: 80,
      unit: "cm"
    },
    weight: 15,
    materials: [
      "Madeira maciça",
      "Metal",
      "Tampo em melamina/compact"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true }
    ],
    images: {
      main: "/images/products/interior/chairs/dublin/dublin-mesa-negro-tablero-compact-marmol-samas-cuadrado.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/interior/chairs/dublin/dublin-mesa-negro-tablero-compact-marmol-samas-cuadrado.jpg",
        "/images/products/interior/chairs/dublin/dublin-mesa-negro-tablero-melamina-atlas-canto-pvc-dorado-cuadrado.jpg",
        "/images/products/interior/chairs/dublin/dublin-mesa-negro-tablero-melamina-atlas-canto-pvc-dorado-redondo.jpg",
        "/images/products/interior/chairs/dublin/dublin-mesa-negro-tablero-melamina-marmol-bianco-canto-pvc-dorado-cuadrado.jpg"
      ]
    },
    related: ["chicago-table", "insbruck-table", "nordica-table"]
  },
  {
    id: "insbruck-chair",
    name: "Insbruck Chair",
    category: "Interior",
    subcategory: "Cadeiras",
    description: "A cadeira Insbruck combina elegância e conforto em seu design exclusivo. Ideal para restaurantes e hotéis, oferece durabilidade excepcional com um visual sofisticado.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade",
      "Conforto ergonômico",
      "Empilhável para fácil armazenamento"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 4.5,
    materials: [
      "Madeira",
      "Estofamento de qualidade"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Nogueira", hex: "#654321", available: true },
      { name: "Carvalho Natural", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/interior/chairs/insbruck/insbruck-silla-nogal-claro.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/interior/chairs/insbruck/insbruck-silla-nogal-claro.jpg",
        "/images/products/interior/chairs/insbruck/insbruck-silla-roble-natural.jpg"
      ]
    },
    related: ["new-chair", "cracovia-chair", "portico-chair"]
  },
  {
    id: "irlanda-alta",
    name: "Irlanda Alta",
    category: "Interior",
    subcategory: "Cadeiras",
    description: "O Irlanda combina design inovador com qualidade superior, trazendo estilo e funcionalidade para ambientes comerciais.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 5,
    materials: [
      "Madeira"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true }
    ],
    images: {
      main: "/images/products/interior/chairs/irlanda/irlanda-alta-mesa-negro-tablero-melamina-zeus-canto-pvc-dorado-cuadrado.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/interior/chairs/irlanda/irlanda-alta-mesa-negro-tablero-melamina-zeus-canto-pvc-dorado-cuadrado.jpg",
        "/images/products/interior/chairs/irlanda/irlanda-alta-mesa-negro-tablero-melamina-zeus-canto-pvc-dorado-redondo.jpg"
      ]
    },
    related: ["dublin-alta", "zagreb-alta", "chicago-alta"]
  },
  {
    id: "irlanda-table",
    name: "Irlanda Table",
    category: "Interior",
    subcategory: "Cadeiras",
    description: "A mesa Irlanda é o centro perfeito para refeições e encontros. Seu design versátil e construção robusta a tornam ideal para qualquer ambiente comercial.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade"
    ],
    dimensions: {
      width: 80,
      height: 75,
      depth: 80,
      unit: "cm"
    },
    weight: 15,
    materials: [
      "Madeira maciça",
      "Metal",
      "Tampo em melamina/compact"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true }
    ],
    images: {
      main: "/images/products/interior/chairs/irlanda/irlanda-mesa-negro-tablero-compact-marmol-samas-cuadrado.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/interior/chairs/irlanda/irlanda-mesa-negro-tablero-compact-marmol-samas-cuadrado.jpg",
        "/images/products/interior/chairs/irlanda/irlanda-mesa-negro-tablero-compact-marmol-samas-redondo.jpg",
        "/images/products/interior/chairs/irlanda/irlanda-mesa-negro-tablero-melamina-marmol-bianco-canto-pvc-dorado-cuadrado.jpg",
        "/images/products/interior/chairs/irlanda/irlanda-mesa-negro-tablero-melamina-marmol-bianco-canto-pvc-dorado-redondo.jpg"
      ]
    },
    related: ["chicago-table", "asiento-table", "insbruck-table"]
  },
  {
    id: "kolonia-alta",
    name: "Kolonia Alta",
    category: "Interior",
    subcategory: "Cadeiras",
    description: "O Kolonia combina design inovador com qualidade superior, trazendo estilo e funcionalidade para ambientes comerciais.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 5,
    materials: [
      "Madeira"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true }
    ],
    images: {
      main: "/images/products/interior/chairs/kolonia/kolonia-alta-mesa-una-base-redonda-dos-columnas-negro-tablero-roble-atlas-canto-pvc-dorado-rectangular.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/interior/chairs/kolonia/kolonia-alta-mesa-una-base-redonda-dos-columnas-negro-tablero-roble-atlas-canto-pvc-dorado-rectangular.jpg",
        "/images/products/interior/chairs/kolonia/kolonia-alta-mesa-una-base-redonda-dos-columnas-negro-tablero-roble-atlas-rectangular.jpg"
      ]
    },
    related: ["dallas-alta", "cracovia-alta", "copenhagen-alta"]
  },
  {
    id: "kolonia-table",
    name: "Kolonia Table",
    category: "Interior",
    subcategory: "Cadeiras",
    description: "A mesa Kolonia é o centro perfeito para refeições e encontros. Seu design versátil e construção robusta a tornam ideal para qualquer ambiente comercial.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade"
    ],
    dimensions: {
      width: 80,
      height: 75,
      depth: 80,
      unit: "cm"
    },
    weight: 15,
    materials: [
      "Madeira maciça",
      "Metal",
      "Tampo em melamina/compact"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true }
    ],
    images: {
      main: "/images/products/interior/chairs/kolonia/kolonia-mesa-una-base-redonda-dos-columnas-negro-tablero-compact-marmol-tafu-grande-redondo.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/interior/chairs/kolonia/kolonia-mesa-una-base-redonda-dos-columnas-negro-tablero-compact-marmol-tafu-grande-redondo.jpg",
        "/images/products/interior/chairs/kolonia/kolonia-mesa-una-base-redonda-dos-columnas-negro-tablero-melamina-karamel-redondo.jpg",
        "/images/products/interior/chairs/kolonia/kolonia-mesa-una-base-redonda-dos-columnas-negro-tablero-roble-atlas-rectangular.jpg",
        "/images/products/interior/chairs/kolonia/kolonia-mesa-una-base-redonda-dos-columnas-negro-tablero-roble-atlas-redondo.jpg"
      ]
    },
    related: ["new-table", "asiento-table", "verdi-table"]
  },
  {
    id: "new-verdi",
    name: "New Verdi",
    category: "Interior",
    subcategory: "Cadeiras",
    description: "O New combina design inovador com qualidade superior, trazendo estilo e funcionalidade para ambientes comerciais.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 5,
    materials: [
      "Madeira"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true },
      { name: "Nogueira", hex: "#654321", available: true },
      { name: "Carvalho Natural", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/interior/chairs/new/new-verdi-banqueta-negro.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/interior/chairs/new/new-verdi-banqueta-negro.jpg",
        "/images/products/interior/chairs/new/new-verdi-banqueta-nogal-claro.jpg",
        "/images/products/interior/chairs/new/new-verdi-banqueta-roble-natural.jpg",
        "/images/products/interior/chairs/new/new-verdi-silla-negro.jpg"
      ]
    },
    related: ["cafe-verdi", "zagreb-verdi", "insbruck-verdi"]
  },
  {
    id: "nordica-seat",
    name: "Nordica Seat",
    category: "Interior",
    subcategory: "Cadeiras",
    description: "O Nordica combina design inovador com qualidade superior, trazendo estilo e funcionalidade para ambientes comerciais.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 5,
    materials: [
      "Madeira"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true },
      { name: "Carvalho", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/interior/chairs/nordica/nordica-seat-detail-madera.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/interior/chairs/nordica/nordica-seat-detail-madera.jpg"
      ]
    },
    related: ["dublin-seat", "dallas-seat", "insbruck-seat"]
  },
  {
    id: "portico-chair",
    name: "Portico Chair",
    category: "Interior",
    subcategory: "Cadeiras",
    description: "A cadeira Portico combina elegância e conforto em seu design exclusivo. Ideal para restaurantes e hotéis, oferece durabilidade excepcional com um visual sofisticado.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade",
      "Conforto ergonômico",
      "Empilhável para fácil armazenamento"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 4.5,
    materials: [
      "Madeira",
      "Estofamento de qualidade"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Carvalho Natural", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/interior/chairs/portico/portico-silla-roble-natural.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/interior/chairs/portico/portico-silla-roble-natural.jpg"
      ]
    },
    related: ["chicago-chair", "dublin-chair", "cafe-chair"]
  },
  {
    id: "verdi-chair",
    name: "Verdi Chair",
    category: "Interior",
    subcategory: "Cadeiras",
    description: "A cadeira Verdi combina elegância e conforto em seu design exclusivo. Ideal para restaurantes e hotéis, oferece durabilidade excepcional com um visual sofisticado.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade",
      "Conforto ergonômico",
      "Empilhável para fácil armazenamento"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 4.5,
    materials: [
      "Madeira",
      "Estofamento de qualidade"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Carvalho Natural", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/interior/chairs/verdi/verdi-silla-roble-natural-respaldo-soho-tapiazado-arena.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/interior/chairs/verdi/verdi-silla-roble-natural-respaldo-soho-tapiazado-arena.jpg",
        "/images/products/interior/chairs/verdi/verdi-silla-roble-natural-respaldo-soho-tapiazado-gris.jpg",
        "/images/products/interior/chairs/verdi/verdi-silla-roble-natural-respaldo-soho-tapiazado-zafiro.jpg"
      ]
    },
    related: ["chicago-chair", "new-chair", "dallas-chair"]
  },
  {
    id: "verdi-chair-2",
    name: "Verdi Chair",
    category: "Interior",
    subcategory: "Cadeiras",
    description: "A cadeira Verdi combina elegância e conforto em seu design exclusivo. Ideal para restaurantes e hotéis, oferece durabilidade excepcional com um visual sofisticado.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade",
      "Conforto ergonômico",
      "Empilhável para fácil armazenamento"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 4.5,
    materials: [
      "Madeira",
      "Estofamento de qualidade"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true },
      { name: "Carvalho", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/interior/chairs/verdi/verdi-silla_resp-soho_tapizado.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/interior/chairs/verdi/verdi-silla_resp-soho_tapizado.jpg"
      ]
    },
    related: ["asiento-chair", "nordica-chair", "dallas-chair"]
  },
  {
    id: "zagreb-chair",
    name: "Zagreb Chair",
    category: "Interior",
    subcategory: "Cadeiras",
    description: "A cadeira Zagreb combina elegância e conforto em seu design exclusivo. Ideal para restaurantes e hotéis, oferece durabilidade excepcional com um visual sofisticado.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade",
      "Conforto ergonômico",
      "Empilhável para fácil armazenamento"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 4.5,
    materials: [
      "Madeira",
      "Estofamento de qualidade"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true },
      { name: "Carvalho", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/interior/chairs/zagreb/zagreb-silla-madera.jpg",
      angles: [
        "/images/products/interior/chairs/zagreb/zagreb-silla-madera-back.jpg"
      ],
      thumbnails: [
        "/images/products/interior/chairs/zagreb/zagreb-silla-madera.jpg",
        "/images/products/interior/chairs/zagreb/zagreb-silla-madera-back.jpg"
      ]
    },
    related: ["copenhagen-chair", "portico-chair", "cafe-chair"]
  },
  {
    id: "america-stool",
    name: "America Stool",
    category: "Interior",
    subcategory: "Bancos",
    description: "O banco America traz estilo e funcionalidade para balcões e mesas altas. Com materiais de alta qualidade, é perfeito para espaços de hospitalidade que valorizam design e conforto.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade",
      "Descanso para pés reforçado",
      "Disponível em altura de balcão e bar"
    ],
    dimensions: {
      width: 45,
      height: 105,
      depth: 47,
      unit: "cm"
    },
    weight: 6,
    materials: [
      "Madeira",
      "Metal reforçado",
      "Estofamento premium"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true },
      { name: "Carvalho", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/interior/stools/america/america-banqueta-latonada.jpg",
      angles: [
        "/images/products/interior/stools/america/america-banqueta-latonada-back.jpg"
      ],
      thumbnails: [
        "/images/products/interior/stools/america/america-banqueta-latonada.jpg",
        "/images/products/interior/stools/america/america-banqueta-latonada-back.jpg"
      ]
    },
    related: ["nantes-stool", "charlotte-stool", "brooklyn-stool"]
  },
  {
    id: "america-chair",
    name: "America Chair",
    category: "Interior",
    subcategory: "Bancos",
    description: "A cadeira America combina elegância e conforto em seu design exclusivo. Ideal para restaurantes e hotéis, oferece durabilidade excepcional com um visual sofisticado.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade",
      "Conforto ergonômico",
      "Empilhável para fácil armazenamento"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 4.5,
    materials: [
      "Madeira",
      "Estofamento de qualidade"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true },
      { name: "Carvalho", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/interior/stools/america/america-silla-latonada.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/interior/stools/america/america-silla-latonada.jpg"
      ]
    },
    related: ["arona-chair", "slovenia-chair", "sinfonia-chair"]
  },
  {
    id: "arona-stool",
    name: "Arona Stool",
    category: "Interior",
    subcategory: "Bancos",
    description: "O banco Arona traz estilo e funcionalidade para balcões e mesas altas. Com materiais de alta qualidade, é perfeito para espaços de hospitalidade que valorizam design e conforto.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade",
      "Descanso para pés reforçado",
      "Disponível em altura de balcão e bar"
    ],
    dimensions: {
      width: 45,
      height: 105,
      depth: 47,
      unit: "cm"
    },
    weight: 6,
    materials: [
      "Madeira",
      "Metal reforçado",
      "Estofamento premium"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true }
    ],
    images: {
      main: "/images/products/interior/stools/arona/arona-banqueta-negro.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/interior/stools/arona/arona-banqueta-negro.jpg"
      ]
    },
    related: ["lirica-stool", "charlotte-stool", "nantes-stool"]
  },
  {
    id: "arona-chair",
    name: "Arona Chair",
    category: "Interior",
    subcategory: "Bancos",
    description: "A cadeira Arona combina elegância e conforto em seu design exclusivo. Ideal para restaurantes e hotéis, oferece durabilidade excepcional com um visual sofisticado.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade",
      "Conforto ergonômico",
      "Empilhável para fácil armazenamento"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 4.5,
    materials: [
      "Madeira",
      "Estofamento de qualidade"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true }
    ],
    images: {
      main: "/images/products/interior/stools/arona/arona-silla-negro.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/interior/stools/arona/arona-silla-negro.jpg"
      ]
    },
    related: ["america-chair", "brooklyn-chair", "charlotte-chair"]
  },
  {
    id: "brooklyn-stool",
    name: "Brooklyn Stool",
    category: "Interior",
    subcategory: "Bancos",
    description: "O banco Brooklyn traz estilo e funcionalidade para balcões e mesas altas. Com materiais de alta qualidade, é perfeito para espaços de hospitalidade que valorizam design e conforto.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade",
      "Descanso para pés reforçado",
      "Disponível em altura de balcão e bar"
    ],
    dimensions: {
      width: 45,
      height: 105,
      depth: 47,
      unit: "cm"
    },
    weight: 6,
    materials: [
      "Madeira",
      "Metal reforçado",
      "Estofamento premium"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true }
    ],
    images: {
      main: "/images/products/interior/stools/brooklyn/brooklyn-banqueta-negro.jpg",
      angles: [
        "/images/products/interior/stools/brooklyn/brooklyn-banqueta-negro-back.jpg"
      ],
      thumbnails: [
        "/images/products/interior/stools/brooklyn/brooklyn-banqueta-negro.jpg",
        "/images/products/interior/stools/brooklyn/brooklyn-banqueta-negro-back.jpg"
      ]
    },
    related: ["america-stool", "sinfonia-stool", "arona-stool"]
  },
  {
    id: "brooklyn-seat",
    name: "Brooklyn Seat",
    category: "Interior",
    subcategory: "Bancos",
    description: "O Brooklyn combina design inovador com qualidade superior, trazendo estilo e funcionalidade para ambientes comerciais.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 5,
    materials: [
      "Madeira"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true }
    ],
    images: {
      main: "/images/products/interior/stools/brooklyn/brooklyn-seat-detail-negro.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/interior/stools/brooklyn/brooklyn-seat-detail-negro.jpg"
      ]
    },
    related: ["lirica-seat", "charlotte-seat", "sinfonia-seat"]
  },
  {
    id: "brooklyn-chair",
    name: "Brooklyn Chair",
    category: "Interior",
    subcategory: "Bancos",
    description: "A cadeira Brooklyn combina elegância e conforto em seu design exclusivo. Ideal para restaurantes e hotéis, oferece durabilidade excepcional com um visual sofisticado.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade",
      "Conforto ergonômico",
      "Empilhável para fácil armazenamento"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 4.5,
    materials: [
      "Madeira",
      "Estofamento de qualidade"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true }
    ],
    images: {
      main: "/images/products/interior/stools/brooklyn/brooklyn-silla-negro.jpg",
      angles: [
        "/images/products/interior/stools/brooklyn/brooklyn-silla-negro-back.jpg"
      ],
      thumbnails: [
        "/images/products/interior/stools/brooklyn/brooklyn-silla-negro.jpg",
        "/images/products/interior/stools/brooklyn/brooklyn-silla-negro-back.jpg"
      ]
    },
    related: ["america-chair", "arona-chair", "sinfonia-chair"]
  },
  {
    id: "charlotte-stool",
    name: "Charlotte Stool",
    category: "Interior",
    subcategory: "Bancos",
    description: "O banco Charlotte traz estilo e funcionalidade para balcões e mesas altas. Com materiais de alta qualidade, é perfeito para espaços de hospitalidade que valorizam design e conforto.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade",
      "Descanso para pés reforçado",
      "Disponível em altura de balcão e bar"
    ],
    dimensions: {
      width: 45,
      height: 105,
      depth: 47,
      unit: "cm"
    },
    weight: 6,
    materials: [
      "Madeira",
      "Metal reforçado",
      "Estofamento premium"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Nogueira", hex: "#654321", available: true },
      { name: "Carvalho Natural", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/interior/stools/charlotte/charlotte-banqueta-deco-bambu.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/interior/stools/charlotte/charlotte-banqueta-deco-bambu.jpg",
        "/images/products/interior/stools/charlotte/charlotte-banqueta-s-r-nogal-claro-macizo.jpg",
        "/images/products/interior/stools/charlotte/charlotte-banqueta-s-r-nogal-claro.jpg",
        "/images/products/interior/stools/charlotte/charlotte-banqueta-s-r-roble-natural-compact-rural.jpg"
      ]
    },
    related: ["america-stool", "arona-stool", "nantes-stool"]
  },
  {
    id: "lirica-stool",
    name: "Lirica Stool",
    category: "Interior",
    subcategory: "Bancos",
    description: "O banco Lirica traz estilo e funcionalidade para balcões e mesas altas. Com materiais de alta qualidade, é perfeito para espaços de hospitalidade que valorizam design e conforto.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade",
      "Descanso para pés reforçado",
      "Disponível em altura de balcão e bar"
    ],
    dimensions: {
      width: 45,
      height: 105,
      depth: 47,
      unit: "cm"
    },
    weight: 6,
    materials: [
      "Madeira",
      "Metal reforçado",
      "Estofamento premium"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true }
    ],
    images: {
      main: "/images/products/interior/stools/lirica/lirica-banqueta-negro.jpg",
      angles: [
        "/images/products/interior/stools/lirica/lirica-banqueta-negro-back.jpg"
      ],
      thumbnails: [
        "/images/products/interior/stools/lirica/lirica-banqueta-negro.jpg",
        "/images/products/interior/stools/lirica/lirica-banqueta-negro-back.jpg"
      ]
    },
    related: ["brooklyn-stool", "charlotte-stool", "slovenia-stool"]
  },
  {
    id: "lirica-chair",
    name: "Lirica Chair",
    category: "Interior",
    subcategory: "Bancos",
    description: "A cadeira Lirica combina elegância e conforto em seu design exclusivo. Ideal para restaurantes e hotéis, oferece durabilidade excepcional com um visual sofisticado.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade",
      "Conforto ergonômico",
      "Empilhável para fácil armazenamento"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 4.5,
    materials: [
      "Madeira",
      "Estofamento de qualidade"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true }
    ],
    images: {
      main: "/images/products/interior/stools/lirica/lirica-silla-negro.jpg",
      angles: [
        "/images/products/interior/stools/lirica/lirica-silla-negro-back.jpg"
      ],
      thumbnails: [
        "/images/products/interior/stools/lirica/lirica-silla-negro.jpg",
        "/images/products/interior/stools/lirica/lirica-silla-negro-back.jpg"
      ]
    },
    related: ["sinfonia-chair", "charlotte-chair", "slovenia-chair"]
  },
  {
    id: "nantes-stool",
    name: "Nantes Stool",
    category: "Interior",
    subcategory: "Bancos",
    description: "O banco Nantes traz estilo e funcionalidade para balcões e mesas altas. Com materiais de alta qualidade, é perfeito para espaços de hospitalidade que valorizam design e conforto.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade",
      "Descanso para pés reforçado",
      "Disponível em altura de balcão e bar"
    ],
    dimensions: {
      width: 45,
      height: 105,
      depth: 47,
      unit: "cm"
    },
    weight: 6,
    materials: [
      "Madeira",
      "Metal reforçado",
      "Estofamento premium"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true }
    ],
    images: {
      main: "/images/products/interior/stools/nantes/nantes-banqueta-negro.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/interior/stools/nantes/nantes-banqueta-negro.jpg"
      ]
    },
    related: ["arona-stool", "america-stool", "charlotte-stool"]
  },
  {
    id: "sinfonia-stool",
    name: "Sinfonia Stool",
    category: "Interior",
    subcategory: "Bancos",
    description: "O banco Sinfonia traz estilo e funcionalidade para balcões e mesas altas. Com materiais de alta qualidade, é perfeito para espaços de hospitalidade que valorizam design e conforto.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade",
      "Descanso para pés reforçado",
      "Disponível em altura de balcão e bar"
    ],
    dimensions: {
      width: 45,
      height: 105,
      depth: 47,
      unit: "cm"
    },
    weight: 6,
    materials: [
      "Madeira",
      "Metal reforçado",
      "Estofamento premium"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true },
      { name: "Carvalho", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/interior/stools/sinfonia/sinfonia-banqueta-madera.jpg",
      angles: [
        "/images/products/interior/stools/sinfonia/sinfonia-banqueta-madera-back.jpg"
      ],
      thumbnails: [
        "/images/products/interior/stools/sinfonia/sinfonia-banqueta-madera.jpg",
        "/images/products/interior/stools/sinfonia/sinfonia-banqueta-madera-back.jpg"
      ]
    },
    related: ["nantes-stool", "charlotte-stool", "slovenia-stool"]
  },
  {
    id: "sinfonia-chair",
    name: "Sinfonia Chair",
    category: "Interior",
    subcategory: "Bancos",
    description: "A cadeira Sinfonia combina elegância e conforto em seu design exclusivo. Ideal para restaurantes e hotéis, oferece durabilidade excepcional com um visual sofisticado.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade",
      "Conforto ergonômico",
      "Empilhável para fácil armazenamento"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 4.5,
    materials: [
      "Madeira",
      "Estofamento de qualidade"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true },
      { name: "Carvalho", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/interior/stools/sinfonia/sinfonia-silla-madera.jpg",
      angles: [
        "/images/products/interior/stools/sinfonia/sinfonia-silla-madera-back.jpg"
      ],
      thumbnails: [
        "/images/products/interior/stools/sinfonia/sinfonia-silla-madera.jpg",
        "/images/products/interior/stools/sinfonia/sinfonia-silla-madera-back.jpg"
      ]
    },
    related: ["america-chair", "arona-chair", "lirica-chair"]
  },
  {
    id: "slovenia-stool",
    name: "Slovenia Stool",
    category: "Interior",
    subcategory: "Bancos",
    description: "O banco Slovenia traz estilo e funcionalidade para balcões e mesas altas. Com materiais de alta qualidade, é perfeito para espaços de hospitalidade que valorizam design e conforto.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade",
      "Descanso para pés reforçado",
      "Disponível em altura de balcão e bar"
    ],
    dimensions: {
      width: 45,
      height: 105,
      depth: 47,
      unit: "cm"
    },
    weight: 6,
    materials: [
      "Madeira",
      "Metal reforçado",
      "Estofamento premium"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true },
      { name: "Carvalho", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/interior/stools/slovenia/slovenia-banqueta-madera.jpg",
      angles: [
        "/images/products/interior/stools/slovenia/slovenia-banqueta-madera-back.jpg"
      ],
      thumbnails: [
        "/images/products/interior/stools/slovenia/slovenia-banqueta-madera.jpg",
        "/images/products/interior/stools/slovenia/slovenia-banqueta-madera-back.jpg"
      ]
    },
    related: ["america-stool", "nantes-stool", "charlotte-stool"]
  },
  {
    id: "slovenia-chair",
    name: "Slovenia Chair",
    category: "Interior",
    subcategory: "Bancos",
    description: "A cadeira Slovenia combina elegância e conforto em seu design exclusivo. Ideal para restaurantes e hotéis, oferece durabilidade excepcional com um visual sofisticado.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Estofamento premium",
      "Acabamento de alta qualidade",
      "Conforto ergonômico",
      "Empilhável para fácil armazenamento"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 4.5,
    materials: [
      "Madeira",
      "Estofamento de qualidade"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true },
      { name: "Carvalho", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/interior/stools/slovenia/slovenia-silla-madera.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/interior/stools/slovenia/slovenia-silla-madera.jpg"
      ]
    },
    related: ["sinfonia-chair", "arona-chair", "brooklyn-chair"]
  },
  {
    id: "alba-chair",
    name: "Alba Chair",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "A cadeira Alba para exterior combina resistência à intempéries com design elegante. Perfeita para áreas externas de restaurantes e hotéis que buscam estilo e durabilidade.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade",
      "Secagem rápida após chuva",
      "Peso ideal para resistir a ventos"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 4.5,
    materials: [
      "Madeira",
      "Estofamento de qualidade"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Nogueira", hex: "#654321", available: true },
      { name: "Carvalho Natural", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/alba/alba-silla-nogal-claro-cuerda-marron.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/exterior/chairs/alba/alba-silla-nogal-claro-cuerda-marron.jpg",
        "/images/products/exterior/chairs/alba/alba-silla-roble-natural-cuerda-crema.jpg"
      ]
    },
    related: ["bordeaux-chair", "helsinki-chair", "insbruck-chair"]
  },
  {
    id: "bordeaux-chair",
    name: "Bordeaux Chair",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "A cadeira Bordeaux para exterior combina resistência à intempéries com design elegante. Perfeita para áreas externas de restaurantes e hotéis que buscam estilo e durabilidade.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade",
      "Secagem rápida após chuva",
      "Peso ideal para resistir a ventos"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 4.5,
    materials: [
      "Madeira",
      "Estofamento de qualidade"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Carvalho Natural", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/bordeaux/bordeaux-silla-roble-natural-medula-negro-y-blanco.jpg",
      angles: [
        "/images/products/exterior/chairs/bordeaux/bordeaux-silla-roble-natural-medula-verde-y-blanco_trasera-back.jpg"
      ],
      thumbnails: [
        "/images/products/exterior/chairs/bordeaux/bordeaux-silla-roble-natural-medula-negro-y-blanco.jpg",
        "/images/products/exterior/chairs/bordeaux/bordeaux-silla-roble-natural-medula-verde-y-blanco_trasera-back.jpg",
        "/images/products/exterior/chairs/bordeaux/bordeaux-silla-roble-natural-medula-verde-y-blanco.jpg"
      ]
    },
    related: ["mauricio-chair", "cazorla-chair", "alba-chair"]
  },
  {
    id: "cazorla-chair",
    name: "Cazorla Chair",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "A cadeira Cazorla para exterior combina resistência à intempéries com design elegante. Perfeita para áreas externas de restaurantes e hotéis que buscam estilo e durabilidade.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade",
      "Secagem rápida após chuva",
      "Peso ideal para resistir a ventos"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 4.5,
    materials: [
      "Madeira",
      "Estofamento de qualidade"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Nogueira", hex: "#654321", available: true },
      { name: "Carvalho Natural", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/cazorla/cazorla-silla-nogal-claro-cuerda-marron.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/exterior/chairs/cazorla/cazorla-silla-nogal-claro-cuerda-marron.jpg",
        "/images/products/exterior/chairs/cazorla/cazorla-silla-roble-natural-cuerda-crema.jpg"
      ]
    },
    related: ["portico-chair", "new-chair", "bordeaux-chair"]
  },
  {
    id: "cazorla-sofa",
    name: "Cazorla Sofa",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "O sofá Cazorla oferece conforto excepcional em ambientes externos. Com materiais resistentes às condições climáticas, mantém sua beleza e funcionalidade por muito tempo.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade",
      "Secagem rápida após chuva",
      "Peso ideal para resistir a ventos"
    ],
    dimensions: {
      width: 60,
      height: 82,
      depth: 65,
      unit: "cm"
    },
    weight: 7.5,
    materials: [
      "Madeira",
      "Corda trançada à mão",
      "Estrutura reforçada"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Nogueira", hex: "#654321", available: true },
      { name: "Carvalho Natural", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/cazorla/cazorla-sillon-nogal-claro-cuerda-marron.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/exterior/chairs/cazorla/cazorla-sillon-nogal-claro-cuerda-marron.jpg",
        "/images/products/exterior/chairs/cazorla/cazorla-sillon-roble-natural-cuerda-crema.jpg"
      ]
    },
    related: ["mauricio-sofa", "portico-sofa", "irlanda-sofa"]
  },
  {
    id: "champagne-chair",
    name: "Champagne Chair",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "A cadeira Champagne para exterior combina resistência à intempéries com design elegante. Perfeita para áreas externas de restaurantes e hotéis que buscam estilo e durabilidade.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade",
      "Secagem rápida após chuva",
      "Peso ideal para resistir a ventos"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 4.5,
    materials: [
      "Madeira",
      "Estofamento de qualidade"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Bordô", hex: "#800020", available: true },
      { name: "Cinza", hex: "#808080", available: true },
      { name: "Verde", hex: "#008000", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/champagne/champagne-silla-medula-burdeos.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/exterior/chairs/champagne/champagne-silla-medula-burdeos.jpg",
        "/images/products/exterior/chairs/champagne/champagne-silla-medula-gris.jpg",
        "/images/products/exterior/chairs/champagne/champagne-silla-medula-verde.jpg"
      ]
    },
    related: ["portico-chair", "elisseos-chair", "hanoi-chair"]
  },
  {
    id: "charlotte-banque",
    name: "Charlotte Banque",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "O Charlotte combina design inovador com qualidade superior, trazendo estilo e funcionalidade para ambientes comerciais.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 5,
    materials: [
      "Madeira"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Carvalho Natural", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/charlotte/charlotte-banque-deco-roble-natural-medula-atlas.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/exterior/chairs/charlotte/charlotte-banque-deco-roble-natural-medula-atlas.jpg"
      ]
    },
    related: ["alba-banque", "champagne-banque", "elisseos-banque"]
  },
  {
    id: "chicago-chair-2",
    name: "Chicago Chair",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "A cadeira Chicago para exterior combina resistência à intempéries com design elegante. Perfeita para áreas externas de restaurantes e hotéis que buscam estilo e durabilidade.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade",
      "Secagem rápida após chuva",
      "Peso ideal para resistir a ventos"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 4.5,
    materials: [
      "Madeira",
      "Estofamento de qualidade"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Nogueira", hex: "#654321", available: true },
      { name: "Carvalho Natural", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/chicago/chicago-silla-nogal-claro-textilene-mekong.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/exterior/chairs/chicago/chicago-silla-nogal-claro-textilene-mekong.jpg",
        "/images/products/exterior/chairs/chicago/chicago-silla-nogal-claro-textilene-soho-negro.jpg",
        "/images/products/exterior/chairs/chicago/chicago-silla-nogal-claro-textilene-soho.jpg",
        "/images/products/exterior/chairs/chicago/chicago-silla-roble-natural-textilene-mekong.jpg"
      ]
    },
    related: ["elisseos-chair", "charlotte-chair", "portico-chair"]
  },
  {
    id: "cracovia-chair-2",
    name: "Cracovia Chair",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "A cadeira Cracovia para exterior combina resistência à intempéries com design elegante. Perfeita para áreas externas de restaurantes e hotéis que buscam estilo e durabilidade.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade",
      "Secagem rápida após chuva",
      "Peso ideal para resistir a ventos"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 4.5,
    materials: [
      "Madeira",
      "Estofamento de qualidade"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Nogueira", hex: "#654321", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/cracovia/cracovia-silla-nogal-claro-textilene-soho-negro.jpg",
      angles: [
        "/images/products/exterior/chairs/cracovia/cracovia-silla-nogal-claro-textilene-soho-negro_trasera-back.jpg"
      ],
      thumbnails: [
        "/images/products/exterior/chairs/cracovia/cracovia-silla-nogal-claro-textilene-soho-negro.jpg",
        "/images/products/exterior/chairs/cracovia/cracovia-silla-nogal-claro-textilene-soho-negro_trasera-back.jpg",
        "/images/products/exterior/chairs/cracovia/cracovia-silla-nogal-claro-textilene-soho.jpg"
      ]
    },
    related: ["cazorla-chair", "hanoi-chair", "bordeaux-chair"]
  },
  {
    id: "cracovia-sofa-2",
    name: "Cracovia Sofa",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "O sofá Cracovia oferece conforto excepcional em ambientes externos. Com materiais resistentes às condições climáticas, mantém sua beleza e funcionalidade por muito tempo.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade",
      "Secagem rápida após chuva",
      "Peso ideal para resistir a ventos"
    ],
    dimensions: {
      width: 60,
      height: 82,
      depth: 65,
      unit: "cm"
    },
    weight: 7.5,
    materials: [
      "Madeira",
      "Corda trançada à mão",
      "Estrutura reforçada"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Nogueira", hex: "#654321", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/cracovia/cracovia-sillon-nogal-claro-textilene-soho-negro.jpg",
      angles: [
        "/images/products/exterior/chairs/cracovia/cracovia-sillon-nogal-claro-textilene-soho_espalda-back.jpg"
      ],
      thumbnails: [
        "/images/products/exterior/chairs/cracovia/cracovia-sillon-nogal-claro-textilene-soho-negro.jpg",
        "/images/products/exterior/chairs/cracovia/cracovia-sillon-nogal-claro-textilene-soho_espalda-back.jpg",
        "/images/products/exterior/chairs/cracovia/cracovia-sillon-nogal-claro-textilene-soho.jpg"
      ]
    },
    related: ["alba-sofa", "new-sofa", "nautico-sofa"]
  },
  {
    id: "elisseos-sofa",
    name: "Elisseos Sofa",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "O sofá Elisseos oferece conforto excepcional em ambientes externos. Com materiais resistentes às condições climáticas, mantém sua beleza e funcionalidade por muito tempo.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade",
      "Secagem rápida após chuva",
      "Peso ideal para resistir a ventos"
    ],
    dimensions: {
      width: 60,
      height: 82,
      depth: 65,
      unit: "cm"
    },
    weight: 7.5,
    materials: [
      "Madeira",
      "Corda trançada à mão",
      "Estrutura reforçada"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Carvalho Natural", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/elisseos/elisseos-sillon-roble-natural-medula-azul-y-blanco.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/exterior/chairs/elisseos/elisseos-sillon-roble-natural-medula-azul-y-blanco.jpg",
        "/images/products/exterior/chairs/elisseos/elisseos-sillon-roble-natural-medula-marron-y-blanco.jpg",
        "/images/products/exterior/chairs/elisseos/elisseos-sillon-roble-natural-medula-negro-y-blanco.jpg",
        "/images/products/exterior/chairs/elisseos/elisseos-sillon-roble-natural-medula-rojo-y-blanco.jpg"
      ]
    },
    related: ["bordeaux-sofa", "provenza-sofa", "insbruck-sofa"]
  },
  {
    id: "hanoi-sofa",
    name: "Hanoi Sofa",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "O sofá Hanoi oferece conforto excepcional em ambientes externos. Com materiais resistentes às condições climáticas, mantém sua beleza e funcionalidade por muito tempo.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade",
      "Secagem rápida após chuva",
      "Peso ideal para resistir a ventos"
    ],
    dimensions: {
      width: 60,
      height: 82,
      depth: 65,
      unit: "cm"
    },
    weight: 7.5,
    materials: [
      "Madeira",
      "Corda trançada à mão",
      "Estrutura reforçada"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Nogueira", hex: "#654321", available: true },
      { name: "Carvalho Natural", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/hanoi/hanoi-sillon-nogal-claro-cuerda-marron.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/exterior/chairs/hanoi/hanoi-sillon-nogal-claro-cuerda-marron.jpg",
        "/images/products/exterior/chairs/hanoi/hanoi-sillon-roble-natural-cuerda-crema.jpg"
      ]
    },
    related: ["charlotte-sofa", "portico-sofa", "irlanda-sofa"]
  },
  {
    id: "helsinki-alta",
    name: "Helsinki Alta",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "O Helsinki combina design inovador com qualidade superior, trazendo estilo e funcionalidade para ambientes comerciais.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 5,
    materials: [
      "Madeira"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/helsinki/helsinki-alta-mesa-negro-tablero-compact-marmol-olimpo-cuadrado.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/exterior/chairs/helsinki/helsinki-alta-mesa-negro-tablero-compact-marmol-olimpo-cuadrado.jpg",
        "/images/products/exterior/chairs/helsinki/helsinki-alta-mesa-negro-tablero-compact-marmol-samas-cuadrado.jpg",
        "/images/products/exterior/chairs/helsinki/helsinki-alta-mesa-negro-tablero-compact-marmol-samas-redondo.jpg"
      ]
    },
    related: ["louvre-alta", "insbruck-alta", "portico-alta"]
  },
  {
    id: "helsinki-table",
    name: "Helsinki Table",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "A mesa Helsinki para exterior é a escolha ideal para terraços e jardins. Sua construção resistente e design atemporal fazem dela um elemento indispensável para áreas externas.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade"
    ],
    dimensions: {
      width: 80,
      height: 75,
      depth: 80,
      unit: "cm"
    },
    weight: 15,
    materials: [
      "Madeira maciça",
      "Metal",
      "Tampo em melamina/compact"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/helsinki/helsinki-mesa-negro-tablero-compact-marmol-olimpo-cuadrado.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/exterior/chairs/helsinki/helsinki-mesa-negro-tablero-compact-marmol-olimpo-cuadrado.jpg"
      ]
    },
    related: ["cazorla-table", "insbruck-table", "bordeaux-table"]
  },
  {
    id: "helsinki-rectangular",
    name: "Helsinki Rectangular",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "O Helsinki combina design inovador com qualidade superior, trazendo estilo e funcionalidade para ambientes comerciais.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 5,
    materials: [
      "Madeira"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/helsinki/helsinki-rectangular-mesa-negro-tablero-compact-marmol-olimpo.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/exterior/chairs/helsinki/helsinki-rectangular-mesa-negro-tablero-compact-marmol-olimpo.jpg",
        "/images/products/exterior/chairs/helsinki/helsinki-rectangular-mesa-negro-tablero-compact-marmol-tafu.jpg"
      ]
    },
    related: ["champagne-rectangular", "nautico-rectangular", "chicago-rectangular"]
  },
  {
    id: "insbruck-chair-2",
    name: "Insbruck Chair",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "A cadeira Insbruck para exterior combina resistência à intempéries com design elegante. Perfeita para áreas externas de restaurantes e hotéis que buscam estilo e durabilidade.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade",
      "Secagem rápida após chuva",
      "Peso ideal para resistir a ventos"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 4.5,
    materials: [
      "Madeira",
      "Estofamento de qualidade"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Nogueira", hex: "#654321", available: true },
      { name: "Carvalho Natural", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/insbruck/insbruck-silla-nogal-claro-rejilla-medula-crema.jpg",
      angles: [
        "/images/products/exterior/chairs/insbruck/insbruck-silla-nogal-claro-rejilla-medula-crema_trasera-back.jpg"
      ],
      thumbnails: [
        "/images/products/exterior/chairs/insbruck/insbruck-silla-nogal-claro-rejilla-medula-crema.jpg",
        "/images/products/exterior/chairs/insbruck/insbruck-silla-nogal-claro-rejilla-medula-crema_trasera-back.jpg",
        "/images/products/exterior/chairs/insbruck/insbruck-silla-nogal-claro.jpg",
        "/images/products/exterior/chairs/insbruck/insbruck-silla-roble-natural-rejilla-medula-crema.jpg"
      ]
    },
    related: ["hanoi-chair", "elisseos-chair", "roseton-chair"]
  },
  {
    id: "irlanda-alta-2",
    name: "Irlanda Alta",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "O Irlanda combina design inovador com qualidade superior, trazendo estilo e funcionalidade para ambientes comerciais.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 5,
    materials: [
      "Madeira"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/irlanda/irlanda-alta-mesa-negro-tablero-melamina-zeus-canto-pvc-dorado-cuadrado.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/exterior/chairs/irlanda/irlanda-alta-mesa-negro-tablero-melamina-zeus-canto-pvc-dorado-cuadrado.jpg",
        "/images/products/exterior/chairs/irlanda/irlanda-alta-mesa-negro-tablero-melamina-zeus-canto-pvc-dorado-redondo.jpg"
      ]
    },
    related: ["elisseos-alta", "cazorla-alta", "samoa-alta"]
  },
  {
    id: "irlanda-table-2",
    name: "Irlanda Table",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "A mesa Irlanda para exterior é a escolha ideal para terraços e jardins. Sua construção resistente e design atemporal fazem dela um elemento indispensável para áreas externas.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade"
    ],
    dimensions: {
      width: 80,
      height: 75,
      depth: 80,
      unit: "cm"
    },
    weight: 15,
    materials: [
      "Madeira maciça",
      "Metal",
      "Tampo em melamina/compact"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/irlanda/irlanda-mesa-negro-tablero-compact-marmol-samas-cuadrado.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/exterior/chairs/irlanda/irlanda-mesa-negro-tablero-compact-marmol-samas-cuadrado.jpg",
        "/images/products/exterior/chairs/irlanda/irlanda-mesa-negro-tablero-compact-marmol-samas-redondo.jpg",
        "/images/products/exterior/chairs/irlanda/irlanda-mesa-negro-tablero-melamina-marmol-bianco-canto-pvc-dorado-cuadrado.jpg",
        "/images/products/exterior/chairs/irlanda/irlanda-mesa-negro-tablero-melamina-marmol-bianco-canto-pvc-dorado-redondo.jpg"
      ]
    },
    related: ["provenza-table", "mauricio-table", "insbruck-table"]
  },
  {
    id: "louvre-chair",
    name: "Louvre Chair",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "A cadeira Louvre para exterior combina resistência à intempéries com design elegante. Perfeita para áreas externas de restaurantes e hotéis que buscam estilo e durabilidade.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade",
      "Secagem rápida após chuva",
      "Peso ideal para resistir a ventos"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 4.5,
    materials: [
      "Madeira",
      "Estofamento de qualidade"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Carvalho Natural", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/louvre/louvre-silla-roble-natural-medula-budeos.jpg",
      angles: [
        "/images/products/exterior/chairs/louvre/louvre-silla-roble-natural-medula-verde_trasera-back.jpg"
      ],
      thumbnails: [
        "/images/products/exterior/chairs/louvre/louvre-silla-roble-natural-medula-budeos.jpg",
        "/images/products/exterior/chairs/louvre/louvre-silla-roble-natural-medula-negro.jpg",
        "/images/products/exterior/chairs/louvre/louvre-silla-roble-natural-medula-verde_trasera-back.jpg",
        "/images/products/exterior/chairs/louvre/louvre-silla-roble-natural-medula-verde.jpg"
      ]
    },
    related: ["cazorla-chair", "alba-chair", "cracovia-chair"]
  },
  {
    id: "manhattan-sofa",
    name: "Manhattan Sofa",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "O sofá Manhattan oferece conforto excepcional em ambientes externos. Com materiais resistentes às condições climáticas, mantém sua beleza e funcionalidade por muito tempo.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade",
      "Secagem rápida após chuva",
      "Peso ideal para resistir a ventos"
    ],
    dimensions: {
      width: 60,
      height: 82,
      depth: 65,
      unit: "cm"
    },
    weight: 7.5,
    materials: [
      "Madeira",
      "Corda trançada à mão",
      "Estrutura reforçada"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Carvalho Natural", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/manhattan/manhattan-sillon-deco-roble-natural-textilene-mekong.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/exterior/chairs/manhattan/manhattan-sillon-deco-roble-natural-textilene-mekong.jpg",
        "/images/products/exterior/chairs/manhattan/manhattan-sillon-deco-roble-natural-textilene-versubio.jpg"
      ]
    },
    related: ["insbruck-sofa", "alba-sofa", "irlanda-sofa"]
  },
  {
    id: "mauricio-aluminio",
    name: "Mauricio Aluminio",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "O Mauricio combina design inovador com qualidade superior, trazendo estilo e funcionalidade para ambientes comerciais.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 5,
    materials: [
      "Madeira"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/mauricio/mauricio-aluminio-negro-tablero-compact-cuadrado-marmol-marquina-grande.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/exterior/chairs/mauricio/mauricio-aluminio-negro-tablero-compact-cuadrado-marmol-marquina-grande.jpg"
      ]
    },
    related: ["champagne-aluminio", "alba-aluminio", "cracovia-aluminio"]
  },
  {
    id: "nassau-chair",
    name: "Nassau Chair",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "A cadeira Nassau para exterior combina resistência à intempéries com design elegante. Perfeita para áreas externas de restaurantes e hotéis que buscam estilo e durabilidade.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade",
      "Secagem rápida após chuva",
      "Peso ideal para resistir a ventos"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 4.5,
    materials: [
      "Madeira",
      "Estofamento de qualidade"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Carvalho Natural", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/nassau/nassau-silla-roble-natural-textilene-latte.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/exterior/chairs/nassau/nassau-silla-roble-natural-textilene-latte.jpg",
        "/images/products/exterior/chairs/nassau/nassau-silla-roble-natural-textilene-tribeca-marron.jpg",
        "/images/products/exterior/chairs/nassau/nassau-silla-roble-natural-textilene-tribeca-verde.jpg"
      ]
    },
    related: ["champagne-chair", "elisseos-chair", "samoa-chair"]
  },
  {
    id: "nassau-sofa",
    name: "Nassau Sofa",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "O sofá Nassau oferece conforto excepcional em ambientes externos. Com materiais resistentes às condições climáticas, mantém sua beleza e funcionalidade por muito tempo.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade",
      "Secagem rápida após chuva",
      "Peso ideal para resistir a ventos"
    ],
    dimensions: {
      width: 60,
      height: 82,
      depth: 65,
      unit: "cm"
    },
    weight: 7.5,
    materials: [
      "Madeira",
      "Corda trançada à mão",
      "Estrutura reforçada"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Carvalho Natural", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/nassau/nassau-sillon-roble-natural-textilene-latte.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/exterior/chairs/nassau/nassau-sillon-roble-natural-textilene-latte.jpg",
        "/images/products/exterior/chairs/nassau/nassau-sillon-roble-natural-textilene-tribeca-marron.jpg",
        "/images/products/exterior/chairs/nassau/nassau-sillon-roble-natural-textilene-tribeca-verde.jpg"
      ]
    },
    related: ["alba-sofa", "irlanda-sofa", "portico-sofa"]
  },
  {
    id: "nautico-sofa",
    name: "Nautico Sofa",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "O sofá Nautico oferece conforto excepcional em ambientes externos. Com materiais resistentes às condições climáticas, mantém sua beleza e funcionalidade por muito tempo.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade",
      "Secagem rápida após chuva",
      "Peso ideal para resistir a ventos"
    ],
    dimensions: {
      width: 60,
      height: 82,
      depth: 65,
      unit: "cm"
    },
    weight: 7.5,
    materials: [
      "Madeira",
      "Corda trançada à mão",
      "Estrutura reforçada"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Creme", hex: "#F5F5DC", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/nautico/nautico-sillon-reoble-natural-cuerda-crema.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/exterior/chairs/nautico/nautico-sillon-reoble-natural-cuerda-crema.jpg"
      ]
    },
    related: ["helsinki-sofa", "provenza-sofa", "hanoi-sofa"]
  },
  {
    id: "new-seat",
    name: "New Seat",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "O New combina design inovador com qualidade superior, trazendo estilo e funcionalidade para ambientes comerciais.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 5,
    materials: [
      "Madeira"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Preto", hex: "#000000", available: true },
      { name: "Carvalho", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/new/new-seat-detail-banqueta.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/exterior/chairs/new/new-seat-detail-banqueta.jpg",
        "/images/products/exterior/chairs/new/new-seat-detail-silla.jpg"
      ]
    },
    related: ["nassau-seat", "cracovia-seat", "alba-seat"]
  },
  {
    id: "portico-chair-2",
    name: "Portico Chair",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "A cadeira Portico para exterior combina resistência à intempéries com design elegante. Perfeita para áreas externas de restaurantes e hotéis que buscam estilo e durabilidade.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade",
      "Secagem rápida após chuva",
      "Peso ideal para resistir a ventos"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 4.5,
    materials: [
      "Madeira",
      "Estofamento de qualidade"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Carvalho Natural", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/portico/portico-silla-roble-natural-cuerda-crema.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/exterior/chairs/portico/portico-silla-roble-natural-cuerda-crema.jpg",
        "/images/products/exterior/chairs/portico/portico-silla-roble-natural-cuerda-gris.jpg"
      ]
    },
    related: ["alba-chair", "samoa-chair", "charlotte-chair"]
  },
  {
    id: "provenza-1",
    name: "Provenza 1",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "O Provenza combina design inovador com qualidade superior, trazendo estilo e funcionalidade para ambientes comerciais.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 5,
    materials: [
      "Madeira"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Carvalho Natural", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/provenza/provenza-1-sofa-roble-natural-cuerda-crema.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/exterior/chairs/provenza/provenza-1-sofa-roble-natural-cuerda-crema.jpg"
      ]
    },
    related: ["verdi-1", "alba-1", "nassau-1"]
  },
  {
    id: "provenza-2",
    name: "Provenza 2",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "O Provenza combina design inovador com qualidade superior, trazendo estilo e funcionalidade para ambientes comerciais.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 5,
    materials: [
      "Madeira"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Carvalho Natural", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/provenza/provenza-2-sofa-roble-natura-cuerda-crema.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/exterior/chairs/provenza/provenza-2-sofa-roble-natura-cuerda-crema.jpg"
      ]
    },
    related: ["portico-2", "mauricio-2", "bordeaux-2"]
  },
  {
    id: "provenza-stool",
    name: "Provenza Stool",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "O Provenza combina design inovador com qualidade superior, trazendo estilo e funcionalidade para ambientes comerciais.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade"
    ],
    dimensions: {
      width: 45,
      height: 105,
      depth: 47,
      unit: "cm"
    },
    weight: 6,
    materials: [
      "Madeira",
      "Metal reforçado",
      "Estofamento premium"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Carvalho Natural", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/provenza/provenza-banqueta-con-brazos-roble-natural-cuerda-crema.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/exterior/chairs/provenza/provenza-banqueta-con-brazos-roble-natural-cuerda-crema.jpg",
        "/images/products/exterior/chairs/provenza/provenza-banqueta-roble-natural-cuerda-crema.jpg",
        "/images/products/exterior/chairs/provenza/provenza-banqueta-sinrespaldo-deco-roble-natural-cuerda-crema.jpg"
      ]
    },
    related: ["nassau-stool", "irlanda-stool", "samoa-stool"]
  },
  {
    id: "provenza-chair",
    name: "Provenza Chair",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "A cadeira Provenza para exterior combina resistência à intempéries com design elegante. Perfeita para áreas externas de restaurantes e hotéis que buscam estilo e durabilidade.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade",
      "Secagem rápida após chuva",
      "Peso ideal para resistir a ventos"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 4.5,
    materials: [
      "Madeira",
      "Estofamento de qualidade"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Carvalho Natural", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/provenza/provenza-silla-roble-natural-cuerda-crema.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/exterior/chairs/provenza/provenza-silla-roble-natural-cuerda-crema.jpg"
      ]
    },
    related: ["chicago-chair", "elisseos-chair", "louvre-chair"]
  },
  {
    id: "provenza-sofa",
    name: "Provenza Sofa",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "O sofá Provenza oferece conforto excepcional em ambientes externos. Com materiais resistentes às condições climáticas, mantém sua beleza e funcionalidade por muito tempo.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade",
      "Secagem rápida após chuva",
      "Peso ideal para resistir a ventos"
    ],
    dimensions: {
      width: 60,
      height: 82,
      depth: 65,
      unit: "cm"
    },
    weight: 7.5,
    materials: [
      "Madeira",
      "Corda trançada à mão",
      "Estrutura reforçada"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Carvalho Natural", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/provenza/provenza-sillon-roble-natural-cuerda-crema.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/exterior/chairs/provenza/provenza-sillon-roble-natural-cuerda-crema.jpg"
      ]
    },
    related: ["charlotte-sofa", "louvre-sofa", "insbruck-sofa"]
  },
  {
    id: "roseton-sofa",
    name: "Roseton Sofa",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "O sofá Roseton oferece conforto excepcional em ambientes externos. Com materiais resistentes às condições climáticas, mantém sua beleza e funcionalidade por muito tempo.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade",
      "Secagem rápida após chuva",
      "Peso ideal para resistir a ventos"
    ],
    dimensions: {
      width: 60,
      height: 82,
      depth: 65,
      unit: "cm"
    },
    weight: 7.5,
    materials: [
      "Madeira",
      "Corda trançada à mão",
      "Estrutura reforçada"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Carvalho Natural", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/roseton/roseton-sillon-roble-natural-respaldo-negro-y-blanco.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/exterior/chairs/roseton/roseton-sillon-roble-natural-respaldo-negro-y-blanco.jpg"
      ]
    },
    related: ["irlanda-sofa", "hanoi-sofa", "new-sofa"]
  },
  {
    id: "samoa-chair",
    name: "Samoa Chair",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "A cadeira Samoa para exterior combina resistência à intempéries com design elegante. Perfeita para áreas externas de restaurantes e hotéis que buscam estilo e durabilidade.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade",
      "Secagem rápida após chuva",
      "Peso ideal para resistir a ventos"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 4.5,
    materials: [
      "Madeira",
      "Estofamento de qualidade"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Carvalho Natural", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/samoa/samoa-silla-roble-natural-cuerda-crema.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/exterior/chairs/samoa/samoa-silla-roble-natural-cuerda-crema.jpg"
      ]
    },
    related: ["hanoi-chair", "alba-chair", "cracovia-chair"]
  },
  {
    id: "verdi-seat",
    name: "Verdi Seat",
    category: "Exterior",
    subcategory: "Cadeiras",
    description: "O Verdi combina design inovador com qualidade superior, trazendo estilo e funcionalidade para ambientes comerciais.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade"
    ],
    dimensions: {
      width: 50,
      height: 80,
      depth: 55,
      unit: "cm"
    },
    weight: 5,
    materials: [
      "Madeira"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Carvalho Natural", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/exterior/chairs/verdi/verdi-seat-detail-roble-natural.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/exterior/chairs/verdi/verdi-seat-detail-roble-natural.jpg"
      ]
    },
    related: ["mauricio-seat", "champagne-seat", "cracovia-seat"]
  },
  {
    id: "polinesia-stool",
    name: "Polinesia Stool",
    category: "Exterior",
    subcategory: "Bancos",
    description: "O Polinesia combina design inovador com qualidade superior, trazendo estilo e funcionalidade para ambientes comerciais.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade"
    ],
    dimensions: {
      width: 45,
      height: 105,
      depth: 47,
      unit: "cm"
    },
    weight: 6,
    materials: [
      "Madeira",
      "Metal reforçado",
      "Estofamento premium"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Carvalho Natural", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/exterior/stools/polinesia/polinesia-banqueta-roble-natural-medula-atlas.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/exterior/stools/polinesia/polinesia-banqueta-roble-natural-medula-atlas.jpg"
      ]
    },
    related: []
  },
  {
    id: "polinesia-sofa",
    name: "Polinesia Sofa",
    category: "Exterior",
    subcategory: "Bancos",
    description: "O sofá Polinesia oferece conforto excepcional em ambientes externos. Com materiais resistentes às condições climáticas, mantém sua beleza e funcionalidade por muito tempo.",
    features: [
      "Design exclusivo",
      "Alta durabilidade",
      "Construção reforçada para uso comercial",
      "Resistente às condições climatéricas",
      "Tratamento UV para maior durabilidade",
      "Secagem rápida após chuva",
      "Peso ideal para resistir a ventos"
    ],
    dimensions: {
      width: 60,
      height: 82,
      depth: 65,
      unit: "cm"
    },
    weight: 7.5,
    materials: [
      "Madeira",
      "Corda trançada à mão",
      "Estrutura reforçada"
    ],
    madeIn: "Portugal",
    colors: [
      { name: "Carvalho Natural", hex: "#D2B48C", available: true }
    ],
    images: {
      main: "/images/products/exterior/stools/polinesia/polinesia-sillon-deco-roble-natural-medula-atlas.jpg",
      angles: [
        
      ],
      thumbnails: [
        "/images/products/exterior/stools/polinesia/polinesia-sillon-deco-roble-natural-medula-atlas.jpg"
      ]
    },
    related: []
  }
]

// Utility functions for product data

/**
 * Get a product by its ID
 */
export function getProductById(productId: string): Product | undefined {
  return products.find(product => product.id === productId)
}

/**
 * Get related products based on IDs
 */
export function getRelatedProducts(relatedIds: string[], currentId: string): RelatedProduct[] {
  // Filter out any products that don't exist or match the current product
  const validRelatedIds = relatedIds.filter(id => id !== currentId && products.some(p => p.id === id))
  
  return validRelatedIds.map(id => {
    const product = products.find(p => p.id === id)!
    return {
      id: product.id,
      name: product.name,
      category: product.category,
      subcategory: product.subcategory,
      image: product.images.main
    }
  })
}

/**
 * Get products by category
 */
export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  )
}

/**
 * Get products by subcategory
 */
export function getProductsBySubcategory(subcategory: string): Product[] {
  return products.filter(product => 
    product.subcategory.toLowerCase() === subcategory.toLowerCase()
  )
}

/**
 * Get all available categories
 */
export function getAllCategories(): { name: string, id: string }[] {
  const categories = new Set(products.map(product => product.category))
  return Array.from(categories).map(category => ({
    name: category,
    id: category.toLowerCase()
  }))
}

/**
 * Get all available subcategories
 */
export function getAllSubcategories(): { name: string, id: string, parentCategory: string }[] {
  const subcategories = new Set(products.map(product => product.subcategory))
  return Array.from(subcategories).map(subcategory => {
    // Find a product with this subcategory to get its parent category
    const product = products.find(p => p.subcategory === subcategory)!
    return {
      name: subcategory,
      id: subcategory.toLowerCase().replace(/\s+/g, '-'),
      parentCategory: product.category
    }
  })
}