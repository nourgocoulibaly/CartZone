"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, Zap } from "lucide-react"
import type { Product } from "@/lib/data"
import { formatPrice, getDiscountedPrice } from "@/lib/data"

export function ProductCard({ product }: { product: Product }) {
  const lowestPrice = product.denominations[0]
  const discountedPrice = product.discount
    ? getDiscountedPrice(lowestPrice, product.discount)
    : lowestPrice

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_18px_45px_rgba(43,108,255,0.18)]"
    >
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
        {product.discount && (
          <span className="rounded-md bg-accent px-2 py-0.5 text-xs font-extrabold text-accent-foreground">
            -{product.discount}%
          </span>
        )}
        {product.isNew && (
          <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
            New
          </span>
        )}
      </div>

      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-primary">{product.brand}</span>
          <div className="flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-muted-foreground">{product.rating}</span>
          </div>
        </div>
        <h3 className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
          {product.name}
        </h3>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-black text-foreground">{formatPrice(discountedPrice)}</span>
            {product.discount && <span className="text-xs text-muted-foreground line-through">{formatPrice(lowestPrice)}</span>}
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Zap className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  )
}
