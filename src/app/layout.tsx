import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Tollka — Википедия на ладони',
  description: 'Случайные статьи из Википедии на русском языке с возможностью комментирования',
  openGraph: {
    title: 'Tollka — Википедия на ладони',
    description: 'Открывай случайные статьи из Википедии и оставляй свои мысли.',
    url: 'https://tollka.com',
    siteName: 'Tollka',
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tollka — Википедия на ладони',
    description: 'Случайные статьи из Википедии на русском языке с возможностью комментирования',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
