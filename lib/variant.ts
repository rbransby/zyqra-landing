import { cookies } from 'next/headers'

const VARIANT_COOKIE_NAME = 'zr_variant'

export type Variant = 'v1' | 'v2'

export async function getVariant(): Promise<Variant> {
  const cookieStore = await cookies()
  const existingVariant = cookieStore.get(VARIANT_COOKIE_NAME)

  if (existingVariant?.value === 'v1' || existingVariant?.value === 'v2') {
    return existingVariant.value as Variant
  }

  // 50/50 split - return the variant but don't set cookie here
  const newVariant: Variant = Math.random() < 0.5 ? 'v1' : 'v2'
  return newVariant
}