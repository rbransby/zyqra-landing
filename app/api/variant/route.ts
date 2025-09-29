import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const VARIANT_COOKIE_NAME = 'zr_variant'
const VARIANT_COOKIE_MAX_AGE = 60 * 60 * 24 * 90 // 90 days

export async function POST(request: NextRequest) {
  try {
    const { variant } = await request.json()
    
    if (!variant || (variant !== 'v1' && variant !== 'v2')) {
      return NextResponse.json({ error: 'Invalid variant' }, { status: 400 })
    }

    const cookieStore = await cookies()
    cookieStore.set(VARIANT_COOKIE_NAME, variant, {
      maxAge: VARIANT_COOKIE_MAX_AGE,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to set cookie' }, { status: 500 })
  }
}
