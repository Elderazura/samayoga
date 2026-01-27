'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, Image, Sparkles, Download } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CreativePanel() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)
  const [posters, setPosters] = useState<any[]>([])
  const [formData, setFormData] = useState({
    posterType: 'Class Announcement',
    style: 'Calm & Minimal',
    title: '',
    description: '',
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/dashboard')
    }
  }, [status, session, router])

  const handleGeneratePoster = async () => {
    if (!formData.title.trim()) {
      alert('Please enter a title for the poster')
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch('/api/admin/creative/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate poster')
      }

      if (data.success && data.imageData) {
        // Create image URL from base64
        const imageUrl = `data:${data.mimeType};base64,${data.imageData}`
        
        const newPoster = {
          id: Date.now().toString(),
          title: formData.title || `Poster ${posters.length + 1}`,
          description: formData.description,
          posterType: formData.posterType,
          style: formData.style,
          imageUrl: imageUrl,
          createdAt: new Date().toISOString(),
          status: 'generated',
        }
        
        setPosters([newPoster, ...posters])
        
        // Reset form
        setFormData({
          posterType: 'Class Announcement',
          style: 'Calm & Minimal',
          title: '',
          description: '',
        })
      } else {
        throw new Error('No image data received')
      }
    } catch (error: any) {
      console.error('Error generating poster:', error)
      alert(error.message || 'Failed to generate poster. Please check your API key configuration.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = (poster: any) => {
    if (!poster.imageUrl) return
    
    const link = document.createElement('a')
    link.href = poster.imageUrl
    link.download = `${poster.title.replace(/\s+/g, '-')}-poster.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (status === 'loading') {
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
        title="Creative Panel"
        description="Generate promotional posters and visual content"
      />

      <Section>
        <div className="max-w-6xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Poster Generation</CardTitle>
              <CardDescription>
                Generate promotional posters for classes and events. 
                Nano Banana integration coming soon.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Poster Type</label>
                    <select className="w-full px-4 py-2 rounded-lg border border-primary-200">
                      <option>Class Announcement</option>
                      <option>Event Poster</option>
                      <option>Workshop Flyer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Style</label>
                    <select className="w-full px-4 py-2 rounded-lg border border-primary-200">
                      <option>Calm & Minimal</option>
                      <option>Energetic</option>
                      <option>Meditative</option>
                    </select>
                  </div>
                </div>
                <Button
                  onClick={handleGeneratePoster}
                  disabled={isGenerating}
                  size="lg"
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Poster
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Generated Posters */}
          {posters.length > 0 && (
            <div>
              <h2 className="text-2xl font-light mb-6">Generated Posters</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {posters.map((poster, index) => (
                  <motion.div
                    key={poster.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full">
                      <CardContent className="pt-6">
                        {poster.imageUrl ? (
                          <div className="aspect-[4/5] rounded-lg overflow-hidden mb-4 bg-primary-50">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={poster.imageUrl}
                              alt={poster.title || 'Generated poster'}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="aspect-[4/5] bg-primary-50/50 rounded-lg flex items-center justify-center mb-4">
                            <Image className="w-12 h-12 text-primary-400" aria-hidden="true" />
                          </div>
                        )}
                        <h3 className="font-medium mb-2">{poster.title}</h3>
                        {poster.description && (
                          <p className="text-sm text-[#1A1A1A]/70 mb-2 line-clamp-2">
                            {poster.description}
                          </p>
                        )}
                        <p className="text-xs text-[#1A1A1A]/50 mb-4">
                          {new Date(poster.createdAt).toLocaleDateString()} • {poster.style}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => handleDownload(poster)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {posters.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Sparkles className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                <p className="text-[#1A1A1A]/70 mb-4">
                  No posters generated yet. Create your first poster above.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </Section>
    </>
  )
}