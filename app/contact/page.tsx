"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData)

    // Show success toast
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll get back to you soon.",
    })

    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      subject: "",
      message: "",
    })
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Talk to Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Have questions about our products or interested in a custom project? Get in touch with our team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <div className="bg-white p-8 rounded-lg border">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Name <span className="text-red-500">*</span>
                  </Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" name="company" value={formData.company} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">
                  Subject <span className="text-red-500">*</span>
                </Label>
                <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">
                  Message <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                Send Message
              </Button>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-lg border">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-orange-500 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p className="text-gray-600">
                    Zona Industrial, Lote 42
                    <br />
                    3750-353 Águeda
                    <br />
                    Portugal
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-orange-500 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-gray-600">+351 234 567 890</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-orange-500 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-gray-600">info@mobiliarioportugues.pt</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg border">
            <h2 className="text-2xl font-bold mb-6">Business Hours</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Monday - Friday</span>
                <span className="text-gray-600">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Saturday</span>
                <span className="text-gray-600">10:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Sunday</span>
                <span className="text-gray-600">Closed</span>
              </div>
            </div>
          </div>

          <div className="relative h-[300px] rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=600&width=800" alt="Map location" fill className="object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button asChild className="bg-orange-500 hover:bg-orange-600">
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                  Open in Google Maps
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

