import type React from "react"
import type { Metadata } from "next"
import { DM_Serif_Display, Poppins, IBM_Plex_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import Navbar from "@/components/layout/navbar"
import { cookies } from "next/headers"

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-serif-display",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
})

export const metadata: Metadata = {
  title: "BeatFAN - Apoya el Arte, Comparte el Éxito",
  description: "Tokeniza canciones, apoya artistas y comparte sus ingresos.",
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const isLoggedIn = cookieStore.get("isLoggedIn")?.value === "true"
  const userRole = cookieStore.get("userRole")?.value

  return (
    <html
      lang="es"
      className={`${dmSerifDisplay.variable} ${poppins.variable} ${ibmPlexSans.variable}`}
      suppressHydrationWarning
    >
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          // poppins.variable // Already applied via html tag and tailwind.config
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Navbar isLoggedIn={isLoggedIn} userRole={userRole} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}