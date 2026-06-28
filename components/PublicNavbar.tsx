"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ArrowRight, Zap } from "lucide-react";

export default function PublicNavbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  // Only show navbar on landing page
  if (pathname !== "/") {
    return null;
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50  pointer-events-none">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 pointer-events-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-transform group-hover:-translate-y-0.5">
            <Zap className="h-4 w-4" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-base font-bold tracking-tight">Quid</span>
            <span className="hidden text-[11px] font-medium text-muted-foreground sm:block">
              Invoice studio
            </span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-1 rounded-full border border-border/60 bg-muted/40 p-1">
          <Link
            href="/#features"
            className="rounded-full px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-background hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="/#product"
            className="rounded-full px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-background hover:text-foreground"
          >
            Product
          </Link>
          <Link
            href="/#about"
            className="rounded-full px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-background hover:text-foreground"
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
              <Button size="sm" className="rounded-lg px-4 font-semibold shadow-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Dashboard
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button size="sm" className="rounded-lg px-4 font-semibold shadow-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Sign In
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
