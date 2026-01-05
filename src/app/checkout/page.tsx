'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/components/store/cart-context'
import { formatBRLFromCents } from '@/lib/money'

export default function CheckoutPage() {
  const { lines, subtotalCents, setQuantity, removeItem, clear } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const canPay = lines.length > 0 && subtotalCents > 0

  const handlePixPayment = () => {
    if (!canPay) return
    router.push('/checkout/pix')
  }

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Carrinho / Checkout
            </h1>
            <div className="mt-1 text-sm text-slate-600">
              Finalize sua compra com PIX (pagamento instantâneo).
            </div>
          </div>
          <Link
            href="/"
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Voltar para a loja
          </Link>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="mt-4 text-sm text-gray-600">
            <p className="mb-2 font-medium">Método de pagamento:</p>
            <div className="flex items-center space-x-4">
              <span className="rounded bg-blue-100 px-3 py-2 text-sm font-medium text-blue-800">
                PIX (Pagamento instantâneo)
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Você será redirecionado para a página de pagamento PIX
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-2xl border bg-white">
              <div className="border-b px-6 py-4">
                <div className="text-sm font-semibold text-slate-900">
                  Itens
                </div>
              </div>

              <div className="divide-y">
                {lines.length === 0 ? (
                  <div className="px-6 py-10 text-sm text-slate-600">
                    Seu carrinho está vazio.
                  </div>
                ) : (
                  lines.map((l) => (
                    <div
                      key={l.productId}
                      className="flex flex-wrap items-center justify-between gap-4 px-6 py-4"
                    >
                      <div>
                        <div className="font-semibold text-slate-900">
                          {l.name}
                        </div>
                        <div className="mt-1 text-sm text-slate-600">
                          {formatBRLFromCents(l.priceCents)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="h-9 w-9 rounded-full border bg-white text-slate-700 hover:bg-slate-50"
                          onClick={() =>
                            setQuantity(l.productId, l.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <div className="w-10 text-center text-sm font-semibold">
                          {l.quantity}
                        </div>
                        <button
                          type="button"
                          className="h-9 w-9 rounded-full border bg-white text-slate-700 hover:bg-slate-50"
                          onClick={() =>
                            setQuantity(l.productId, l.quantity + 1)
                          }
                        >
                          +
                        </button>
                        <button
                          type="button"
                          className="ml-2 rounded-full border px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                          onClick={() => removeItem(l.productId)}
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {lines.length > 0 ? (
                <div className="flex flex-wrap items-center justify-between gap-3 border-t px-6 py-4">
                  <button
                    type="button"
                    onClick={clear}
                    className="rounded-full border px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Limpar carrinho
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <div className="rounded-2xl border bg-white p-6">
              <div className="text-sm font-semibold text-slate-900">Resumo</div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-semibold text-slate-900">
                  {formatBRLFromCents(subtotalCents)}
                </span>
              </div>
              <div className="mt-4 text-xs text-slate-500">
                Após o pagamento, a entrega é feita conforme regras do servidor.
              </div>

              {error ? (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                  {error}
                </div>
              ) : null}

              <button
                type="button"
                disabled={!canPay || loading}
                onClick={handlePixPayment}
                className={
                  !canPay || loading
                    ? 'mt-6 w-full rounded-xl bg-slate-200 px-4 py-3 text-sm font-bold text-slate-500'
                    : 'mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700'
                }
              >
                {loading ? 'Abrindo PIX...' : 'Pagar com PIX'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
