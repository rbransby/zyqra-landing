import { supabaseAdapter } from './supabase'
import { airtableAdapter } from './airtable'
import { sheetsAdapter } from './sheets'
import type { LeadAdapter } from './types'

const adapterType = process.env.FEATURE_ADAPTER || 'SUPABASE'

const adapters: Record<string, LeadAdapter> = {
  SUPABASE: supabaseAdapter,
  AIRTABLE: airtableAdapter,
  SHEETS: sheetsAdapter,
}

export const leadAdapter = adapters[adapterType] || supabaseAdapter

export type { Lead, LeadAdapter } from './types'

