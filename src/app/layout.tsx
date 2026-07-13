import type { Metadata } from "next"
import { Cormorant_Garamond, Plus_Jakarta_Sans, Bebas_Neue } from "next/font/google"
import { SmoothScrollProvider } from "@/context/smooth-scroll"
import { MenuProvider } from "@/context/menu-context"
import "./globals.css"

// Premium Editorial Serif Font
const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
})

// Clean Modern Sans-Serif Font
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
})

// Condensed Sans-Serif Font (Bebas Neue)
const bebasNeue = Bebas_Neue({
  variable: "--font-condensed",
  subsets: ["latin"],
  weight: ["400"],
})

export const metadata: Metadata = {
  title: "C-MUSIC | Premium Independent Music Label & Production House",
  description: "An editorial-magazine style audio-visual platform representing forward-thinking artists, premium music production, and high-fidelity sound curation.",
  keywords: ["music label", "independent label", "premium audio production", "artist collective", "audiophile curation"],
  authors: [{ name: "C-MUSIC Team" }],
  openGraph: {
    title: "C-MUSIC | Premium Independent Music Label & Production House",
    description: "An editorial-magazine style audio-visual platform representing forward-thinking artists, premium music production, and high-fidelity sound curation.",
    type: "website",
    locale: "en_US",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${plusJakartaSans.variable} ${bebasNeue.variable}`}>
      <body className="antialiased relative">
        <SmoothScrollProvider>
          <MenuProvider>
            {children}
          </MenuProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
