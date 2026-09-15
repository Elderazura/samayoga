import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Mail, Youtube } from 'lucide-react'
import { SAMAYOGA_INBOX_EMAIL } from '@/lib/inbox'
import {
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  YOUTUBE_HANDLE,
  YOUTUBE_SHORTS_URL,
} from '@/lib/social'

const exploreLinks = [
  { href: '/about', label: 'About' },
  { href: '/media', label: 'Media' },
  { href: '/blog', label: 'Blog' },
  { href: '/register', label: 'Register' },
  { href: '/contact', label: 'Contact' },
]

const linkClass =
  'inline-block py-1 text-sm text-umber-muted transition-colors hover:text-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 rounded-sm'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-stone-300/80 bg-stone-200/40" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="inline-block rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
              aria-label="Samayoga home"
            >
              <Image
                src="/assets/brand/logo/logo_f.png"
                alt="Samayoga"
                width={140}
                height={48}
                className="h-9 w-auto brightness-0 contrast-125 sm:h-10"
              />
            </Link>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-umber-muted">
              Yoga for wellness, movement, and stillness — with Samyuktha Nambiar.
            </p>
            <p className="mt-2 text-sm text-umber-soft">
              Hatha · Vinyasa · Yin · Pranayama · Meditation
            </p>
            <Link
              href="/register"
              className="mt-6 inline-flex min-h-[44px] items-center border border-primary-600 px-5 text-sm font-medium text-primary-700 transition-colors hover:bg-primary-100"
            >
              Join a class
            </Link>
          </div>

          {/* Explore */}
          <div className="lg:col-span-3">
            <h2 className="eyebrow mb-5">Explore</h2>
            <nav aria-label="Footer navigation">
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-1">
                {exploreLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Connect */}
          <div className="lg:col-span-4">
            <h2 className="eyebrow mb-5">Connect</h2>
            <ul className="space-y-4">
              <li>
                <Link href="/contact" className={`${linkClass} flex items-start gap-3`}>
                  <span className="mt-0.5 text-primary-600" aria-hidden>
                    →
                  </span>
                  <span>Request a session</span>
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${SAMAYOGA_INBOX_EMAIL}`}
                  className={`${linkClass} flex items-start gap-3 break-all`}
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" aria-hidden />
                  <span>{SAMAYOGA_INBOX_EMAIL}</span>
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} flex items-start gap-3`}
                >
                  <Instagram className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" aria-hidden />
                  <span>{INSTAGRAM_HANDLE}</span>
                </a>
              </li>
              <li>
                <a
                  href={YOUTUBE_SHORTS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} flex items-start gap-3`}
                >
                  <Youtube className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" aria-hidden />
                  <span>
                    {YOUTUBE_HANDLE}
                    <span className="text-umber-soft"> · Shorts</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-stone-300/80 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-umber-soft">
            © {currentYear} Samayoga · Samyuktha Nambiar. All rights reserved.
          </p>
          <p className="text-xs text-umber-soft/90">
            Online classes via Google Meet · IST scheduling
          </p>
        </div>
      </div>
    </footer>
  )
}
