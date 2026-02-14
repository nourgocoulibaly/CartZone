"use client"

import Link from "next/link"
import { ArrowRight, Shield, Zap, Clock, Star } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-secondary via-background to-secondary dark:from-[#0a1220] dark:via-[#070b14] dark:to-[#0a1220]">
      <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-14 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:pb-20 lg:pt-20">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">instant delivery</span>
          </div>

          <h1 className="max-w-4xl text-balance text-4xl font-black leading-tight tracking-tight text-foreground md:text-6xl">
            Le marketplace
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> gaming & digital</span>
            <br /> pour vos cartes cadeaux.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Prix compétitifs, livraison en quelques secondes, paiement sécurisé et support réactif.
            Trouvez vos crédits PlayStation, Xbox, Steam, Spotify, Netflix et bien plus.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:items-start">
            <Link href="/shop" className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
              Explorer la boutique
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/promotions" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-secondary">
              Voir les meilleures offres
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { icon: Zap, title: "Livraison rapide", desc: "Code reçu en 30 sec" },
              { icon: Shield, title: "Paiement sécurisé", desc: "Protection renforcée" },
              { icon: Clock, title: "Support 24/7", desc: "Assistance continue" },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card/70 px-4 py-3 backdrop-blur-sm">
                <item.icon className="mb-2 h-4 w-4 text-primary" />
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 self-end">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-2xl shadow-primary/10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Top deal du jour</p>
            <h3 className="mt-2 text-xl font-bold text-foreground">Steam Wallet -12%</h3>
            <p className="mt-1 text-sm text-muted-foreground">Profitez de remises flash sur les cartes les plus demandées.</p>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-2xl font-black text-accent">€43.99</span>
              <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">Code instantané</span>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="text-sm font-semibold text-foreground">Avis clients</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}</div>
              <span className="text-sm text-muted-foreground">4.8/5 sur 18 000+ commandes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
