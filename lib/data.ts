export type Category = {
  id: string
  name: string
  slug: string
  icon: string
  description: string
  color: string
}

export type Product = {
  id: string
  name: string
  slug: string
  category: string
  brand: string
  description: string
  image: string
  denominations: number[]
  currency: string
  discount?: number
  isNew?: boolean
  isFeatured?: boolean
  rating: number
  reviews: number
}

export type CartItem = {
  product: Product
  denomination: number
  quantity: number
}

export const categories: Category[] = [
  {
    id: "gaming",
    name: "Gaming",
    slug: "gaming",
    icon: "Gamepad2",
    description: "PlayStation, Xbox, Nintendo, Steam et plus",
    color: "oklch(0.65 0.19 245)",
  },
  {
    id: "music",
    name: "Musique",
    slug: "musique",
    icon: "Music",
    description: "Spotify, Apple Music, Deezer",
    color: "oklch(0.72 0.19 155)",
  },
  {
    id: "streaming",
    name: "Streaming",
    slug: "streaming",
    icon: "Tv",
    description: "Netflix, Disney+, Amazon Prime",
    color: "oklch(0.65 0.18 30)",
  },
  {
    id: "appstore",
    name: "App Store",
    slug: "app-store",
    icon: "Smartphone",
    description: "Apple, Google Play, Microsoft",
    color: "oklch(0.6 0.2 310)",
  },
  {
    id: "iptv",
    name: "IPTV",
    slug: "iptv",
    icon: "Satellite",
    description: "Abonnements IPTV Premium",
    color: "oklch(0.7 0.15 50)",
  },
  {
    id: "social",
    name: "Reseaux Sociaux",
    slug: "reseaux-sociaux",
    icon: "Share2",
    description: "TikTok, Instagram, Facebook boosts",
    color: "oklch(0.6 0.22 350)",
  },
]

