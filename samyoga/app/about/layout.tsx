import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | Samyoga',
  description: 'Learn about Samyuktha Nambiar and her approach to yoga practice. Discover the philosophy behind Hatha and Yin yoga.',
  openGraph: {
    title: 'About | Samyoga',
    description: 'Learn about Samyuktha Nambiar and her approach to yoga practice.',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}