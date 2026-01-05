import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { SiteHeader } from '@/components/store/site-header'
import { SiteFooter } from '@/components/store/site-footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Santa Maria RP - Loja Oficial',
  description:
    'Loja oficial do Santa Maria RP. VIPs, veículos e extras com PIX e cartão.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="min-h-dvh">
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  )
}
