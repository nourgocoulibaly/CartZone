"use client"

import { useState } from "react"
import {
  Package,
  Clock,
  ChevronDown,
  ChevronUp,
  Download,
  Mail,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"

type Order = {
  id: string
  products: { name: string; denomination: string; quantity: number }[]
  total: string
  date: string
  status: "delivered" | "pending" | "cancelled"
  email: string
  paymentMethod: string
}

const orders: Order[] = [
  {
    id: "GZ-XK92F",
    products: [
      { name: "PlayStation Store", denomination: "50 EUR", quantity: 1 },
      { name: "Steam Wallet", denomination: "20 EUR", quantity: 2 },
    ],
    total: "87,50 EUR",
    date: "5 fevrier 2026",
    status: "delivered",
    email: "ahmed@email.com",
    paymentMethod: "Carte bancaire",
  },
  {
    id: "GZ-AB3D2",
    products: [{ name: "Spotify Premium", denomination: "30 EUR", quantity: 1 }],
    total: "27,00 EUR",
    date: "3 fevrier 2026",
    status: "delivered",
    email: "ahmed@email.com",
    paymentMethod: "Carte bancaire",
  },
  {
    id: "GZ-M4KL1",
    products: [
      { name: "Netflix", denomination: "25 EUR", quantity: 1 },
      { name: "Disney+", denomination: "30 EUR", quantity: 1 },
    ],
    total: "50,40 EUR",
    date: "28 janvier 2026",
    status: "delivered",
    email: "ahmed@email.com",
    paymentMethod: "Paiement mobile",
  },
  {
    id: "GZ-R7YP9",
    products: [{ name: "IPTV Premium", denomination: "40 EUR", quantity: 1 }],
    total: "34,00 EUR",
    date: "20 janvier 2026",
    status: "pending",
    email: "ahmed@email.com",
    paymentMethod: "Paiement mobile",
  },
  {
    id: "GZ-PP823",
    products: [{ name: "Xbox Gift Card", denomination: "25 EUR", quantity: 3 }],
    total: "75,00 EUR",
    date: "10 janvier 2026",
    status: "cancelled",
    email: "ahmed@email.com",
    paymentMethod: "Carte bancaire",
  },
]

const statusConfig = {
  delivered: {
    label: "Livre",
    color: "text-accent bg-accent/10",
    icon: CheckCircle2,
  },
  pending: {
    label: "En attente",
    color: "text-chart-3 bg-chart-3/10",
    icon: Clock,
  },
  cancelled: {
    label: "Annule",
    color: "text-destructive bg-destructive/10",
    icon: AlertCircle,
  },
}

export default function OrdersPage() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>("all")

  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter)

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Mes commandes</h1>
      <p className="mt-1 text-muted-foreground">
        Consultez l&apos;historique de toutes vos commandes
      </p>

      {/* Filters */}
      <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
        {[
          { id: "all", label: "Toutes" },
          { id: "delivered", label: "Livrees" },
          { id: "pending", label: "En attente" },
          { id: "cancelled", label: "Annulees" },
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

      {/* Orders list */}
      <div className="mt-4 space-y-3">
        {filteredOrders.map((order) => {
          const config = statusConfig[order.status]
          const StatusIcon = config.icon
          const expanded = expandedOrder === order.id

          return (
            <div
              key={order.id}
              className="rounded-xl border border-border bg-card"
            >
              <button
                type="button"
                onClick={() =>
                  setExpandedOrder(expanded ? null : order.id)
                }
                className="flex w-full items-center gap-4 p-4 text-left"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                  <Package className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-semibold text-foreground">
                      {order.id}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${config.color}`}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {config.label}
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {order.date}
                    <span className="font-semibold text-foreground">
                      {order.total}
                    </span>
                  </div>
                </div>
                {expanded ? (
                  <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                )}
              </button>

              {expanded && (
                <div className="border-t border-border px-4 py-4">
                  <div className="space-y-3">
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Produits
                      </p>
                      {order.products.map((p, i) => (
                        <div
                          key={i}
                          className="flex justify-between py-1.5 text-sm"
                        >
                          <span className="text-foreground">
                            {p.name} ({p.denomination}) x{p.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="text-foreground">{order.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Paiement</p>
                        <p className="text-foreground">{order.paymentMethod}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary/80"
                      >
                        <Download className="h-3 w-3" />
                        Facture
                      </button>
                      <button
                        type="button"
                        className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary/80"
                      >
                        <Mail className="h-3 w-3" />
                        Renvoyer les codes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {filteredOrders.length === 0 && (
          <div className="flex flex-col items-center py-16">
            <Package className="mb-3 h-10 w-10 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">Aucune commande trouvee</p>
          </div>
        )}
      </div>
    </div>
  )
}
