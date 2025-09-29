import { Check } from 'lucide-react'

export function PricingTeaser() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Simple, transparent pricing
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Join now and lock in our early adopter pricing forever
        </p>
        
        <div className="mt-12 mx-auto max-w-md">
          <div className="rounded-2xl border bg-background p-8 shadow-lg">
            <div className="text-center">
              <p className="text-sm font-semibold text-primary">EARLY ADOPTER SPECIAL</p>
              <p className="mt-4 flex items-baseline justify-center gap-x-2">
                <span className="text-5xl font-bold tracking-tight">£19</span>
                <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">/month</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground line-through">
                Regular price: £29/month
              </p>
              <p className="mt-6 text-base leading-7 text-muted-foreground">
                Everything you need to run your domestic service business
              </p>
            </div>
            
            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                Unlimited bookings & customers
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                SMS & email reminders
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                Online payments via Stripe
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                Recurring job scheduling
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                Mobile app included
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                UK-based support
              </li>
            </ul>
            
            <p className="mt-8 text-xs text-center text-muted-foreground">
              No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

