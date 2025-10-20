<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/product'
import ProductContainer from '@/components/ProductContainer.vue'
import type { Product } from '@/models/Product'

const productStore = useProductStore()
const { products, loading } = storeToRefs(productStore)
const router = useRouter()

const addToCart = (product: Product) => {
  console.log('Add to cart:', product)
  router.push(`/product/${product._id}`)
}

onMounted(async () => {
  await productStore.fetchProducts()
})
</script>

<template>
  <section class="container mx-auto py-8">
    <h2 class="text-3xl font-bold mb-8 text-center">All Products</h2>
    <ProductContainer 
      :products="products" 
      :loading="loading"
      @add-to-cart="addToCart"
    />
  </section>
</template>
