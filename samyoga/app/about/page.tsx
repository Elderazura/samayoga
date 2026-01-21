'use client'

import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/assets/images/landscape/yoga_3.jpeg"
                alt="Samyuktha Nambiar - Yoga Teacher"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="text-3xl font-light mb-6">My Story</h2>
              <div className="prose prose-lg max-w-none text-[#1A1A1A]/80 leading-relaxed space-y-4">
                <p>
                  My journey with yoga began as a search for balance—in my body, in my mind, 
                  and in my life. What I found was more than a practice; it was a way of being 
                  that honors both movement and stillness, effort and ease.
                </p>
                <p>
                  Through years of practice and study, I've learned that yoga isn't about 
                  perfection or pushing through. It's about presence, patience, and kindness—to 
                  ourselves and to our bodies.
                </p>
              </div>
            </div>
          </div>
          <div className="prose prose-lg max-w-none text-[#1A1A1A]/80 leading-relaxed">
            <p>
              Today, I offer Hatha and Yin yoga classes that help students find their own 
              balance. Whether you need movement and strength or stillness and release, 
              there's a practice for you. And whether you're new to yoga or have been 
              practicing for years, you're welcome here.
            </p>
          </div>
        </div>
      </Section>

      {/* Approach */}
      <Section className="bg-white/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-light mb-6 sm:mb-8 text-center">My Approach</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Wellness</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#1A1A1A]/80 leading-relaxed">
                  Yoga as a tool for overall wellness—physical, mental, and emotional. 
                  The practice supports your whole being, not just your body.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Breath</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#1A1A1A]/80 leading-relaxed">
                  Conscious breathing as the foundation of practice. Through breath, 
                  we connect body and mind, and find our center.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Alignment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#1A1A1A]/80 leading-relaxed">
                  Safe, mindful alignment that honors your body's unique needs. 
                  We practice with awareness and care, not force or strain.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Calm Strength</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#1A1A1A]/80 leading-relaxed">
                  Building strength that comes from steadiness and ease, not tension 
                  or struggle. Calm strength that supports you both on and off the mat.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* What to Expect */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-light mb-4 sm:mb-6">What to Expect</h2>
          <div className="space-y-6 text-[#1A1A1A]/80 leading-relaxed">
            <div>
              <h3 className="text-xl font-medium mb-3">Beginner-Friendly</h3>
              <p>
                All classes welcome beginners. No prior experience necessary. 
                We start where you are and move from there.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3">Modifications Offered</h3>
              <p>
                Every pose can be adapted to your body and your needs. 
                Modifications and variations are always offered.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3">Non-Competitive</h3>
              <p>
                This is your practice, not a performance. We honor our own bodies 
                and our own limits, without comparison or judgment.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3">Gentle Guidance</h3>
              <p>
                Clear, kind instruction that helps you find your way. 
                Questions are welcome, and your comfort is always the priority.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-white/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do I need prior yoga experience?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#1A1A1A]/80 leading-relaxed">
                  No, not at all. All classes are beginner-friendly, and modifications 
                  are offered throughout. We start where you are.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What should I bring to class?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#1A1A1A]/80 leading-relaxed">
                  Just yourself and a yoga mat. Props like blocks, blankets, and straps 
                  can be helpful but aren't required. Use what you have or can easily find.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How long are the classes?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#1A1A1A]/80 leading-relaxed">
                  Class length varies. Hatha classes are typically 60-75 minutes, 
                  while Yin classes are usually 45-60 minutes. Duration is always 
                  confirmed when you book.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do I need to be flexible to practice yoga?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#1A1A1A]/80 leading-relaxed">
                  Absolutely not. Yoga isn't about being flexible—it's about meeting 
                  yourself where you are and practicing with kindness. Flexibility 
                  comes with time, but it's never the goal.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I practice if I have injuries or limitations?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#1A1A1A]/80 leading-relaxed">
                  Yes. Please let me know about any injuries or limitations when you book. 
                  We'll adapt the practice to honor your body and support your healing. 
                  Yoga should never cause pain.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </>
  )
}