export const products: Product[] = [
  // Gaming
  {
    id: "ps-store-10",
    name: "PlayStation Store",
    slug: "playstation-store",
    category: "gaming",
    brand: "PlayStation",
    description: "Carte cadeau PlayStation Store. Utilisez-la pour acheter des jeux, DLC, abonnements PS Plus et plus encore sur le PlayStation Store.",
    image: "/categories/PlayStation.avif",
    denominations: [10, 20, 50, 100],
    currency: "EUR",
    discount: 5,
    isFeatured: true,
    rating: 4.8,
    reviews: 342,
  },
  {
    id: "xbox-gift",
    name: "Xbox Gift Card",
    slug: "xbox-gift-card",
    category: "gaming",
    brand: "Xbox",
    description: "Carte cadeau Xbox. Achetez des jeux, des films et plus sur le Microsoft Store et Xbox Store.",
    image: "/categories/Xbox.avif",
    denominations: [15, 25, 50, 100],
    currency: "EUR",
    isFeatured: true,
    rating: 4.7,
    reviews: 218,
  },
  {
    id: "nintendo-eshop",
    name: "Nintendo eShop",
    slug: "nintendo-eshop",
    category: "gaming",
    brand: "Nintendo",
    description: "Carte cadeau Nintendo eShop. Telechargez des jeux Nintendo Switch, DLC et bien plus.",
    image: "/categories/Nintendo 2.webp",
    denominations: [15, 25, 35, 50],
    currency: "EUR",
    isNew: true,
    rating: 4.9,
    reviews: 187,
  },
  {
    id: "steam-wallet",
    name: "Steam Wallet",
    slug: "steam-wallet",
    category: "gaming",
    brand: "Steam",
    description: "Carte Steam Wallet. Alimentez votre portefeuille Steam pour acheter des milliers de jeux PC.",
    image: "/categories/Steam.avif",
    denominations: [5, 10, 20, 50, 100],
    currency: "EUR",
    discount: 3,
    isFeatured: true,
    rating: 4.9,
    reviews: 521,
  },
  {
    id: "valorant-points",
    name: "Valorant Points",
    slug: "valorant-points",
    category: "gaming",
    brand: "Riot Games",
    description: "Achetez des Valorant Points pour debloquer des skins, des agents et le Battle Pass.",
    image: "/categories/Steam.avif",
    denominations: [10, 20, 35, 50],
    currency: "EUR",
    isNew: true,
    rating: 4.6,
    reviews: 156,
  },
  {
    id: "fortnite-vbucks",
    name: "Fortnite V-Bucks",
    slug: "fortnite-vbucks",
    category: "gaming",
    brand: "Epic Games",
    description: "Carte V-Bucks Fortnite. Achetez des skins, emotes et le Battle Pass dans Fortnite.",
    image: "/categories/Fortnite.webp",
    denominations: [10, 25, 50, 100],
    currency: "EUR",
    rating: 4.7,
    reviews: 289,
  },
  // Music
  {
    id: "spotify-premium",
    name: "Spotify Premium",
    slug: "spotify-premium",
    category: "music",
    brand: "Spotify",
    description: "Carte cadeau Spotify Premium. Profitez de musique sans publicite, en mode hors-ligne et en haute qualite.",
    image: "/categories/Spotify.webp",
    denominations: [10, 30, 60],
    currency: "EUR",
    discount: 10,
    isFeatured: true,
    rating: 4.8,
    reviews: 456,
  },
  {
    id: "apple-music",
    name: "Apple Music",
    slug: "apple-music",
    category: "music",
    brand: "Apple",
    description: "Carte cadeau Apple Music. Ecoutez plus de 100 millions de chansons sans publicite.",
    image: "/categories/Apple 2.avif",
    denominations: [10, 25, 50],
    currency: "EUR",
    rating: 4.7,
    reviews: 198,
  },
  {
    id: "deezer-premium",
    name: "Deezer Premium",
    slug: "deezer-premium",
    category: "music",
    brand: "Deezer",
    description: "Abonnement Deezer Premium. Musique illimitee en haute qualite sans publicite.",
    image: "/categories/Deezer.webp",
    denominations: [10, 30, 60],
    currency: "EUR",
    isNew: true,
    rating: 4.5,
    reviews: 87,
  },
  // Streaming
  {
    id: "netflix-gift",
    name: "Netflix",
    slug: "netflix",
    category: "streaming",
    brand: "Netflix",
    description: "Carte cadeau Netflix. Regardez des films, series et documentaires en illimite.",
    image: "/categories/Netflix.png",
    denominations: [15, 25, 50],
    currency: "EUR",
    isFeatured: true,
    rating: 4.8,
    reviews: 389,
  },
  {
    id: "disney-plus",
    name: "Disney+",
    slug: "disney-plus",
    category: "streaming",
    brand: "Disney",
    description: "Carte cadeau Disney+. Accedez a Disney, Pixar, Marvel, Star Wars et National Geographic.",
    image: "/categories/Disney.webp",
    denominations: [15, 30, 60],
    currency: "EUR",
    discount: 8,
    rating: 4.7,
    reviews: 234,
  },
  {
    id: "amazon-prime",
    name: "Amazon Prime Video",
    slug: "amazon-prime-video",
    category: "streaming",
    brand: "Amazon",
    description: "Carte cadeau Amazon Prime Video. Films, series et livraison gratuite inclus.",
    image: "/categories/Amazon.webp",
    denominations: [15, 25, 50],
    currency: "EUR",
    rating: 4.6,
    reviews: 167,
  },
  // App Store
  {
    id: "apple-gift",
    name: "Apple Gift Card",
    slug: "apple-gift-card",
    category: "appstore",
    brand: "Apple",
    description: "Carte cadeau Apple. Utilisez-la sur l'App Store, iTunes, Apple TV+ et plus.",
    image: "/categories/Apple 2.avif",
    denominations: [10, 25, 50, 100],
    currency: "EUR",
    isFeatured: true,
    rating: 4.9,
    reviews: 567,
  },
  {
    id: "google-play",
    name: "Google Play",
    slug: "google-play",
    category: "appstore",
    brand: "Google",
    description: "Carte cadeau Google Play. Achetez des apps, jeux, films et livres sur le Play Store.",
    image: "/categories/GooglePlay.webp",
    denominations: [10, 15, 25, 50],
    currency: "EUR",
    rating: 4.7,
    reviews: 312,
  },

  // // IPTV
  // {
  //   id: "iptv-premium-1m",
  //   name: "IPTV Premium",
  //   slug: "iptv-premium",
  //   category: "iptv",
  //   brand: "IPTV Pro",
  //   description: "Abonnement IPTV Premium. Plus de 10000 chaines et VOD en qualite HD et 4K.",
  //   image: "/categories/Spotify.webp",
  //   denominations: [10, 25, 40, 70],
  //   currency: "EUR",
  //   discount: 15,
  //   isFeatured: true,
  //   isNew: true,
  //   rating: 4.5,
  //   reviews: 423,
  // },
  // {
  //   id: "iptv-sport",
  //   name: "IPTV Sport",
  //   slug: "iptv-sport",
  //   category: "iptv",
  //   brand: "IPTV Pro",
  //   description: "Abonnement IPTV Sport. Toutes les chaines sportives en direct: Football, NBA, UFC et plus.",
  //   image: "/categories/Deezer.webp",
  //   denominations: [15, 30, 50],
  //   currency: "EUR",
  //   rating: 4.4,
  //   reviews: 198,
  // },
  // Social
  {
    id: "tiktok-coins",
    name: "TikTok Coins",
    slug: "tiktok-coins",
    category: "social",
    brand: "TikTok",
    description: "Achetez des TikTok Coins pour envoyer des cadeaux a vos createurs preferes.",
    image: "/categories/Tiktok 2.webp",
    denominations: [5, 10, 25, 50],
    currency: "EUR",
    isNew: true,
    rating: 4.3,
    reviews: 145,
  },
]

export const promotions = [
  {
    id: "promo-1",
    title: "Soldes Gaming",
    subtitle: "Jusqu'a -15% sur les cartes Gaming",
    description: "PlayStation, Xbox, Steam et Nintendo en promotion",
    badge: "-15%",
    color: "oklch(0.65 0.19 245)",
    category: "gaming",
  },
  {
    id: "promo-2",
    title: "Spotify Premium",
    subtitle: "-10% sur tous les forfaits",
    description: "Profitez de la musique sans limites",
    badge: "-10%",
    color: "oklch(0.72 0.19 155)",
    category: "music",
  },
  {
    id: "promo-3",
    title: "IPTV Premium",
    subtitle: "-15% ce mois-ci",
    description: "Plus de 10 000 chaines en HD et 4K",
    badge: "-15%",
    color: "oklch(0.7 0.15 50)",
    category: "iptv",
  },
]

export function getProductsByCategory(categorySlug: string): Product[] {
  const category = categories.find(c => c.slug === categorySlug)
  if (!category) return []
  return products.filter(p => p.category === category.id)
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.isFeatured)
}

export function getNewProducts(): Product[] {
  return products.filter(p => p.isNew)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getDiscountedProducts(): Product[] {
  return products.filter(p => p.discount && p.discount > 0)
}

export function formatPrice(amount: number, currency: string = "EUR"): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
  }).format(amount)
}

export function getDiscountedPrice(price: number, discount: number): number {
  return price * (1 - discount / 100)
}
