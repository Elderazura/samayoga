'use client'

import { Section } from '@/components/Section'
import { CTA } from '@/components/CTA'
import { Button } from '@/components/ui/button'
import { InstagramFeed } from '@/components/InstagramFeed'
import { OfferingsSection } from '@/components/OfferingsSection'
import { YOUTUBE_SHORTS_URL, YOUTUBE_HANDLE } from '@/lib/social'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { MediaShield } from '@/components/MediaShield'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5 },
}

export default function Home() {
  const reduceMotion = useReducedMotion()

  return (
    <>
      {/* Hero — full-bleed with living image motion */}
      <section className="relative flex min-h-[85vh] items-end overflow-hidden sm:min-h-[90vh]">
        <motion.div
          className="absolute inset-0 z-0 will-change-transform"
          initial={reduceMotion ? false : { scale: 1.08, x: '1%' }}
          animate={
            reduceMotion
              ? { scale: 1.06, x: 0 }
              : { scale: [1.08, 1.16], x: ['1%', '-1.5%'] }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: 28,
                  ease: 'linear',
                  repeat: Infinity,
                  repeatType: 'reverse',
                }
          }
        >
          <MediaShield className="absolute inset-0">
            <Image
              src="/assets/images/landscape/yoga_1.jpeg"
              alt="Yoga practice at Samayoga"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
              draggable={false}
            />
          </MediaShield>
        </motion.div>

        {/* Soft breathing light */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[1]"
          aria-hidden
          animate={
            reduceMotion
              ? { opacity: 0.4 }
              : { opacity: [0.35, 0.55, 0.4, 0.5, 0.35] }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 12, ease: 'easeInOut', repeat: Infinity }
          }
          style={{
            background:
              'radial-gradient(ellipse 80% 55% at 70% 35%, rgba(244,241,234,0.22) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 20% 70%, rgba(92,107,82,0.18) 0%, transparent 50%)',
          }}
        />

        <div
          className="absolute inset-0 z-[2] bg-gradient-to-t from-umber/80 via-umber/30 to-primary-900/20"
          aria-hidden
        />

        {!reduceMotion && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-[28%] z-[2] h-24 opacity-30"
            aria-hidden
            animate={{ x: ['-8%', '8%'] }}
            transition={{
              duration: 22,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(244,241,234,0.35) 40%, rgba(244,241,234,0.2) 60%, transparent 100%)',
              filter: 'blur(28px)',
            }}
          />
        )}

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-32 sm:px-6 sm:pb-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-2xl"
          >
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-stone-100/80">
              Online · Hatha · Vinyasa · Yin
            </p>
            <h1 className="mb-5 font-display text-5xl text-stone-50 sm:text-6xl md:text-7xl">
              Samayoga
            </h1>
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-stone-100/90 sm:text-xl">
              Yoga for wellness, movement, and stillness. A gentle, grounding practice you can return to.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="bg-stone-50 text-primary-700 hover:bg-stone-100">
                <Link href="/register">Join a Class</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-stone-50/70 text-stone-50 hover:bg-stone-50/10 hover:text-stone-50"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Teacher */}
      <Section>
        <motion.div {...fadeUp} className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14">
          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/6]">
            <Image
              src="/assets/images/studio/teacher.jpg"
              alt="Samyuktha Nambiar — Yoga Teacher"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div>
            <p className="eyebrow mb-3">Teacher</p>
            <h2 className="mb-3 font-display">Samyuktha Nambiar</h2>
            <p className="mb-5 text-lg text-primary-600">
              500-hour certified · Hatha · Vinyasa · Yin
            </p>
            <p className="mb-8 leading-relaxed text-umber-muted">
              Through Samayoga, I hope to create a space where you can build strength, find stillness,
              breathe a little deeper, and reconnect with yourself — healing from within, long before
              it shows up on the outside.
            </p>
            <Button asChild variant="outline">
              <Link href="/about">My Story</Link>
            </Button>
          </div>
        </motion.div>
      </Section>

      {/* Practice video */}
      <section
        className="border-y border-stone-300/70 bg-primary-100/40 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        aria-labelledby="practice-video-heading"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">Practice</p>
            <h2 id="practice-video-heading" className="mb-4 font-display text-balance">
              Guided practice on screen
            </h2>
            <p className="mb-6 max-w-md text-lg leading-relaxed text-umber-muted">
              Full-length practice videos are on the way — soft sequences you can return to
              anytime. Meanwhile, short clips live on YouTube.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild>
                <a href={YOUTUBE_SHORTS_URL} target="_blank" rel="noopener noreferrer">
                  Watch Shorts
                </a>
              </Button>
              <p className="text-sm text-umber-soft">{YOUTUBE_HANDLE}</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-video overflow-hidden border border-stone-300/80 bg-umber">
              <Image
                src="/assets/images/studio/atmosphere.jpg"
                alt=""
                fill
                className="object-cover opacity-70"
                sizes="(max-width: 1024px) 100vw, 58vw"
                aria-hidden
              />
              <div
                className="absolute inset-0 bg-gradient-to-tr from-umber/55 via-umber/20 to-transparent"
                aria-hidden
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                <span className="mb-4 inline-flex items-center gap-2 rounded-md border border-stone-50/30 bg-umber/40 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-stone-50 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-clay-soft" aria-hidden />
                  Coming soon
                </span>
                <p className="max-w-sm font-display text-2xl text-stone-50 sm:text-3xl">
                  Practice videos landing here
                </p>
                <p className="mt-2 max-w-xs text-sm text-stone-100/80">
                  Until then, explore Shorts for a taste of the practice.
                </p>
                <a
                  href={YOUTUBE_SHORTS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex h-14 w-14 items-center justify-center rounded-full border border-stone-50/50 bg-stone-50/15 text-stone-50 transition-colors hover:bg-stone-50/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-50 focus-visible:ring-offset-2 focus-visible:ring-offset-umber"
                  aria-label="Open YouTube Shorts"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="ml-0.5 h-5 w-5 fill-current"
                    aria-hidden
                  >
                    <path d="M8 5.14v13.72L19 12 8 5.14z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offerings */}
      <OfferingsSection />

      {/* How classes work */}
      <section
        className="border-b border-stone-300/70 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        aria-labelledby="how-classes-heading"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 lg:mb-16 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-6">
              <p className="eyebrow mb-3">Online practice</p>
              <h2 id="how-classes-heading" className="font-display text-balance">
                How classes work
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="text-lg leading-relaxed text-umber-muted">
                Classes meet on Google Meet from your own space. All levels welcome —
                beginner-friendly, with modifications offered throughout.
              </p>
            </div>
          </div>

          <div className="relative">
            <div
              className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-5 hidden h-px bg-primary-300/70 sm:block"
              aria-hidden
            />
            <ol className="grid gap-10 sm:grid-cols-3 sm:gap-0">
              {[
                {
                  step: '01',
                  title: 'Book a session',
                  body: 'Register online or send a note. Share your preferred style and time, and we will confirm the next steps.',
                  href: '/register',
                  linkLabel: 'Register',
                },
                {
                  step: '02',
                  title: 'Join online',
                  body: 'You will receive a Google Meet link by email before class — no studio commute, just a quiet corner and a mat.',
                },
                {
                  step: '03',
                  title: 'Practice together',
                  body: 'Move, breathe, and rest with guided cues. Practice at your pace, with options that honor where your body is today.',
                },
              ].map((item, index) => (
                <li
                  key={item.step}
                  className={`relative border-t border-stone-300/80 pt-8 sm:border-t-0 sm:pt-0 ${
                    index > 0
                      ? 'sm:border-l sm:border-stone-300/60 sm:pl-8 lg:pl-10'
                      : 'sm:pr-8 lg:pr-10'
                  }`}
                >
                  <div className="mb-5 flex items-center gap-3 sm:mb-6 sm:flex-col sm:items-start sm:gap-4">
                    <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-primary-400 bg-stone-100 font-sans text-xs tracking-[0.12em] text-primary-700">
                      {item.step}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl">{item.title}</h3>
                  </div>
                  <p className="max-w-sm leading-relaxed text-umber-muted">{item.body}</p>
                  {'href' in item && item.href && (
                    <Link
                      href={item.href}
                      className="mt-5 inline-flex text-sm font-medium text-primary-700 underline-offset-4 transition-colors hover:text-primary-800 hover:underline"
                    >
                      {item.linkLabel}
                      <span aria-hidden className="ml-1">
                        →
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Gallery — real studio practice */}
      <Section>
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <p className="eyebrow mb-3">Gallery</p>
          <h2 className="mb-3 font-display">Moments from practice</h2>
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
          {[
            { src: '/assets/images/studio/practice-block.jpg', alt: 'Holding focus in class' },
            { src: '/assets/images/studio/practice-studio.jpg', alt: 'Studio practice' },
            { src: '/assets/images/studio/practice-flow.jpg', alt: 'Flow and movement' },
            { src: '/assets/images/studio/practice-portrait.jpg', alt: 'Grounded practice' },
          ].map((img, index) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="relative aspect-[4/5] overflow-hidden"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline">
            <Link href="/media">View full gallery</Link>
          </Button>
        </div>
      </Section>

      <InstagramFeed />

      <Section className="!pb-20 sm:!pb-24">
        <CTA
          eyebrow="Your practice"
          title="Ready to begin?"
          description="Start with a gentle, grounding practice that honors where you are — online, at your pace, with space to grow."
          primaryAction={{ label: 'Register for classes', href: '/register' }}
          secondaryAction={{ label: 'Read the blog', href: '/blog' }}
          tertiaryAction={{ label: 'Questions first? Get in touch', href: '/contact' }}
          image={{
            src: '/assets/images/studio/practice-portrait.jpg',
            alt: 'Student in a grounded yoga pose',
          }}
        />
      </Section>
    </>
  )
}
