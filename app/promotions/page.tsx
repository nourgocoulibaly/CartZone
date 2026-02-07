import { ProductCard } from "@/components/product-card"
import { getDiscountedProducts, promotions } from "@/lib/data"
import { Flame, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Promotions | GiftZone",
  description: "Decouvrez nos meilleures offres et promotions sur les cartes cadeaux.",
}

export default function PromotionsPage() {
  const discountedProducts = getDiscountedProducts()

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
            <Flame className="h-5 w-5 text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">
            Promotions
          </h1>
        </div>
        <p className="text-muted-foreground">
          Profitez de nos meilleures offres du moment
        </p>
      </div>

      {/* Promo banners */}
      <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3">
        {promotions.map((promo) => (
          <Link
            key={promo.id}
            href={`/shop/${promo.category}`}
            className="group relative overflow-hidden rounded-2xl border border-border p-6 transition-all hover:border-primary/40 hover:shadow-lg"
            style={{
              background: `linear-gradient(135deg, oklch(0.12 0.005 270), oklch(0.12 0.005 270) 60%, ${promo.color}20)`,
            }}
          >
            <span className="mb-2 inline-block rounded-md bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground">
              {promo.badge}
            </span>
            <h3 className="text-lg font-bold text-foreground">{promo.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{promo.subtitle}</p>
            <p className="mt-2 text-xs text-muted-foreground">{promo.description}</p>
            <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:gap-2">
              Voir les offres
              <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        ))}
      </div>

      {/* Discounted products */}
      <h2 className="mb-6 text-2xl font-bold text-foreground">
        Tous les produits en promotion
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {discountedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
