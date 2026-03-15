"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UserAccountButton() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (!session?.user) return null;

  return (
    <div className="relative">
      {/* Account Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
      >
        {session.user.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name || "User"}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white text-sm font-bold">
              {session.user.name?.charAt(0) || "U"}
            </span>
          </div>
        )}
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-foreground">
            {session.user.name || "User"}
          </p>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Content */}
          <div className="absolute right-0 mt-2 w-56 rounded-lg border border-border bg-card shadow-lg z-40">
            {/* User Info */}
            <div className="border-b border-border p-4">
              <p className="font-medium text-foreground">
                {session.user.name || "User"}
              </p>
              <p className="text-sm text-muted-foreground">
                {session.user.email}
              </p>
            </div>

            {/* Menu Items */}
            <div className="p-2 space-y-1">
              <button
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <Settings className="h-4 w-4" />
                Settings
              </button>

              <button
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                onClick={() => {
                  setIsOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
