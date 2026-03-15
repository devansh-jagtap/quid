import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PublicNavbar from "@/components/PublicNavbar";
import Sidebar from "@/components/Sidebar";
import { Providers } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quid Invoice Generator",
  description: "Create professional invoices in minutes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          <PublicNavbar />
          <div className="flex min-h-[calc(100vh-64px)]">
            {/* Sidebar - only shows when authenticated */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 w-full">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
