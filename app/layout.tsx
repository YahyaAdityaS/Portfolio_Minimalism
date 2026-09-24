import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { BackgroundGrid } from "@/components/BackgroundGrid";
import { ContactModalProvider } from "@/lib/modal-context";
import { ContactModal } from "@/components/ContactModal";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yahya Aditya — Product Designer",
  description: "Designs digital products with emphasis on human connection.",
  icons: {
    icon: "/yas.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="relative min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-100">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ContactModalProvider>
            <BackgroundGrid />
            <CustomCursor />
            {children}
            <ContactModal />
          </ContactModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
