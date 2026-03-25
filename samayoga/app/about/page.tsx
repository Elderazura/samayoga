'use client'

import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Testimonials } from '@/components/Testimonials'
import { InstagramFeed } from '@/components/InstagramFeed'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <>
      <PageHeader
        title="About"
        description="Learn about the teacher, the approach, and what to expect in your practice."
      />

      {/* Teacher Story */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="/assets/images/landscape/yoga_2.jpeg"
                alt="Samyuktha Nambiar - Yoga Teacher"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">
                My Story
              </h2>
              <div className="space-y-6 text-[#1A1A1A]/80 leading-relaxed">
                <p className="text-lg font-light">
                  My journey with yoga began as a quiet search for balance — in my body, in my mind, 
                  and in the way I was living my life. What I discovered was more than physical practice. 
                  It became a way of being, one that honors both movement and stillness, effort and ease.
                </p>
                <p className="text-base">
                  Over the years, through practice and study, yoga taught me that it isn&apos;t about 
                  perfection or pushing through. It&apos;s about presence. About patience. About meeting 
                  ourselves — and our bodies — with kindness.
                </p>
                <p className="text-base font-medium">
                  Today, I offer Hatha and Yin yoga, along with pranayama and meditation, creating 
                  space for strength, softness, breath, and stillness. Whether you&apos;re seeking movement 
                  and stability or deep rest and release, there is a practice here for you. And whether 
                  you&apos;re new to yoga or have been walking this path for years — you are welcome.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Additional Images Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative h-[250px] rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src="/assets/images/landscape/yoga_3.jpeg"
                alt="Yoga practice"
                fill
                className="object-cover hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-[250px] rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src="/assets/images/landscape/yoga_4.jpeg"
                alt="Yoga practice"
                fill
                className="object-cover hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative h-[250px] rounded-xl overflow-hidden shadow-lg sm:col-span-2 lg:col-span-1"
            >
              <Image
                src="/assets/images/landscape/yoga_5.jpeg"
                alt="Yoga practice"
                fill
                className="object-cover hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Approach */}
      <Section className="bg-white/30">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light mb-12 text-center tracking-tight"
          >
            My Approach
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-medium">Wellness</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#1A1A1A]/80 leading-relaxed text-base">
                    Yoga as a tool for overall wellness—physical, mental, and emotional. 
                    The practice supports your whole being, not just your body.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-medium">Breath</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#1A1A1A]/80 leading-relaxed text-base">
                    Conscious breathing as the foundation of practice. Through breath, 
                    we connect body and mind, and find our center.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-medium">Alignment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#1A1A1A]/80 leading-relaxed text-base">
                    Safe, mindful alignment that honors your body&apos;s unique needs. 
                    We practice with awareness and care, not force or strain.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-medium">Calm Strength</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#1A1A1A]/80 leading-relaxed text-base">
                    Building strength that comes from steadiness and ease, not tension 
                    or struggle. Calm strength that supports you both on and off the mat.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* What to Expect */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light mb-12 tracking-tight"
          >
            What to Expect
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-medium mb-4">Beginner-Friendly</h3>
              <p className="text-[#1A1A1A]/80 leading-relaxed text-base">
                All classes welcome beginners. No prior experience necessary. 
                We start where you are and move from there.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-2xl font-medium mb-4">Modifications Offered</h3>
              <p className="text-[#1A1A1A]/80 leading-relaxed text-base">
                Every pose can be adapted to your body and your needs. 
                Modifications and variations are always offered.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-2xl font-medium mb-4">Non-Competitive</h3>
              <p className="text-[#1A1A1A]/80 leading-relaxed text-base">
                This is your practice, not a performance. We honor our own bodies 
                and our own limits, without comparison or judgment.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-2xl font-medium mb-4">Gentle Guidance</h3>
              <p className="text-[#1A1A1A]/80 leading-relaxed text-base">
                Clear, kind instruction that helps you find your way. 
                Questions are welcome, and your comfort is always the priority.
              </p>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-white/30">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light mb-12 text-center tracking-tight"
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: "How long are the classes?",
                answer: "Hatha and Yin classes are typically 60 minutes. Breathwork and meditation sessions may vary in length depending on the focus and experience of the class. The exact duration is always shared at the time of booking."
              },
              {
                question: "Can I practice if I have injuries or limitations?",
                answer: "Yes. Please let me know about any injuries or limitations when you book. The practice can be adapted to support your body and your comfort. Yoga is meant to feel supportive, never painful."
              },
              {
                question: "How do I know which class is right for me?",
                answer: "If you're unsure, feel free to reach out. I'm happy to guide you toward a class that best suits your needs and energy."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#1A1A1A]/80 leading-relaxed text-base">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="bg-white/30">
        <Testimonials />
      </Section>

      {/* Instagram Feed */}
      <Section>
        <InstagramFeed />
      </Section>
    </>
  )
}
