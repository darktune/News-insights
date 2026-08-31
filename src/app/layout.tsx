import type { Metadata } from "next";
import "./globals.css";

import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { OnboardingProvider } from "@/components/providers/OnboardingProvider";
import { OnboardingModal } from "@/components/ui/OnboardingModal";
import GlobalMediaPlayer from "@/components/media/GlobalMediaPlayer";
import PremiumModal from "@/components/ui/PremiumModal";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://achihimedia.com'),
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen flex flex-col antialiased bg-[var(--bg)] text-[var(--text)] transition-colors duration-200">
        <Providers>
          <OnboardingProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <OnboardingModal />
            <GlobalMediaPlayer />
            <PremiumModal />
          </OnboardingProvider>
        </Providers>
      </body>
    </html>
  );
}
