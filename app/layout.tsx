import type { Metadata } from 'next'
import { Playfair_Display, Syne, DM_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap"
});

const syne = Syne({ 
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  title: 'Black Celluloid — A Critical Archive',
  description: 'Eight women. Eight contradictions the industry never resolved. A platform that refuses to celebrate, refuses to condemn.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${syne.variable} ${dmMono.variable}`}>
      <body className="antialiased bc-body">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
