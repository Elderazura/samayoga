'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, Plus, Calendar, Users, Video, Edit, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface Class {
  id: string
  title: string
  description: string | null
  type: string
  date: string
  duration: number
  meetLink: string | null
  maxStudents: number
  status: string
  bookingsCount: number
}

export default function SchedulePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [classes, setClasses] = useState<Class[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'HATHA',
    date: '',
    time: '',
    duration: '60',
    meetLink: '',
    maxStudents: '20',
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/dashboard')
    } else if (status === 'authenticated' && session?.user?.role === 'ADMIN') {
      fetchClasses()
    }
  }, [status, session, router])

  const fetchClasses = async () => {
    try {
      const response = await fetch('/api/admin/schedule')
      if (response.ok) {
        const data = await response.json()
        setClasses(data)
      }
    } catch (error) {
      console.error('Error fetching classes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const dateTime = new Date(`${formData.date}T${formData.time}`)
      const response = await fetch('/api/admin/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date: dateTime.toISOString(),
          duration: parseInt(formData.duration),
          maxStudents: parseInt(formData.maxStudents),
        }),
      })

      if (response.ok) {
        setShowForm(false)
        setFormData({
          title: '',
          description: '',
          type: 'HATHA',
          date: '',
          time: '',
          duration: '60',
          meetLink: '',
          maxStudents: '20',
        })
        await fetchClasses()
      }
    } catch (error) {
      console.error('Error creating class:', error)
      alert('Failed to create class')
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
        title="Class Schedule"
        description="Create and manage yoga classes"
      />

      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-light">All Classes</h2>
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Class
            </Button>
          </div>

          {showForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Create New Class</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-primary-200"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Type</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-primary-200"
                      >
                        <option value="HATHA">Hatha</option>
                        <option value="YIN">Yin</option>
                        <option value="BOTH">Both</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
                      <input
                        type="number"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-primary-200"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Date</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-primary-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Time</label>
                      <input
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-primary-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Google Meet Link</label>
                    <input
                      type="url"
                      value={formData.meetLink}
                      onChange={(e) => setFormData({ ...formData, meetLink: e.target.value })}
                      placeholder="https://meet.google.com/..."
                      className="w-full px-4 py-2 rounded-lg border border-primary-200"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button type="submit">Create Class</Button>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {classes.map((classItem, index) => (
              <motion.div
                key={classItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{classItem.title}</CardTitle>
                        <CardDescription>{classItem.description}</CardDescription>
                      </div>
                      <span className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-700">
                        {classItem.type}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-[#1A1A1A]/70">
                        <Calendar className="w-4 h-4" />
                        {new Date(classItem.date).toLocaleString()}
                      </div>
                      <div className="flex items-center gap-2 text-[#1A1A1A]/70">
                        <Users className="w-4 h-4" />
                        {classItem.bookingsCount} / {classItem.maxStudents} students
                      </div>
                      {classItem.meetLink && (
                        <div className="flex items-center gap-2 text-[#1A1A1A]/70">
                          <Video className="w-4 h-4" />
                          <a
                            href={classItem.meetLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-700 hover:underline"
                          >
                            Meet Link
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-700 border-red-200">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}