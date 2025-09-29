'use client'

import { useEffect } from 'react'
import { setVariantCookie } from '@/lib/variant-client'

interface VariantSetterProps {
  variant: string
}

export function VariantSetter({ variant }: VariantSetterProps) {
  useEffect(() => {
    // Set the cookie on the client side after the page loads
    setVariantCookie(variant as any)
  }, [variant])

  return null // This component doesn't render anything
}
