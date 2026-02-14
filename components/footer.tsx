import Link from "next/link"
import { Zap, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#070b14]">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#2b6cff] to-[#00d1ff]">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-white">GiftZone</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Marketplace de cartes cadeaux digitales inspiré des grandes plateformes gaming: rapide, sécurisé et compétitif.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Navigation</h3>
            <ul className="space-y-2">
              {[
                { label: "Accueil", href: "/" },
                { label: "Boutique", href: "/shop" },
                { label: "Promotions", href: "/promotions" },
                { label: "Mon Compte", href: "/dashboard" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Catégories</h3>
            <ul className="space-y-2">
              {[
                { label: "Gaming", href: "/shop/gaming" },
                { label: "Musique", href: "/shop/musique" },
                { label: "Streaming", href: "/shop/streaming" },
                { label: "App Store", href: "/shop/app-store" },
                { label: "IPTV", href: "/shop/iptv" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-slate-400"><Mail className="h-4 w-4" />support@giftzone.com</li>
              <li className="flex items-center gap-2 text-sm text-slate-400"><Phone className="h-4 w-4" />+212 600 000 000</li>
              <li className="flex items-center gap-2 text-sm text-slate-400"><MapPin className="h-4 w-4" />Casablanca, Maroc</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-slate-500">2026 GiftZone. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-xs text-slate-500 transition-colors hover:text-white">CGV</Link>
            <Link href="/privacy" className="text-xs text-slate-500 transition-colors hover:text-white">Confidentialité</Link>
            <Link href="/faq" className="text-xs text-slate-500 transition-colors hover:text-white">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
