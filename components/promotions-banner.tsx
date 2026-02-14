"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { promotions } from "@/lib/data"

export function PromotionsBanner() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)

    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 5000)

    return () => {
      emblaApi.off("select", onSelect)
      clearInterval(interval)
    }
  }, [emblaApi, onSelect])

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <div className="overflow-hidden rounded-2xl border border-white/10" ref={emblaRef}>
        <div className="flex">
          {promotions.map((promo) => (
            <div key={promo.id} className="min-w-0 shrink-0 grow-0 basis-full">
              <div
                className="relative flex min-h-[210px] flex-col items-start justify-center overflow-hidden bg-[#0b1220] p-8 md:min-h-[240px] md:p-12"
                style={{
                  backgroundImage: `radial-gradient(circle at 85% 20%, ${promo.color}44, transparent 45%), linear-gradient(135deg, #0b1220, #0e1a30)`,
                  borderLeft: `4px solid ${promo.color}`,
                }}
              >
                <span className="mb-3 inline-block rounded-lg px-3 py-1 text-lg font-black text-[#071019]" style={{ backgroundColor: promo.color }}>
                  {promo.badge}
                </span>
                <h3 className="text-2xl font-black text-white md:text-3xl">{promo.title}</h3>
                <p className="mt-1 text-base text-slate-300 md:text-lg">{promo.subtitle}</p>
                <p className="mt-1 text-sm text-slate-400">{promo.description}</p>
                <Link
                  href={`/shop/${promo.category}`}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-[#071019] transition-all hover:opacity-85"
                  style={{ backgroundColor: promo.color }}
                >
                  Voir les offres
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {promotions.map((promo, idx) => (
          <button
            type="button"
            key={promo.id}
            onClick={() => emblaApi?.scrollTo(idx)}
            className={`h-2 rounded-full transition-all ${idx === selectedIndex ? "w-8 bg-[#58b8ff]" : "w-2 bg-slate-500/40"}`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
