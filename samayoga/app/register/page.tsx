'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SAMAYOGA_INBOX_EMAIL } from '@/lib/inbox'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  height: '',
  weight: '',
  experienceLevel: '',
  yogaExperience: '',
  goals: '',
  healthIssues: '',
  classFormat: '',
  practiceStyle: '',
  preferredTimeSlot: '',
  availability: '',
  additionalInfo: '',
}

export default function RegisterPage() {
  const [formData, setFormData] = useState(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          height: formData.height.trim(),
          weight: formData.weight.trim(),
          experienceLevel: formData.experienceLevel,
          yogaExperience: formData.yogaExperience.trim(),
          goals: formData.goals.trim(),
          healthIssues: formData.healthIssues.trim(),
          classFormat: formData.classFormat,
          practiceStyle: formData.practiceStyle,
          preferredTimeSlot: formData.preferredTimeSlot,
          availability: formData.availability.trim(),
          additionalInfo: formData.additionalInfo.trim(),
        }),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(
          typeof data.error === 'string'
            ? data.error
            : 'Could not send your registration. Please try again or email us directly.'
        )
      }

      setShowSuccess(true)
      setFormData(initialForm)
      setTimeout(() => setShowSuccess(false), 12000)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const inputClass =
    'w-full px-4 py-3 rounded-lg border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-base'

  return (
    <>
      <PageHeader
        title="Register for Classes"
        description="Join our yoga community. Submit this form and we will reply by email with next steps and your Google Meet link. No account is created on this site."
      />

      <Section>
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Registration form</CardTitle>
              <CardDescription>
                Please provide the following information so we can tailor your practice. All
                information is kept confidential and is emailed to our inbox only.
                Quick question only? Use the{' '}
                <Link href="/contact" className="text-primary-700 underline hover:text-primary-800">
                  contact form
                </Link>{' '}
                or{' '}
                <a
                  href={`mailto:${SAMAYOGA_INBOX_EMAIL}`}
                  className="text-primary-700 underline hover:text-primary-800"
                >
                  {SAMAYOGA_INBOX_EMAIL}
                </a>
                .
              </CardDescription>
            </CardHeader>
            <CardContent>
              {showSuccess && (
                <div className="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
                  <p className="text-sm text-primary-800">
                    Thank you! We received your registration and will get back to you within
                    24–48 hours.
                  </p>
                </div>
              )}
              {submitError && (
                <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm text-red-900">{submitError}</p>
                  <p className="text-xs text-red-800/90 mt-2">
                    You can also write to{' '}
                    <a href={`mailto:${SAMAYOGA_INBOX_EMAIL}`} className="underline">
                      {SAMAYOGA_INBOX_EMAIL}
                    </a>
                    .
                  </p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-[#1A1A1A] border-b border-primary-200 pb-2">
                    Contact information
                  </h3>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                      Full name <span className="text-primary-600">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      className={inputClass}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                      Email address <span className="text-primary-600">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      className={inputClass}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                      Phone number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      className={inputClass}
                      placeholder="+91 1234567890"
                    />
                  </div>
                </div>

                {/* Physical */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-[#1A1A1A] border-b border-primary-200 pb-2">
                    Physical information
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
                        className={inputClass}
                        placeholder={'e.g. 5\'6" or 168 cm'}
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
                        className={inputClass}
                        placeholder="e.g. 65 kg"
                      />
                    </div>
                  </div>
                </div>

                {/* Experience & health */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-[#1A1A1A] border-b border-primary-200 pb-2">
                    Experience &amp; health
                  </h3>
                  <div>
                    <label
                      htmlFor="experienceLevel"
                      className="block text-sm font-medium text-[#1A1A1A] mb-2"
                    >
                      Yoga experience level
                    </label>
                    <select
                      id="experienceLevel"
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select your experience level</option>
                      <option value="beginner">Beginner — New to yoga</option>
                      <option value="some-experience">Some experience — Practiced occasionally</option>
                      <option value="intermediate">Intermediate — Regular practice</option>
                      <option value="advanced">Advanced — Years of practice</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="yogaExperience"
                      className="block text-sm font-medium text-[#1A1A1A] mb-2"
                    >
                      Yoga experience (if any)
                    </label>
                    <textarea
                      id="yogaExperience"
                      name="yogaExperience"
                      value={formData.yogaExperience}
                      onChange={handleChange}
                      rows={3}
                      className={`${inputClass} resize-none`}
                      placeholder="Tell us about your previous yoga experience, if any…"
                    />
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
                      className={`${inputClass} resize-none`}
                      placeholder="e.g. flexibility, stress relief, strength, balance…"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="healthIssues"
                      className="block text-sm font-medium text-[#1A1A1A] mb-2"
                    >
                      Any injuries, limitations, or health concerns?
                    </label>
                    <textarea
                      id="healthIssues"
                      name="healthIssues"
                      value={formData.healthIssues}
                      onChange={handleChange}
                      rows={3}
                      className={`${inputClass} resize-none`}
                      placeholder="So we can adapt the practice for you…"
                    />
                  </div>
                </div>

                {/* Class preferences */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-[#1A1A1A] border-b border-primary-200 pb-2">
                    Class preferences
                  </h3>
                  <div>
                    <label
                      htmlFor="classFormat"
                      className="block text-sm font-medium text-[#1A1A1A] mb-2"
                    >
                      Preferred type of class <span className="text-primary-600">*</span>
                    </label>
                    <select
                      id="classFormat"
                      name="classFormat"
                      required
                      value={formData.classFormat}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select class type</option>
                      <option value="group">Group class</option>
                      <option value="private">Private class</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="practiceStyle"
                      className="block text-sm font-medium text-[#1A1A1A] mb-2"
                    >
                      Yoga style preference
                    </label>
                    <select
                      id="practiceStyle"
                      name="practiceStyle"
                      value={formData.practiceStyle}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select your preference</option>
                      <option value="hatha">Hatha Yoga (active practice)</option>
                      <option value="yin">Yin Yoga (passive practice)</option>
                      <option value="both">Both Hatha and Yin</option>
                      <option value="open">Open to either</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="preferredTimeSlot"
                      className="block text-sm font-medium text-[#1A1A1A] mb-2"
                    >
                      Preferred time slot (Indian time) <span className="text-primary-600">*</span>
                    </label>
                    <select
                      id="preferredTimeSlot"
                      name="preferredTimeSlot"
                      required
                      value={formData.preferredTimeSlot}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select time slot</option>
                      <option value="morning-6-8">Morning (6:00 AM – 8:00 AM IST)</option>
                      <option value="morning-8-10">Morning (8:00 AM – 10:00 AM IST)</option>
                      <option value="midday-10-12">Midday (10:00 AM – 12:00 PM IST)</option>
                      <option value="afternoon-12-2">Afternoon (12:00 PM – 2:00 PM IST)</option>
                      <option value="afternoon-2-4">Afternoon (2:00 PM – 4:00 PM IST)</option>
                      <option value="evening-4-6">Evening (4:00 PM – 6:00 PM IST)</option>
                      <option value="evening-6-8">Evening (6:00 PM – 8:00 PM IST)</option>
                      <option value="night-8-10">Night (8:00 PM – 10:00 PM IST)</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="availability"
                      className="block text-sm font-medium text-[#1A1A1A] mb-2"
                    >
                      Preferred class times (free text)
                    </label>
                    <input
                      id="availability"
                      name="availability"
                      type="text"
                      value={formData.availability}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="e.g. weekday mornings, weekends only…"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="additionalInfo"
                      className="block text-sm font-medium text-[#1A1A1A] mb-2"
                    >
                      Additional information
                    </label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      rows={4}
                      className={`${inputClass} resize-none`}
                      placeholder="Anything else you would like us to know…"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full min-h-[52px] text-base inline-flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden />
                      Submitting…
                    </>
                  ) : (
                    'Submit registration'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  )
}
