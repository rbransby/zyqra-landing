export const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

export const isPlausibleEnabled = Boolean(PLAUSIBLE_DOMAIN)

// Track custom events
export const plausibleEvent = (eventName: string, props?: Record<string, any>) => {
  if (!isPlausibleEnabled || typeof window === 'undefined') return
  
  if ('plausible' in window) {
    const plausible = window.plausible as (event: string, options?: { props: Record<string, any> }) => void
    
    if (props) {
      plausible(eventName, { props })
    } else {
      plausible(eventName)
    }
  }
}

// Lead tracking events
export const plausibleLeadSubmitted = (data: {
  variant: string
  role: string
  biz_type: string
  email_domain: string
}) => {
  plausibleEvent('Lead Submitted', data)
}

export const plausibleLeadSuccess = (data: {
  variant: string
  role: string
  biz_type: string
}) => {
  plausibleEvent('Lead Success', data)
}

export const plausibleLeadFailed = (error: string) => {
  plausibleEvent('Lead Failed', { error })
}

// Declare plausible function on window
declare global {
  interface Window {
    plausible?: (event: string, options?: { props: Record<string, any> }) => void
  }
}

