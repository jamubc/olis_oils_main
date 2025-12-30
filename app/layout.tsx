import type { Metadata } from "next";
import { Merriweather, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

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
  title: "Oli's Oils | Premium Natural Skincare",
  description: "Natural oils that nourish skin and hair at a deeper level, support the body's natural balance, and deliver lasting hydration without harmful additives.",
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
          <Navigation />
          <main className="relative z-10 bg-stone-50 shadow-md md:mb-[450px]">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
