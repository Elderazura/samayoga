'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, Plus, FileText, Eye, EyeOff } from 'lucide-react'

interface Content {
  id: string
  type: string
  title: string
  published: boolean
  publishedAt: string | null
  createdAt: string
}

export default function ContentPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [content, setContent] = useState<Content[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/dashboard')
    } else if (status === 'authenticated' && session?.user?.role === 'ADMIN') {
      fetchContent()
    }
  }, [status, session, router])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/admin/content')
      if (response.ok) {
        const data = await response.json()
        setContent(data)
      }
    } catch (error) {
      console.error('Error fetching content:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  if (!session || session.user.role !== 'ADMIN') {
    return null
  }

  return (
    <>
      <PageHeader
        title="Content Management"
        description="Manage blog posts, resources, and announcements"
      />

      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-light">All Content</h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Content
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {content.map((item) => (
              <Card key={item.id} className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription className="mt-1">{item.type}</CardDescription>
                    </div>
                    {item.published ? (
                      <Eye className="w-5 h-5 text-green-600" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      {item.published ? 'Unpublish' : 'Publish'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {content.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                <p className="text-[#1A1A1A]/70">No content yet</p>
              </CardContent>
            </Card>
          )}
        </div>
      </Section>
    </>
  )
}