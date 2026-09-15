'use client'

import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { InstagramFeed } from '@/components/InstagramFeed'
import { MediaShield } from '@/components/MediaShield'
import Image from 'next/image'
import { motion } from 'framer-motion'

const approach = [
  {
    title: 'Holistic Wellness',
    body: 'Yoga is a practice that supports the whole person — body, mind, and emotions. Beyond physical strength and flexibility, it creates space for greater awareness, balance, and a deeper sense of wellbeing.',
  },
  {
    title: 'Breath & Awareness',
    body: 'The breath connects the body and the mind. Through mindful breathing and movement, we learn to slow down, become more present, and develop a deeper awareness of ourselves.',
  },
  {
    title: 'Mindful Movement',
    body: 'Every body is different, and every practice is personal. We explore movement with care, respect our individual needs, and find ways to practice that feel supportive rather than forced.',
  },
  {
    title: 'Calm Strength',
    body: 'Yoga invites us to explore both effort and ease. We build physical strength while learning to soften, rest, and find steadiness — qualities that support us both on and off the mat.',
  },
]

const storyParagraphs = [
  'For a long time, I was living the familiar rhythm of a corporate nine-to-five. Somewhere amidst the busy routines and demands of everyday life, I began to feel disconnected from myself. My body was going through its own changes, from hormonal imbalances to physical discomfort that led me to seek help from physiotherapists. I often found myself overwhelmed, overthinking, and searching for a sense of balance that seemed difficult to find.',
  'Yet, through it all, there was always a quiet feeling within me that I was meant to explore yoga. Three years ago, I finally decided to follow that feeling and begin my journey. What started as a personal practice has since changed my life in ways I never expected. Yoga made me physically stronger and fitter, but its impact went far beyond the physical. It brought me mental clarity, helped me find perspective in things I once overthought, and slowly changed the way I understood myself and the world around me.',
  'It taught me that feeling well is not just about how our bodies look or what they can do, but also about how we feel within ourselves.',
  'Over time, I realised that yoga is not about touching your toes to your head, perfecting every asana, or mastering the most advanced arm balance. These things may be part of the practice, but they are not its essence.',
  'For me, yoga is a journey inward. With consistent practice, it invites us to notice our thoughts, our patterns, our emotions, and the way we experience the world. And slowly, it changes the way we move through life.',
  'That is the journey I want to share.',
  'Today, I am a 500-hour certified yoga instructor, trained in Hatha, Vinyasa, and Yin yoga, along with pranayama and meditation. Through Samayoga, I hope to create a space where you can build strength, find stillness, breathe a little deeper, and reconnect with yourself.',
  'Because yoga, for me, is about healing from within, long before it shows up on the outside.',
]

