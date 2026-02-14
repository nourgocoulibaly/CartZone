import Link from "next/link"
import { ArrowRight, Gift } from "lucide-react"

export function CtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_10%_10%,rgba(43,108,255,0.3),transparent_35%),radial-gradient(circle_at_90%_90%,rgba(0,209,255,0.2),transparent_35%),linear-gradient(135deg,#0d1728,#0b1220)] p-8 md:p-12 lg:p-16">
        <div className="relative flex flex-col items-center text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2b6cff]/20">
            <Gift className="h-8 w-8 text-[#8cccff]" />
          </div>
          <h2 className="max-w-2xl text-balance text-2xl font-black text-white md:text-4xl">
            Créez un compte et accédez aux meilleurs deals
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-slate-300">
            Suivi des commandes, historique d&apos;achats, offres personnalisées et promotions exclusives.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#2b6cff] to-[#4f8cff] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Créer un compte
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
