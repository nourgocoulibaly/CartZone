"use client"

import { useState } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { products, categories } from "@/lib/data"

export default function ShopPage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<string>("popular")
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = products
    .filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = selectedCategory
        ? p.category === selectedCategory
        : true
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.denominations[0] - b.denominations[0]
      if (sortBy === "price-desc") return b.denominations[0] - a.denominations[0]
      if (sortBy === "rating") return b.rating - a.rating
      return b.reviews - a.reviews // popular
    })

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">
          Boutique
        </h1>
        <p className="mt-2 text-muted-foreground">
          {filtered.length} produits disponibles
        </p>
      </div>

      {/* Search + Filter bar */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher une carte cadeau..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          {search && (
            <button type="button" onClick={() => setSearch("")} aria-label="Effacer">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-secondary md:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtres
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="popular">Populaires</option>
            <option value="rating">Mieux notes</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix decroissant</option>
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar filters (desktop) */}
        <aside className="hidden w-56 shrink-0 md:block">
          <div className="sticky top-20 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-foreground">
                Categories
              </h3>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    !selectedCategory
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  Toutes ({products.length})
                </button>
                {categories.map((cat) => {
                  const count = products.filter(
                    (p) => p.category === cat.id
                  ).length
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                        selectedCategory === cat.id
                          ? "bg-primary/10 font-medium text-primary"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      {cat.name} ({count})
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile filters */}
        {filtersOpen && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
            <div className="absolute bottom-0 left-0 right-0 max-h-[70vh] overflow-y-auto rounded-t-2xl border-t border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Filtres</h3>
                <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Fermer">
                  <X className="h-5 w-5 text-foreground" />
                </button>
              </div>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory(null)
                    setFiltersOpen(false)
                  }}
                  className={`w-full rounded-lg px-3 py-2.5 text-left text-sm ${
                    !selectedCategory
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  Toutes les categories
                </button>
                {categories.map((cat) => (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id)
                      setFiltersOpen(false)
                    }}
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-sm ${
                      selectedCategory === cat.id
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Product grid */}
        <div className="flex-1">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <Search className="mb-4 h-12 w-12 text-muted-foreground/30" />
              <p className="text-lg font-medium text-foreground">
                Aucun resultat
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Essayez avec d&apos;autres termes de recherche
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
