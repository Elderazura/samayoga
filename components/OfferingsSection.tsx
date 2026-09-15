'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type Offering = {
  title: string
  tagline: string
  description: string
  points: string[]
  image: string
  imageAlt: string
}

const offerings: Offering[] = [
  {
    title: 'Hatha Yoga',
    tagline: 'A steady practice for strength, flexibility, and balance.',
    description:
      'Hatha yoga brings together mindful movement, physical postures, and conscious breathing. Through a balanced and intentional practice, we build strength, improve mobility, and develop greater awareness of the body and mind.',
    points: [
      'Build strength and flexibility at a sustainable pace',
      'Improve mobility, balance, and body awareness',
      'Release physical tension and stiffness',
      'Cultivate steadiness, focus, and ease',
    ],
    image: '/assets/images/studio/practice-block.jpg',
    imageAlt: 'Focused Hatha practice with props',
  },
  {
    title: 'Vinyasa Flow',
    tagline: 'A dynamic practice where movement and breath come together.',
    description:
      'Vinyasa Flow offers a more fluid and energising approach to yoga, linking postures with the rhythm of the breath. The practice builds strength, mobility, coordination, and presence while inviting you to move with greater freedom and awareness.',
    points: [
      'Build strength, stamina, and mobility',
      'Develop coordination and body awareness',
      'Explore movement with breath and intention',
      'Leave feeling energised, grounded, and connected',
    ],
    image: '/assets/images/studio/practice-flow.jpg',
    imageAlt: 'Dynamic flow in the studio',
  },
  {
    title: 'Yin Yoga',
    tagline: 'A slow, nurturing practice for release, rest, and deeper ease.',
    description:
      'Yin yoga invites you to slow down and spend more time in supported, longer-held postures. With space to soften and listen inward, the practice encourages relaxation, gentle release, and a deeper connection with the body.',
    points: [
      'Ease into areas of tension and tightness',
      'Support flexibility and joint mobility',
      'Encourage rest, relaxation, and recovery',
      'Create space for stillness and self-awareness',
    ],
    image: '/assets/images/studio/practice-portrait.jpg',
    imageAlt: 'Soft yin-style practice',
  },
  {
    title: 'Breathwork — Pranayama',
    tagline: 'Mindful breathing practices for calm, clarity, and balance.',
    description:
      'The breath is a bridge between the body and the mind. Through guided pranayama practices, we explore the breath with awareness, learning to regulate our pace, settle the mind, and create a greater sense of steadiness within.',
    points: [
      'Develop greater awareness of the breath',
      'Support relaxation and mental clarity',
      'Create space around stress and overwhelm',
      'Cultivate balance, presence, and inner calm',
    ],
    image: '/assets/images/studio/atmosphere-2.jpg',
    imageAlt: 'Breath-centered practice',
  },
  {
    title: 'Meditation',
    tagline: 'A quiet practice for presence, perspective, and inner stillness.',
    description:
      'Meditation offers an opportunity to pause, turn inward, and observe the mind without judgment. Through guided practices, we learn to create more space between our thoughts and respond to life with greater awareness and ease.',
    points: [
      'Develop focus and attention',
      'Create distance from mental noise',
      'Encourage emotional awareness and balance',
      'Cultivate presence, clarity, and inner calm',
    ],
    image: '/assets/images/studio/teacher.jpg',
    imageAlt: 'Seated meditation',
  },
]

export function OfferingsSection() {
  const [active, setActive] = useState(0)
  const current = offerings[active]

  return (
    <section
      className="border-y border-stone-300/70 bg-primary-100/35 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      aria-labelledby="offerings-heading"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-16 lg:items-start">
        {/* Intro + image */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <p className="eyebrow mb-3">Offerings</p>
          <h2 id="offerings-heading" className="mb-4 font-display text-balance">
            Ways to practice
          </h2>
          <p className="mb-8 max-w-md text-lg leading-relaxed text-umber-muted">
            Build strength, move with awareness, breathe more deeply, and make space for stillness.
            There is a place for you here — whether you want energy, release, or quiet reconnection.
          </p>

          <div className="relative mb-8 aspect-[4/5] overflow-hidden sm:aspect-[5/6] lg:mb-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0"
              >
                <Image
                  src={current.image}
                  alt={current.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority={active === 0}
                />
              </motion.div>
            </AnimatePresence>
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-umber/55 to-transparent px-4 pb-4 pt-16"
              aria-hidden
            >
              <p className="font-display text-xl text-stone-50 sm:text-2xl">{current.title}</p>
              <p className="mt-1 text-sm text-stone-100/85">{current.tagline}</p>
            </div>
          </div>

          <Button asChild>
            <Link href="/register">Join a class</Link>
          </Button>
        </div>

        {/* Accordion list */}
        <div className="lg:col-span-7">
          <ul className="border-t border-stone-300/80">
            {offerings.map((item, index) => {
              const isOpen = active === index
              const panelId = `offering-panel-${index}`
              const buttonId = `offering-trigger-${index}`

              return (
                <li key={item.title} className="border-b border-stone-300/80">
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setActive(index)}
                    className={cn(
                      'group flex w-full cursor-pointer items-start gap-4 py-5 text-left transition-colors duration-200 sm:gap-6 sm:py-6',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-100'
                    )}
                  >
                    <span
                      className={cn(
                        'mt-1 font-sans text-xs tracking-[0.14em] transition-colors',
                        isOpen ? 'text-primary-600' : 'text-umber-soft'
                      )}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          'block font-display text-2xl transition-colors sm:text-3xl',
                          isOpen ? 'text-umber' : 'text-umber-muted group-hover:text-umber'
                        )}
                      >
                        {item.title}
                      </span>
                      {!isOpen && (
                        <span className="mt-1 block text-sm text-umber-soft sm:text-base">
                          {item.tagline}
                        </span>
                      )}
                    </span>
                    <span
                      className={cn(
                        'mt-2 text-lg leading-none text-primary-600 transition-transform duration-200',
                        isOpen ? 'rotate-45' : 'rotate-0'
                      )}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pb-7 pl-10 pr-2 sm:pb-8 sm:pl-14">
                          <p className="mb-2 text-sm font-medium text-primary-600">
                            {item.tagline}
                          </p>
                          <p className="mb-5 max-w-xl leading-relaxed text-umber-muted">
                            {item.description}
                          </p>
                          <ul className="grid gap-2.5 sm:grid-cols-2">
                            {item.points.map((point) => (
                              <li
                                key={point}
                                className="flex gap-2.5 text-sm text-umber-soft"
                              >
                                <span
                                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary-500"
                                  aria-hidden
                                />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
