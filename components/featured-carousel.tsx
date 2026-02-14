"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, ArrowRight, Flame } from "lucide-react"
import Link from "next/link"
import { ProductCard } from "./product-card"
import { getFeaturedProducts } from "@/lib/data"

export function FeaturedCarousel() {
  const products = getFeaturedProducts()
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true, skipSnaps: false, slidesToScroll: 1 })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
      <div className="mb-7 flex items-end justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-orange-400/15 px-2.5 py-1 text-xs font-semibold text-orange-500 dark:text-orange-300">
            <Flame className="h-3.5 w-3.5" />Top ventes
          </div>
          <h2 className="text-2xl font-black text-foreground md:text-3xl">Produits populaires</h2>
          <p className="mt-1 text-sm text-muted-foreground">Les meilleures cartes du moment.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/shop" className="mr-2 hidden items-center gap-1 text-sm font-semibold text-primary transition-colors hover:opacity-80 sm:flex">Tout voir<ArrowRight className="h-4 w-4" /></Link>
          <button type="button" onClick={scrollPrev} disabled={!canScrollPrev} className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-secondary disabled:opacity-30" aria-label="Precedent"><ChevronLeft className="h-4 w-4" /></button>
          <button type="button" onClick={scrollNext} disabled={!canScrollNext} className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-secondary disabled:opacity-30" aria-label="Suivant"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>
      <div className="overflow-hidden" ref={emblaRef}><div className="-ml-4 flex">{products.map((product) => <div key={product.id} className="min-w-0 shrink-0 grow-0 basis-full pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"><ProductCard product={product} /></div>)}</div></div>
    </section>
  )
}
