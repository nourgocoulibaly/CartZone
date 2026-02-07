"use client"

import React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ShoppingBag,
  CreditCard,
  User,
  LogOut,
  ChevronRight,
} from "lucide-react"

const sidebarLinks = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/dashboard/orders", label: "Mes commandes", icon: ShoppingBag },
  { href: "/dashboard/cards", label: "Mes cartes cadeaux", icon: CreditCard },
  { href: "/dashboard/profile", label: "Mon profil", icon: User },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full shrink-0 lg:w-60">
          <div className="sticky top-24">
            {/* User card */}
            <div className="mb-4 rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Ahmed Benali
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ahmed@email.com
                  </p>
                </div>
              </div>
            </div>

            {/* Nav - desktop */}
            <nav className="hidden space-y-1 lg:block">
              {sidebarLinks.map((link) => {
                const active = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                      active
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                )
              })}
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-destructive transition-colors hover:bg-destructive/10"
              >
                <LogOut className="h-4 w-4" />
                Deconnexion
              </button>
            </nav>

            {/* Nav - mobile horizontal */}
            <nav className="flex gap-1 overflow-x-auto pb-2 lg:hidden">
              {sidebarLinks.map((link) => {
                const active = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                      active
                        ? "bg-primary/10 font-medium text-primary"
                        : "bg-card text-muted-foreground"
                    }`}
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="whitespace-nowrap">{link.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  )
}
