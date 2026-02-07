"use client"

import React from "react"

import Link from "next/link"
import { ArrowRight, Gamepad2, Music, Tv, Smartphone, Satellite, Share2 } from "lucide-react"
import { categories } from "@/lib/data"

const iconMap: Record<string, React.ElementType> = {
  Gamepad2,
  Music,
  Tv,
  Smartphone,
  Satellite,
  Share2,
}

export function CategoriesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            Categories
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Trouvez la carte cadeau parfaite
          </p>
        </div>
        <Link
          href="/shop"
          className="hidden items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80 sm:flex"
        >
          Tout voir
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] || Gamepad2
          return (
            <Link
              key={cat.id}
              href={`/shop/${cat.slug}`}
              className="group relative flex flex-col items-center gap-3 overflow-hidden rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: cat.color }}
              >
                <Icon className="h-7 w-7 text-foreground" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">
                  {cat.name}
                </p>
                <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                  {cat.description}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
