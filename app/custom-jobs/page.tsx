import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function CustomJobsPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Custom Projects</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We collaborate with architects, interior designers, and hospitality businesses to create bespoke furniture
          solutions.
        </p>
      </div>

      {/* Process Section */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Custom Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border text-center">
              <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Projects */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold mb-8">Featured Custom Projects</h2>
        <div className="grid grid-cols-1 gap-12">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image src={project.image || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">{project.name}</h3>
                <p className="text-gray-600 mb-4">{project.location}</p>
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Project Scope:</h4>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <h4 className="font-semibold mb-2">Solutions Provided:</h4>
                  <ul className="space-y-2 mb-4">
                    {project.solutions.map((solution, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-orange-500 font-bold">•</span>
                        <span>{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button asChild className="bg-orange-500 hover:bg-orange-600">
                  <Link href={`/custom-jobs/${project.id}`}>View Full Case Study</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 rounded-lg p-8 md:p-12 mb-20">
        <h2 className="text-2xl font-bold mb-8 text-center">Client Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.position}</p>
                </div>
              </div>
              <p className="italic text-gray-600 mb-4">"{testimonial.quote}"</p>
              <p className="text-sm font-medium">{testimonial.project}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-orange-500 text-white rounded-lg p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Custom Project?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Contact our team to discuss your requirements and discover how we can create the perfect furniture solution
          for your space.
        </p>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="border-white text-white hover:bg-white hover:text-orange-500"
        >
          <Link href="/contact">
            Talk to Our Design Team <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

const processSteps = [
  {
    title: "Consultation",
    description: "We discuss your needs, vision, and requirements to understand your project fully.",
  },
  {
    title: "Design",
    description: "Our designers create custom concepts and detailed drawings for your approval.",
  },
  {
    title: "Production",
    description: "Skilled craftsmen bring your furniture to life in our Portuguese workshop.",
  },
  {
    title: "Delivery & Installation",
    description: "We handle logistics and installation to ensure a seamless experience.",
  },
]

const featuredProjects = [
  {
    id: "seaside-restaurant",
    name: "Seaside Restaurant",
    location: "Algarve, Portugal",
    description:
      "A high-end seafood restaurant needed durable yet elegant outdoor furniture that could withstand the coastal environment while maintaining a luxury aesthetic.",
    solutions: [
      "Custom weatherproof teak dining tables with brass accents",
      "Ergonomic chairs with marine-grade upholstery",
      "Modular lounge seating for the bar area",
      "Custom lighting fixtures to complement the furniture",
    ],
    image: "/placeholder.svg?height=800&width=1200",
  },
  {
    id: "boutique-hotel",
    name: "Boutique Hotel",
    location: "Lisbon, Portugal",
    description:
      "A 45-room boutique hotel in historic Lisbon required a complete furniture package that balanced contemporary design with Portuguese heritage.",
    solutions: [
      "Bespoke headboards featuring traditional Portuguese patterns",
      "Custom desks and wardrobes optimized for compact room layouts",
      "Lobby seating with integrated power and USB outlets",
      "Restaurant furniture designed to maximize space efficiency",
    ],
    image: "/placeholder.svg?height=800&width=1200",
  },
  {
    id: "wine-bar-chain",
    name: "Wine Bar Chain",
    location: "Multiple locations across Europe",
    description:
      "A growing chain of wine bars needed a consistent furniture identity that could be adapted to different space constraints while maintaining brand cohesion.",
    solutions: [
      "Modular bar systems with integrated wine storage",
      "High and low seating options with consistent design language",
      "Custom tables with spill-resistant finishes",
      "Adaptable lighting solutions for different ambiances",
    ],
    image: "/placeholder.svg?height=800&width=1200",
  },
]

const testimonials = [
  {
    name: "Sofia Martins",
    position: "Interior Designer, Studio Luz",
    quote:
      "Working with Mobiliário Português was a seamless experience from concept to installation. Their attention to detail and commitment to quality exceeded our expectations.",
    project: "Boutique Hotel, Lisbon",
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    name: "Miguel Costa",
    position: "Owner, Oceano Restaurant",
    quote:
      "Three years later, our custom furniture still looks as good as the day it was installed, despite the harsh coastal conditions. Exceptional quality and service.",
    project: "Seaside Restaurant, Algarve",
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    name: "Thomas Bergmann",
    position: "Operations Director, Vino Veritas",
    quote:
      "Their ability to maintain design consistency across our multiple locations while adapting to different spaces has been crucial to our brand identity.",
    project: "Wine Bar Chain, Europe",
    avatar: "/placeholder.svg?height=48&width=48",
  },
]

