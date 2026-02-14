"use client"

import Link from "next/link"
import { ArrowRight, Shield, Zap, Clock, Star } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(43,108,255,0.25),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(0,209,255,0.2),transparent_45%),#070b14]">
      <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#2b6cff]/20 blur-3xl" />
      <div className="absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-[#00d1ff]/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-14 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:pb-20 lg:pt-20">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#2b6cff]/40 bg-[#2b6cff]/10 px-4 py-1.5">
            <Zap className="h-4 w-4 text-[#58b8ff]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8cccff]">instant delivery</span>
          </div>

          <h1 className="max-w-4xl text-balance text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
            Le marketplace
            <span className="bg-gradient-to-r from-[#58b8ff] to-[#72ffe5] bg-clip-text text-transparent"> gaming & digital</span>
            <br /> pour vos cartes cadeaux.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
            Prix compétitifs, livraison en quelques secondes, paiement sécurisé et support réactif.
            Trouvez vos crédits PlayStation, Xbox, Steam, Spotify, Netflix et bien plus.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:items-start">
            <Link href="/shop" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#2b6cff] to-[#4f8cff] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90">
              Explorer la boutique
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/promotions" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10">
              Voir les meilleures offres
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { icon: Zap, title: "Livraison rapide", desc: "Code reçu en 30 sec" },
              { icon: Shield, title: "Paiement sécurisé", desc: "Protection renforcée" },
              { icon: Clock, title: "Support 24/7", desc: "Assistance continue" },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                <item.icon className="mb-2 h-4 w-4 text-[#72ffe5]" />
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 self-end">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#101c33] to-[#0d1628] p-6 shadow-2xl shadow-[#2b6cff]/20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Top deal du jour</p>
            <h3 className="mt-2 text-xl font-bold text-white">Steam Wallet -12%</h3>
            <p className="mt-1 text-sm text-slate-400">Profitez de remises flash sur les cartes les plus demandées.</p>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-2xl font-black text-[#72ffe5]">€43.99</span>
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">Code instantané</span>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-semibold text-white">Avis clients</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-[#ffd75e] text-[#ffd75e]" />)}</div>
              <span className="text-sm text-slate-300">4.8/5 sur 18 000+ commandes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
