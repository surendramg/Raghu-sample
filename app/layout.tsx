import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/lib/auth-context"
import { BackgroundWrapper } from "@/components/background-wrapper"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppWidget from "@/components/whatsapp-widget"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "NiyaraWFS - Find Your Dream Job",
  description: "Connect with top employers and discover opportunities that match your skills and career goals.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <AuthProvider>
            <BackgroundWrapper>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1 pt-16">{children}</main>
                <Footer />
                <WhatsAppWidget />
                <Toaster />
              </div>
            </BackgroundWrapper>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
