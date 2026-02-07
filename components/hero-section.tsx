"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Shield, Zap, Clock } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Livraison instantanee
            </span>
          </div>

          {/* Heading */}
          <h1 className="max-w-4xl text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-7xl">
            Vos cartes cadeaux{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              digitales
            </span>{" "}
            en un clic
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Gaming, Musique, Streaming, IPTV et plus encore. Achetez vos cartes
            cadeaux preferees et recevez-les instantanement par email.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
            >
              Explorer la boutique
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/promotions"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-all hover:bg-secondary/80"
            >
              Voir les promotions
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                icon: Zap,
                title: "Livraison instantanee",
                desc: "Recevez par email en 30 secondes",
              },
              {
                icon: Shield,
                title: "Paiement securise",
                desc: "Transactions 100% protegees",
              },
              {
                icon: Clock,
                title: "Support 24/7",
                desc: "Assistance disponible a tout moment",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/50 px-4 py-3 backdrop-blur-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
