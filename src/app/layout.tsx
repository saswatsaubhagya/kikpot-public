import type { Metadata, Viewport } from "next";
import N8nChat from "../components/N8nChat";
import "./globals.css";

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
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100;200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
        <N8nChat />
      </body>
    </html>
  );
}
