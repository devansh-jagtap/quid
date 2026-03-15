"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Menu,
  X,
  LogOut,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  Sun,
  Moon,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  const menuItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Create Invoice",
      href: "/create-invoice",
      icon: FileText,
    },
  ];

  const isActive = (href: string) => pathname === href;

  // Hide sidebar if not authenticated or on login/home page
  if (!session?.user || pathname === "/" || pathname === "/login") {
    return null;
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-40 md:hidden p-2 rounded-md bg-background border border-border hover:bg-muted shadow-sm"
      >
        {isMobileOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col border-r border-border bg-background h-screen sticky top-0 transition-all duration-300 z-30 group ${
          isDesktopCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Toggle Collapse Button */}
        <button
          onClick={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
          className="absolute -right-3.5 top-8 bg-background border border-border text-muted-foreground hover:text-foreground hover:bg-muted p-1.5 rounded-full shadow-sm z-40 transition-transform hover:scale-105"
        >
          {isDesktopCollapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </button>

        {/* Logo Section */}
        <div
          className={`flex items-center gap-3 border-b border-border p-6 h-[88px] transition-all overflow-hidden ${
            isDesktopCollapsed ? "justify-center px-4" : ""
          }`}
        >
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="text-white font-bold text-lg">Q</span>
          </div>
          {!isDesktopCollapsed && (
            <div className="animate-in fade-in duration-500 whitespace-nowrap min-w-0">
              <h1 className="text-lg font-bold text-foreground">Quid</h1>
              <p className="text-xs text-muted-foreground">Invoicing</p>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto overflow-x-hidden">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center gap-3 py-3 rounded-lg transition-all cursor-pointer overflow-hidden ${
                    isDesktopCollapsed ? "justify-center px-2" : "px-4"
                  } ${
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-foreground hover:bg-muted"
                  }`}
                  title={isDesktopCollapsed ? item.label : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isDesktopCollapsed && (
                    <span className="font-medium truncate animate-in fade-in duration-300">
                      {item.label}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="border-t border-border p-4 relative">
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors overflow-hidden ${
              isDesktopCollapsed ? "justify-center" : "justify-between"
            }`}
            title={isDesktopCollapsed ? session?.user?.email || "" : undefined}
          >
            <div className={`flex items-center gap-3 ${isDesktopCollapsed ? "" : "flex-1 min-w-0"}`}>
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full flex-shrink-0 border border-border"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-white font-bold text-sm">
                    {session?.user?.name?.charAt(0) || "U"}
                  </span>
                </div>
              )}
              {!isDesktopCollapsed && (
                <div className="flex-1 min-w-0 text-left animate-in fade-in duration-300">
                  <p className="text-sm font-medium text-foreground truncate">
                    {session?.user?.name || "User"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {session?.user?.email}
                  </p>
                </div>
              )}
            </div>
            {!isDesktopCollapsed && (
              <ChevronDown
                className={`h-4 w-4 flex-shrink-0 transition-transform ${
                  userDropdownOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </button>

          {/* User Dropdown */}
          {userDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setUserDropdownOpen(false)}
              />
              <div
                className={`absolute bottom-full mb-2 bg-card border border-border rounded-lg shadow-lg z-40 overflow-hidden w-64 ${
                  isDesktopCollapsed ? "left-14" : "left-4 right-4"
                }`}
              >
                <div className="p-3 border-b border-border">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {session?.user?.name || "User"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {session?.user?.email}
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setTheme(theme === "dark" ? "light" : "dark");
                  }}
                  variant="outline"
                  className="w-full justify-start gap-2 rounded-none border-0 m-0"
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </Button>
                <Button
                  onClick={() => {
                    setUserDropdownOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  variant="outline"
                  className="w-full justify-start gap-2 rounded-none border-0 m-0"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 border-r border-border bg-background transition-transform duration-300 z-30 md:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-3 border-b border-border p-6 h-[88px]">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">Q</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Quid</h1>
            <p className="text-xs text-muted-foreground">Invoicing</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium truncate">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="border-t border-border p-4 space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 overflow-hidden">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "User"}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full flex-shrink-0"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">
                  {session?.user?.name?.charAt(0) || "U"}
                </span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {session?.user?.name || "User"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {session?.user?.email}
              </p>
            </div>
          </div>

          <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            variant="outline"
            className="w-full justify-start gap-2"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </Button>

          <Button
            onClick={() => {
              setIsMobileOpen(false);
              signOut({ callbackUrl: "/" });
            }}
            variant="outline"
            className="w-full justify-start gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}

