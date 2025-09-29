import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@/components/Analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zyqra - Bookings, reminders, and payments for domestic services',
  description: 'Stop no-shows and admin chaos. Simple scheduling, SMS reminders, and instant invoices for cleaners, gardeners, handymen, and dog walkers.',
  keywords: 'booking software, payment processing, SMS reminders, cleaner scheduling, gardener booking, handyman app, dog walker scheduling',
  authors: [{ name: 'Zyqra Team' }],
  openGraph: {
    title: 'Zyqra - Bookings, reminders, and payments—done.',
    description: 'Stop no-shows and admin chaos. Simple scheduling for domestic service providers.',
    url: 'https://zyqra.com',
    siteName: 'Zyqra',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Zyqra - Booking software for domestic services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zyqra - Bookings, reminders, and payments—done.',
    description: 'Stop no-shows and admin chaos. Simple scheduling for domestic service providers.',
    images: ['/og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

