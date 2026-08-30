import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "ACHIHI Media — Nigeria's Modern News Platform",
    template: "%s | ACHIHI Media",
  },
  description:
    "ACHIHI Media Limited delivers credible, timely news from across Nigeria — Politics, Business, Entertainment, Sport and more.",
  keywords: ["Nigeria news", "Nigerian politics", "Naija news", "ACHIHI Media", "Nigerian newspaper"],
  authors: [{ name: "ACHIHI Media Limited" }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://achihimedia.com",
    siteName: "ACHIHI Media",
    title: "ACHIHI Media — Nigeria's Modern News Platform",
    description: "Credible, timely news from across Nigeria.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@achihimedia",
    creator: "@achihimedia",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen flex flex-col antialiased">
        <Providers>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
