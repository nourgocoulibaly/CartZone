import React from "react"
import type { Metadata, Viewport } from "next"
import { Geist_Mono, Nova_Square } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Providers } from "@/app/providers"
import "./globals.css"

const novaSquare = Nova_Square({ subsets: ["latin"], weight: "400", variable: "--font-nova-square" })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GartZone | Cartes Cadeaux Digitales",
  description:
    "Achetez vos cartes cadeaux Gaming, Spotify, Apple, Netflix, IPTV et plus. Livraison instantanee par email.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/Favicon 2.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/Favicon 2.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/Favicon 2.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a1a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${novaSquare.variable} font-sans antialiased`}>
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
