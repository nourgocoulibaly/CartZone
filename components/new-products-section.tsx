"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { ProductCard } from "./product-card"
import { getNewProducts } from "@/lib/data"

export function NewProductsSection() {
  const products = getNewProducts()

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
      <div className="mb-7 flex items-end justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-[#00d1ff]/15 px-2.5 py-1 text-xs font-semibold text-[#8cecff]">
            <Sparkles className="h-3.5 w-3.5" />
            Nouveautés
          </div>
          <h2 className="text-2xl font-black text-white md:text-3xl">Nouvelles sorties</h2>
          <p className="mt-1 text-sm text-slate-400">Les dernières cartes et abonnements ajoutés.</p>
        </div>
        <Link href="/shop" className="hidden items-center gap-1 text-sm font-semibold text-[#58b8ff] transition-colors hover:text-[#8cccff] sm:flex">
          Tout voir
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
