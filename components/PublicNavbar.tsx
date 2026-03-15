"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function PublicNavbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  // Only show navbar on landing page
  if (pathname !== "/") {
    return null;
  }

  return (
    <nav className="border-b border-border bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-xl font-bold text-foreground">
              Quid <span className="text-primary">Invoice</span>
            </h1>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/#features"
              className="text-foreground hover:text-primary font-medium transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              className="text-foreground hover:text-primary font-medium transition-colors"
            >
              Pricing
            </Link>
          </div>

          {/* Theme Toggle & Auth Button */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {session?.user ? (
              <Link href="/dashboard">
                <Button>Dashboard</Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
