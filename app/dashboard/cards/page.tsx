"use client"

import { useState } from "react"
import {
  CreditCard,
  Copy,
  CheckCircle2,
  Eye,
  EyeOff,
  Clock,
  AlertTriangle,
} from "lucide-react"

type GiftCard = {
  id: string
  product: string
  brand: string
  code: string
  denomination: string
  purchaseDate: string
  status: "active" | "used" | "expired"
  expiryDate?: string
}

const giftCards: GiftCard[] = [
  {
    id: "1",
    product: "PlayStation Store",
    brand: "PlayStation",
    code: "XXXX-ABCD-EF12-3456",
    denomination: "50 EUR",
    purchaseDate: "5 fev. 2026",
    status: "active",
    expiryDate: "5 fev. 2027",
  },
  {
    id: "2",
    product: "Steam Wallet",
    brand: "Steam",
    code: "XXXX-GHIJ-KL78-9012",
    denomination: "20 EUR",
    purchaseDate: "5 fev. 2026",
    status: "active",
    expiryDate: "5 fev. 2027",
  },
  {
    id: "3",
    product: "Steam Wallet",
    brand: "Steam",
    code: "XXXX-MNOP-QR34-5678",
    denomination: "20 EUR",
    purchaseDate: "5 fev. 2026",
    status: "active",
    expiryDate: "5 fev. 2027",
  },
  {
    id: "4",
    product: "Spotify Premium",
    brand: "Spotify",
    code: "XXXX-STUV-WX90-1234",
    denomination: "30 EUR",
    purchaseDate: "3 fev. 2026",
    status: "used",
  },
  {
    id: "5",
    product: "Netflix",
    brand: "Netflix",
    code: "XXXX-YZ12-AB56-7890",
    denomination: "25 EUR",
    purchaseDate: "28 jan. 2026",
    status: "used",
  },
  {
    id: "6",
    product: "Disney+",
    brand: "Disney",
    code: "XXXX-CD34-EF78-9012",
    denomination: "30 EUR",
    purchaseDate: "28 jan. 2026",
    status: "expired",
  },
  {
    id: "7",
    product: "Xbox Gift Card",
    brand: "Xbox",
    code: "XXXX-GH56-IJ90-1234",
    denomination: "25 EUR",
    purchaseDate: "10 jan. 2026",
    status: "expired",
  },
]

const statusConfig = {
  active: {
    label: "Active",
    color: "text-accent bg-accent/10",
    icon: CheckCircle2,
  },
  used: {
    label: "Utilisee",
    color: "text-muted-foreground bg-secondary",
    icon: Clock,
  },
  expired: {
    label: "Expiree",
    color: "text-destructive bg-destructive/10",
    icon: AlertTriangle,
  },
}

export default function CardsPage() {
  const [filter, setFilter] = useState<string>("all")
  const [revealedCards, setRevealedCards] = useState<Set<string>>(new Set())
  const [copiedCard, setCopiedCard] = useState<string | null>(null)

  const filteredCards =
    filter === "all" ? giftCards : giftCards.filter((c) => c.status === filter)

  function toggleReveal(id: string) {
    const next = new Set(revealedCards)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    setRevealedCards(next)
  }

  function copyCode(id: string, code: string) {
    navigator.clipboard.writeText(code)
    setCopiedCard(id)
    setTimeout(() => setCopiedCard(null), 2000)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Mes cartes cadeaux</h1>
      <p className="mt-1 text-muted-foreground">
        Gerez et consultez toutes vos cartes cadeaux
      </p>

      {/* Filters */}
      <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
        {[
          { id: "all", label: `Toutes (${giftCards.length})` },
          {
            id: "active",
            label: `Actives (${giftCards.filter((c) => c.status === "active").length})`,
          },
          {
            id: "used",
            label: `Utilisees (${giftCards.filter((c) => c.status === "used").length})`,
          },
          {
            id: "expired",
            label: `Expirees (${giftCards.filter((c) => c.status === "expired").length})`,
          },
        ].map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              filter === f.id
                ? "bg-primary/10 text-primary"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {filteredCards.map((card) => {
          const config = statusConfig[card.status]
          const StatusIcon = config.icon
          const revealed = revealedCards.has(card.id)
          const copied = copiedCard === card.id

          return (
            <div
              key={card.id}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {card.product}
                    </p>
                    <p className="text-xs text-muted-foreground">{card.brand}</p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${config.color}`}
                >
                  <StatusIcon className="h-3 w-3" />
                  {config.label}
                </span>
              </div>

              {/* Code */}
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2.5">
                <span className="flex-1 font-mono text-sm text-foreground">
                  {revealed ? card.code : card.code.replace(/[A-Z0-9]/g, "*")}
                </span>
                <button
                  type="button"
                  onClick={() => toggleReveal(card.id)}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label={revealed ? "Masquer" : "Reveler"}
                >
                  {revealed ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => copyCode(card.id, card.code)}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Copier"
                >
                  {copied ? (
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Details */}
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>Valeur: {card.denomination}</span>
                <span>Achetee le {card.purchaseDate}</span>
              </div>
              {card.expiryDate && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Expire le {card.expiryDate}
                </p>
              )}
            </div>
          )
        })}
      </div>

      {filteredCards.length === 0 && (
        <div className="flex flex-col items-center py-16">
          <CreditCard className="mb-3 h-10 w-10 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">Aucune carte trouvee</p>
        </div>
      )}
    </div>
  )
}
