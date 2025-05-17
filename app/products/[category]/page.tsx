import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"

interface ProductCategoryPageProps {
  params: {
    category: string
  }
}

export default function ProductCategoryPage({ params }: ProductCategoryPageProps) {
  const category = productCategories.find((cat) => cat.id === params.category)

  if (!category) {
    notFound()
  }

  const categoryProducts = products.filter((product) => product.categoryId === params.category)

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="mb-8">
        <Link href="/products" className="text-orange-500 hover:underline mb-2 inline-block">
          ← Back to All Products
        </Link>
        <h1 className="text-4xl font-bold tracking-tight">{category.name}</h1>
        <p className="text-xl text-gray-600 mt-2">{category.description}</p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {categoryProducts.map((product) => (
          <div key={product.id} className="group border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-square overflow-hidden bg-gray-100">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={400}
                height={400}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{product.description}</p>
              <div className="flex gap-2">
                <Button asChild className="flex-1 bg-orange-500 hover:bg-orange-600">
                  <Link href={`/products/${params.category}/${product.id}`}>View Details</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 border-orange-500 text-orange-500 hover:bg-orange-50"
                >
                  <Link href={`/contact?product=${product.id}`}>Inquire</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="bg-gray-50 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6">Why Choose Our {category.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.features.map((feature, index) => (
            <div key={index} className="flex gap-4">
              <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center shrink-0">
                <feature.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-white rounded-lg p-8 border">
        <h2 className="text-2xl font-bold mb-4">Need Something Custom?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          We can create custom {category.name.toLowerCase()} to match your exact specifications and requirements.
        </p>
        <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
          <Link href="/contact">Talk to Our Team</Link>
        </Button>
      </div>
    </div>
  )
}

import { Check, Shield, Zap, Clock, PenToolIcon as Tool, Award } from "lucide-react"

const productCategories = [
  {
    id: "chairs",
    name: "Chairs & Seating",
    description: "Comfortable, durable chairs designed for restaurants, cafes, and hotels.",
    features: [
      {
        title: "Ergonomic Design",
        description: "Designed for optimal comfort during extended dining experiences.",
        icon: Check,
      },
      {
        title: "Commercial-Grade Durability",
        description: "Built to withstand the demands of high-traffic hospitality environments.",
        icon: Shield,
      },
      {
        title: "Quick Assembly",
        description: "Easy to assemble and maintain, saving you time and effort.",
        icon: Zap,
      },
      {
        title: "Timeless Aesthetics",
        description: "Classic designs that won't go out of style, ensuring long-term value.",
        icon: Clock,
      },
      {
        title: "Customizable Options",
        description: "Available in various finishes and upholstery options to match your decor.",
        icon: Tool,
      },
      {
        title: "Quality Materials",
        description: "Crafted from premium materials for exceptional quality and longevity.",
        icon: Award,
      },
    ],
  },
  {
    id: "tables",
    name: "Tables",
    description: "Elegant dining tables in various shapes, sizes, and materials.",
    features: [
      {
        title: "Sturdy Construction",
        description: "Engineered for stability and durability in busy restaurant environments.",
        icon: Shield,
      },
      {
        title: "Space Optimization",
        description: "Designed to maximize seating capacity without compromising comfort.",
        icon: Zap,
      },
      {
        title: "Stain-Resistant Finishes",
        description: "Easy to clean and maintain, with finishes that resist stains and scratches.",
        icon: Check,
      },
      {
        title: "Modular Options",
        description: "Flexible configurations to adapt to different space requirements.",
        icon: Tool,
      },
      {
        title: "Premium Materials",
        description: "Crafted from high-quality woods, metals, and composites for lasting beauty.",
        icon: Award,
      },
      {
        title: "Design Consistency",
        description: "Matches perfectly with our seating collections for a cohesive look.",
        icon: Clock,
      },
    ],
  },
  {
    id: "barstools",
    name: "Bar & Counter Stools",
    description: "Stylish and comfortable stools for bars and counter-height dining.",
    features: [
      {
        title: "Perfect Height Options",
        description: "Available in bar and counter heights to fit your specific needs.",
        icon: Check,
      },
      {
        title: "Footrest Comfort",
        description: "Ergonomic footrests for extended comfort during long sitting periods.",
        icon: Shield,
      },
      {
        title: "Space-Saving Design",
        description: "Compact profiles that maximize seating in limited bar areas.",
        icon: Zap,
      },
      {
        title: "Swivel Options",
        description: "Available with smooth swivel mechanisms for added convenience.",
        icon: Tool,
      },
      {
        title: "Durable Construction",
        description: "Built to withstand the rigors of busy bar environments.",
        icon: Award,
      },
      {
        title: "Style Variety",
        description: "From classic to contemporary designs to match your aesthetic.",
        icon: Clock,
      },
    ],
  },
  {
    id: "outdoor",
    name: "Outdoor Furniture",
    description: "Weather-resistant furniture for terraces, patios, and outdoor dining areas.",
    features: [
      {
        title: "Weather Resistance",
        description: "Designed to withstand sun, rain, and varying temperatures.",
        icon: Shield,
      },
      {
        title: "UV Protection",
        description: "Materials and finishes that resist fading from sun exposure.",
        icon: Check,
      },
      {
        title: "Quick-Dry Properties",
        description: "Designed to dry quickly after rain for customer convenience.",
        icon: Zap,
      },
      {
        title: "Stackable Options",
        description: "Space-saving storage solutions for seasonal businesses.",
        icon: Tool,
      },
      {
        title: "Corrosion Resistance",
        description: "Hardware and components that resist rust and corrosion.",
        icon: Award,
      },
      {
        title: "Indoor-Outdoor Versatility",
        description: "Styles that work seamlessly in both indoor and outdoor settings.",
        icon: Clock,
      },
    ],
  },
  {
    id: "lounge",
    name: "Lounge Furniture",
    description: "Comfortable sofas and armchairs for hotel lobbies and waiting areas.",
    features: [
      {
        title: "Premium Comfort",
        description: "Plush cushioning and ergonomic design for exceptional comfort.",
        icon: Check,
      },
      {
        title: "Contract-Grade Fabrics",
        description: "Upholstery that meets commercial standards for durability and safety.",
        icon: Shield,
      },
      {
        title: "Modular Options",
        description: "Flexible arrangements to adapt to different space requirements.",
        icon: Zap,
      },
      {
        title: "Integrated Features",
        description: "Options for built-in power outlets and USB charging ports.",
        icon: Tool,
      },
      {
        title: "Easy Maintenance",
        description: "Removable covers and stain-resistant fabrics for simple cleaning.",
        icon: Award,
      },
      {
        title: "Design Statement",
        description: "Pieces that create a strong visual impression in hospitality spaces.",
        icon: Clock,
      },
    ],
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Complementary items to complete your hospitality space.",
    features: [
      {
        title: "Functional Design",
        description: "Items that combine aesthetic appeal with practical functionality.",
        icon: Check,
      },
      {
        title: "Space Enhancement",
        description: "Pieces that optimize and define spaces within your establishment.",
        icon: Zap,
      },
      {
        title: "Brand Consistency",
        description: "Designed to complement our furniture collections for a cohesive look.",
        icon: Clock,
      },
      {
        title: "Commercial Durability",
        description: "Built to the same high standards as our furniture collections.",
        icon: Shield,
      },
      {
        title: "Custom Options",
        description: "Many items can be customized to match your specific requirements.",
        icon: Tool,
      },
      {
        title: "Finishing Touches",
        description: "The details that elevate the overall design of your space.",
        icon: Award,
      },
    ],
  },
]

const products = [
  {
    id: "porto-chair",
    name: "Porto Chair",
    categoryId: "chairs",
    description: "Elegant dining chair with solid oak frame and upholstered seat.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "lisboa-chair",
    name: "Lisboa Chair",
    categoryId: "chairs",
    description: "Modern stackable chair with sleek metal frame and wooden seat.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "coimbra-chair",
    name: "Coimbra Chair",
    categoryId: "chairs",
    description: "Classic design with woven rattan back and comfortable cushion.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "braga-chair",
    name: "Braga Chair",
    categoryId: "chairs",
    description: "Contemporary fully upholstered chair with elegant stitching details.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "algarve-table",
    name: "Algarve Table",
    categoryId: "tables",
    description: "Round dining table with solid wood top and metal pedestal base.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "douro-table",
    name: "Douro Table",
    categoryId: "tables",
    description: "Rectangular table with extendable option for flexible seating arrangements.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "tejo-table",
    name: "Tejo Table",
    categoryId: "tables",
    description: "Square bistro table with weather-resistant top, perfect for cafes.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "lisboa-barstool",
    name: "Lisboa Barstool",
    categoryId: "barstools",
    description: "Sleek barstool with footrest and comfortable upholstered seat.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "porto-barstool",
    name: "Porto Barstool",
    categoryId: "barstools",
    description: "Wooden barstool with ergonomic back support and swivel mechanism.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "cascais-chair",
    name: "Cascais Outdoor Chair",
    categoryId: "outdoor",
    description: "Weather-resistant chair with quick-dry cushions for outdoor dining.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "faro-sofa",
    name: "Faro Lounge Sofa",
    categoryId: "lounge",
    description: "Comfortable three-seater sofa with premium upholstery options.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "sintra-armchair",
    name: "Sintra Armchair",
    categoryId: "lounge",
    description: "Elegant armchair with deep seat and supportive back cushioning.",
    image: "/placeholder.svg?height=400&width=400",
  },
]

