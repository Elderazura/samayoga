'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Media', href: '/media' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session, status } = useSession()

  return (
    <nav
      className="sticky top-0 z-50 bg-cream-50/80 backdrop-blur-md border-b border-primary-200/30 supports-[backdrop-filter]:bg-cream-50/80"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 rounded-md px-2"
            aria-label="Samayoga Home"
          >
            <Image
              src="/assets/brand/logo/Logo_c.png"
              alt="Samayoga Logo"
              width={120}
              height={40}
              className="h-8 sm:h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[#1A1A1A]/80 hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 rounded-md px-2"
              >
                {item.name}
              </Link>
            ))}
            {status === 'authenticated' ? (
              <div className="flex items-center gap-4">
                {session?.user?.role === 'ADMIN' && (
                  <Link
                    href="/admin"
                    className="text-[#1A1A1A]/80 hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 rounded-md px-2"
                  >
                    Admin
                  </Link>
                )}
                {session?.user?.status === 'APPROVED' && (
                  <Link
                    href="/dashboard"
                    className="text-[#1A1A1A]/80 hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 rounded-md px-2"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-[#1A1A1A]/80 hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 rounded-md px-2"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="text-[#1A1A1A]/80 hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 rounded-md px-2"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-3 rounded-lg text-[#1A1A1A] hover:bg-primary-50 active:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
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

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-primary-200/30 bg-cream-50/95 backdrop-blur-md"
        >
          <div className="px-4 py-4 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-[#1A1A1A]/80 hover:bg-primary-50 hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {status === 'authenticated' ? (
              <>
                {session?.user?.role === 'ADMIN' && (
                  <Link
                    href="/admin"
                    className="block px-4 py-3 rounded-lg text-[#1A1A1A]/80 hover:bg-primary-50 hover:text-primary-600 active:bg-primary-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 text-base font-medium min-h-[44px] flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                {session?.user?.status === 'APPROVED' && (
                  <Link
                    href="/dashboard"
                    className="block px-4 py-3 rounded-lg text-[#1A1A1A]/80 hover:bg-primary-50 hover:text-primary-600 active:bg-primary-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 text-base font-medium min-h-[44px] flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    signOut({ callbackUrl: '/' })
                  }}
                  className="block w-full text-left px-4 py-3 rounded-lg text-[#1A1A1A]/80 hover:bg-primary-50 hover:text-primary-600 active:bg-primary-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 text-base font-medium min-h-[44px]"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="block px-4 py-3 rounded-lg text-[#1A1A1A]/80 hover:bg-primary-50 hover:text-primary-600 active:bg-primary-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 text-base font-medium min-h-[44px] flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
