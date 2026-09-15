'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Media', href: '/media' },
  { name: 'Blog', href: '/blog' },
  { name: 'Register', href: '/register' },
  { name: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav
      className="sticky top-0 z-50 border-b border-stone-300/70 bg-stone-100/90 backdrop-blur-md supports-[backdrop-filter]:bg-stone-100/85"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md px-1 transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
            aria-label="Samayoga Home"
          >
            <Image
              src="/assets/brand/logo/logo_f.png"
              alt="Samayoga"
              width={120}
              height={40}
              className="h-8 w-auto sm:h-10 brightness-0 contrast-125"
              priority
            />
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-umber-muted transition-colors hover:text-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <button
            type="button"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-3 text-umber transition-colors hover:bg-primary-100 md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle mobile menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-stone-300/70 bg-stone-100 md:hidden"
        >
          <div className="space-y-1 px-4 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-md px-3 py-3 text-umber-muted transition-colors hover:bg-primary-100 hover:text-primary-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
