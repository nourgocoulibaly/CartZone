"use client"

import Link from "next/link"
import { ArrowRight, Gamepad2, Music, Tv, Smartphone, Satellite, Share2 } from "lucide-react"
import { categories } from "@/lib/data"

const iconMap: Record<string, React.ElementType> = { Gamepad2, Music, Tv, Smartphone, Satellite, Share2 }

export function CategoriesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
      <div className="mb-7 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-black text-foreground md:text-3xl">Parcourir par catégorie</h2>
          <p className="mt-1 text-sm text-muted-foreground">Une navigation rapide façon marketplace.</p>
        </div>
        <Link href="/shop" className="hidden items-center gap-1 text-sm font-semibold text-primary transition-colors hover:opacity-80 sm:flex">
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
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_14px_40px_rgba(43,108,255,0.16)]"
            >
              <div className="absolute -right-5 -top-5 h-16 w-16 rounded-full opacity-20 blur-xl" style={{ backgroundColor: cat.color }} />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: cat.color }}>
                <Icon className="h-6 w-6 text-[#071019]" />
              </div>
              <p className="mt-3 text-sm font-bold text-foreground">{cat.name}</p>
              <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-muted-foreground">{cat.description}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
