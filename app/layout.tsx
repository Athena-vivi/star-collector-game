import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import Navigation from "@/components/navigation"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Star Collector - Explore the Wonders of the Universe",
  description: "All-in-one astronomy portal: stargazing alerts, AI Q&A, and AI wallpaper creation.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-4942713186815141" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <title>Star Collector - AI Wallpaper & Astronomy Q&A</title>
        <meta name="description" content="Create stunning AI-generated cosmic wallpapers and get expert astronomy answers instantly. Free daily credits, no login required!" />
        <meta name="keywords" content="AI wallpaper, astronomy, space, cosmic, free, Q&A, star collector, galaxy, nebula, planets" />
        <meta name="author" content="Star Collector Team" />
        <link rel="canonical" href="https://star-collector.com/" />
        {/* Open Graph */}
        <meta property="og:title" content="Star Collector - AI Wallpaper & Astronomy Q&A" />
        <meta property="og:description" content="Create stunning AI-generated cosmic wallpapers and get expert astronomy answers instantly." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://star-collector.com/" />
        <meta property="og:image" content="https://star-collector.com/preview.jpg" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Star Collector - AI Wallpaper & Astronomy Q&A" />
        <meta name="twitter:description" content="Create stunning AI-generated cosmic wallpapers and get expert astronomy answers instantly." />
        <meta name="twitter:image" content="https://star-collector.com/preview.jpg" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4942713186815141" crossOrigin="anonymous"></script>
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
