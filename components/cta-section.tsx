import Link from "next/link"
import { ArrowRight, Gift } from "lucide-react"

export function CtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-accent/10 p-8 md:p-12 lg:p-16">
        <div className="relative flex flex-col items-center text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20">
            <Gift className="h-8 w-8 text-primary" />
          </div>
          <h2 className="max-w-2xl text-balance text-2xl font-bold text-foreground md:text-4xl">
            Creez votre compte et profitez d&apos;avantages exclusifs
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-muted-foreground">
            Historique d&apos;achats, suivi de commandes, offres personnalisees et
            bien plus encore. Rejoignez la communaute GiftZone.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
            >
              Creer un compte
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-all hover:bg-secondary/80"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
