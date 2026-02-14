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
  ShieldCheck,
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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0f1a]/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#2b6cff] to-[#00d1ff] shadow-[0_0_20px_rgba(43,108,255,0.35)]">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="block text-lg font-extrabold tracking-tight text-white">GiftZone</span>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-slate-400">digital marketplace</span>
          </div>
        </Link>

        <div className="hidden max-w-sm flex-1 items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 lg:flex">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher un jeu, une carte, un abonnement..."
            className="ml-2 w-full bg-transparent text-sm text-white placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        <div className="hidden items-center gap-1 lg:flex">
          <Link href="/" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10">
            Accueil
          </Link>
          <div className="relative" onMouseEnter={() => setCategoriesOpen(true)} onMouseLeave={() => setCategoriesOpen(false)}>
            <button
              type="button"
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10"
            >
              Catégories
              <ChevronDown className={`h-4 w-4 transition-transform ${categoriesOpen ? "rotate-180" : ""}`} />
            </button>
            {categoriesOpen && (
              <div className="absolute left-0 top-full mt-2 w-80 rounded-xl border border-white/10 bg-[#111827] p-2 shadow-2xl">
                {categories.map((cat) => {
                  const Icon = iconMap[cat.icon] || Gamepad2
                  return (
                    <Link
                      key={cat.id}
                      href={`/shop/${cat.slug}`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/10"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ backgroundColor: `${cat.color}` }}>
                        <Icon className="h-4 w-4 text-[#071019]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{cat.name}</p>
                        <p className="text-xs text-slate-400">{cat.description}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
          <Link href="/shop" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10">
            Boutique
          </Link>
          <Link href="/promotions" className="rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold text-[#58b8ff] transition-colors hover:bg-white/15">
            Deals
          </Link>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <div className="flex items-center gap-1 rounded-lg bg-emerald-400/10 px-2 py-1 text-[11px] font-semibold text-emerald-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            Secure
          </div>
          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Rechercher"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link href="/cart" className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-white/10 hover:text-white" aria-label="Panier">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#2b6cff] text-[10px] font-bold text-white">{count}</span>}
          </Link>
          <Link href="/login" className="flex h-9 items-center gap-2 rounded-lg bg-gradient-to-r from-[#2b6cff] to-[#4f8cff] px-3 text-sm font-semibold text-white transition-opacity hover:opacity-90">
            <User className="h-4 w-4" />
            Connexion
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/cart" className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-200" aria-label="Panier">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#2b6cff] text-[10px] font-bold text-white">{count}</span>}
          </Link>
          <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-200" aria-label="Menu">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {searchOpen && (
        <div className="mx-auto hidden max-w-7xl px-4 pb-3 lg:block lg:px-8">
          <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <Search className="h-4 w-4 text-slate-400" />
            <input type="text" placeholder="Rechercher une carte cadeau..." className="ml-2 w-full bg-transparent text-sm text-white placeholder:text-slate-400 focus:outline-none" />
          </div>
        </div>
      )}

      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#0d1322] px-4 py-4 lg:hidden">
          <div className="mb-4 flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <Search className="h-4 w-4 text-slate-400" />
            <input type="text" placeholder="Rechercher..." className="ml-2 w-full bg-transparent text-sm text-white placeholder:text-slate-400 focus:outline-none" />
          </div>
          <div className="space-y-1">
            <Link href="/" className="block rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>Accueil</Link>
            <Link href="/shop" className="block rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>Boutique</Link>
            <Link href="/promotions" className="block rounded-lg px-3 py-2 text-sm font-semibold text-[#58b8ff] hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>Deals</Link>
            <Link href="/login" className="block rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>Connexion</Link>
          </div>
        </div>
      )}
    </header>
  )
}
