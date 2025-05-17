import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function CompanyPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=800&width=1600"
            alt="Furniture workshop"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Our Story</h1>
            <p className="mt-6 text-xl">Crafting premium hospitality furniture in Portugal since 1987.</p>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">About Mobiliário Português</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 1987 in the furniture-making region of Águeda, Mobiliário Português has grown from a small
                  family workshop to a leading manufacturer of premium hospitality furniture, while maintaining our
                  commitment to craftsmanship and quality.
                </p>
                <p>
                  For over three decades, we've specialized in designing and manufacturing furniture specifically for
                  the demanding needs of restaurants, hotels, and other hospitality environments. Our pieces combine
                  aesthetic appeal with commercial-grade durability, ensuring they stand the test of time in
                  high-traffic settings.
                </p>
                <p>
                  Today, our furniture can be found in prestigious establishments across Europe and beyond, from
                  boutique hotels in Lisbon to Michelin-starred restaurants in Paris and luxury resorts in the
                  Mediterranean.
                </p>
              </div>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=1000&width=800" alt="Our workshop" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border">
                <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Our Manufacturing Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From raw materials to finished pieces, every step of our manufacturing process is guided by a commitment
              to quality and craftsmanship.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-[300px] md:h-[600px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=1200&width=800"
                alt="Manufacturing process"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-10 h-10 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <span className="font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold tracking-tight mb-6">Our Commitment to Sustainability</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  At Mobiliário Português, we believe that quality furniture should not come at the expense of our
                  planet. Our commitment to sustainability guides every aspect of our business.
                </p>
                <p>
                  We source wood exclusively from certified sustainable forests and prioritize local materials whenever
                  possible to reduce our carbon footprint. Our finishes and adhesives are low-VOC, ensuring healthier
                  indoor air quality for the end users of our furniture.
                </p>
                <p>
                  In our workshop, we've implemented energy-efficient systems and waste reduction practices. Wood scraps
                  are repurposed or used as biomass fuel, and we continuously work to minimize packaging materials while
                  ensuring products arrive safely to our clients.
                </p>
                <p>
                  By creating furniture that lasts for decades rather than years, we also contribute to sustainability
                  through longevity – the most sustainable furniture is the piece you don't need to replace.
                </p>
              </div>
              <Button asChild className="mt-6 bg-orange-500 hover:bg-orange-600">
                <Link href="/company/sustainability">Learn More About Our Practices</Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden order-1 lg:order-2">
              <Image
                src="/placeholder.svg?height=800&width=1200"
                alt="Sustainable practices"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the skilled craftspeople, designers, and professionals who bring our furniture to life.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden mb-4">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600 mb-2">{member.position}</p>
                <p className="text-sm text-gray-500">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Ready to Work With Us?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Whether you're looking for our standard collections or need custom furniture solutions, our team is ready to
            help bring your vision to life.
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-orange-500"
          >
            <Link href="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

import { Award, Leaf, PenToolIcon as Tool, Users, Zap, Clock } from "lucide-react"

const values = [
  {
    title: "Craftsmanship",
    description:
      "We honor traditional woodworking techniques while embracing modern technology to create furniture of exceptional quality.",
    icon: Tool,
  },
  {
    title: "Durability",
    description:
      "Our furniture is built to withstand the demands of commercial environments without compromising on style or comfort.",
    icon: Award,
  },
  {
    title: "Sustainability",
    description:
      "We're committed to environmentally responsible practices, from sourcing materials to manufacturing processes.",
    icon: Leaf,
  },
  {
    title: "Collaboration",
    description:
      "We work closely with our clients to understand their needs and create solutions that exceed expectations.",
    icon: Users,
  },
  {
    title: "Innovation",
    description:
      "We continuously explore new materials, techniques, and designs to stay at the forefront of hospitality furniture.",
    icon: Zap,
  },
  {
    title: "Timelessness",
    description: "We create furniture with enduring appeal that transcends short-lived trends and fads.",
    icon: Clock,
  },
]

const processSteps = [
  {
    title: "Material Selection",
    description:
      "We carefully select premium materials, prioritizing sustainably sourced hardwoods, quality metals, and commercial-grade upholstery fabrics.",
  },
  {
    title: "Precision Cutting",
    description:
      "Using a combination of traditional techniques and advanced CNC technology, we ensure precise dimensions and joinery for each component.",
  },
  {
    title: "Skilled Assembly",
    description:
      "Our experienced craftspeople assemble each piece, paying meticulous attention to structural integrity and detail.",
  },
  {
    title: "Finishing",
    description:
      "Multiple layers of eco-friendly finishes are applied and hand-sanded between coats to achieve a flawless, durable surface.",
  },
  {
    title: "Upholstery",
    description:
      "Our in-house upholstery team works with premium fabrics and leathers, ensuring perfect tension and alignment.",
  },
  {
    title: "Quality Control",
    description:
      "Every piece undergoes rigorous testing and inspection before leaving our workshop to ensure it meets our exacting standards.",
  },
]

const teamMembers = [
  {
    name: "António Silva",
    position: "Founder & Master Craftsman",
    bio: "With over 40 years of experience in furniture making, António established the company with a vision of combining traditional craftsmanship with contemporary design.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Mariana Costa",
    position: "Lead Designer",
    bio: "Mariana brings 15 years of experience in furniture design, with a special focus on ergonomics and functionality for hospitality environments.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "João Ferreira",
    position: "Production Manager",
    bio: "João oversees our workshop operations, ensuring efficient production while maintaining our high quality standards.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Sofia Oliveira",
    position: "Client Relations Director",
    bio: "Sofia works closely with our clients to understand their needs and ensure a smooth experience from concept to delivery.",
    image: "/placeholder.svg?height=400&width=400",
  },
]

