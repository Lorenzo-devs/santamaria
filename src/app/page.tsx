import ShopHome from '@/components/store/shop-home'
import { categories, products } from '@/lib/catalog'

export default function Home() {
  return <ShopHome categories={categories} products={products} />
}
