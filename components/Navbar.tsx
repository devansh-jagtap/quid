"use client";

import Link from "next/link";
import AuthButton from "./AuthButton";
import { ThemeToggle } from "./ThemeToggle";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

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
          <div className="hidden md:flex items-center gap-6">
            {session?.user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-foreground hover:text-primary font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/create-invoice"
                  className="text-foreground hover:text-primary font-medium transition-colors"
                >
                  Create Invoice
                </Link>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Theme Toggle & Auth Button */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <AuthButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
