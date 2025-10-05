import { Metadata } from 'next'
import Image from 'next/image'
import { headers } from 'next/headers'
import { 
  Calendar,
  MessageSquare,
  CreditCard,
  Clock,
  Users,
  Smartphone,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FeatureCard } from '@/components/FeatureCard'
import { LeadForm } from '@/components/LeadForm'
import { FAQ } from '@/components/FAQ'
import { PricingTeaser } from '@/components/PricingTeaser'
import { CTA } from '@/components/CTA'
import { getVariant } from '@/lib/variant'
import { getVariantContent } from '@/lib/variant-content'
import { parseUTMParams } from '@/lib/utm'
import { VariantSetter } from '@/components/VariantSetter'

export const metadata: Metadata = {
  title: 'Zyqra - Bookings, reminders, and payments for domestic services',
  description: 'Stop no-shows and admin chaos. Simple scheduling, SMS reminders, and instant invoices for cleaners, gardeners, handymen, and dog walkers.',
}

export default async function LandingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const variant = await getVariant()
  const content = getVariantContent(variant)
  
  // Parse UTM parameters
  const resolvedSearchParams = await searchParams
  const utmParams = parseUTMParams(new URLSearchParams(resolvedSearchParams as Record<string, string>))

  return (
    <>
      <VariantSetter variant={variant} />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-16 pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
            <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                {content.headline}
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                {content.subheadline}
              </p>
              
              {/* Mobile CTA */}
              <div className="mt-8 lg:hidden">
                <div className="mx-auto max-w-md">
                  <LeadForm variant={variant} utm={utmParams} />
                </div>
              </div>

              {/* Desktop bullets */}
              <div className="mt-8 hidden lg:block">
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-gray-600">One-off & recurring jobs in seconds</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-gray-600">Automatic SMS/email reminders (fewer no-shows)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-gray-600">Tap-to-invoice + paid/unpaid tracking</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-gray-600">Mobile-first, built for sole traders</span>
                  </li>
                </ul>
                
                <div className="mt-8 flex gap-4">
                  <Button size="lg" asChild>
                    <a href="#cta">Join the waitlist</a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="#how-it-works">See how it works</a>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Desktop Form */}
            <div className="relative mt-10 sm:mt-16 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
              <div className="hidden lg:block sticky top-8">
                <div className="rounded-2xl border bg-white p-8 shadow-xl">
                  <h2 className="text-2xl font-bold mb-6">Get early access</h2>
                  <LeadForm variant={variant} utm={utmParams} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Tired of the admin chaos?</h2>
            <p className="mt-2 text-muted-foreground">You're not alone. Here's what domestic service professionals struggle with daily:</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-red-600" />
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-gray-900">No-shows & cancellations</h3>
                <p className="mt-2 text-sm text-gray-600">Lost income from customers who forget or cancel last minute</p>
              </div>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-red-600" />
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-gray-900">Hours on paperwork</h3>
                <p className="mt-2 text-sm text-gray-600">Manually creating invoices and chasing payments</p>
              </div>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-red-600" />
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-gray-900">Scattered information</h3>
                <p className="mt-2 text-sm text-gray-600">Customer details spread across notebooks, phones, and memory</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to run your business
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Built specifically for domestic service professionals
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Calendar}
              title="Smart Scheduling"
              description="Book one-off jobs or set up recurring appointments in seconds. See your whole week at a glance."
            />
            <FeatureCard
              icon={MessageSquare}
              title="Automatic Reminders"
              description="Reduce no-shows with SMS and email reminders. Customers get notified 24 hours before."
            />
            <FeatureCard
              icon={CreditCard}
              title="Instant Payments"
              description="Send invoices with a tap. Customers pay online, money goes straight to your bank."
            />
            <FeatureCard
              icon={Users}
              title="Customer Management"
              description="Keep all customer details, job history, and notes in one place. No more lost paperwork."
            />
            <FeatureCard
              icon={Smartphone}
              title="Works Anywhere"
              description="Access from your phone, tablet, or computer. Perfect for managing jobs on the go."
            />
            <FeatureCard
              icon={Clock}
              title="Save Hours Weekly"
              description="Automate the admin work so you can focus on growing your business."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How Zyqra works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Get started in minutes, not hours
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="relative">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bold">
                1
              </div>
              <h3 className="mt-4 text-xl font-semibold">Add your customers</h3>
              <p className="mt-2 text-muted-foreground">
                Import from a spreadsheet or add them one by one. Takes less than 5 minutes.
              </p>
              <div className="mt-4">
                <img
                  src="/mockups/add-customers.webp"
                  alt="Add customers mockup"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
            
            <div className="relative">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bold">
                2
              </div>
              <h3 className="mt-4 text-xl font-semibold">Schedule jobs</h3>
              <p className="mt-2 text-muted-foreground">
                Book appointments, set up recurring jobs, and see your week at a glance.
              </p>
              <div className="mt-4">
                <img
                  src="/mockups/schedule-jobs.webp"
                  alt="Schedule jobs mockup"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
            
            <div className="relative">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bold">
                3
              </div>
              <h3 className="mt-4 text-xl font-semibold">Get paid faster</h3>
              <p className="mt-2 text-muted-foreground">
                Send invoices instantly and track who's paid. Money in your bank within 2 days.
              </p>
              <div className="mt-4">
                <img
                  src="/mockups/get-paid-faster.webp"
                  alt="Get paid faster mockup"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <PricingTeaser />

      {/* FAQ */}
      <FAQ />

      {/* CTA */}
      <div id="cta">
        <CTA variant={variant} utm={utmParams} />
      </div>

      {/* Founder Note */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border bg-background p-8">
            <h3 className="text-xl font-semibold">Why we're building Zyqra</h3>
            <p className="mt-4 text-muted-foreground">
              Hi, I'm Sarah. I ran a cleaning business for 5 years and wasted countless hours on admin work. 
              Existing software was either too complex or too expensive for a sole trader like me.
            </p>
            <p className="mt-4 text-muted-foreground">
              That's why we're building Zyqra - simple, affordable booking software designed specifically for 
              domestic service professionals. No bloat, no complexity, just the features you actually need.
            </p>
            <p className="mt-4 text-sm font-medium">
              - Sarah, Founder
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl">Zyqra</span>
              <span className="text-sm text-muted-foreground">© 2024</span>
            </div>
            <nav className="flex gap-6">
              <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </a>
              <a href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </a>
              <a href="mailto:hello@zyqra.com" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </footer>

      {/* Sticky CTA on mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t lg:hidden">
        <Button size="lg" className="w-full" asChild>
          <a href="#cta">Join the waitlist</a>
        </Button>
      </div>
    </>
  )
}

