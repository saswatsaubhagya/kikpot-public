import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import N8nChat from "../components/N8nChat";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kikpot - Transform Your Business with Innovative IT Solutions",
  description: "Your trusted partner for innovative IT solutions and digital transformation. We build the future, today with software development, cloud solutions, cybersecurity, and AI solutions.",
  keywords: ["IT Solutions", "Software Development", "Cloud Solutions", "Cybersecurity", "AI Solutions", "Digital Transformation"],
  authors: [{ name: "Kikpot Team" }],
  creator: "Kikpot",
  publisher: "Kikpot",
  robots: "index, follow",
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kikpot.com",
    title: "Kikpot - Transform Your Business with Innovative IT Solutions",
    description: "Your trusted partner for innovative IT solutions and digital transformation. We build the future, today.",
    siteName: "Kikpot",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Kikpot - Innovative IT Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kikpot - Transform Your Business with Innovative IT Solutions",
    description: "Your trusted partner for innovative IT solutions and digital transformation. We build the future, today.",
    images: ["/logo.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0d110f" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} scroll-smooth`}>
      <body className="antialiased bg-canvas text-text">
        {children}
        <N8nChat />
      </body>
    </html>
  );
}
