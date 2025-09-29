import { describe, it, expect } from 'vitest'
import { getVariantContent } from '@/lib/variant'

describe('Variant Content', () => {
  it('should return v1 content', () => {
    const content = getVariantContent('v1')
    expect(content.headline).toBe('Bookings, reminders, and payments—done.')
    expect(content.subheadline).toContain('saves you hours each week')
  })
  
  it('should return v2 content', () => {
    const content = getVariantContent('v2')
    expect(content.headline).toBe('Stop no-shows. Get paid on time.')
    expect(content.subheadline).toContain('Simple scheduling')
  })
})

