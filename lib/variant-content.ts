export type Variant = 'v1' | 'v2'

export function getVariantContent(variant: Variant) {
  const content = {
    v1: {
      headline: "Bookings, reminders, and payments—done.",
      subheadline: "Zyqra saves you hours each week so you can focus on the job, not the paperwork.",
    },
    v2: {
      headline: "Stop no-shows. Get paid on time.",
      subheadline: "Simple scheduling, SMS reminders, and instant invoices for cleaners and gardeners.",
    },
  }

  return content[variant]
}
