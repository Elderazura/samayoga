import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-stone-100 px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow mb-3">404</p>
        <h1 className="mb-3 font-display text-5xl text-primary-700">Page not found</h1>
        <p className="mb-8 text-umber-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button asChild>
          <Link href="/">Return home</Link>
        </Button>
      </div>
    </div>
  )
}
