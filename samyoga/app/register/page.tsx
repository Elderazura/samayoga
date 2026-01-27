'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Loader2 } from 'lucide-react'

export default function RegisterPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    // Basic contact details
    name: '',
    email: '',
    password: '',
    phone: '',
    // Physical details
    height: '',
    weight: '',
    // Experience and health
    yogaExperience: '',
    healthIssues: '',
    // Preferences
    classType: '', // group or private
    preferredTimeSlot: '', // in Indian time
  })

  // Redirect if already logged in
  if (status === 'authenticated') {
    router.push('/dashboard')
    return null
  }

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
      // First create the user account
      const registerResponse = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
        }),
      })

      if (!registerResponse.ok) {
        const error = await registerResponse.json()
        throw new Error(error.error || 'Failed to create account')
      }

      const { userId } = await registerResponse.json()

      // Then submit the registration questionnaire
      const questionnaireResponse = await fetch('/api/register/questionnaire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          height: formData.height,
          weight: formData.weight,
          yogaExperience: formData.yogaExperience,
          healthIssues: formData.healthIssues,
          classType: formData.classType,
          preferredTimeSlot: formData.preferredTimeSlot,
          phone: formData.phone,
        }),
      })

      if (!questionnaireResponse.ok) {
        throw new Error('Failed to submit registration details')
      }

      // Redirect to sign in page with message
      router.push('/auth/signin?registered=true')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to register. Please try again.'
      alert(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <PageHeader
        title="Register for Classes"
        description="Join our yoga community and begin your wellness journey"
      />

      <Section>
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Registration Form</CardTitle>
              <CardDescription>
                Please provide the following information to help us tailor your yoga experience.
                All information is kept confidential.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Contact Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-[#1A1A1A] border-b border-primary-200 pb-2">
                    Contact Information
                  </h3>
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                      Full Name <span className="text-primary-600">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                      Email Address <span className="text-primary-600">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                      placeholder="+91 1234567890"
                    />
                  </div>
                </div>

                {/* Physical Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-[#1A1A1A] border-b border-primary-200 pb-2">
                    Physical Information
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="height" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                        Height
                      </label>
                      <input
                        id="height"
                        name="height"
                        type="text"
                        value={formData.height}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                        placeholder="e.g., 5'6&quot; or 168 cm"
                      />
                    </div>

                    <div>
                      <label htmlFor="weight" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                        Weight
                      </label>
                      <input
                        id="weight"
                        name="weight"
                        type="text"
                        value={formData.weight}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                        placeholder="e.g., 65 kg"
                      />
                    </div>
                  </div>
                </div>

                {/* Experience and Health */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-[#1A1A1A] border-b border-primary-200 pb-2">
                    Experience & Health
                  </h3>
                  
                  <div>
                    <label htmlFor="yogaExperience" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                      Yoga Experience (if any)
                    </label>
                    <textarea
                      id="yogaExperience"
                      name="yogaExperience"
                      value={formData.yogaExperience}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent resize-none"
                      placeholder="Tell us about your previous yoga experience, if any..."
                    />
                  </div>

                  <div>
                    <label htmlFor="healthIssues" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                      Any Health Issues or Concerns
                    </label>
                    <textarea
                      id="healthIssues"
                      name="healthIssues"
                      value={formData.healthIssues}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent resize-none"
                      placeholder="Please share any injuries, limitations, or health concerns so we can adapt the practice for you..."
                    />
                  </div>
                </div>

                {/* Preferences */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-[#1A1A1A] border-b border-primary-200 pb-2">
                    Class Preferences
                  </h3>
                  
                  <div>
                    <label htmlFor="classType" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                      Preferred Type of Class <span className="text-primary-600">*</span>
                    </label>
                    <select
                      id="classType"
                      name="classType"
                      required
                      value={formData.classType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                    >
                      <option value="">Select class type</option>
                      <option value="group">Group Class</option>
                      <option value="private">Private Class</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="preferredTimeSlot" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                      Preferred Time Slot (Indian Time) <span className="text-primary-600">*</span>
                    </label>
                    <select
                      id="preferredTimeSlot"
                      name="preferredTimeSlot"
                      required
                      value={formData.preferredTimeSlot}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                    >
                      <option value="">Select time slot</option>
                      <option value="morning-6-8">Morning (6:00 AM - 8:00 AM IST)</option>
                      <option value="morning-8-10">Morning (8:00 AM - 10:00 AM IST)</option>
                      <option value="midday-10-12">Midday (10:00 AM - 12:00 PM IST)</option>
                      <option value="afternoon-12-2">Afternoon (12:00 PM - 2:00 PM IST)</option>
                      <option value="afternoon-2-4">Afternoon (2:00 PM - 4:00 PM IST)</option>
                      <option value="evening-4-6">Evening (4:00 PM - 6:00 PM IST)</option>
                      <option value="evening-6-8">Evening (6:00 PM - 8:00 PM IST)</option>
                      <option value="night-8-10">Night (8:00 PM - 10:00 PM IST)</option>
                    </select>
                  </div>
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
                      'Submit Registration'
                    )}
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
