import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProductDetailPageProps {
  params: {
    category: string
    product: string
  }
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  // In a real application, you would fetch this data from an API or database
  const product = {
    id: params.product,
    name: "Porto Chair",
    category: "Chairs & Seating",
    description:
      "The Porto Chair combines traditional Portuguese craftsmanship with modern design principles. Its solid oak frame provides exceptional durability, while the upholstered seat and back ensure comfort for extended dining experiences.",
    longDescription:
      "Designed specifically for hospitality environments, the Porto Chair is built to withstand the demands of busy restaurants and hotels. The frame is constructed from kiln-dried solid oak, ensuring stability and longevity. The joints are reinforced with traditional woodworking techniques for added strength.\n\nThe seat and back are generously padded with high-density foam and upholstered in your choice of commercial-grade fabrics or leathers. All materials meet or exceed industry standards for durability and safety, including fire-retardancy requirements.\n\nThe Porto Chair is available in multiple wood finishes and upholstery options, allowing you to customize it to match your interior design scheme. Its timeless design ensures it won't go out of style, making it a wise investment for your hospitality business.",
    price: "Contact for pricing",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    features: [
      "Solid oak frame for exceptional durability",
      "Commercial-grade upholstery options",
      "Ergonomic design for extended comfort",
      "Stackable for easy storage (up to 4 chairs)",
      "Available in multiple wood finishes",
      "Custom upholstery options available",
    ],
    specifications: {
      Dimensions: "W: 50cm × D: 54cm × H: 85cm",
      "Seat Height": "46cm",
      Weight: "6.5kg per chair",
      "Weight Capacity": "150kg",
      Materials: "Solid oak, high-density foam, commercial-grade upholstery",
      Assembly: "Fully assembled",
      Warranty: "5-year commercial warranty",
    },
    relatedProducts: [
      {
        id: "lisboa-chair",
        name: "Lisboa Chair",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "coimbra-chair",
        name: "Coimbra Chair",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "braga-chair",
        name: "Braga Chair",
        image: "/placeholder.svg?height=300&width=300",
      },
    ],
  }

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="mb-8">
        <Link href={`/products/${params.category}`} className="text-orange-500 hover:underline mb-2 inline-block">
          ← Back to {product.category}
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border bg-gray-100">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg border bg-gray-100">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - View ${index + 1}`}
                  width={150}
                  height={150}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">{product.name}</h1>
          <p className="text-gray-500 mb-4">{product.category}</p>
          <p className="text-xl font-semibold mb-6">{product.price}</p>
          <p className="text-gray-600 mb-8">{product.description}</p>

          <div className="space-y-6 mb-8">
            <h2 className="text-lg font-semibold">Key Features</h2>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
              <Link href="/contact">Request Quote</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-50"
            >
              <Link href="/contact">
                Talk to Us About This Product <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="text-sm text-gray-500">
            <p>* Minimum order quantities may apply</p>
            <p>* Custom modifications available upon request</p>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <Tabs defaultValue="details" className="mb-16">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Product Details</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="customization">Customization Options</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="p-6 border rounded-b-lg">
          <div className="prose max-w-none">
            <p className="whitespace-pre-line">{product.longDescription}</p>
          </div>
        </TabsContent>
        <TabsContent value="specifications" className="p-6 border rounded-b-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b pb-2">
                <span className="font-medium">{key}</span>
                <span className="text-gray-600">{value}</span>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="customization" className="p-6 border rounded-b-lg">
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-4">Make It Your Own</h3>
            <p className="mb-4">
              The Porto Chair can be customized to match your specific requirements and aesthetic preferences. Our team
              works closely with clients to create furniture that perfectly complements their space.
            </p>
            <h4 className="text-lg font-medium mb-2">Available Customizations:</h4>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                <span>Wood finish options (10+ standard finishes, custom stains available)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                <span>Upholstery fabrics (100+ options including leather, vinyl, and performance fabrics)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                <span>Custom dimensions to fit your specific space requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                <span>Fire retardancy options to meet specific regional requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                <span>Custom embroidery or branding options</span>
              </li>
            </ul>
            <p>
              Contact our team to discuss your customization needs and receive samples of available finishes and
              materials.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {product.relatedProducts.map((relatedProduct) => (
            <Link
              key={relatedProduct.id}
              href={`/products/${params.category}/${relatedProduct.id}`}
              className="group border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                <Image
                  src={relatedProduct.image || "/placeholder.svg"}
                  alt={relatedProduct.name}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold group-hover:text-orange-500 transition-colors">{relatedProduct.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Need Help Choosing the Right Furniture?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Our team of experts is ready to assist you in selecting the perfect furniture solutions for your hospitality
          space.
        </p>
        <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
          <Link href="/contact">Contact Our Team</Link>
        </Button>
      </div>
    </div>
  )
}

