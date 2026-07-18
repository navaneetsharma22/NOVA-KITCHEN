import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('http://localhost:3000'), // Replace with prod URL
  title: {
    default: "Nova Kitchens | Premium Architectural Kitchens",
    template: "%s | Nova Kitchens",
  },
  description: "Bespoke architectural kitchens and premium storage solutions engineered for luxury living.",
  openGraph: {
    title: "Nova Kitchens",
    description: "Bespoke architectural kitchens engineered for luxury living.",
    url: "http://localhost:3000",
    siteName: "Nova Kitchens",
    images: [
      {
        url: "/images/hero/hero-dark.jpg",
        width: 1200,
        height: 630,
        alt: "Nova Kitchens Luxury Design",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nova Kitchens",
    description: "Bespoke architectural kitchens engineered for luxury living.",
    images: ["/images/hero/hero-dark.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { GlobalPreloader } from "@/components/ui/GlobalPreloader";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <GlobalPreloader />
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
