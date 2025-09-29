import { z } from 'zod'

export const leadSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  role: z.enum(['cleaner', 'gardener', 'handyman', 'dog_walker', 'other'], {
    required_error: 'Please select your role',
  }),
  biz_type: z.enum(['sole_trader', 'micro_team'], {
    required_error: 'Please select your business type',
  }),
  notes: z.string().max(500).optional(),
  variant: z.string().optional(),
  source: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term: z.string().optional(),
  utm_content: z.string().optional(),
  ref: z.string().optional(),
})

export type LeadFormData = z.infer<typeof leadSchema>

export const honeypotSchema = z.object({
  website: z.string().max(0, 'Bot detected'),
})

export const timingSchema = z.object({
  timestamp: z.number().refine((val) => {
    // Ensure form wasn't submitted too quickly (less than 2 seconds)
    const now = Date.now()
    return now - val > 2000
  }, 'Please take your time filling out the form'),
})

