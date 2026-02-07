"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronRight,
  Star,
  Shield,
  Zap,
  Clock,
  Mail,
  ShoppingCart,
  Check,
  Minus,
  Plus,
} from "lucide-react"
import { getProductBySlug, formatPrice, getDiscountedPrice, products } from "@/lib/data"
import { useCart } from "@/lib/cart-store"
import { ProductCard } from "@/components/product-card"
import { notFound } from "next/navigation"

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const product = getProductBySlug(slug)

  if (!product) notFound()

  return <ProductDetail product={product} />
}

function ProductDetail({ product }: { product: NonNullable<ReturnType<typeof getProductBySlug>> }) {
  const [selectedDenom, setSelectedDenom] = useState(product.denominations[0])
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { add } = useCart()

  const price = product.discount
    ? getDiscountedPrice(selectedDenom, product.discount)
    : selectedDenom

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  function handleAddToCart() {
    add(product, selectedDenom, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="transition-colors hover:text-foreground">
          Accueil
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/shop" className="transition-colors hover:text-foreground">
          Boutique
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      {/* Product */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-secondary">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Badges */}
          <div className="absolute left-4 top-4 flex flex-col gap-2">
            {product.discount && (
              <span className="rounded-lg bg-accent px-3 py-1 text-sm font-bold text-accent-foreground">
                -{product.discount}%
              </span>
            )}
            {product.isNew && (
              <span className="rounded-lg bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">
                Nouveau
              </span>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <span className="text-sm font-medium text-primary">{product.brand}</span>
          <h1 className="mt-1 text-2xl font-bold text-foreground md:text-3xl">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? "fill-accent text-accent"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews} avis)
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {/* Denomination */}
          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold text-foreground">
              Choisir le montant
            </p>
            <div className="flex flex-wrap gap-2">
              {product.denominations.map((denom) => (
                <button
                  type="button"
                  key={denom}
                  onClick={() => setSelectedDenom(denom)}
                  className={`rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all ${
                    selectedDenom === denom
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-foreground hover:border-primary/40"
                  }`}
                >
                  {formatPrice(denom)}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground">
              {formatPrice(price * quantity)}
            </span>
            {product.discount && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(selectedDenom * quantity)}
              </span>
            )}
          </div>

          {/* Quantity + Add to cart */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center rounded-xl border border-border bg-card">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-11 w-11 items-center justify-center text-foreground transition-colors hover:bg-secondary"
                aria-label="Reduire la quantite"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="flex h-11 w-12 items-center justify-center text-sm font-semibold text-foreground">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="flex h-11 w-11 items-center justify-center text-foreground transition-colors hover:bg-secondary"
                aria-label="Augmenter la quantite"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all ${
                added
                  ? "bg-accent text-accent-foreground"
                  : "bg-primary text-primary-foreground hover:opacity-90"
              }`}
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" />
                  Ajoute au panier
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  Ajouter au panier
                </>
              )}
            </button>
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { icon: Zap, text: "Livraison instantanee par email" },
              { icon: Shield, text: "Paiement 100% securise" },
              { icon: Clock, text: "Support disponible 24/7" },
              { icon: Mail, text: "Code envoye dans les 30s" },
            ].map((f) => (
              <div
                key={f.text}
                className="flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2"
              >
                <f.icon className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-foreground">
            Produits similaires
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
