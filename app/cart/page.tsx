"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight, ArrowLeft } from "lucide-react"
import { useCart } from "@/lib/cart-store"
import { formatPrice, getDiscountedPrice } from "@/lib/data"

export default function CartPage() {
  const { items, update, remove, clear, total, count } = useCart()

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 lg:px-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary">
          <ShoppingCart className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-foreground">Votre panier est vide</h1>
        <p className="mt-2 text-muted-foreground">
          Decouvrez nos cartes cadeaux et ajoutez-les a votre panier
        </p>
        <Link
          href="/shop"
          className="mt-6 flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Explorer la boutique
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mon Panier</h1>
          <p className="mt-1 text-muted-foreground">
            {count} article{count > 1 ? "s" : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={clear}
          className="text-sm text-destructive transition-opacity hover:opacity-80"
        >
          Vider le panier
        </button>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Items */}
        <div className="flex-1 space-y-4">
          {items.map((item) => {
            const price = item.product.discount
              ? getDiscountedPrice(item.denomination, item.product.discount)
              : item.denomination
            return (
              <div
                key={`${item.product.id}-${item.denomination}`}
                className="flex gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-border/80"
              >
                {/* Image */}
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-secondary sm:h-24 sm:w-36">
                  <Image
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="144px"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="text-sm font-semibold text-foreground transition-colors hover:text-primary sm:text-base"
                    >
                      {item.product.name}
                    </Link>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {item.product.brand} &middot; {formatPrice(item.denomination)}
                    </p>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    {/* Quantity */}
                    <div className="flex items-center rounded-lg border border-border bg-secondary/50">
                      <button
                        type="button"
                        onClick={() =>
                          update(item.product.id, item.denomination, item.quantity - 1)
                        }
                        className="flex h-8 w-8 items-center justify-center text-foreground transition-colors hover:bg-secondary"
                        aria-label="Reduire"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="flex h-8 w-8 items-center justify-center text-xs font-semibold text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          update(item.product.id, item.denomination, item.quantity + 1)
                        }
                        className="flex h-8 w-8 items-center justify-center text-foreground transition-colors hover:bg-secondary"
                        aria-label="Augmenter"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-foreground sm:text-base">
                        {formatPrice(price * item.quantity)}
                      </span>
                      <button
                        type="button"
                        onClick={() => remove(item.product.id, item.denomination)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        aria-label="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary */}
        <div className="w-full lg:w-80">
          <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold text-foreground">Recapitulatif</h2>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sous-total</span>
                <span className="text-foreground">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Livraison</span>
                <span className="font-medium text-accent">Gratuite</span>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-xl font-bold text-foreground">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/checkout"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Passer la commande
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/shop"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-transparent px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <ArrowLeft className="h-4 w-4" />
              Continuer les achats
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
