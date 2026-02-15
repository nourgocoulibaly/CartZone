"use client"

import React from "react"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Gamepad2,
  Music,
  Tv,
  Smartphone,
  Satellite,
  Share2,
  ShieldCheck,
} from "lucide-react"
import { useCart } from "@/lib/cart-store"
import { categories } from "@/lib/data"
import { ThemeToggle } from "@/components/theme-toggle"

const iconMap: Record<string, React.ElementType> = {
  Gamepad2,
  Music,
  Tv,
  Smartphone,
  Satellite,
  Share2,
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const { count } = useCart()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-9 w-42">
            {mounted && (
              <>
                {theme === "light" && (
                  <Image 
                    src="/Logo CartZone.png" 
                    alt="CartZone Logo" 
                    fill
                    className="object-contain"
                    priority
                  />
                )}
                {theme === "dark" && (
                  <Image 
                    src="/Logo CartZone (black).png" 
                    alt="CartZone Logo" 
                    fill
                    className="object-contain"
                    priority
                  />
                )}
              </>
            )}
          </div>
        </Link>

        <div className="hidden max-w-sm flex-1 items-center rounded-xl border border-border bg-card px-3 py-2 lg:flex">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher un jeu, une carte, un abonnement..."
            className="ml-2 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>

        <div className="hidden items-center gap-1 lg:flex">
          <Link href="/" className="rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">Accueil</Link>
          <div className="relative" onMouseEnter={() => setCategoriesOpen(true)} onMouseLeave={() => setCategoriesOpen(false)}>
            <button type="button" className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
              Catégories
              <ChevronDown className={`h-4 w-4 transition-transform ${categoriesOpen ? "rotate-180" : ""}`} />
            </button>
            {categoriesOpen && (
              <div className="absolute left-0 top-full mt-2 w-80 rounded-xl border border-border bg-card p-2 shadow-2xl">
                {categories.map((cat) => {
                  const Icon = iconMap[cat.icon] || Gamepad2
                  return (
                    <Link
                      key={cat.id}
                      href={`/shop/${cat.slug}`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-secondary"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ backgroundColor: `${cat.color}` }}>
                        <Icon className="h-4 w-4 text-[#071019]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{cat.name}</p>
                        <p className="text-xs text-muted-foreground">{cat.description}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
          <Link href="/shop" className="rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">Boutique</Link>
          <Link href="/promotions" className="rounded-lg bg-primary/10 px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/15">Deals</Link>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <div className="flex items-center gap-1 rounded-lg bg-accent/15 px-2 py-1 text-[11px] font-semibold text-accent">
            <ShieldCheck className="h-3.5 w-3.5" />
            Secure
          </div>
          <ThemeToggle />
          <button type="button" onClick={() => setSearchOpen(!searchOpen)} className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" aria-label="Rechercher">
            <Search className="h-5 w-5" />
          </button>
          <Link href="/cart" className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" aria-label="Panier">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">{count}</span>}
          </Link>
          <Link href="/login" className="flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
            <User className="h-4 w-4" />
            Connexion
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Link href="/cart" className="relative flex h-9 w-9 items-center justify-center rounded-lg text-foreground" aria-label="Panier">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">{count}</span>}
          </Link>
          <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground" aria-label="Menu">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {searchOpen && (
        <div className="mx-auto hidden max-w-7xl px-4 pb-3 lg:block lg:px-8">
          <div className="flex items-center rounded-xl border border-border bg-card px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="Rechercher une carte cadeau..." className="ml-2 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" />
          </div>
        </div>
      )}

      {mobileMenuOpen && (
        <div className="border-t border-border bg-card px-4 py-4 lg:hidden">
          <div className="mb-4 flex items-center rounded-xl border border-border bg-secondary px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="Rechercher..." className="ml-2 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" />
          </div>
          <div className="space-y-1">
            <Link href="/" className="block rounded-lg px-3 py-2 text-sm text-foreground hover:bg-secondary" onClick={() => setMobileMenuOpen(false)}>Accueil</Link>
            <Link href="/shop" className="block rounded-lg px-3 py-2 text-sm text-foreground hover:bg-secondary" onClick={() => setMobileMenuOpen(false)}>Boutique</Link>
            <Link href="/promotions" className="block rounded-lg px-3 py-2 text-sm font-semibold text-primary hover:bg-secondary" onClick={() => setMobileMenuOpen(false)}>Deals</Link>
            <Link href="/login" className="block rounded-lg px-3 py-2 text-sm text-foreground hover:bg-secondary" onClick={() => setMobileMenuOpen(false)}>Connexion</Link>
          </div>
        </div>
      )}
    </header>
  )
}
