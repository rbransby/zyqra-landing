import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { CopyButton } from '@/components/CopyButton'
import { CheckCircle, Share2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Thank you! - Zyqra',
  description: 'You\'re on the waitlist for Zyqra.',
}

export default function ThanksPage() {
  const shareUrl = 'https://zyqra.services'
  const shareText = 'I just joined the waitlist for Zyqra - simple booking software for sole traders and micro businesses. Get early access:'
  
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
  const emailSubject = 'Check out Zyqra - booking software for domestic services'
  const emailBody = `Hi,\n\nI just joined the waitlist for Zyqra and thought you might be interested too.\n\nIt's simple booking software designed for sole traders and micro businesses in domestic services. They're offering early adopter pricing of $29 AUD/month.\n\nCheck it out: ${shareUrl}\n\nBest,`
  const emailUrl = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        
        <h1 className="mt-6 text-3xl font-bold tracking-tight">
          You're on the list!
        </h1>
        
        <p className="mt-4 text-lg text-muted-foreground">
          Thanks for joining the Zyqra waitlist. We'll email you as soon as we launch with your exclusive early adopter discount.
        </p>
        
        <p className="mt-4 text-sm text-muted-foreground">
          Questions in the meantime? Drop us a line at{' '}
          <a href="mailto:hello@zyqra.services" className="text-primary underline">
            hello@zyqra.services
          </a>
        </p>
        
        <div className="mt-8 rounded-lg border bg-muted/50 p-6">
          <h2 className="text-lg font-semibold">
            Know someone who'd love Zyqra?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Share with fellow sole traders and micro businesses and help them save hours on admin too.
          </p>
          
          <div className="mt-4 flex flex-col gap-3">
            <Button variant="outline" asChild className="w-full">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Share2 className="mr-2 h-4 w-4" />
                Share on WhatsApp
              </a>
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
                <Share2 className="mr-2 h-4 w-4" />
                Share on Facebook
              </a>
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <a href={emailUrl}>
                <Share2 className="mr-2 h-4 w-4" />
                Share via Email
              </a>
            </Button>
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <p className="text-sm font-medium mb-2">Or copy this link:</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
              />
              <CopyButton text={shareUrl} />
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <Button asChild>
            <a href="/">Back to home</a>
          </Button>
        </div>
      </div>
    </div>
  )
}

