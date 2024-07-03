import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const clash = localFont({
  src: "../../public/ClashDisplay-Semibold.otf",
  variable: "--font-clash",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jade.ai - Next Generation AI",
  description: "Experience the power of AI with Jade.ai",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body
          className={cn(
            clash.variable,
            inter.variable,
            "relative antialiased bg-gradient-to-br from-indigo-50 via-stone-50 to-indigo-100"
          )}
        >
          <Toaster />

          {children}

          <Analytics />
        </body>
      </ClerkProvider>
    </html>
  );
}
