'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useCart } from '@/components/store/cart-context'
import { formatBRLFromCents } from '@/lib/money'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2, Copy, Check } from 'lucide-react'

// PIX details - replace these with your actual PIX key and info
const PIX_KEY = '11976405998' // Phone number PIX key (11) 97640-5998
const PIX_KEY_TYPE = 'PHONE' // PIX key type (PHONE, CPF, CNPJ, EMAIL, RANDOM)
const RECIPIENT_NAME = 'Santa Maria RP' // Your business name
const RECIPIENT_CITY = 'Sao Paulo' // Your city

// Generate PIX payload for copy-paste
function generatePixPayload(amount: number) {
  const amountStr = (amount / 100).toFixed(2)
  const payload = [
    '000201', // Payload Format Indicator
    '2633', // Merchant Account Information (26 chars, PIX key info)
    '0014br.gov.bcb.pix2566', // GUI
    `25${PIX_KEY.length.toString().padStart(2, '0')}${PIX_KEY}`, // PIX Key
    '52040000', // Merchant Category Code (0000 = Not Specified)
    '5303986', // Transaction Currency (BRL)
    `54${amountStr.length.toString().padStart(2, '0')}${amountStr}`, // Transaction Amount
    '5802BR', // Country Code
    '5913', // Merchant Name (13 chars)
    'SANTA MARIA RP',
    '6008', // Merchant City (8 chars)
    'BRASIL',
    '6207', // Additional Data Field Template
    '0503', // Reference Label
    '***', // Payment Reference (can be used for order ID)
    '6304', // CRC16
  ].join('')

  // Gerar o payload PIX sem o CRC16 (o banco irá ignorar se for inválido)
  // Em produção, você deve implementar o cálculo correto do CRC16
  return payload + '6304'
}

export default function PixPaymentPage() {
  const { items, clear } = useCart()
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30 * 60) // 30 minutes in seconds
  const [isLoading, setIsLoading] = useState(false)

  // Calcular o total corretamente usando priceCents
  const total = items.reduce(
    (sum, item) => sum + (item.priceCents || 0) * (item.quantity || 1),
    0
  )

  // Gerar o código PIX com o valor correto
  const pixCode = generatePixPayload(total)
  // Usar a API do Banco Central para gerar o QR Code PIX
  const qrCodeUrl = `https://pix.geraqr.com.br/api/v1?pixkey=${PIX_KEY}&name=${encodeURIComponent(
    RECIPIENT_NAME
  )}&city=${encodeURIComponent(RECIPIENT_CITY)}&amount=${(total / 100).toFixed(
    2
  )}`

  // Format time as MM:SS
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      router.push('/checkout')
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, router])

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pixCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePaymentConfirmation = () => {
    setIsLoading(true)
    // In a real app, you would verify the payment with your backend here
    setTimeout(() => {
      clear()
      router.push('/payment/success')
      setIsLoading(false)
    }, 1500)
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto flex min-h-[50vh] items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Carrinho vazio</CardTitle>
            <CardDescription>Seu carrinho está vazio.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/')}>Voltar para a loja</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto my-8 px-4">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold">Pagamento via PIX</h1>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.productId} className="flex justify-between">
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>
                        {formatBRLFromCents(
                          (item.priceCents || 0) * (item.quantity || 1)
                        )}
                      </span>
                    </div>
                  ))}
                  <div className="mt-4 border-t pt-2 font-bold">
                    <div className="flex justify-between">
                      <span>Total</span>
                      <span>{formatBRLFromCents(total)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dados para Transferência</CardTitle>
                <CardDescription>
                  Envie o valor exato para a chave PIX abaixo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Chave PIX</p>
                  <div className="flex items-center justify-between rounded-md border p-2 font-mono text-sm">
                    {PIX_KEY_TYPE === 'PHONE'
                      ? `+${PIX_KEY.slice(0, 2)} ${PIX_KEY.slice(
                          2,
                          7
                        )}-${PIX_KEY.slice(7)}`
                      : PIX_KEY}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        navigator.clipboard.writeText(PIX_KEY)
                        toast.success('Chave PIX copiada!')
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Nome do Destinatário
                  </p>
                  <div className="flex items-center justify-between rounded-md border p-2 font-mono text-sm">
                    {RECIPIENT_NAME}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        navigator.clipboard.writeText(RECIPIENT_NAME)
                        toast.success('Nome copiado!')
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Cidade</p>
                  <div className="flex items-center justify-between rounded-md border p-2 font-mono text-sm">
                    {RECIPIENT_CITY}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        navigator.clipboard.writeText(RECIPIENT_CITY)
                        toast.success('Cidade copiada!')
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pague com PIX</CardTitle>
                <CardDescription>
                  Escaneie o QR Code ou copie o código PIX
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-2">
                  <div className="relative">
                    <img
                      src={qrCodeUrl}
                      alt="QR Code PIX"
                      className="h-64 w-64 rounded border"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full bg-white p-2">
                        <div className="h-12 w-12 rounded-full bg-emerald-500"></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Aponte a câmera do seu banco
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">
                      Código PIX (copiar e colar)
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs"
                      onClick={handleCopyCode}
                    >
                      {copied ? (
                        <>
                          <Check className="mr-1 h-3 w-3" />
                          Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-1 h-3 w-3" />
                          Copiar
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="relative">
                    <pre className="max-h-32 overflow-auto rounded-md border bg-muted p-3 text-xs">
                      {pixCode}
                    </pre>
                  </div>
                </div>

                <div className="rounded-lg bg-amber-50 p-4 text-amber-900 dark:bg-amber-900/20 dark:text-amber-100">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">
                        Envie o valor exato de{' '}
                        <span className="font-bold">
                          {formatBRLFromCents(total)}
                        </span>
                      </p>
                      <p className="mt-1 text-sm">
                        O pagamento será confirmado em até 30 minutos após a
                        compensação.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-blue-50 p-4 text-blue-900 dark:bg-blue-900/20 dark:text-blue-100">
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-2 font-medium">
                      Tempo restante: {timeString}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handlePaymentConfirmation}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    'Já efetuei o pagamento'
                  )}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Após o pagamento, clique no botão acima para confirmar
                </p>
              </CardContent>
            </Card>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.back()}
            >
              Voltar para o carrinho
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
