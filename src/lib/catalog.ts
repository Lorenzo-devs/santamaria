export type CategorySlug =
  | 'vips'
  | 'veiculos'
  | 'blindados'
  | 'faccao'
  | 'privados'
  | 'outros'

export type Category = {
  slug: CategorySlug
  name: string
  emoji: string
}

export type Product = {
  id: string
  category: CategorySlug
  name: string
  description: string
  priceCents: number
  badge?: string
}

export const categories: Category[] = [
  { slug: 'vips', name: '💎 VIPS', emoji: '💎' },
  { slug: 'veiculos', name: '🚗 Veículos', emoji: '🚗' },
  { slug: 'blindados', name: '🚙 Blindados', emoji: '🚙' },
  { slug: 'faccao', name: '🥷 Facção', emoji: '🥷' },
  { slug: 'privados', name: '⭐ Privados', emoji: '⭐' },
  { slug: 'outros', name: '🔎 Outros', emoji: '🔎' },
]

export const products: Product[] = [
  {
    id: 'vip-bronze-30d',
    category: 'vips',
    name: 'VIP Bronze (30 dias)',
    description: 'Benefícios básicos para começar com vantagem.',
    priceCents: 2990,
    badge: 'Mais vendido',
  },
  {
    id: 'vip-prata-30d',
    category: 'vips',
    name: 'VIP Prata (30 dias)',
    description: 'Benefícios intermediários + bônus extras.',
    priceCents: 4990,
  },
  {
    id: 'vip-ouro-30d',
    category: 'vips',
    name: 'VIP Ouro (30 dias)',
    description: 'Benefícios premium para evoluir rápido.',
    priceCents: 7990,
  },
  {
    id: 'carro-sportivo',
    category: 'veiculos',
    name: 'Veículo Esportivo',
    description: 'Um esportivo para chegar com estilo.',
    priceCents: 5990,
  },
  {
    id: 'carro-suv',
    category: 'veiculos',
    name: 'SUV',
    description: 'Conforto e espaço para o seu corre.',
    priceCents: 5490,
  },
  {
    id: 'blindado-basic',
    category: 'blindados',
    name: 'Blindado (Básico)',
    description: 'Proteção extra para situações perigosas.',
    priceCents: 9990,
  },
  {
    id: 'blindado-premium',
    category: 'blindados',
    name: 'Blindado (Premium)',
    description: 'Máxima proteção e presença.',
    priceCents: 14990,
    badge: 'Top',
  },
  {
    id: 'faccao-vaga',
    category: 'faccao',
    name: 'Vaga em Facção',
    description: 'Entre para uma facção (sujeito a regras do servidor).',
    priceCents: 3990,
  },
  {
    id: 'privado-pack',
    category: 'privados',
    name: 'Pack Privado',
    description: 'Conteúdo exclusivo para grupos/organizadores.',
    priceCents: 12990,
  },
  {
    id: 'outros-passaporte',
    category: 'outros',
    name: 'Passaporte',
    description: 'Item utilitário para o seu personagem.',
    priceCents: 1990,
  },
]

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function listProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug)
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}
