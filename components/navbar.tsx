"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { useTranslation } from 'react-i18next'

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import LanguageSwitcher from "@/components/LanguageSwitcher"

// This ensures i18n is initialized on the client side
import '@/lib/i18n'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
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
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={170} height={170} className="h-10 w-auto" />
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium hover:text-orange-500 transition-colors">
            {t('home')}
          </Link>
          <Link href="/products" className="text-sm font-medium hover:text-orange-500 transition-colors">
            {t('products')}
          </Link>
          <Link href="/custom-jobs" className="text-sm font-medium hover:text-orange-500 transition-colors">
            {t('customJobs')}
          </Link>
          <Link href="/company" className="text-sm font-medium hover:text-orange-500 transition-colors">
            {t('company')}
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-orange-500 transition-colors">
            {t('talkToUs')}
          </Link>
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          <Button asChild className="bg-orange-500 hover:bg-orange-600">
            <Link href="/contact">{t('talkToUs')}</Link>
          </Button>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 mt-6">
              <Link href="/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                {t('home')}
              </Link>
              <Link href="/products" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                {t('products')}
              </Link>
              <Link href="/custom-jobs" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                {t('customJobs')}
              </Link>
              <Link href="/company" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                {t('company')}
              </Link>
              <Link href="/contact" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                {t('talkToUs')}
              </Link>
              <div className="flex items-center gap-2 mt-4">
                <LanguageSwitcher />
              </div>
              <Button asChild className="mt-4 bg-orange-500 hover:bg-orange-600">
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  {t('contactUs')}
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

