import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"], variable: '--font-grotesk' });
const lora = Lora({ subsets: ["latin"], variable: '--font-editorial' });

export const metadata: Metadata = {
  title: "Oriental Times | Premium Nigerian Digital Newsroom",
  description: "A premium Nigerian digital newsroom that feels like a modern editorial publication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable} font-sans min-h-screen bg-brand-light flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
