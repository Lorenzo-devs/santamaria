import Link from 'next/link'

export default function PaymentPendingPage() {
  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="rounded-2xl border bg-white p-8">
          <div className="text-2xl font-extrabold text-slate-900">
            Pagamento pendente
          </div>
          <div className="mt-3 text-sm text-slate-600">
            Seu pagamento está em análise/pendente. Assim que for confirmado, a
            entrega será processada.
          </div>
          <div className="mt-8">
            <Link
              href="/"
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Voltar para a loja
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
