"use client"

import React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Shield,
  Lock,
  Mail,
  CheckCircle2,
} from "lucide-react"
import { useCart } from "@/lib/cart-store"
import { formatPrice, getDiscountedPrice } from "@/lib/data"

type Step = "info" | "payment" | "confirmation"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, count, clear } = useCart()
  const [step, setStep] = useState<Step>("info")
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  })
  const [paymentMethod, setPaymentMethod] = useState<string>("card")
  const [processing, setProcessing] = useState(false)

  if (items.length === 0 && step !== "confirmation") {
    router.push("/cart")
    return null
  }

  function handleInfoSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStep("payment")
  }

  function handlePayment(e: React.FormEvent) {
    e.preventDefault()
    setProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false)
      clear()
      setStep("confirmation")
    }, 2000)
  }

  if (step === "confirmation") {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center lg:px-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
          <CheckCircle2 className="h-10 w-10 text-accent" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-foreground">
          Commande confirmee
        </h1>
        <p className="mt-3 text-muted-foreground">
          Merci pour votre achat ! Vos codes de cartes cadeaux ont ete envoyes a{" "}
          <span className="font-medium text-foreground">{form.email}</span>.
          Vous recevrez egalement une facture par email.
        </p>
        <div className="mt-6 rounded-xl border border-border bg-card p-4 text-left w-full">
          <div className="flex items-center gap-2 mb-3">
            <Mail className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Email de confirmation envoye
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Numero de commande: <span className="font-mono text-foreground">GZ-{Date.now().toString(36).toUpperCase()}</span>
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-3 w-full sm:flex-row sm:justify-center">
          <Link
            href="/dashboard/orders"
            className="flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Voir mes commandes
          </Link>
          <Link
            href="/shop"
            className="flex items-center justify-center rounded-xl border border-border bg-transparent px-6 py-3 text-sm font-medium text-foreground"
          >
            Retour a la boutique
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
      {/* Progress */}
      <div className="mb-8">
        <Link
          href="/cart"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au panier
        </Link>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          Paiement
        </h1>
        {/* Steps */}
        <div className="mt-4 flex items-center gap-2 text-sm">
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
              step === "info"
                ? "bg-primary text-primary-foreground"
                : "bg-accent/20 text-accent"
            }`}
          >
            1
          </span>
          <span
            className={
              step === "info"
                ? "font-medium text-foreground"
                : "text-muted-foreground"
            }
          >
            Informations
          </span>
          <div className="mx-2 h-px w-8 bg-border" />
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
              step === "payment"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            2
          </span>
          <span
            className={
              step === "payment"
                ? "font-medium text-foreground"
                : "text-muted-foreground"
            }
          >
            Paiement
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Form */}
        <div className="flex-1">
          {step === "info" && (
            <form onSubmit={handleInfoSubmit} className="space-y-4">
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 text-lg font-semibold text-foreground">
                  Vos informations
                </h2>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      Adresse email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="votre@email.com"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Les codes seront envoyes a cette adresse
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="mb-1.5 block text-sm font-medium text-foreground"
                      >
                        Prenom *
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        required
                        value={form.firstName}
                        onChange={(e) =>
                          setForm({ ...form, firstName: e.target.value })
                        }
                        className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Prenom"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="mb-1.5 block text-sm font-medium text-foreground"
                      >
                        Nom *
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        required
                        value={form.lastName}
                        onChange={(e) =>
                          setForm({ ...form, lastName: e.target.value })
                        }
                        className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Nom"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      Telephone (optionnel)
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="+212 6XX XXX XXX"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Continuer vers le paiement
              </button>
            </form>
          )}

          {step === "payment" && (
            <form onSubmit={handlePayment} className="space-y-4">
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 text-lg font-semibold text-foreground">
                  Methode de paiement
                </h2>
                <div className="space-y-3">
                  {[
                    { id: "card", label: "Carte bancaire", icon: CreditCard, desc: "Visa, Mastercard, CB" },
                    { id: "mobile", label: "Paiement mobile", icon: Smartphone, desc: "Orange Money, Wave, M-Pesa" },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
                        paymentMethod === method.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-border/80"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                        className="sr-only"
                      />
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                          paymentMethod === method.id
                            ? "border-primary"
                            : "border-muted-foreground/30"
                        }`}
                      >
                        {paymentMethod === method.id && (
                          <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                        )}
                      </div>
                      <method.icon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {method.label}
                        </p>
                        <p className="text-xs text-muted-foreground">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                {paymentMethod === "card" && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="mb-1.5 block text-sm font-medium text-foreground">
                        Numero de carte
                      </label>
                      <input
                        id="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="mb-1.5 block text-sm font-medium text-foreground">
                          Expiration
                        </label>
                        <input
                          id="expiry"
                          type="text"
                          placeholder="MM/AA"
                          className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="mb-1.5 block text-sm font-medium text-foreground">
                          CVV
                        </label>
                        <input
                          id="cvv"
                          type="text"
                          placeholder="123"
                          className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-accent/5 border border-accent/20 px-4 py-3">
                <Shield className="h-4 w-4 text-accent" />
                <p className="text-xs text-muted-foreground">
                  Vos informations de paiement sont chiffrees et securisees
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep("info")}
                  className="rounded-xl border border-border bg-transparent px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {processing ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Traitement en cours...
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      Payer {formatPrice(total)}
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Order summary sidebar */}
        {step !== "confirmation" && (
          <div className="w-full lg:w-80">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">
                Votre commande
              </h2>
              <div className="space-y-3">
                {items.map((item) => {
                  const price = item.product.discount
                    ? getDiscountedPrice(item.denomination, item.product.discount)
                    : item.denomination
                  return (
                    <div
                      key={`${item.product.id}-${item.denomination}`}
                      className="flex items-center gap-3"
                    >
                      <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-lg bg-secondary">
                        <Image
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatPrice(item.denomination)} x{item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        {formatPrice(price * item.quantity)}
                      </span>
                    </div>
                  )
                })}
              </div>
              <div className="mt-4 border-t border-border pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span className="text-foreground">{formatPrice(total)}</span>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Livraison</span>
                  <span className="font-medium text-accent">Gratuite</span>
                </div>
                <div className="mt-3 flex justify-between border-t border-border pt-3">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-lg font-bold text-foreground">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
