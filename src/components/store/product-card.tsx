'use client'

import { useCart } from '@/components/store/cart-context'
import type { Product } from '@/lib/catalog'
import { formatBRLFromCents } from '@/lib/money'

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-base font-semibold text-slate-900">
            {product.name}
          </div>
          <div className="mt-1 text-sm text-slate-600">
            {product.description}
          </div>
        </div>
        {product.badge ? (
          <div className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
            {product.badge}
          </div>
        ) : null}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="text-lg font-bold text-slate-900">
          {formatBRLFromCents(product.priceCents)}
        </div>
        <button
          type="button"
          onClick={() => addItem(product.id, 1)}
          className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Adicionar
        </button>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-500/10 blur-2xl" />
        <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-blue-500/10 blur-2xl" />
      </div>
    </div>
  )
}
