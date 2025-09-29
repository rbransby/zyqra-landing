export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// Helper to check if GA is enabled
export const isGAEnabled = Boolean(GA_MEASUREMENT_ID)

// Log page views
export const pageview = (url: string) => {
  if (!isGAEnabled || typeof window === 'undefined') return
  
  window.gtag('config', GA_MEASUREMENT_ID!, {
    page_path: url,
  })
}

// Log specific events
export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (!isGAEnabled || typeof window === 'undefined') return
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

// Lead events
export const trackLeadSubmitted = (data: {
  variant: string
  email_domain: string
  role: string
  biz_type: string
  utm?: Record<string, any>
}) => {
  event({
    action: 'lead_submitted',
    category: 'engagement',
    label: data.variant,
  })
  
  // Also send as custom event with all data
  if (typeof window !== 'undefined' && isGAEnabled) {
    window.gtag('event', 'lead_submitted', data)
  }
}

export const trackLeadSuccess = (data: {
  variant: string
  email_domain: string
  role: string
  biz_type: string
}) => {
  event({
    action: 'lead_success',
    category: 'engagement',
    label: data.variant,
  })
  
  if (typeof window !== 'undefined' && isGAEnabled) {
    window.gtag('event', 'lead_success', data)
  }
}

export const trackLeadFailed = (error: string) => {
  event({
    action: 'lead_failed',
    category: 'engagement',
    label: error,
  })
}

// Declare gtag function on window
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

