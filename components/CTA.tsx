import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CTAProps {
  title: string
  description?: string
  eyebrow?: string
  primaryAction?: {
    label: string
    href: string
  }
  secondaryAction?: {
    label: string
    href: string
  }
  /** Optional text link below buttons (e.g. contact) */
  tertiaryAction?: {
    label: string
    href: string
  }
  image?: {
    src: string
    alt: string
  }
  className?: string
}

export function CTA({
  title,
  description,
  eyebrow = 'Begin',
  primaryAction,
  secondaryAction,
  tertiaryAction,
  image,
  className,
}: CTAProps) {
  return (
    <div
      className={cn(
        'overflow-hidden border border-stone-300/80 bg-primary-700 text-stone-50',
        className
      )}
    >
      <div className="grid lg:grid-cols-12">
        <div className="flex flex-col justify-center px-6 py-12 sm:px-10 sm:py-14 lg:col-span-7 lg:px-12 lg:py-16">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-primary-100">
            {eyebrow}
          </p>
          <h2 className="mb-4 font-display text-3xl text-stone-50 sm:text-4xl lg:text-[2.75rem]">
            {title}
          </h2>
          {description && (
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-stone-100/90">
              {description}
            </p>
          )}
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {primaryAction && (
              <Button
                asChild
                size="lg"
                className="bg-stone-50 text-primary-700 hover:bg-stone-100"
              >
                <Link href={primaryAction.href}>{primaryAction.label}</Link>
              </Button>
            )}
            {secondaryAction && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-stone-50/60 bg-transparent text-stone-50 hover:bg-stone-50/10 hover:text-stone-50"
              >
                <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
              </Button>
            )}
          </div>
          {tertiaryAction && (
            <p className="mt-6 text-sm text-stone-100/75">
              <Link
                href={tertiaryAction.href}
                className="underline-offset-4 transition-colors hover:text-stone-50 hover:underline"
              >
                {tertiaryAction.label}
              </Link>
            </p>
          )}
        </div>

        {image ? (
          <div className="relative min-h-[220px] lg:col-span-5 lg:min-h-0">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-primary-700 via-primary-700/40 to-transparent lg:from-primary-700/90 lg:via-primary-700/20"
              aria-hidden
            />
          </div>
        ) : (
          <div
            className="hidden border-l border-primary-600/50 bg-primary-800/40 lg:col-span-5 lg:block"
            aria-hidden
          />
        )}
      </div>
    </div>
  )
}
