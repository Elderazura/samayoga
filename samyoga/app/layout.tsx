import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { BackgroundBreath } from '@/components/BackgroundBreath'
import { WindParticles } from '@/components/WindParticles'
import { DriftingLeaves } from '@/components/DriftingLeaves'
import { Providers } from '@/components/Providers'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://samyoga.com'),
  title: {
    default: 'Samyoga | Yoga for Wellness with Samyuktha Nambiar',
    template: '%s | Samyoga',
  },
  description: 'Yoga for wellness, movement, and stillness. Hatha and Yin yoga with Samyuktha Nambiar. Find your balance through gentle, grounding practice.',
  keywords: ['Samyoga', 'Yoga', 'Hatha Yoga', 'Yin Yoga', 'Samyuktha Nambiar', 'Wellness', 'Yoga classes', 'Yoga teacher', 'Mindfulness', 'Online yoga', 'Yoga practice'],
  authors: [{ name: 'Samyuktha Nambiar', url: 'https://samyoga.com' }],
  creator: 'Samyuktha Nambiar',
  publisher: 'Samyoga',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://samyoga.com',
    siteName: 'Samyoga',
    title: 'Samyoga | Yoga for Wellness',
    description: 'Yoga for wellness, movement, and stillness. Hatha and Yin yoga with Samyuktha Nambiar.',
    images: [
      {
        url: '/assets/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Samayoga - Yoga for Wellness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Samayoga | Yoga for Wellness',
    description: 'Yoga for wellness, movement, and stillness. Hatha and Yin yoga with Samyuktha Nambiar.',
    images: ['/assets/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://samyoga.com',
  },
  category: 'Wellness',
  classification: 'Health & Wellness',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "YogaStudio",
    "name": "Samyoga",
    "description": "Yoga for wellness, movement, and stillness. Hatha and Yin yoga with Samyuktha Nambiar.",
    "url": "https://samyoga.com",
    "image": "https://samyoga.com/assets/images/og-image.jpg",
    "founder": {
      "@type": "Person",
      "name": "Samyuktha Nambiar"
    },
    "offers": {
      "@type": "Offer",
      "category": "Yoga Classes",
      "serviceType": ["Hatha Yoga", "Yin Yoga"]
    },
    "areaServed": {
      "@type": "Country",
      "name": "Worldwide"
    }
  }

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#FAF9F7" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <Providers>
          <BackgroundBreath />
          <WindParticles />
          <DriftingLeaves />
          <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}