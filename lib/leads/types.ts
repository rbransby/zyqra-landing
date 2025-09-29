export interface Lead {
  email: string
  role: string
  biz_type: string
  notes?: string
  source?: string
  variant?: string
  utm?: Record<string, any>
  created_at?: Date
}

export interface LeadAdapter {
  saveLead(lead: Lead): Promise<{ success: boolean; error?: string }>
}

