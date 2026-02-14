import { NextResponse } from "next/server"
import { z } from "zod"
import { createOrder } from "@/lib/server/db"

const orderSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().optional(),
  paymentMethod: z.string().min(1),
  items: z.array(
    z.object({
      productId: z.string().min(1),
      denomination: z.number().positive(),
      quantity: z.number().int().positive(),
    })
  ).min(1),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const payload = orderSchema.parse(body)
    const order = createOrder(payload)
    return NextResponse.json({ ok: true, order }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid request"
    return NextResponse.json({ ok: false, error: message }, { status: 400 })
  }
}
