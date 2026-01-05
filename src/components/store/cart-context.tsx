'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { getProductById } from '@/lib/catalog'
import type { CartItem, CartLine, CartContextValue } from '@/lib/types/cart'
import { CART_STORAGE_KEY } from '@/lib/types/cart'

// Create context with a default value
const CartContext = createContext<CartContextValue>({
  items: [],
  lines: [],
  count: 0,
  subtotalCents: 0,
  addItem: () => {},
  removeItem: () => {},
  setQuantity: () => {},
  clear: () => {},
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  })

  // Update local storage when items change
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (productId: string, quantity: number = 1) => {
    const product = getProductById(productId)
    if (!product) return

    setItems((prev) => {
      const existingItem = prev.find((item) => item.productId === productId)
      if (existingItem) {
        return prev.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: (item.quantity || 1) + quantity,
                // Ensure all required properties are included
                name: product.name || item.name || 'Produto sem nome',
                priceCents: product.priceCents || item.priceCents || 0,
              }
            : item
        )
      }
      return [
        ...prev,
        {
          productId,
          quantity: quantity || 1,
          name: product.name || 'Produto sem nome',
          priceCents: product.priceCents || 0,
        },
      ]
    })
  }

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId))
  }

  const setQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }

    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: quantity,
              // Ensure all required properties are included
              name: item.name || 'Produto sem nome',
              priceCents: item.priceCents || 0,
            }
          : item
      )
    )
  }

  const clear = () => {
    setItems([])
  }

  // Convert items to lines with proper typing
  const lines: CartLine[] = items.map((item) => ({
    ...item,
    // Ensure all required properties are included
    name: item.name || 'Produto sem nome',
    priceCents: item.priceCents || 0,
    quantity: item.quantity || 1,
  }))

  const count = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotalCents = lines.reduce(
    (acc, x) => acc + x.priceCents * x.quantity,
    0
  )

  const value: CartContextValue = {
    items,
    lines,
    count,
    subtotalCents,
    addItem,
    removeItem,
    setQuantity,
    clear,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  return useContext(CartContext)
}