export default function About() {
  return (
    <>
      <PageHeader
        title="About"
        description="The teacher, the approach, and the journey behind Samayoga."
      />

      <Section>
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 grid items-start gap-10 md:grid-cols-2 md:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[4/5] overflow-hidden md:sticky md:top-28"
            >
              <Image
                src="/assets/images/studio/teacher.jpg"
                alt="Samyuktha Nambiar — Yoga Teacher"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <p className="eyebrow mb-3">Teacher</p>
              <h2 className="mb-6 font-display">My Story</h2>
              <div className="space-y-5 text-umber-muted leading-relaxed">
                {storyParagraphs.map((p, i) => (
                  <p
                    key={i}
                    className={
                      i === storyParagraphs.length - 1
                        ? 'font-medium text-umber'
                        : i === 5
                          ? 'font-display text-xl text-umber italic'
                          : ''
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Credentials — certificates shown separately */}
      <Section className="bg-primary-100/40">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl sm:mb-12">
            <p className="eyebrow mb-3">Credentials</p>
            <h2 className="mb-4 font-display">Training &amp; certification</h2>
            <p className="text-lg leading-relaxed text-umber-muted">
              Yoga Alliance–aligned teacher training — each certificate shown on its own so the
              qualification is clear.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {[
              {
                src: '/assets/images/certificates/ryt-200.jpg',
                alt: 'Certificate of Completion — Ekam Yogashala 200 Hour Yoga Teacher Training, awarded to Samyuktha Nambiar, Rishikesh, 24 Oct 2024',
                hours: '200 hours',
                title: 'Yoga Teacher Training · RYT 200',
                detail: 'Ekam Yogashala, Rishikesh · Yoga Alliance · Oct 2024',
                landscape: true,
              },
              {
                src: '/assets/images/certificates/yin-100.jpg',
                alt: 'Certificate of Completion — 100-hour Yin Yoga Teacher Training, Vinyasa Yoga Ashram, awarded to Samyuktha Nambiar',
                hours: '100 hours',
                title: 'Yin Yoga Teacher Training',
                detail: 'Vinyasa Yoga Ashram · Yoga Alliance CE · Mar 2025',
                landscape: false,
              },
              {
                src: '/assets/images/certificates/vinyasa-300.jpg',
                alt: 'Certificate of Completion — 300-hour Advance Ashtanga & Vinyasa Flow Level 2 Teacher Training, Vinyasa Yoga Ashram, awarded to Samyuktha Nambiar',
                hours: '300 hours',
                title: 'Ashtanga & Vinyasa Flow · Level 2',
                detail: 'Vinyasa Yoga Ashram · RYS 300 · Yoga Alliance · Jul 2026',
                landscape: false,
              },
            ].map((cert, index) => (
              <motion.article
                key={cert.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="flex flex-col border border-stone-300/80 bg-stone-50"
              >
                <MediaShield
                  className={`overflow-hidden bg-stone-200 ${
                    cert.landscape
                      ? 'aspect-[4/3] sm:aspect-[5/4]'
                      : 'aspect-[3/4] sm:aspect-[4/5]'
                  }`}
                >
                  <Image
                    src={cert.src}
                    alt={cert.alt}
                    fill
                    className="object-contain object-center p-3 sm:p-4"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    draggable={false}
                  />
                </MediaShield>
                <div className="mt-auto border-t border-stone-300/80 px-5 py-5 sm:px-6">
                  <p className="eyebrow mb-2">{cert.hours}</p>
                  <h3 className="mb-1 font-display text-xl sm:text-2xl">{cert.title}</h3>
                  <p className="text-sm text-umber-muted">{cert.detail}</p>
                </div>
              </motion.article>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-umber-soft">
            600 hours of registered teacher training · Yoga Alliance aligned
          </p>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { src: '/assets/images/studio/practice-block.jpg', alt: 'Focused class work with props' },
              { src: '/assets/images/studio/atmosphere.jpg', alt: 'Studio practice atmosphere' },
            ].map((img, index) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="relative h-[240px] overflow-hidden sm:h-[320px]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-primary-100/40">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <p className="eyebrow mb-3">Philosophy</p>
            <h2 className="font-display">My Approach</h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2">
            {approach.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="border-t border-stone-300/80 pt-6"
              >
                <h3 className="mb-3 font-display text-2xl">{item.title}</h3>
                <p className="leading-relaxed text-umber-muted">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 font-display">What to Expect</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: 'Beginner-Friendly',
                body: 'All classes welcome beginners. No prior experience necessary. We start where you are and move from there.',
              },
              {
                title: 'Modifications Offered',
                body: "Every pose can be adapted to your body and your needs. Modifications and variations are always offered.",
              },
              {
                title: 'Non-Competitive',
                body: 'This is your practice, not a performance. We honor our own bodies and our own limits, without comparison or judgment.',
              },
              {
                title: 'Gentle Guidance',
                body: 'Clear, kind instruction that helps you find your way. Questions are welcome, and your comfort is always the priority.',
              },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="mb-3 font-display text-2xl">{item.title}</h3>
                <p className="leading-relaxed text-umber-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-primary-100/40">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center font-display">Frequently Asked Questions</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                question: 'How long are the classes?',
                answer:
                  'Hatha, Vinyasa, and Yin classes are typically 60 minutes. Breathwork and meditation sessions may vary in length depending on the focus. The exact duration is always shared at the time of booking.',
              },
              {
                question: 'Can I practice if I have injuries or limitations?',
                answer:
                  'Yes. Please let me know about any injuries or limitations when you book. The practice can be adapted to support your body and your comfort. Yoga is meant to feel supportive, never painful.',
              },
              {
                question: 'How do I know which class is right for me?',
                answer:
                  "If you're unsure, feel free to reach out. I'm happy to guide you toward a class that best suits your needs and energy — whether that's Hatha, Vinyasa, Yin, breathwork, or meditation.",
              },
            ].map((faq) => (
              <Card key={faq.question} className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-umber-muted">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <InstagramFeed />
      </Section>
    </>
  )
}
