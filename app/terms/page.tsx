import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - Zyqra',
  description: 'Terms and conditions for using Zyqra.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Last updated: January 2025
        </p>
        
        <div className="mt-8 prose prose-gray max-w-none">
          <h2 className="text-2xl font-semibold mt-8">The basics</h2>
          <p>
            These terms are between you and Zyqra Ltd ("we", "us", "our"). By using Zyqra, 
            you're agreeing to these terms. If you don't agree, please don't use our service.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8">What Zyqra is</h2>
          <p>
            Zyqra is booking and payment software for domestic service professionals. We provide:
          </p>
          <ul>
            <li>Scheduling and calendar management</li>
            <li>SMS and email reminders</li>
            <li>Invoice creation and payment processing</li>
            <li>Customer management tools</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8">Your responsibilities</h2>
          <p>When using Zyqra, you agree to:</p>
          <ul>
            <li>Provide accurate information about yourself and your business</li>
            <li>Keep your password secure and not share your account</li>
            <li>Use Zyqra legally and ethically</li>
            <li>Respect your customers' privacy and data</li>
            <li>Pay your subscription fees on time</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8">Payment terms</h2>
          <ul>
            <li><strong>Billing:</strong> Monthly subscription, billed in advance</li>
            <li><strong>Price:</strong> As shown on our pricing page (currently $29 AUD/month for early adopters)</li>
            <li><strong>Cancellation:</strong> Cancel anytime, access continues until end of billing period</li>
            <li><strong>Refunds:</strong> No refunds for partial months</li>
            <li><strong>SMS costs:</strong> Charged separately at 2p per message</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8">Acceptable use</h2>
          <p>You must not use Zyqra to:</p>
          <ul>
            <li>Break any laws or regulations</li>
            <li>Harm or harass others</li>
            <li>Send spam or unsolicited messages</li>
            <li>Attempt to hack or disrupt our service</li>
            <li>Violate anyone's privacy or rights</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8">Our commitments</h2>
          <p>We promise to:</p>
          <ul>
            <li>Keep Zyqra available 99.9% of the time</li>
            <li>Protect your data with industry-standard security</li>
            <li>Provide support via email within 24 hours</li>
            <li>Give you 30 days notice of any major changes</li>
            <li>Never sell your data</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8">Limitations</h2>
          <p>
            Zyqra is provided "as is". While we work hard to ensure reliability, we can't guarantee:
          </p>
          <ul>
            <li>100% uptime (though we aim for 99.9%)</li>
            <li>That Zyqra will meet all your specific needs</li>
            <li>Protection against all possible security threats</li>
          </ul>
          <p>
            Our liability is limited to the amount you've paid us in the last 12 months.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8">Intellectual property</h2>
          <ul>
            <li>You own your data and content</li>
            <li>We own the Zyqra software and brand</li>
            <li>You give us permission to use your data to provide the service</li>
            <li>We may use anonymized data to improve Zyqra</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8">Changes and termination</h2>
          <ul>
            <li>We may update these terms with 30 days notice</li>
            <li>You can cancel your account anytime</li>
            <li>We may suspend accounts that violate these terms</li>
            <li>You can download your data before closing your account</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8">Disputes</h2>
          <p>
            If we have a disagreement:
          </p>
          <ul>
            <li>We'll try to resolve it through friendly discussion first</li>
            <li>If needed, we'll use mediation</li>
            <li>As a last resort, disputes will be handled by Australian courts</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8">Contact</h2>
          <p>
            Questions about these terms? Email us at{' '}
            <a href="mailto:legal@zyqra.com" className="text-primary underline">
              legal@zyqra.com
            </a>
          </p>
        </div>
        
        <div className="mt-12 pt-8 border-t">
          <a href="/" className="text-primary hover:underline">
            ← Back to home
          </a>
        </div>
      </div>
    </div>
  )
}

