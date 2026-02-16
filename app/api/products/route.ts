import { NextResponse } from "next/server"
import { listProducts } from "@/lib/server/db"
import { recupererProduitsCatalogueG2A } from "@/api/g2a-client"

function convertirProduitG2AVersFormatFront(produit: Awaited<ReturnType<typeof recupererProduitsCatalogueG2A>>[number]) {
  return {
    id: produit.id,
    name: produit.nom,
    slug: produit.slug,
    category: produit.categorie,
    brand: produit.marque,
    description: produit.description,
    image: produit.image,
    denominations: [produit.prixMinXof, produit.prixMinXof * 2, produit.prixMinXof * 4],
    currency: "XOF",
    discount: undefined,
    isNew: true,
    isFeatured: false,
    rating: 4.7,
    reviews: 100,
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const category = searchParams.get("category") ?? undefined
  const q = searchParams.get("q") ?? undefined
  const featured = searchParams.get("featured")
  const isNew = searchParams.get("new")
  const source = searchParams.get("source") ?? "local"
  const g2aLimit = Number(searchParams.get("g2aLimit") ?? "24")

  const products = listProducts({
    category,
    q,
    featured: featured === null ? undefined : featured === "true",
    isNew: isNew === null ? undefined : isNew === "true",
  })

  if (source === "local") {
    return NextResponse.json({ products })
  }

  try {
    const g2aProducts = await recupererProduitsCatalogueG2A({ q, limit: g2aLimit })
    const mapped = g2aProducts.map(convertirProduitG2AVersFormatFront)

    if (source === "g2a") {
      return NextResponse.json({ products: mapped })
    }

    const uniques = new Map<string, (typeof products)[number]>()

    for (const product of [...products, ...mapped]) {
      if (!uniques.has(product.slug)) {
        uniques.set(product.slug, product)
      }
    }

    return NextResponse.json({
      products: Array.from(uniques.values()),
      metadata: {
        localCount: products.length,
        g2aCount: mapped.length,
        source: "hybrid",
      },
    })
  } catch (error) {
    console.warn("Impossible de charger les produits G2A. Retour sur le catalogue local.", error)
    return NextResponse.json({
      products,
      metadata: {
        localCount: products.length,
        g2aCount: 0,
        source: "fallback-local",
      },
    })
  }
}
