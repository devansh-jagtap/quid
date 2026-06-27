"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  IconDashboard,
  IconFileText,
  IconSettings,
  IconInnerShadowTop,
  IconReceipt,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Invoices",
      url: "/invoices",
      icon: IconReceipt,
    },
    {
      title: "Create Invoice",
      url: "/create-invoice",
      icon: IconFileText,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
  ],
};

export function AppSidebar({
  ...props
}: React.ComponentPropsWithoutRef<typeof Sidebar>) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // Hide sidebar on public pages
  const isPublicPage = pathname === "/" || pathname === "/login";
  const isAuthenticated = status === "authenticated" && session?.user;

  if (isPublicPage || !isAuthenticated) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <a href="/dashboard">
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <IconInnerShadowTop className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Quid</span>
                  <span className="truncate text-xs">Invoice Manager</span>
                </div>
              </SidebarMenuButton>
            </a>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: session?.user?.name || "User",
            email: session?.user?.email || "",
            avatar: session?.user?.image || "",
          }}
          onSignOut={handleSignOut}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
