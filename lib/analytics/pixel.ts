export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

export const isPixelEnabled = Boolean(META_PIXEL_ID)

// Track page view
export const pixelPageView = () => {
  if (!isPixelEnabled || typeof window === 'undefined') return
  
  window.fbq('track', 'PageView')
}

// Track lead event
export const pixelLead = (data: {
  variant: string
  role: string
  biz_type: string
  email_domain: string
}) => {
  if (!isPixelEnabled || typeof window === 'undefined') return
  
  window.fbq('track', 'Lead', {
    content_name: 'waitlist_signup',
    content_category: data.role,
    variant: data.variant,
    business_type: data.biz_type,
    email_domain: data.email_domain,
  })
}

// Track custom events
export const pixelEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (!isPixelEnabled || typeof window === 'undefined') return
  
  window.fbq('trackCustom', eventName, parameters)
}

// Declare fbq function on window
declare global {
  interface Window {
    fbq: (...args: any[]) => void
  }
}

