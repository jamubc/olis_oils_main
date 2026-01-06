import type { Metadata } from "next";
import { Merriweather, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ToastProvider } from "@/components/ui/Toast";

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Oli's Oils | Premium Natural Skincare",
    template: "%s | Oli's Oils",
  },
  description: "Premium natural oils for hair, skin & beard. Simple, effective, and environmentally responsible. Handcrafted with care in Canada.",
  keywords: ["natural oils", "skincare", "beard oil", "hair oil", "organic", "Canadian", "handcrafted", "olive oil", "catnip oil"],
  authors: [{ name: "Oli's Oils" }],
  creator: "Oli's Oils",
  publisher: "Oli's Oils",
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "https://olisoils.ca"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "/",
    siteName: "Oli's Oils",
    title: "Oli's Oils | Premium Natural Skincare",
    description: "Premium natural oils for hair, skin & beard. Simple, effective, and environmentally responsible.",
    images: [
      {
        url: "/handdrawn_footer_logo.jpg",
        width: 1200,
        height: 630,
        alt: "Oli's Oils - Premium Natural Skincare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oli's Oils | Premium Natural Skincare",
    description: "Premium natural oils for hair, skin & beard. Simple, effective, and environmentally responsible.",
    images: ["/handdrawn_footer_logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${merriweather.variable} ${inter.variable} antialiased bg-stone-50 text-stone-900`}
      >
        <CartProvider>
          <ToastProvider>
            <Navigation />
            <main className="relative z-10 bg-stone-50 shadow-md md:mb-[450px] min-h-screen">{children}</main>
            <Footer />
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
