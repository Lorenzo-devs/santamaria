export type CategorySlug = 'gangster' | 'outros' | 'objetos' | 'gamepass'

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
  { slug: 'gangster', name: '🥷 Gangster', emoji: '🥷' },
  { slug: 'outros', name: '🔎 Outros', emoji: '🔎' },
  { slug: 'objetos', name: '🔫 Objetos', emoji: '🔫' },
  { slug: 'gamepass', name: '⭐ Gamepass', emoji: '⭐' },
]

export const products: Product[] = [
  // Gangster
  {
    id: 'skin-gangster',
    category: 'gangster',
    name: 'Skin Gangster',
    description: 'Skin exclusiva para personagem gangster.',
    priceCents: 4990,
    badge: 'Popular',
  },
  {
    id: 'pack-faccao',
    category: 'gangster',
    name: 'Pack Facção',
    description: 'Pack completo com itens de facção.',
    priceCents: 7990,
  },
  {
    id: 'bau-extra',
    category: 'gangster',
    name: 'Adicionar Baú',
    description: 'Baú adicional para armazenar seus itens.',
    priceCents: 3990,
  },
  {
    id: 'pacote-reforco',
    category: 'gangster',
    name: 'Pacote Reforço',
    description: 'Pacote com itens de reforço para gangster.',
    priceCents: 6990,
  },

  // Outros
  {
    id: 'unban-normal',
    category: 'outros',
    name: 'Unban Normal',
    description: 'Remoção de ban temporário.',
    priceCents: 1990,
  },
  {
    id: 'unban-permanente',
    category: 'outros',
    name: 'Unban Permanente',
    description: 'Remoção de ban permanente.',
    priceCents: 4990,
    badge: 'Importante',
  },
  {
    id: 'caixa-misteriosa',
    category: 'outros',
    name: 'Caixa Misteriosa',
    description: 'Caixa com itens aleatórios exclusivos.',
    priceCents: 2990,
  },
  {
    id: 'placa-carro',
    category: 'outros',
    name: 'Placa de Carro',
    description: 'Placa personalizada para seu veículo.',
    priceCents: 1490,
  },

  // Objetos
  {
    id: 'ak-47',
    category: 'objetos',
    name: 'AK-47',
    description: 'Rifle de assalto potente e preciso.',
    priceCents: 8990,
    badge: 'Top',
  },
  {
    id: 'glock',
    category: 'objetos',
    name: 'Glock',
    description: 'Pistola semi-automática confiável.',
    priceCents: 3990,
  },
  {
    id: 'g3',
    category: 'objetos',
    name: 'G3',
    description: 'Rifle de batalha versátil.',
    priceCents: 7990,
  },
  {
    id: 'revolver',
    category: 'objetos',
    name: 'Revolver',
    description: 'Revolver clássico com alto dano.',
    priceCents: 4990,
  },
  {
    id: 'mascara',
    category: 'objetos',
    name: 'Máscara',
    description: 'Máscara para proteger sua identidade.',
    priceCents: 1990,
  },
  {
    id: 'corda',
    category: 'objetos',
    name: 'Corda',
    description: 'Corda para diversas utilidades.',
    priceCents: 990,
  },

  // Gamepass
  {
    id: 'mercedez-amg',
    category: 'gamepass',
    name: 'Carro Mercedez AMG',
    description: 'Veículo esportivo Mercedez AMG exclusivo.',
    priceCents: 14990,
    badge: 'Premium',
  },
  {
    id: '2x-xp',
    category: 'gamepass',
    name: '2x XP',
    description: 'Dobro de experiência por 30 dias.',
    priceCents: 9990,
  },
  {
    id: 'mansao',
    category: 'gamepass',
    name: 'Mansão',
    description: 'Mansão exclusiva com todos os benefícios.',
    priceCents: 19990,
    badge: 'Luxo',
  },
  {
    id: 'skin-jbl',
    category: 'gamepass',
    name: 'Skin JBL',
    description: 'Skin exclusiva JBL para seu personagem.',
    priceCents: 5990,
  },
  {
    id: 'saveiro-paredao',
    category: 'gamepass',
    name: 'Saveiro Paredão',
    description: 'Saveiro modificado com som potente.',
    priceCents: 12990,
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
