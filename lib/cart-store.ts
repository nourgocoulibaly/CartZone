"use client"

import { useSyncExternalStore, useCallback } from "react"
import type { Product, CartItem } from "./data"
import { getDiscountedPrice } from "./data"

type CartState = {
  items: CartItem[]
}

let cartState: CartState = { items: [] }
const listeners = new Set<() => void>()

function emitChange() {
  for (const listener of listeners) {
    listener()
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return cartState
}

export function addToCart(product: Product, denomination: number, quantity: number = 1) {
  const existing = cartState.items.find(
    (item) => item.product.id === product.id && item.denomination === denomination
  )
  if (existing) {
    cartState = {
      items: cartState.items.map((item) =>
        item.product.id === product.id && item.denomination === denomination
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ),
    }
  } else {
    cartState = {
      items: [...cartState.items, { product, denomination, quantity }],
    }
  }
  emitChange()
}

export function removeFromCart(productId: string, denomination: number) {
  cartState = {
    items: cartState.items.filter(
      (item) => !(item.product.id === productId && item.denomination === denomination)
    ),
  }
  emitChange()
}

export function updateQuantity(productId: string, denomination: number, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(productId, denomination)
    return
  }
  cartState = {
    items: cartState.items.map((item) =>
      item.product.id === productId && item.denomination === denomination
        ? { ...item, quantity }
        : item
    ),
  }
  emitChange()
}

export function clearCart() {
  cartState = { items: [] }
  emitChange()
}

export function getCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    const price = item.product.discount
      ? getDiscountedPrice(item.denomination, item.product.discount)
      : item.denomination
    return total + price * item.quantity
  }, 0)
}

export function getCartCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0)
}

export function useCart() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  const add = useCallback(
    (product: Product, denomination: number, quantity?: number) =>
      addToCart(product, denomination, quantity),
    []
  )

  const remove = useCallback(
    (productId: string, denomination: number) =>
      removeFromCart(productId, denomination),
    []
  )

  const update = useCallback(
    (productId: string, denomination: number, quantity: number) =>
      updateQuantity(productId, denomination, quantity),
    []
  )

  const clear = useCallback(() => clearCart(), [])

  return {
    items: state.items,
    add,
    remove,
    update,
    clear,
    total: getCartTotal(state.items),
    count: getCartCount(state.items),
  }
}
