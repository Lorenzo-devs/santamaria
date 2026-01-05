import Link from 'next/link'

export function SiteFooter() {
  const discordUrl =
    process.env.NEXT_PUBLIC_DISCORD_URL || 'https://discord.gg/santamariarp'

  return (
    <footer className="border-t bg-slate-950 text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <div className="text-lg font-bold">Santa Maria RP</div>
          <div className="mt-2 text-sm text-white/70">
            Loja oficial do servidor. Compras digitais. Entrega conforme regras
            do servidor.
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold">Links</div>
          <div className="mt-3 flex flex-col gap-2 text-sm text-white/70">
            <Link href="/" className="hover:text-white">
              Loja
            </Link>
            <Link href="/checkout" className="hover:text-white">
              Carrinho / Checkout
            </Link>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold">Suporte</div>
          <div className="mt-3 text-sm text-white/70">
            Para suporte, chame no Discord.
          </div>
          <div className="mt-3">
            <a
              href={discordUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15"
            >
              Discord: santamariarp
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Santa Maria RP
      </div>
    </footer>
  )
}
