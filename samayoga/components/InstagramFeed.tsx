'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '@/lib/social'

// Visual grid uses site photography; tap through to the Instagram profile for real posts.
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
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl font-light mb-3 sm:mb-4">
          Follow Our Journey
        </h2>
        <p className="text-base sm:text-lg text-[#1A1A1A]/70 max-w-2xl mx-auto">
          Daily inspiration and practice moments on Instagram
        </p>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          {INSTAGRAM_HANDLE} →
        </a>
      </div>

      <p className="text-center text-sm text-[#1A1A1A]/60 max-w-xl mx-auto mb-6">
        Instagram posts live on our profile. This grid highlights practice photos from the site—open
        Instagram to see the latest reels and posts.
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
