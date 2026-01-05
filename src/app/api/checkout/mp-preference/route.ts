import { NextResponse } from 'next/server'
import { getProductById } from '@/lib/catalog'

export const runtime = 'nodejs'

type RequestBody = {
  items: Array<{ productId: string; quantity: number }>
}

export async function POST(req: Request) {
  const accessToken = process.env.MP_ACCESS_TOKEN
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''

  if (!accessToken) {
    return new NextResponse('MP_ACCESS_TOKEN não configurado', { status: 500 })
  }

  let body: RequestBody
  try {
    body = (await req.json()) as RequestBody
  } catch {
    return new NextResponse('JSON inválido', { status: 400 })
  }

  if (!body?.items?.length) {
    return new NextResponse('Carrinho vazio', { status: 400 })
  }

  const mpItems = body.items
    .map((it) => {
      const product = getProductById(it.productId)
      if (!product) return null
      const quantity = Math.max(1, Math.floor(it.quantity || 1))
      return {
        id: product.id,
        title: product.name,
        description: product.description,
        quantity,
        currency_id: 'BRL',
        unit_price: Number((product.priceCents / 100).toFixed(2)),
      }
    })
    .filter(Boolean)

  if (!mpItems.length) {
    return new NextResponse('Itens inválidos', { status: 400 })
  }

  const preference = {
    items: mpItems,
    statement_descriptor: 'SANTA MARIA RP',
    external_reference: `smrp_${Date.now()}`,
    back_urls: siteUrl
      ? {
          success: `${siteUrl}/payment/success`,
          pending: `${siteUrl}/payment/pending`,
          failure: `${siteUrl}/payment/failure`,
        }
      : undefined,
    auto_return: 'approved',
  }

  const resp = await fetch('https://api.mercadopago.com/checkout/preferences', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(preference),
    cache: 'no-store',
  })

  if (!resp.ok) {
    const txt = await resp.text()
    return new NextResponse(txt || 'Erro Mercado Pago', { status: 502 })
  }

  const data = (await resp.json()) as { id: string; init_point: string }

  return NextResponse.json({ id: data.id, init_point: data.init_point })
}
