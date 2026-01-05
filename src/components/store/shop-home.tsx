'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { Category, Product } from '@/lib/catalog'
import { ProductCard } from '@/components/store/product-card'

export default function ShopHome({
  categories,
  products,
}: {
  categories: Category[]
  products: Product[]
}) {
  const [active, setActive] = useState<string>(categories[0]?.slug ?? '')

  const discordUrl =
    process.env.NEXT_PUBLIC_DISCORD_URL || 'https://discord.gg/santamariarp'

  const visible = useMemo(() => {
    if (!active) return products
    return products.filter((p) => p.category === active)
  }, [active, products])

  return (
    <div>
      <section className="bg-gradient-to-br from-slate-950 via-slate-950 to-blue-950 text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
                Santa Maria RP
              </h1>
              <p className="mt-4 text-white/75">
                Compre VIPs, veículos e extras. Pagamento com PIX e cartão.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={process.env.NEXT_PUBLIC_CONNECT_URL || '#'}
                  className="rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-bold text-black hover:bg-emerald-400"
                >
                  Conectar e Jogar
                </a>
                <a
                  href={discordUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/15"
                >
                  Entrar no Discord
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm font-semibold">Categorias</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((c) => {
                  const isActive = c.slug === active
                  return (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => setActive(c.slug)}
                      className={
                        isActive
                          ? 'rounded-full bg-white px-4 py-2 text-sm font-semibold text-black'
                          : 'rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15'
                      }
                    >
                      {c.name}
                    </button>
                  )
                })}
              </div>
              <div className="mt-4 text-xs text-white/60">
                Ou navegue por categoria:{' '}
                <Link
                  href={`/category/${active}`}
                  className="text-white underline"
                >
                  abrir categoria
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Produtos</h2>
              <p className="mt-1 text-sm text-slate-600">
                Selecione o que deseja e finalize no checkout.
              </p>
            </div>
            <Link
              href="/checkout"
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Ir para o carrinho
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
