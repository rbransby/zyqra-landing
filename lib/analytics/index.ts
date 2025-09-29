import * as ga from './ga'
import * as pixel from './pixel'
import * as plausible from './plausible'

// Unified lead tracking
export const trackLeadSubmitted = (data: {
  variant: string
  email: string
  role: string
  biz_type: string
  utm?: Record<string, any>
}) => {
  const email_domain = data.email.split('@')[1] || 'unknown'
  const trackingData = { ...data, email_domain }
  
  // Track across all enabled platforms
  ga.trackLeadSubmitted(trackingData)
  pixel.pixelLead(trackingData)
  plausible.plausibleLeadSubmitted(trackingData)
}

export const trackLeadSuccess = (data: {
  variant: string
  email: string
  role: string
  biz_type: string
}) => {
  const email_domain = data.email.split('@')[1] || 'unknown'
  const trackingData = { ...data, email_domain }
  
  ga.trackLeadSuccess(trackingData)
  plausible.plausibleLeadSuccess(trackingData)
}

export const trackLeadFailed = (error: string) => {
  ga.trackLeadFailed(error)
  plausible.plausibleLeadFailed(error)
}

// Re-export individual platform functions
export { ga, pixel, plausible }

