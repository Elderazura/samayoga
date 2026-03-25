import { ReactNode } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CTAProps {
  title: string
  description?: string
  primaryAction?: {
    label: string
    href: string
  }
  secondaryAction?: {
    label: string
    href: string
  }
  className?: string
}

export function CTA({ 
  title, 
  description, 
  primaryAction, 
  secondaryAction,
  className 
}: CTAProps) {
  return (
    <div className={cn(
      "text-center py-16 px-4 sm:px-6 lg:px-8 bg-primary-50/50 rounded-3xl",
      className
    )}>
      <h2 className="text-3xl sm:text-4xl font-light mb-4">{title}</h2>
      {description && (
        <p className="text-lg text-[#1A1A1A]/70 mb-8 max-w-2xl mx-auto">
          {description}
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {primaryAction && (
          <Button asChild size="lg">
            <Link href={primaryAction.href}>{primaryAction.label}</Link>
          </Button>
        )}
        {secondaryAction && (
          <Button asChild variant="outline" size="lg">
            <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
          </Button>
        )}
      </div>
    </div>
  )
}