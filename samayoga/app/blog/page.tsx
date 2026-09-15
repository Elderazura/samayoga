import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { Calendar } from 'lucide-react'

export const metadata = {
  title: 'Blog',
  description: 'Read our latest articles on yoga, wellness, and practice.',
}

export default function Blog() {
  const posts = getAllPosts()

  return (
    <>
      <PageHeader
        title="Blog"
        description="Read articles on yoga, wellness, practice, and finding balance."
      />

      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
          {posts.map((post) => (
            <Card key={post.slug} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-[#1A1A1A]/60 mb-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <CardTitle className="text-xl sm:text-2xl mb-2">{post.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-end">
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/blog/${post.slug}`}>Read More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  )
}