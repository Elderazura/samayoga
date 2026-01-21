import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="bg-white/50 border-t border-primary-200/50 mt-auto"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-light text-[#1A1A1A] mb-4">Samayoga</h3>
            <p className="text-sm text-[#1A1A1A]/70 leading-relaxed">
              Yoga for wellness, movement, and stillness. <br />
              With Samyuktha Nambiar
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-medium text-[#1A1A1A] mb-4">
              Quick Links
            </h4>
            <nav className="space-y-2" aria-label="Footer navigation">
              <Link
                href="/about"
                className="block text-sm text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 rounded-md px-1"
              >
                About
              </Link>
              <Link
                href="/media"
                className="block text-sm text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 rounded-md px-1"
              >
                Media
              </Link>
              <Link
                href="/blog"
                className="block text-sm text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 rounded-md px-1"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 rounded-md px-1"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-medium text-[#1A1A1A] mb-4">Connect</h4>
            <p className="text-sm text-[#1A1A1A]/70 leading-relaxed">
              <Link
                href="/contact"
                className="hover:text-[#1A1A1A] transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 rounded-md px-1"
              >
                Request a session
              </Link>
            </p>
          </div>
        </div>

        <div className="border-t border-primary-200/50 pt-8 text-center">
          <p className="text-sm text-[#1A1A1A]/60">
            © {currentYear} Samayoga by Samyuktha Nambiar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}