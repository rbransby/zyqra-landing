import { createClient } from '@supabase/supabase-js'
import type { Lead, LeadAdapter } from './types'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.warn('Supabase credentials not configured')
}

const supabase = supabaseUrl && supabaseServiceRoleKey
  ? createClient(supabaseUrl, supabaseServiceRoleKey)
  : null

export const supabaseAdapter: LeadAdapter = {
  async saveLead(lead: Lead) {
    if (!supabase) {
      return { success: false, error: 'Supabase not configured' }
    }

    try {
      const { error } = await supabase
        .from('leads')
        .insert({
          email: lead.email,
          role: lead.role,
          biz_type: lead.biz_type,
          notes: lead.notes,
          source: lead.source || 'website',
          variant: lead.variant,
          utm: lead.utm || {},
          created_at: new Date().toISOString(),
        })

      if (error) {
        console.error('Supabase insert error:', error)
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      console.error('Supabase adapter error:', error)
      return { success: false, error: 'Failed to save lead' }
    }
  },
}

