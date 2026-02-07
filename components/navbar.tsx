"use client"

import React from "react"

import Link from "next/link"
import { useState } from "react"
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
  Zap,
} from "lucide-react"
import { useCart } from "@/lib/cart-store"
import { categories } from "@/lib/data"

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
  const { count } = useCart()

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            GiftZone
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 lg:flex">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Accueil
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setCategoriesOpen(true)}
            onMouseLeave={() => setCategoriesOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Categories
              <ChevronDown
                className={`h-4 w-4 transition-transform ${categoriesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {categoriesOpen && (
              <div className="absolute left-0 top-full w-72 rounded-xl border border-border bg-card p-2 shadow-xl">
                {categories.map((cat) => {
                  const Icon = iconMap[cat.icon] || Gamepad2
                  return (
                    <Link
                      key={cat.id}
                      href={`/shop/${cat.slug}`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-secondary"
                    >
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${cat.color}` }}
                      >
                        <Icon className="h-4 w-4 text-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {cat.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {cat.description}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
          <Link
            href="/shop"
            className="rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Boutique
          </Link>
          <Link
            href="/promotions"
            className="rounded-lg px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-secondary"
          >
            Promotions
          </Link>
        </div>

        {/* Desktop Right */}
        <div className="hidden items-center gap-2 lg:flex">
          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Rechercher"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            href="/cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Panier"
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          <Link
            href="/login"
            className="flex h-9 items-center gap-2 rounded-lg bg-secondary px-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
          >
            <User className="h-4 w-4" />
            Connexion
          </Link>
        </div>

        {/* Mobile Right */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground"
            aria-label="Panier"
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground"
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Search Bar */}
      {searchOpen && (
        <div className="border-t border-border bg-card px-4 py-3">
          <div className="mx-auto flex max-w-2xl items-center gap-2 rounded-lg bg-secondary px-3 py-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher une carte cadeau..."
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-card lg:hidden">
          <div className="space-y-1 px-4 py-3">
            <Link
              href="/"
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link
              href="/shop"
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Boutique
            </Link>
            <div className="py-1">
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Categories
              </p>
            </div>
            {categories.map((cat) => {
              const Icon = iconMap[cat.icon] || Gamepad2
              return (
                <Link
                  key={cat.id}
                  href={`/shop/${cat.slug}`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{cat.name}</span>
                </Link>
              )
            })}
            <div className="border-t border-border pt-2">
              <Link
                href="/promotions"
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-primary hover:bg-secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Promotions
              </Link>
              <Link
                href="/login"
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Connexion / Inscription
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
