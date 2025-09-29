import { NextResponse } from 'next/server'

export async function GET() {
  // Basic health check
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  }
  
  // Check if essential services are configured
  const services = {
    supabase: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
    airtable: Boolean(process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID),
    sheets: Boolean(process.env.GOOGLE_SHEETS_ID && process.env.GOOGLE_SERVICE_ACCOUNT_JSON),
    resend: Boolean(process.env.RESEND_API_KEY),
    analytics: {
      ga: Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID),
      pixel: Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID),
      plausible: Boolean(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN),
    },
  }
  
  return NextResponse.json({
    ...health,
    services,
  })
}

