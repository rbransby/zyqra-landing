import { google } from 'googleapis'
import type { Lead, LeadAdapter } from './types'

const spreadsheetId = process.env.GOOGLE_SHEETS_ID
const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON

let auth: any = null

if (spreadsheetId && serviceAccountJson) {
  try {
    const credentials = JSON.parse(serviceAccountJson)
    auth = new google.auth.JWT(
      credentials.client_email,
      undefined,
      credentials.private_key,
      ['https://www.googleapis.com/auth/spreadsheets']
    )
  } catch (error) {
    console.warn('Failed to parse Google service account credentials:', error)
  }
} else {
  console.warn('Google Sheets credentials not configured')
}

export const sheetsAdapter: LeadAdapter = {
  async saveLead(lead: Lead) {
    if (!auth || !spreadsheetId) {
      return { success: false, error: 'Google Sheets not configured' }
    }

    try {
      const sheets = google.sheets({ version: 'v4', auth })
      
      const values = [[
        new Date().toISOString(),
        lead.email,
        lead.role,
        lead.biz_type,
        lead.notes || '',
        lead.source || 'website',
        lead.variant || '',
        lead.utm?.utm_source || '',
        lead.utm?.utm_medium || '',
        lead.utm?.utm_campaign || '',
        lead.utm?.utm_term || '',
        lead.utm?.utm_content || '',
        lead.utm?.ref || '',
      ]]

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Leads!A:M',
        valueInputOption: 'USER_ENTERED',
        requestBody: { values },
      })

      return { success: true }
    } catch (error) {
      console.error('Google Sheets adapter error:', error)
      return { success: false, error: 'Failed to save lead' }
    }
  },
}

