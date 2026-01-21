'use client'

import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import mediaData from '@/src/content/media/media.json'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Media() {
  return (
    <>
      <PageHeader
        title="Media"
        description="Explore our gallery and video content from classes and practice."
      />

      {/* Gallery Section */}
      <Section>
        <h2 className="text-3xl font-light mb-8 text-center">Gallery</h2>
        
        {/* Landscape Images */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-6">Gallery Images</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaData.images.landscape.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="overflow-hidden group h-full hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-video relative overflow-hidden bg-primary-50/50">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <p className="text-sm text-[#1A1A1A]/70">{image.caption}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

      </Section>

      {/* Video Section */}
      {mediaData.videos && (mediaData.videos.landscape.length > 0 || mediaData.videos.portrait.length > 0) && (
        <Section className="bg-white/30">
          <h2 className="text-3xl font-light mb-8 text-center">Videos</h2>
          
          {/* Landscape Videos */}
          {mediaData.videos.landscape.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-medium mb-6">Video Content</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {mediaData.videos.landscape.map((video: any) => (
                  <Card key={video.id} className="overflow-hidden">
                    <div className="aspect-video bg-primary-50/50 flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="text-4xl mb-2">▶️</div>
                        <p className="text-xs text-[#1A1A1A]/60">Video: {video.title}</p>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{video.title}</CardTitle>
                      <CardDescription>{video.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Portrait Videos */}
          {mediaData.videos.portrait.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-medium mb-6">Portrait Videos</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {mediaData.videos.portrait.map((video: any) => (
                  <Card key={video.id} className="overflow-hidden">
                    <div className="aspect-[4/5] bg-primary-50/50 flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="text-4xl mb-2">▶️</div>
                        <p className="text-xs text-[#1A1A1A]/60">Video: {video.title}</p>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{video.title}</CardTitle>
                      <CardDescription>{video.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </Section>
      )}
    </>
  )
}