import "server-only"

import { randomUUID } from "node:crypto"
import fs from "node:fs"
import path from "node:path"
import { DatabaseSync } from "node:sqlite"
import { categories, products, getDiscountedPrice } from "@/lib/data"

type ProductRow = {
  id: string
  name: string
  slug: string
  category_id: string
  brand: string
  description: string
  image: string | null
  denominations_json: string
  currency: string
  discount: number | null
  is_new: number
  is_featured: number
  rating: number
  reviews: number
}

const dataDir = path.join(process.cwd(), "data")
const dbFile = path.join(dataDir, "cartzone.db")
const schemaFile = path.join(process.cwd(), "db", "sqlite", "schema.sql")

let db: DatabaseSync | null = null

function ensureDb() {
  if (db) return db

  fs.mkdirSync(dataDir, { recursive: true })
  const sqlite = new DatabaseSync(dbFile)
  sqlite.exec("PRAGMA foreign_keys = ON;")
  sqlite.exec(fs.readFileSync(schemaFile, "utf8"))

  const count = sqlite.prepare("SELECT COUNT(*) as count FROM products").get() as { count: number }

  if (count.count === 0) {
    const insertCategory = sqlite.prepare(
      "INSERT INTO categories (id, name, slug, icon, description, color) VALUES (?, ?, ?, ?, ?, ?)"
    )

    const insertProduct = sqlite.prepare(
      `INSERT INTO products (
        id, name, slug, category_id, brand, description, image, denominations_json,
        currency, discount, is_new, is_featured, rating, reviews
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )

    sqlite.exec("BEGIN")
    try {
      for (const c of categories) {
        insertCategory.run(c.id, c.name, c.slug, c.icon, c.description, c.color)
      }

      for (const p of products) {
        insertProduct.run(
          p.id,
          p.name,
          p.slug,
          p.category,
          p.brand,
          p.description,
          p.image,
          JSON.stringify(p.denominations),
          p.currency,
          p.discount ?? null,
          p.isNew ? 1 : 0,
          p.isFeatured ? 1 : 0,
          p.rating,
          p.reviews
        )
      }
      sqlite.exec("COMMIT")
    } catch (error) {
      sqlite.exec("ROLLBACK")
      throw error
    }
  }

  db = sqlite
  return sqlite
}

function mapProduct(row: ProductRow) {
  const denominations = JSON.parse(row.denominations_json) as number[]
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: row.category_id,
    brand: row.brand,
    description: row.description,
    image: row.image ?? "",
    denominations,
    currency: row.currency,
    discount: row.discount ?? undefined,
    isNew: Boolean(row.is_new),
    isFeatured: Boolean(row.is_featured),
    rating: row.rating,
    reviews: row.reviews,
  }
}

export function listProducts(filters?: {
  category?: string
  featured?: boolean
  isNew?: boolean
  q?: string
}) {
  const sqlite = ensureDb()

  const where: string[] = []
  const params: Array<string | number> = []

  if (filters?.category) {
    where.push("category_id = ?")
    params.push(filters.category)
  }

  if (typeof filters?.featured === "boolean") {
    where.push("is_featured = ?")
    params.push(filters.featured ? 1 : 0)
  }

  if (typeof filters?.isNew === "boolean") {
    where.push("is_new = ?")
    params.push(filters.isNew ? 1 : 0)
  }

  if (filters?.q) {
    where.push("(name LIKE ? OR brand LIKE ?)")
    const val = `%${filters.q}%`
    params.push(val, val)
  }

  const sql = `
    SELECT *
    FROM products
    ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
    ORDER BY is_featured DESC, rating DESC, reviews DESC
  `

  const rows = sqlite.prepare(sql).all(...params) as ProductRow[]
  return rows.map(mapProduct)
}

export function createOrder(input: {
  email: string
  firstName: string
  lastName: string
  phone?: string
  paymentMethod: string
  items: Array<{ productId: string; denomination: number; quantity: number }>
}) {
  const sqlite = ensureDb()

  const productsById = new Map(listProducts().map((p) => [p.id, p]))
  let total = 0

  const orderId = randomUUID()
  const orderItems = input.items.map((item) => {
    const p = productsById.get(item.productId)
    if (!p) {
      throw new Error(`Produit introuvable: ${item.productId}`)
    }

    const unitPrice = p.discount
      ? getDiscountedPrice(item.denomination, p.discount)
      : item.denomination

    total += unitPrice * item.quantity

    return {
      id: randomUUID(),
      orderId,
      productId: p.id,
      denomination: item.denomination,
      quantity: item.quantity,
      unitPrice,
    }
  })

  sqlite.exec("BEGIN")
  try {
    sqlite.prepare(
      `INSERT INTO orders (id, email, first_name, last_name, phone, payment_method, total_amount, currency, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'EUR', 'pending')`
    ).run(orderId, input.email, input.firstName, input.lastName, input.phone ?? null, input.paymentMethod, total)

    const insertItem = sqlite.prepare(
      `INSERT INTO order_items (id, order_id, product_id, denomination, quantity, unit_price)
       VALUES (?, ?, ?, ?, ?, ?)`
    )

    for (const item of orderItems) {
      insertItem.run(item.id, item.orderId, item.productId, item.denomination, item.quantity, item.unitPrice)
    }
    sqlite.exec("COMMIT")
  } catch (error) {
    sqlite.exec("ROLLBACK")
    throw error
  }

  return {
    orderId,
    total,
    currency: "EUR",
    itemCount: orderItems.length,
  }
}
