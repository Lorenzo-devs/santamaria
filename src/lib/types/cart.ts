import type { Product } from '../catalog'

export interface CartItem {
  productId: string
  quantity: number
  name: string
  priceCents: number
}

export interface CartLine extends CartItem {
  // Herda todos os campos de CartItem
  // Adiciona campos adicionais se necessário
}

export interface CartContextValue {
  items: CartItem[]
  lines: CartLine[]
  count: number
  subtotalCents: number
  addItem: (productId: string, quantity?: number) => void
  removeItem: (productId: string) => void
  setQuantity: (productId: string, quantity: number) => void
  clear: () => void
}

export const CART_STORAGE_KEY = 'santamaria-cart'
