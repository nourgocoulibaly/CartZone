import Link from "next/link"
import {
  ShoppingBag,
  CreditCard,
  TrendingUp,
  ArrowRight,
  Package,
  Clock,
} from "lucide-react"

const stats = [
  {
    label: "Commandes",
    value: "12",
    icon: ShoppingBag,
    change: "+3 ce mois",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    label: "Cartes actives",
    value: "8",
    icon: CreditCard,
    change: "2 expirent bientot",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    label: "Total depense",
    value: "342,50 EUR",
    icon: TrendingUp,
    change: "+45,00 EUR ce mois",
    color: "text-chart-3",
    bg: "bg-chart-3/10",
  },
]

const recentOrders = [
  {
    id: "GZ-XK92F",
    product: "PlayStation Store - 50 EUR",
    date: "5 fev. 2026",
    status: "Livre",
    statusColor: "text-accent bg-accent/10",
  },
  {
    id: "GZ-AB3D2",
    product: "Spotify Premium - 30 EUR",
    date: "3 fev. 2026",
    status: "Livre",
    statusColor: "text-accent bg-accent/10",
  },
  {
    id: "GZ-M4KL1",
    product: "Netflix - 25 EUR",
    date: "28 jan. 2026",
    status: "Livre",
    statusColor: "text-accent bg-accent/10",
  },
  {
    id: "GZ-R7YP9",
    product: "IPTV Premium - 40 EUR",
    date: "20 jan. 2026",
    status: "En attente",
    statusColor: "text-chart-3 bg-chart-3/10",
  },
]

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground md:text-3xl">
        Tableau de bord
      </h1>
      <p className="mt-1 text-muted-foreground">
        Bienvenue, Ahmed. Voici un apercu de votre activite.
      </p>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${stat.bg}`}
              >
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Commandes recentes
          </h2>
          <Link
            href="/dashboard/orders"
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            Tout voir
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="rounded-xl border border-border bg-card">
          {recentOrders.map((order, i) => (
            <div
              key={order.id}
              className={`flex items-center gap-4 p-4 ${
                i < recentOrders.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <Package className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {order.product}
                </p>
                <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-mono">{order.id}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {order.date}
                  </span>
                </div>
              </div>
              <span
                className={`shrink-0 rounded-md px-2.5 py-1 text-xs font-medium ${order.statusColor}`}
              >
                {order.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
