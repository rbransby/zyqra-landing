import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { leadSchema, honeypotSchema } from '@/lib/validators'
import { leadAdapter } from '@/lib/leads'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null

// Rate limiting - simple in-memory store (use Redis in production)
const rateLimit = new Map<string, number[]>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const timestamps = rateLimit.get(ip) || []
  
  // Remove old timestamps
  const recentTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW)
  
  if (recentTimestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }
  
  recentTimestamps.push(now)
  rateLimit.set(ip, recentTimestamps)
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }
    
    // Parse request body
    const body = await request.json()
    
    // Check honeypot
    if (body.website) {
      console.warn('Honeypot triggered:', ip)
      return NextResponse.json(
        { error: 'Invalid submission' },
        { status: 400 }
      )
    }
    
    // Check submission timing
    if (body.timestamp) {
      const timeTaken = Date.now() - body.timestamp
      if (timeTaken < 2000) {
        console.warn('Form submitted too quickly:', ip, timeTaken)
        return NextResponse.json(
          { error: 'Please take your time filling out the form' },
          { status: 400 }
        )
      }
    }
    
    // Validate lead data
    const validatedData = leadSchema.parse(body)
    
    // Save lead using configured adapter
    const result = await leadAdapter.saveLead(validatedData)
    
    if (!result.success) {
      console.error('Failed to save lead:', result.error)
      return NextResponse.json(
        { error: result.error || 'Failed to save your information' },
        { status: 500 }
      )
    }
    
    // Send confirmation email if Resend is configured
    if (resend) {
      try {
        await resend.emails.send({
          from: 'Zyqra <noreply@zyqra.com>',
          to: validatedData.email,
          subject: 'Welcome to the Zyqra waitlist!',
          html: `
            <h2>Thanks for joining the Zyqra waitlist!</h2>
            <p>Hi there,</p>
            <p>We're excited to have you on board. You're now on the list to get early access to Zyqra when we launch.</p>
            <p>As an early adopter, you'll get:</p>
            <ul>
              <li>Exclusive pricing of £19/month (regular price £29/month)</li>
              <li>First access to new features</li>
              <li>Direct input on product development</li>
            </ul>
            <p>We'll email you as soon as we're ready to onboard new users.</p>
            <p>In the meantime, if you have any questions, just reply to this email.</p>
            <p>Best regards,<br>The Zyqra Team</p>
          `
        })
      } catch (emailError) {
        // Log but don't fail the request
        console.error('Failed to send confirmation email:', emailError)
      }
    }
    
    return NextResponse.json(
      { success: true, message: 'Successfully joined the waitlist!' },
      { status: 200 }
    )
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Lead API error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

// Health check for GET requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

