'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

// Placeholder Instagram feed - replace with actual Instagram API integration
const instagramPosts = [
  {
    id: 1,
    image: '/assets/images/landscape/yoga_1.jpeg',
    alt: 'Yoga practice',
    likes: 42,
  },
  {
    id: 2,
    image: '/assets/images/landscape/yoga_2.jpeg',
    alt: 'Yoga practice',
    likes: 38,
  },
  {
    id: 3,
    image: '/assets/images/landscape/yoga_3.jpeg',
    alt: 'Yoga practice',
    likes: 45,
  },
  {
    id: 4,
    image: '/assets/images/landscape/yoga_4.jpeg',
    alt: 'Yoga practice',
    likes: 52,
  },
  {
    id: 5,
    image: '/assets/images/landscape/yoga_5.jpeg',
    alt: 'Yoga practice',
    likes: 41,
  },
  {
    id: 6,
    image: '/assets/images/landscape/yoga_6.jpeg',
    alt: 'Yoga practice',
    likes: 39,
  },
]

export function InstagramFeed() {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl font-light mb-3 sm:mb-4">
          Follow Our Journey
        </h2>
        <p className="text-base sm:text-lg text-[#1A1A1A]/70 max-w-2xl mx-auto">
          Connect with us on Instagram for daily inspiration and practice moments
        </p>
        <a
          href="https://instagram.com/samyoga"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          @samyoga →
        </a>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
        {instagramPosts.map((post, index) => (
          <motion.a
            key={post.id}
            href="https://instagram.com/samyoga"
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
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-medium">
                ❤️ {post.likes}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
