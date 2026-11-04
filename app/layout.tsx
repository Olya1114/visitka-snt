import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
})

const siteTitle = 'СНТ Онлайн — документы, решения и общение садоводства'
const siteDescription =
  'Визитка приложения СНТ Онлайн: документы товарищества, архив без удаления, уведомления председателю, ассистент Алиса.'
const ogImage = {
  url: '/og-image.jpg',
  width: 1200,
  height: 630,
  alt: 'Садовое товарищество с высоты: участки, домики и дорога среди леса',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://xn--m1ahe.xn--80asehdb'),
  title: siteTitle,
  description: siteDescription,
  generator: 'v0.app',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: '/',
    siteName: 'СНТ Онлайн',
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [ogImage.url],
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f5f6f1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${manrope.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
