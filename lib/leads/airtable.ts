import Airtable from 'airtable'
import type { Lead, LeadAdapter } from './types'

const apiKey = process.env.AIRTABLE_API_KEY
const baseId = process.env.AIRTABLE_BASE_ID

if (!apiKey || !baseId) {
  console.warn('Airtable credentials not configured')
}

const base = apiKey && baseId ? new Airtable({ apiKey }).base(baseId) : null

export const airtableAdapter: LeadAdapter = {
  async saveLead(lead: Lead) {
    if (!base) {
      return { success: false, error: 'Airtable not configured' }
    }

    try {
      await base('Leads').create({
        Email: lead.email,
        Role: lead.role,
        'Business Type': lead.biz_type,
        Notes: lead.notes || '',
        Source: lead.source || 'website',
        Variant: lead.variant || '',
        'UTM Source': lead.utm?.utm_source || '',
        'UTM Medium': lead.utm?.utm_medium || '',
        'UTM Campaign': lead.utm?.utm_campaign || '',
        'UTM Term': lead.utm?.utm_term || '',
        'UTM Content': lead.utm?.utm_content || '',
        'Referral Code': lead.utm?.ref || '',
        'Created At': new Date().toISOString(),
      })

      return { success: true }
    } catch (error) {
      console.error('Airtable adapter error:', error)
      return { success: false, error: 'Failed to save lead' }
    }
  },
}

