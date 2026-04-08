import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "./Footer/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SKM Physiotherapy Clinic | Best Physiotherapist in [City]",
  description:
    "SKM Physiotherapy Clinic provides expert physiotherapy treatment for pain relief, sports injury, and rehabilitation in [City].",
  keywords: [
    "SKM Physiotherapy",
    "physiotherapy clinic",
    "physiotherapist",
    "pain relief",
    "sports injury",
    "rehabilitation"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
