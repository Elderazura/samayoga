import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Media | Samyoga',
  description: 'Explore our gallery and video content from yoga classes and practice sessions.',
  openGraph: {
    title: 'Media | Samyoga',
    description: 'Explore our gallery and video content from yoga classes and practice.',
  },
}

export default function MediaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}