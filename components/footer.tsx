"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import { useTranslation } from "react-i18next"

import "@/lib/i18n"

export default function Footer() {
  const { t } = useTranslation()
  const [isMounted, setIsMounted] = useState(false)
  
  // Handle mounting to prevent hydration errors with SSR
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/logo-white.png" alt="Logo" width={170} height={170} className="h-10 w-auto" />
            </Link>
            <p className="mb-4">{t('footerTagline', 'Premium furniture designed and manufactured in Portugal for restaurants and hotels.')}</p>
            <div className="flex gap-4">
              <Link href="https://facebook.com" className="hover:text-[#F15A29] transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://instagram.com" className="hover:text-[#F15A29] transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://linkedin.com" className="hover:text-[#F15A29] transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t('products')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="hover:text-[#F15A29] transition-colors">
                  {t('exteriorCollection', 'Exterior Collection')}
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#F15A29] transition-colors">
                  {t('interiorCollection', 'Interior Collection')}
                </Link>
              </li>
              <li>
                <Link href="/catalog.pdf" download className="hover:text-[#F15A29] transition-colors">
                  {t('downloadCatalogue', 'Download Catalogue')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t('company')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/company" className="hover:text-[#F15A29] transition-colors">
                  {t('aboutUs', 'About Us')}
                </Link>
              </li>
              <li>
                <Link href="/custom-jobs" className="hover:text-[#F15A29] transition-colors">
                  {t('customProjects', 'Custom Projects')}
                </Link>
              </li>
              <li>
                <Link href="/company/process" className="hover:text-[#F15A29] transition-colors">
                  {t('ourProcess', 'Our Process')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F15A29] transition-colors">
                  {t('contact', 'Contact')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t('contactUs')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-[#F15A29]" />
                <span>
                  Zona Industrial de Barrô
                  <br />
                  3750-353 Barrô, Águeda
                  <br />
                  Aveiro, Portugal
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-[#F15A29]" />
                <Link href="tel:+351234600570" className="hover:text-[#F15A29] transition-colors">
                  +351 234 600 570
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-[#F15A29]" />
                <Link href="mailto:info@bilharmoveis.pt" className="hover:text-[#F15A29] transition-colors">
                  info@bilharmoveis.pt
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>{t('copyright', '© {{year}} Bilharmóveis. All rights reserved.', { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  )
}

