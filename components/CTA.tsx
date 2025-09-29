import { LeadForm } from '@/components/LeadForm'

interface CTAProps {
  variant: string
  utm?: Record<string, any>
}

export function CTA({ variant, utm }: CTAProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to simplify your business?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Join the waitlist and be the first to know when Zyqra launches. 
          Early adopters get exclusive pricing.
        </p>
        <div className="mt-8 mx-auto max-w-md">
          <LeadForm variant={variant} utm={utm} />
        </div>
      </div>
    </section>
  )
}

