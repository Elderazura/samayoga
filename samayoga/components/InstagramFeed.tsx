'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Instagram } from 'lucide-react'
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '@/lib/social'
import { InstagramReelsSlider } from '@/components/InstagramReelsSlider'

const showcaseImages = [
  { id: 1, image: '/assets/images/landscape/yoga_1.jpeg', alt: 'Yoga practice' },
  { id: 2, image: '/assets/images/landscape/yoga_2.jpeg', alt: 'Yoga practice' },
  { id: 3, image: '/assets/images/landscape/yoga_3.jpeg', alt: 'Yoga practice' },
  { id: 4, image: '/assets/images/landscape/yoga_4.jpeg', alt: 'Yoga practice' },
  { id: 5, image: '/assets/images/landscape/yoga_5.jpeg', alt: 'Yoga practice' },
  { id: 6, image: '/assets/images/landscape/yoga_6.jpeg', alt: 'Yoga practice' },
]

export function InstagramFeed() {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-10 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl font-light mb-3 sm:mb-4">
          Follow Our Journey
        </h2>
        <p className="text-base sm:text-lg text-[#1A1A1A]/70 max-w-2xl mx-auto">
          Reels-style moments &amp; daily inspiration — then explore the full grid on Instagram
        </p>
      </div>

      {/* Reel slider + handle */}
      <div className="max-w-5xl mx-auto mb-12 sm:mb-16">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-center gap-10 lg:gap-14 xl:gap-20">
          <InstagramReelsSlider />

          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-5 shrink-0 lg:max-w-[280px]">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-200/80 to-primary-100/50 shadow-inner ring-1 ring-primary-200/60">
              <Instagram className="w-8 h-8 text-primary-800" aria-hidden />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#1A1A1A]/50 mb-2">
                On Instagram
              </p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl sm:text-3xl font-light text-primary-700 hover:text-primary-800 transition-colors break-all"
              >
                {INSTAGRAM_HANDLE}
              </a>
            </div>
            <p className="text-sm text-[#1A1A1A]/65 leading-relaxed">
              Clips above are from our portrait library—styled like Reels. Tap the handle for
              live posts, stories, and more.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary-300/80 bg-white/60 px-5 py-2.5 text-sm font-medium text-primary-800 hover:bg-primary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
            >
              Open profile
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-[#1A1A1A]/60 max-w-xl mx-auto mb-8">
        Photo grid below uses images from the site—visit Instagram for the latest.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
        {showcaseImages.map((post, index) => (
          <motion.a
            key={post.id}
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
          >
            <Image
              src={post.image}
              alt={post.alt}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs font-medium px-2 text-center">
                View on Instagram
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
