import { NextResponse } from "next/server"
import { listProducts } from "@/lib/server/db"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const category = searchParams.get("category") ?? undefined
  const q = searchParams.get("q") ?? undefined
  const featured = searchParams.get("featured")
  const isNew = searchParams.get("new")

  const products = listProducts({
    category,
    q,
    featured: featured === null ? undefined : featured === "true",
    isNew: isNew === null ? undefined : isNew === "true",
  })

  return NextResponse.json({ products })
}
