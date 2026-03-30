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
      <nav className="flex items-center justify-between w-full max-w-5xl px-6 py-3 rounded-full bg-card/70 dark:bg-card/50 backdrop-blur-xl border border-border/40 shadow-lg transition-all pointer-events-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Zap className="h-5 w-5 text-primary" />
          <span className="text-lg font-bold tracking-tight">
            Quid
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/#features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </Link>
          <Link
            href="/#product"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Product
          </Link>
          <Link
            href="/#about"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          {session?.user ? (
            <Link href="/dashboard">
              <Button size="sm" className="rounded-full px-5 font-semibold shadow-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button size="sm" className="rounded-full px-5 font-semibold shadow-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
