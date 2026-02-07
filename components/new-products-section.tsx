"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { ProductCard } from "./product-card"
import { getNewProducts } from "@/lib/data"

export function NewProductsSection() {
  const products = getNewProducts()

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            Nouveautes
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Les dernieres cartes ajoutees
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
