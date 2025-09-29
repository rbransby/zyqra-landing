'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { leadSchema, type LeadFormData } from '@/lib/validators'
import { trackLeadSubmitted, trackLeadSuccess, trackLeadFailed } from '@/lib/analytics'

interface LeadFormProps {
  variant: string
  utm?: Record<string, any>
}

export function LeadForm({ variant, utm }: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      variant,
      source: 'website',
    },
  })

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    // Add UTM params and variant
    const fullData = {
      ...data,
      variant,
      ...utm,
    }

    // Track submission attempt
    trackLeadSubmitted(fullData)

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fullData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit')
      }

      // Track success
      trackLeadSuccess(fullData)
      setSubmitSuccess(true)

      // Redirect to thank you page
      window.location.href = '/thanks'
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit form'
      setSubmitError(errorMessage)
      trackLeadFailed(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="text-center py-8">
        <p className="text-lg font-semibold text-green-600">Success! Redirecting...</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Honeypot field */}
      <input
        type="text"
        name="website"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register('email')}
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">What's your role?</Label>
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className={errors.role ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cleaner">Cleaner</SelectItem>
                <SelectItem value="gardener">Gardener</SelectItem>
                <SelectItem value="handyman">Handyman</SelectItem>
                <SelectItem value="dog_walker">Dog Walker</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.role && (
          <p className="text-sm text-red-500">{errors.role.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="biz_type">Business type</Label>
        <Controller
          name="biz_type"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className={errors.biz_type ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select business type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sole_trader">Sole trader</SelectItem>
                <SelectItem value="micro_team">Micro team (2-5 people)</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.biz_type && (
          <p className="text-sm text-red-500">{errors.biz_type.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Anything else? (optional)</Label>
        <Textarea
          id="notes"
          placeholder="Tell us about your biggest scheduling challenges..."
          {...register('notes')}
          rows={3}
        />
      </div>

      {submitError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-600">
          {submitError}
        </div>
      )}

      <div className="space-y-4">
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Joining waitlist...' : 'Join the waitlist'}
        </Button>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Lock className="w-4 h-4" />
          <span>We'll never spam you. </span>
          <a href="/privacy" className="underline hover:text-foreground">
            Privacy policy
          </a>
        </div>
      </div>
    </form>
  )
}

