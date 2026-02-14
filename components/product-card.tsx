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
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#101827] to-[#0a1220] transition-all duration-300 hover:-translate-y-1 hover:border-[#58b8ff]/60 hover:shadow-[0_18px_45px_rgba(43,108,255,0.25)]"
    >
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
        {product.discount && (
          <span className="rounded-md bg-emerald-400 px-2 py-0.5 text-xs font-extrabold text-[#052514]">
            -{product.discount}%
          </span>
        )}
        {product.isNew && (
          <span className="rounded-md bg-[#2b6cff] px-2 py-0.5 text-xs font-bold text-white">
            New
          </span>
        )}
      </div>

      <div className="relative aspect-[16/10] overflow-hidden bg-[#0f1a2b]">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#8cccff]">{product.brand}</span>
          <div className="flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5">
            <Star className="h-3 w-3 fill-[#ffd75e] text-[#ffd75e]" />
            <span className="text-xs text-slate-300">{product.rating}</span>
          </div>
        </div>
        <h3 className="text-sm font-semibold text-white transition-colors group-hover:text-[#8cccff]">
          {product.name}
        </h3>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-black text-white">{formatPrice(discountedPrice)}</span>
            {product.discount && <span className="text-xs text-slate-400 line-through">{formatPrice(lowestPrice)}</span>}
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2b6cff]/20 text-[#8cccff] transition-colors group-hover:bg-[#2b6cff] group-hover:text-white">
            <Zap className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  )
}
