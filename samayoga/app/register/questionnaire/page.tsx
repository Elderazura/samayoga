'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Loader2 } from 'lucide-react'

export default function QuestionnairePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    experience: '',
    goals: '',
    injuries: '',
    preferences: '',
    availability: '',
    additionalInfo: '',
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated' && session?.user?.status === 'APPROVED') {
      router.push('/dashboard')
    }
  }, [status, session, router])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/register/questionnaire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit questionnaire')
      }

      router.push('/register/pending')
    } catch (error) {
      console.error('Error submitting questionnaire:', error)
      alert('Failed to submit questionnaire. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <>
      <PageHeader
        title="Registration Questionnaire"
        description="Help us understand your yoga journey and needs"
      />

      <Section>
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Tell Us About Yourself</CardTitle>
              <CardDescription>
                This information helps us tailor your yoga experience. All fields are optional,
                but the more you share, the better we can support you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                    Yoga Experience Level
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                  >
                    <option value="">Select your experience level</option>
                    <option value="beginner">Beginner - New to yoga</option>
                    <option value="some-experience">Some Experience - Practiced occasionally</option>
                    <option value="intermediate">Intermediate - Regular practice</option>
                    <option value="advanced">Advanced - Years of practice</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="goals" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                    What are your goals with yoga?
                  </label>
                  <textarea
                    id="goals"
                    name="goals"
                    value={formData.goals}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent resize-none"
                    placeholder="e.g., Improve flexibility, reduce stress, build strength, find balance..."
                  />
                </div>

                <div>
                  <label htmlFor="injuries" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                    Any injuries, limitations, or health concerns?
                  </label>
                  <textarea
                    id="injuries"
                    name="injuries"
                    value={formData.injuries}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent resize-none"
                    placeholder="Please share any relevant information so we can adapt the practice for you..."
                  />
                </div>

                <div>
                  <label htmlFor="preferences" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                    Class Preferences
                  </label>
                  <select
                    id="preferences"
                    name="preferences"
                    value={formData.preferences}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                  >
                    <option value="">Select your preference</option>
                    <option value="hatha">Hatha Yoga (Active practice)</option>
                    <option value="yin">Yin Yoga (Passive practice)</option>
                    <option value="both">Both Hatha and Yin</option>
                    <option value="open">Open to either</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="availability" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                    Preferred Class Times
                  </label>
                  <input
                    id="availability"
                    name="availability"
                    type="text"
                    value={formData.availability}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                    placeholder="e.g., Morning (8-10am), Evening (6-8pm), Weekends..."
                  />
                </div>

                <div>
                  <label htmlFor="additionalInfo" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                    Additional Information
                  </label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent resize-none"
                    placeholder="Anything else you'd like us to know..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="flex-1"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Questionnaire'
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => router.push('/dashboard')}
                  >
                    Skip for Now
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  )
}