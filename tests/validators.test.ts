import { describe, it, expect } from 'vitest'
import { leadSchema, honeypotSchema, timingSchema } from '@/lib/validators'

describe('Lead Validator', () => {
  it('should validate correct lead data', () => {
    const validData = {
      email: 'test@example.com',
      role: 'cleaner',
      biz_type: 'sole_trader',
      notes: 'Looking forward to trying Zyqra',
    }
    
    const result = leadSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })
  
  it('should reject invalid email', () => {
    const invalidData = {
      email: 'not-an-email',
      role: 'cleaner',
      biz_type: 'sole_trader',
    }
    
    const result = leadSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('email')
    }
  })
  
  it('should reject invalid role', () => {
    const invalidData = {
      email: 'test@example.com',
      role: 'invalid_role',
      biz_type: 'sole_trader',
    }
    
    const result = leadSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })
  
  it('should accept optional fields', () => {
    const dataWithOptionals = {
      email: 'test@example.com',
      role: 'gardener',
      biz_type: 'micro_team',
      notes: 'Great idea!',
      variant: 'v2',
      utm_source: 'facebook',
      utm_campaign: 'launch',
      ref: 'friend123',
    }
    
    const result = leadSchema.safeParse(dataWithOptionals)
    expect(result.success).toBe(true)
  })
})

describe('Honeypot Validator', () => {
  it('should pass when honeypot is empty', () => {
    const result = honeypotSchema.safeParse({ website: '' })
    expect(result.success).toBe(true)
  })
  
  it('should fail when honeypot has value', () => {
    const result = honeypotSchema.safeParse({ website: 'spam-value' })
    expect(result.success).toBe(false)
  })
})

describe('Timing Validator', () => {
  it('should pass when form submitted after 2 seconds', () => {
    const timestamp = Date.now() - 3000 // 3 seconds ago
    const result = timingSchema.safeParse({ timestamp })
    expect(result.success).toBe(true)
  })
  
  it('should fail when form submitted too quickly', () => {
    const timestamp = Date.now() - 1000 // 1 second ago
    const result = timingSchema.safeParse({ timestamp })
    expect(result.success).toBe(false)
  })
})

