"use client";

import Link from "next/link";
import AuthButton from "./AuthButton";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">
              Quid <span className="text-blue-600">Invoice</span>
            </h1>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {session?.user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/create-invoice"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Create Invoice
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/#features"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Features
                </Link>
                <Link
                  href="/#pricing"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Pricing
                </Link>
              </>
            )}
          </div>

          {/* Auth Button */}
          <AuthButton />
        </div>
      </div>
    </nav>
  );
}
