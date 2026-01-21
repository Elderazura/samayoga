'use client'

import { Section } from '@/components/Section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CTA } from '@/components/CTA'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Heart, Sparkles, Wind } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/landscape/yoga_1.jpeg"
            alt="Yoga practice"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-4 sm:mb-6 text-balance drop-shadow-lg text-white">
            Samayoga
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/95 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md px-2">
            Yoga for wellness, movement, and stillness. Find your balance through gentle, grounding practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button asChild size="lg" className="min-h-[48px] sm:min-h-[52px] text-base sm:text-lg px-6 sm:px-8">
              <Link href="/contact">Join a Class</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/90 hover:bg-white border-white/50 text-[#1A1A1A] min-h-[48px] sm:min-h-[52px] text-base sm:text-lg px-6 sm:px-8">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Teacher Highlight */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-500">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
                  <h2 className="text-2xl sm:text-3xl font-light mb-3 sm:mb-4">Samyuktha Nambiar</h2>
                  <p className="text-base sm:text-lg text-[#1A1A1A]/70 mb-3 sm:mb-4">
                    Hatha + Yin Yoga Teacher
                  </p>
                  <p className="text-sm sm:text-base text-[#1A1A1A]/80 leading-relaxed mb-4 sm:mb-6">
                    Your guide to finding balance through yoga. With a focus on wellness, breath, 
                    alignment, and calm strength, I offer practices that honor both movement and stillness.
                  </p>
                  <Button asChild variant="outline" className="w-full sm:w-auto min-h-[44px]">
                    <Link href="/about">My Story</Link>
                  </Button>
                </div>
                <div className="relative min-h-[250px] sm:min-h-[300px] md:min-h-[400px] overflow-hidden group order-1 md:order-2">
                  <Image
                    src="/assets/images/landscape/yoga_2.jpeg"
                    alt="Samyuktha Nambiar - Yoga Teacher"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Offerings Section */}
      <Section className="bg-white/30">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-light mb-3 sm:mb-4">Offerings</h2>
          <p className="text-base sm:text-lg text-[#1A1A1A]/70 max-w-2xl mx-auto px-4">
            Two complementary practices for different needs and energies.
          </p>
        </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
              <CardHeader>
                <motion.div 
                  className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Sparkles className="w-6 h-6 text-primary-600" />
                </motion.div>
                <CardTitle>Hatha Yoga</CardTitle>
                <CardDescription>
                  Active practice for strength, flexibility, and alignment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-[#1A1A1A]/80 leading-relaxed mb-6">
                  Through conscious movement and held poses, we build strength, 
                  improve flexibility, and explore our physical capabilities. 
                  Hatha yoga helps us feel energized, capable, and alive.
                </p>
                <ul className="space-y-2 text-sm text-[#1A1A1A]/70 mb-6">
                  <li>• Build physical strength and flexibility</li>
                  <li>• Improve alignment and body awareness</li>
                  <li>• Energize and invigorate the body</li>
                  <li>• Develop focus and concentration</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
              <CardHeader>
                <motion.div 
                  className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4"
                  whileHover={{ rotate: -360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Wind className="w-6 h-6 text-primary-600" />
                </motion.div>
                <CardTitle>Yin Yoga</CardTitle>
                <CardDescription>
                  Passive practice for deep release and restoration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-[#1A1A1A]/80 leading-relaxed mb-6">
                  Through long, supported holds, we release tension, calm the nervous system, 
                  and create space for stillness. Yin yoga helps us rest, restore, and let go.
                </p>
                <ul className="space-y-2 text-sm text-[#1A1A1A]/70 mb-6">
                  <li>• Release deep tension in connective tissues</li>
                  <li>• Calm the nervous system</li>
                  <li>• Practice patience and surrender</li>
                  <li>• Create space for reflection and rest</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* How Classes Work */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-6">How Classes Work</h2>
          <p className="text-lg text-[#1A1A1A]/80 leading-relaxed mb-8">
            Classes are conducted online via Google Meet, allowing you to practice 
            from the comfort of your own space. All levels welcome—beginner-friendly 
            with modifications offered throughout.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8">
            <div className="text-center sm:text-left">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto sm:mx-0 mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl">1</span>
              </div>
              <h3 className="font-medium mb-2 text-base sm:text-lg">Book a Session</h3>
              <p className="text-sm text-[#1A1A1A]/70">Contact us to schedule</p>
            </div>
            <div className="text-center sm:text-left">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto sm:mx-0 mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl">2</span>
              </div>
              <h3 className="font-medium mb-2 text-base sm:text-lg">Join Online</h3>
              <p className="text-sm text-[#1A1A1A]/70">Receive your Meet link</p>
            </div>
            <div className="text-center sm:text-left">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto sm:mx-0 mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl">3</span>
              </div>
              <h3 className="font-medium mb-2 text-base sm:text-lg">Practice Together</h3>
              <p className="text-sm text-[#1A1A1A]/70">Move, breathe, rest</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Gallery Preview */}
      <Section className="bg-white/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-4">Practice Gallery</h2>
            <p className="text-lg text-[#1A1A1A]/70">
              Moments from our yoga practice
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {[4, 5, 6, 7].map((num, index) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer"
              >
                <Image
                  src={`/assets/images/landscape/yoga_${num}.jpeg`}
                  alt={`Yoga practice ${num}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/media">View Full Gallery</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Testimonials Placeholder */}
      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-8">What Students Say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <p className="text-[#1A1A1A]/80 leading-relaxed mb-4 italic">
                    "Samyuktha's classes have helped me find balance in my busy life. 
                    Her gentle approach makes yoga accessible and meaningful."
                  </p>
                  <p className="text-sm text-[#1A1A1A]/60">— Student Name</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <p className="text-[#1A1A1A]/80 leading-relaxed mb-4 italic">
                    "I appreciate how she adapts the practice to what I need each day. 
                    Sometimes it's movement, sometimes it's stillness—and both feel perfect."
                  </p>
                  <p className="text-sm text-[#1A1A1A]/60">— Student Name</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <CTA
          title="Ready to Begin?"
          description="Start your yoga journey with a gentle, grounding practice that honors where you are."
          primaryAction={{
            label: "Join a Class",
            href: "/contact"
          }}
          secondaryAction={{
            label: "Read the Blog",
            href: "/blog"
          }}
        />
      </Section>
    </>
  )
}