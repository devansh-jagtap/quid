"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Zap } from "lucide-react";

export default function PublicNavbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  // Only show navbar on landing page
  if (pathname !== "/") {
    return null;
  }

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="flex items-center justify-between w-full max-w-5xl px-6 py-3 rounded-full bg-background/60 backdrop-blur-xl border border-border/40 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.05)] transition-all pointer-events-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center group mr-3">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-black text-foreground tracking-tight">
              Quid <span className="text-muted-foreground font-medium">Invoice</span>
            </h1>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 bg-muted/30 px-6 py-2 rounded-full border border-border/30">
          <Link
            href="/#features"
            className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-all duration-300"
          >
            Features
          </Link>
          {/* 
          <Link
            href="/#pricing"
            className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-all duration-300"
          >
            Pricing
          </Link>
          */}
        </div>

        {/* Theme Toggle & Auth Button */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          {session?.user ? (
            <Link href="/dashboard">
              <Button className="rounded-full px-6 font-semibold shadow-md hover:shadow-lg transition-all">
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button className="rounded-full px-6 font-semibold shadow-md hover:shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-all">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
