'use client'

import Link from 'next/link'
import { categories } from '@/lib/catalog'
import { useCart } from '@/components/store/cart-context'

export function SiteHeader() {
  const { count } = useCart()

  const discordUrl =
    process.env.NEXT_PUBLIC_DISCORD_URL ||
    'https://discord.gg/YOUR_DISCORD_CODE'

  return (
    <header className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-950 to-blue-950 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-lg font-semibold">
            SM
          </div>
          <div className="leading-tight">
            <div className="text-lg font-bold">Santa Maria RP</div>
            <div className="text-xs text-white/70">Loja oficial</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-3 md:flex">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="rounded-full bg-white/5 px-3 py-1 text-sm text-white/80 hover:bg-white/10 hover:text-white"
            >
              {c.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/checkout"
            className="relative rounded-full bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15"
          >
            Carrinho
            <span className="ml-2 inline-flex min-w-6 items-center justify-center rounded-full bg-emerald-400/20 px-2 py-0.5 text-xs text-emerald-200">
              {count}
            </span>
          </Link>
          <a
            href={discordUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-amber-400 px-4 py-2 text-sm font-bold text-black hover:bg-amber-300 md:inline-block"
          >
            Entrar no Discord
          </a>
        </div>
      </div>
    </header>
  )
}
