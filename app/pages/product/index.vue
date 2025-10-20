<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/product'
import ProductContainer from '@/components/ProductContainer.vue'
import ProductSearch from '@/components/ProductSearch.vue'
import type { Product } from '@/models/Product'

const productStore = useProductStore()
const { loading } = storeToRefs(productStore)
const router = useRouter()
const filteredProducts = ref<Product[]>([])

const handleSearch = (results: Product[]) => {
  filteredProducts.value = results
}

const addToCart = (product: Product) => {
  router.push(`/product/${product._id}`)
}

onMounted(async () => {
  await productStore.fetchProducts()
  filteredProducts.value = productStore.getProducts
})
</script>

<template>
  <div>
    <section class="container mx-auto py-8 px-8 md:px-0">
      <ProductSearch :showBackButton="true" @search="handleSearch" />
      <h2 class="text-3xl font-bold my-8 text-center">Semua Produk</h2>
      <ProductContainer 
        :products="filteredProducts" 
        :loading="loading"
        @add-to-cart="addToCart"
      />
    </section>
  </div>
</template>
