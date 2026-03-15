"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center gap-2">
        <div className="h-8 w-20 bg-muted animate-pulse rounded" />
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2">
          {session.user.image && (
            <Image
              src={session.user.image}
              alt={session.user.name || "User"}
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          <span className="text-sm font-medium text-foreground">
            {session.user.name || session.user.email}
          </span>
        </div>
        <Button
          onClick={() => signOut({ callbackUrl: "/" })}
          variant="outline"
          size="sm"
        >
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/login">
        <Button size="sm">Sign In</Button>
      </Link>
    </div>
  );
}
