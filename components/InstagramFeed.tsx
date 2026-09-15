'use client'

import Link from 'next/link'
import { Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '@/lib/social'
import { InstagramReelsSlider } from '@/components/InstagramReelsSlider'

export function InstagramFeed() {
  return (
    <section
      className="border-y border-stone-300/70 bg-stone-100/80 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      aria-labelledby="instagram-heading"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Reels — left on desktop */}
        <div className="flex justify-center lg:col-span-5 lg:justify-start">
          <InstagramReelsSlider />
        </div>

        {/* Copy */}
        <div className="lg:col-span-7">
          <p className="eyebrow mb-3">Community</p>
          <h2 id="instagram-heading" className="mb-4 font-display text-balance">
            Follow the journey
          </h2>
          <p className="mb-8 max-w-lg text-lg leading-relaxed text-umber-muted">
            Practice moments, class energy, and quiet stillness — shared on Instagram.
            The preview beside you cycles through portrait clips from our library; live posts
            and stories are on the profile.
          </p>

          <div className="mb-8 flex items-start gap-4 border-t border-stone-300/80 pt-8">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center border border-stone-300 bg-primary-100"
              aria-hidden
            >
              <Instagram className="h-6 w-6 text-primary-700" />
            </div>
            <div className="min-w-0">
              <p className="eyebrow mb-1">On Instagram</p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-2xl text-primary-700 transition-colors hover:text-primary-800 sm:text-3xl break-all"
              >
                {INSTAGRAM_HANDLE}
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                Open profile
              </a>
            </Button>
            <Link
              href="/media"
              className="text-sm font-medium text-primary-700 underline-offset-4 transition-colors hover:underline"
            >
              View photo gallery
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
