'use client'

import Link from 'next/link'
import type { Category, Product } from '@/lib/catalog'
import { ProductCard } from '@/components/store/product-card'

export default function ShopCategoryClient({
  category,
  categories,
  products,
}: {
  category: Category
  categories: Category[]
  products: Product[]
}) {
  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-sm text-slate-600">Categoria</div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              {category.name}
            </h1>
          </div>
          <Link
            href="/checkout"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Carrinho
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => {
            const active = c.slug === category.slug
            return (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className={
                  active
                    ? 'rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white'
                    : 'rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100'
                }
              >
                {c.name}
              </Link>
            )
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  )
}
