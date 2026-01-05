import Link from 'next/link'
import { categories, listProductsByCategory, getCategory } from '@/lib/catalog'
import ShopCategoryClient from '@/components/store/shop-category'

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const category = getCategory(slug)
  const products = listProductsByCategory(slug)

  if (!category) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-2xl border bg-white p-6">
          <div className="text-lg font-bold">Categoria não encontrada</div>
          <div className="mt-2 text-sm text-slate-600">Volte para a loja.</div>
          <div className="mt-6">
            <Link
              href="/"
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Ir para a loja
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ShopCategoryClient
      category={category}
      categories={categories}
      products={products}
    />
  )
}
