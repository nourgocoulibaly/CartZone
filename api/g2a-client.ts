import "dotenv/config"

const G2A_BASE_URL = process.env.G2A_BASE_URL ?? "https://api.g2a.com"
const G2A_BUSINESS_TOKEN = process.env.G2A_BUSINESS_TOKEN
const TAUX_EUR_XOF = Number(process.env.EUR_TO_XOF_RATE ?? "655.957")

export type OffreG2A = {
  id: string
  produit: string
  prix: number
  ratingVendeur: number
  devise: "XOF"
}

export type ProduitCatalogueG2A = {
  id: string
  nom: string
  slug: string
  marque: string
  categorie: string
  description: string
  image: string
  prixMinXof: number
  devisesDisponibles: string[]
}

type G2ARawOffer = {
  id: string
  productName?: string
  product?: string
  price: number
  sellerRating: number
  currency: string
}

type G2ARawProduct = {
  id: string
  name: string
  slug?: string
  brand?: string
  category?: string
  description?: string
  image?: string
  minPrice?: number
  currency?: string
  currencies?: string[]
}

function assertToken(): string {
  if (!G2A_BUSINESS_TOKEN) {
    throw new Error("La variable G2A_BUSINESS_TOKEN est requise pour interroger G2A.")
  }

  return G2A_BUSINESS_TOKEN
}

function arrondirXof(montant: number): number {
  return Math.max(100, Math.round(montant / 50) * 50)
}

/**
 * Convertit un montant EUR vers FCFA (XOF).
 */
export function convertirEurVersXof(montantEur: number): number {
  return arrondirXof(montantEur * TAUX_EUR_XOF)
}

function normaliserCategorie(valeur?: string): string {
  const v = (valeur ?? "autres").toLowerCase()
  if (v.includes("game") || v.includes("playstation") || v.includes("xbox")) return "gaming"
  if (v.includes("music") || v.includes("spotify")) return "music"
  if (v.includes("stream") || v.includes("netflix") || v.includes("disney")) return "streaming"
  if (v.includes("app") || v.includes("google") || v.includes("apple")) return "appstore"
  return "social"
}

/**
 * Cherche l'offre la moins chère avec un vendeur dont la note est > 98%.
 * Le prix est renvoyé en FCFA (XOF).
 */
export async function recupererOffreEligibileLowestPrice(productSku: string): Promise<OffreG2A | null> {
  const token = assertToken()

  const response = await fetch(`${G2A_BASE_URL}/v1/products/${productSku}/offers`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Erreur G2A pendant la récupération des offres: ${response.status}`)
  }

  const data = (await response.json()) as { offers?: G2ARawOffer[] }
  const offres = (data.offers ?? []).filter((offre) => offre.sellerRating > 98)

  if (!offres.length) {
    return null
  }

  const offreMin = offres.sort((a, b) => a.price - b.price)[0]

  return {
    id: offreMin.id,
    produit: offreMin.productName ?? offreMin.product ?? productSku,
    prix: convertirEurVersXof(offreMin.price),
    ratingVendeur: offreMin.sellerRating,
    devise: "XOF",
  }
}

/**
 * Récupère un catalogue étendu de produits depuis G2A pour enrichir l'offre en front.
 */
export async function recupererProduitsCatalogueG2A(params?: { q?: string; limit?: number }): Promise<ProduitCatalogueG2A[]> {
  if (!G2A_BUSINESS_TOKEN) {
    console.warn("G2A_BUSINESS_TOKEN absent: impossible de récupérer le catalogue distant.")
    return []
  }

  const token = assertToken()
  const limit = Math.min(params?.limit ?? 24, 60)
  const q = params?.q?.trim()

  const search = new URLSearchParams({ limit: String(limit) })
  if (q) search.set("q", q)

  const response = await fetch(`${G2A_BASE_URL}/v1/products?${search.toString()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Erreur G2A pendant la récupération du catalogue: ${response.status}`)
  }

  const data = (await response.json()) as { items?: G2ARawProduct[]; products?: G2ARawProduct[] }
  const produits = data.items ?? data.products ?? []

  return produits.map((produit) => ({
    id: `g2a-${produit.id}`,
    nom: produit.name,
    slug: produit.slug ?? produit.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    marque: produit.brand ?? "G2A",
    categorie: normaliserCategorie(produit.category ?? produit.name),
    description: produit.description ?? `Produit récupéré automatiquement via l'API G2A: ${produit.name}`,
    image: produit.image ?? "/categories/Steam.avif",
    prixMinXof: convertirEurVersXof(produit.minPrice ?? 5),
    devisesDisponibles: produit.currencies ?? (produit.currency ? [produit.currency] : ["EUR"]),
  }))
}

/**
 * Déclenche l'achat automatique d'une offre G2A.
 */
export async function acheterCarteSurG2A(params: { offreId: string; quantite: number }): Promise<{ orderId: string; cleBrute: string }> {
  const token = assertToken()

  const response = await fetch(`${G2A_BASE_URL}/v1/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      offerId: params.offreId,
      quantity: params.quantite,
    }),
  })

  if (!response.ok) {
    throw new Error(`Erreur G2A pendant l'achat: ${response.status}`)
  }

  const data = (await response.json()) as { orderId: string; key: string }

  return {
    orderId: data.orderId,
    cleBrute: data.key,
  }
}
