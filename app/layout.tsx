import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Alegreya, Alegreya_Sans } from 'next/font/google'
import './globals.css'

const display = Alegreya({ subsets: ['latin', 'cyrillic'], variable: '--font-alegreya' })
const body = Alegreya_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
  variable: '--font-alegreya-sans',
})

export const metadata: Metadata = {
  title: 'СНТ Портал — документы, решения и общение садоводства',
  description:
    'Визитка приложения СНТ Портал: документы товарищества, архив без удаления, уведомления председателю, ассистент Алиса и поиск СНТ по названию, адресу, ИНН и ОГРН в открытых реестрах.',
  generator: 'v0.app',
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
    <html lang="ru" className={`${display.variable} ${body.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
