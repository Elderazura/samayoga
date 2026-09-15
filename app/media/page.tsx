'use client'

import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { InstagramFeed } from '@/components/InstagramFeed'
import { MediaShield } from '@/components/MediaShield'
import mediaData from '@/src/content/media/media.json'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface MediaItem {
  id: string
  src: string
  alt: string
  caption?: string
}

interface MediaData {
  images: {
    landscape: MediaItem[]
    portrait: MediaItem[]
  }
}

const typedMediaData = mediaData as MediaData
const allImages = [
  ...typedMediaData.images.landscape,
  ...typedMediaData.images.portrait,
]

export default function Media() {
  return (
    <>
      <PageHeader
        title="Media"
        description="Moments from class and practice — strength, stillness, and breath."
      />

      <Section>
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="eyebrow mb-3">Gallery</p>
          <h2 className="font-display">Practice in frame</h2>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {allImages.map((image, index) => {
            const isPortrait = typedMediaData.images.portrait.some((p) => p.id === image.id)
            return (
              <motion.figure
                key={image.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
                className="group"
              >
                <MediaShield
                  className={`overflow-hidden ${
                    isPortrait ? 'aspect-[3/4]' : 'aspect-[4/3]'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    draggable={false}
                  />
                </MediaShield>
              </motion.figure>
            )
          })}
        </div>
      </Section>

      <Section>
        <InstagramFeed />
      </Section>
    </>
  )
}
