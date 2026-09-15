import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  description?: string
  className?: string
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div
      className={cn(
        'border-b border-stone-300/60 bg-primary-100/40 px-4 py-12 text-center sm:px-6 sm:py-16 md:py-20 lg:px-8',
        className
      )}
    >
      <h1 className="mb-4 font-display text-balance sm:mb-5">{title}</h1>
      {description && (
        <p className="mx-auto max-w-2xl px-2 text-base text-umber-muted sm:text-lg md:text-xl">
          {description}
        </p>
      )}
    </div>
  )
}
