import { notFound } from 'next/navigation'
import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { getPostBySlug, getAllPosts } from '@/lib/blog'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Calendar } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <PageHeader title={post.title} />

      <Section>
        <div className="max-w-4xl mx-auto">
          {/* Post Meta */}
          <div className="flex items-center gap-4 text-sm text-[#1A1A1A]/60 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
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
          </div>

          {/* Post Content */}
          <article className="prose prose-lg max-w-none text-[#1A1A1A]/80 leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ node, ...props }) => (
                  <h2 className="text-3xl font-light mt-12 mb-6 text-[#1A1A1A]" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-2xl font-medium mt-8 mb-4 text-[#1A1A1A]" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className="mb-6 leading-relaxed" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc list-inside mb-6 space-y-2" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal list-inside mb-6 space-y-2" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className="leading-relaxed" {...props} />
                ),
                strong: ({ node, ...props }) => (
                  <strong className="font-medium text-[#1A1A1A]" {...props} />
                ),
                em: ({ node, ...props }) => (
                  <em className="italic" {...props} />
                ),
                a: ({ node, ...props }) => (
                  <a className="text-primary-700 hover:text-primary-800 underline" {...props} />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-primary-300 pl-4 italic my-6 text-[#1A1A1A]/70" {...props} />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </article>

          {/* Back to Blog */}
          <div className="mt-12 pt-8 border-t border-primary-200/50">
            <Button asChild variant="outline">
              <Link href="/blog">← Back to Blog</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}