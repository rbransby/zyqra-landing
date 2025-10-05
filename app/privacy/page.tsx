import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Zyqra',
  description: 'How we protect your data at Zyqra.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Last updated: January 2025
        </p>
        
        <div className="mt-8 prose prose-gray max-w-none">
          <h2 className="text-2xl font-semibold mt-8">The simple version</h2>
          <p>
            We take your privacy seriously. Here's what you need to know:
          </p>
          <ul>
            <li>We only collect what we need to run the service</li>
            <li>We never sell your data to anyone</li>
            <li>We use industry-standard security to protect your information</li>
            <li>You can delete your account and data anytime</li>
            <li>We'll always notify you of any significant changes</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8">What we collect</h2>
          <p>
            When you sign up for Zyqra, we collect:
          </p>
          <ul>
            <li><strong>Account information:</strong> Your name, email, and business details</li>
            <li><strong>Customer data:</strong> Names, phone numbers, and addresses of your customers</li>
            <li><strong>Job information:</strong> Appointments, invoices, and payment records</li>
            <li><strong>Usage data:</strong> How you use Zyqra to help us improve the service</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8">How we use your data</h2>
          <p>
            We use your information to:
          </p>
          <ul>
            <li>Provide the Zyqra service (scheduling, reminders, payments)</li>
            <li>Send you important updates about your account</li>
            <li>Improve our service based on how it's used</li>
            <li>Provide customer support when you need help</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8">Who we share with</h2>
          <p>
            We only share your data with:
          </p>
          <ul>
            <li><strong>Service providers:</strong> Companies that help us run Zyqra (like Stripe for payments)</li>
            <li><strong>Legal requirements:</strong> If required by law (we'll notify you when possible)</li>
          </ul>
          <p>
            We <strong>never</strong> sell your data to advertisers or data brokers.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8">Your rights</h2>
          <p>
            You have the right to:
          </p>
          <ul>
            <li>Access all the data we have about you</li>
            <li>Correct any inaccurate information</li>
            <li>Delete your account and all associated data</li>
            <li>Export your data in a standard format</li>
            <li>Opt out of marketing communications</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8">Security</h2>
          <p>
            We use industry-standard security measures including:
          </p>
          <ul>
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security audits and updates</li>
            <li>Secure data centers with 24/7 monitoring</li>
            <li>Limited access to personal data by staff</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8">Contact us</h2>
          <p>
            If you have any questions about our privacy policy or how we handle your data, please email us at{' '}
            <a href="mailto:privacy@zyqra.com" className="text-primary underline">
              privacy@zyqra.com
            </a>
          </p>
          
          <h2 className="text-2xl font-semibold mt-8">Changes to this policy</h2>
          <p>
            We may update this policy from time to time. We'll notify you by email of any significant changes 
            and post the updated policy here with a new "Last updated" date.
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

