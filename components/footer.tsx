import Link from "next/link"
import { Zap, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">GiftZone</span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Votre marketplace de cartes cadeaux digitales. Gaming, Musique, Streaming et plus encore. Livraison instantanee par email.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Navigation
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Accueil", href: "/" },
                { label: "Boutique", href: "/shop" },
                { label: "Promotions", href: "/promotions" },
                { label: "Mon Compte", href: "/dashboard" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Categories
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Gaming", href: "/shop/gaming" },
                { label: "Musique", href: "/shop/musique" },
                { label: "Streaming", href: "/shop/streaming" },
                { label: "App Store", href: "/shop/app-store" },
                { label: "IPTV", href: "/shop/iptv" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                support@giftzone.com
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                +212 600 000 000
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Casablanca, Maroc
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            2026 GiftZone. Tous droits reserves.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/terms"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              CGV
            </Link>
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Confidentialite
            </Link>
            <Link
              href="/faq"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
