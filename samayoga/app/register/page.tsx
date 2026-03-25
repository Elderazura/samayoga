'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SAMAYOGA_INBOX_EMAIL } from '@/lib/inbox'

const CLASS_OPTIONS = [
  { value: '', label: 'Select…' },
  { value: 'Hatha Yoga', label: 'Hatha Yoga' },
  { value: 'Yin Yoga', label: 'Yin Yoga' },
  { value: 'Hatha + Yin (both)', label: 'Hatha + Yin (both)' },
  { value: 'Private / one-to-one', label: 'Private / one-to-one' },
  { value: 'Not sure yet', label: 'Not sure yet' },
]

const TIME_OPTIONS = [
  { value: '', label: 'Select…' },
  { value: 'Morning 6–7 AM IST', label: 'Morning 6–7 AM IST' },
  { value: 'Morning 7–8 AM IST', label: 'Morning 7–8 AM IST' },
  { value: 'Morning 8–9 AM IST', label: 'Morning 8–9 AM IST' },
  { value: 'Evening 5–6 PM IST', label: 'Evening 5–6 PM IST' },
  { value: 'Evening 6–7 PM IST', label: 'Evening 6–7 PM IST' },
  { value: 'Other (explain below)', label: 'Other (explain below)' },
]

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    classType: '',
    preferredTimeSlot: '',
    yogaExperience: '',
    healthNotes: '',
    message: '',
  })
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
          classType: formData.classType,
          preferredTimeSlot: formData.preferredTimeSlot,
          yogaExperience: formData.yogaExperience.trim(),
          healthNotes: formData.healthNotes.trim(),
          message: formData.message.trim(),
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
      setFormData({
        name: '',
        email: '',
        phone: '',
        classType: '',
        preferredTimeSlot: '',
        yogaExperience: '',
        healthNotes: '',
        message: '',
      })
      setTimeout(() => setShowSuccess(false), 10000)
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

  return (
    <>
      <PageHeader
        title="Register"
        description="Tell us a bit about you and what you are looking for. We will reply by email with availability and your Google Meet link."
      />

      <Section>
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Join a class</CardTitle>
              <CardDescription>
                Submissions go to our inbox by email—no account is created on the site.
                Prefer only email?{' '}
                <Link
                  href="/contact"
                  className="text-primary-700 underline hover:text-primary-800"
                >
                  Contact form
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
                    Thank you! We received your request and will get back to you within 24–48
                    hours.
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#1A1A1A] mb-2"
                  >
                    Full name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    className="w-full px-4 py-3.5 rounded-lg border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-base"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#1A1A1A] mb-2"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className="w-full px-4 py-3.5 rounded-lg border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-base"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-[#1A1A1A] mb-2"
                  >
                    Phone <span className="text-[#1A1A1A]/50">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    className="w-full px-4 py-3.5 rounded-lg border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-base"
                  />
                </div>
                <div>
                  <label
                    htmlFor="classType"
                    className="block text-sm font-medium text-[#1A1A1A] mb-2"
                  >
                    Class interest <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="classType"
                    name="classType"
                    required
                    value={formData.classType}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-lg border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-base"
                  >
                    {CLASS_OPTIONS.map((opt) => (
                      <option key={opt.value || 'empty'} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="preferredTimeSlot"
                    className="block text-sm font-medium text-[#1A1A1A] mb-2"
                  >
                    Preferred time (IST){' '}
                    <span className="text-[#1A1A1A]/50">(optional)</span>
                  </label>
                  <select
                    id="preferredTimeSlot"
                    name="preferredTimeSlot"
                    value={formData.preferredTimeSlot}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-lg border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-base"
                  >
                    {TIME_OPTIONS.map((opt) => (
                      <option key={opt.value || 'empty'} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="yogaExperience"
                    className="block text-sm font-medium text-[#1A1A1A] mb-2"
                  >
                    Yoga experience{' '}
                    <span className="text-[#1A1A1A]/50">(optional)</span>
                  </label>
                  <textarea
                    id="yogaExperience"
                    name="yogaExperience"
                    value={formData.yogaExperience}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3.5 rounded-lg border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent resize-none text-base"
                    placeholder="e.g. beginner, returning after a break, regular practice…"
                  />
                </div>
                <div>
                  <label
                    htmlFor="healthNotes"
                    className="block text-sm font-medium text-[#1A1A1A] mb-2"
                  >
                    Health / injuries / anything we should know{' '}
                    <span className="text-[#1A1A1A]/50">(optional)</span>
                  </label>
                  <textarea
                    id="healthNotes"
                    name="healthNotes"
                    value={formData.healthNotes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3.5 rounded-lg border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent resize-none text-base"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[#1A1A1A] mb-2"
                  >
                    Anything else?{' '}
                    <span className="text-[#1A1A1A]/50">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3.5 rounded-lg border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent resize-none text-base"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[48px] text-base"
                  size="lg"
                >
                  {isSubmitting ? 'Sending…' : 'Submit registration'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  )
}
