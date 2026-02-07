import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { categories, getProductsByCategory } from "@/lib/data"

export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }))
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category: categorySlug } = await params
  const category = categories.find((c) => c.slug === categorySlug)

  if (!category) notFound()

  const categoryProducts = getProductsByCategory(categorySlug)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="transition-colors hover:text-foreground">
          Accueil
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/shop" className="transition-colors hover:text-foreground">
          Boutique
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{category.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">
          {category.name}
        </h1>
        <p className="mt-2 text-muted-foreground">{category.description}</p>
      </div>

      {/* Products */}
      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-lg font-medium text-foreground">
            Aucun produit dans cette categorie
          </p>
          <Link
            href="/shop"
            className="mt-4 text-sm text-primary hover:underline"
          >
            Retour a la boutique
          </Link>
        </div>
      )}
    </div>
  )
}
