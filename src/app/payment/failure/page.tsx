import Link from 'next/link'

export default function PaymentFailurePage() {
  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="rounded-2xl border bg-white p-8">
          <div className="text-2xl font-extrabold text-slate-900">
            Pagamento não concluído
          </div>
          <div className="mt-3 text-sm text-slate-600">
            O pagamento foi cancelado ou falhou. Você pode tentar novamente pelo
            checkout.
          </div>
          <div className="mt-8 flex gap-3">
            <Link
              href="/checkout"
              className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Tentar novamente
            </Link>
            <Link
              href="/"
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Voltar para a loja
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
