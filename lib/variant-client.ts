export type Variant = 'v1' | 'v2'

export async function setVariantCookie(variant: Variant) {
  try {
    await fetch('/api/variant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ variant }),
    })
  } catch (error) {
    console.error('Failed to set variant cookie:', error)
  }
}
