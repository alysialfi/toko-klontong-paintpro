<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { useProductStore } from '@/stores/product'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

const productId = String(route.params.id)
const isLoading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    await productStore.fetchProduct(productId)
  } catch (err) {
    error.value = 'Failed to load product'
    console.error('Error loading product:', err)
  } finally {
    isLoading.value = false
  }
})

const product = computed(() => productStore.selectedProduct)

watch(() => product.value?.name, (newName) => {
  if (newName) {
    if (import.meta.client) {
      document.title = `${newName} - Toko Klontong Mas Yanto`
    }
  }
}, { immediate: true })
</script>

<template>
  <div class="container mx-auto py-8 px-4">
    <div v-if="isLoading" class="flex justify-center items-center min-h-[400px]">
      <p>Loading product details...</p>
    </div>

    <div v-else-if="error" class="text-center min-h-[400px] flex flex-col justify-center">
      <p class="text-red-500">{{ error }}</p>
      <Button class="mt-4 mx-auto" @click="router.push('/products')">
        Back to Products
      </Button>
    </div>

    <div v-else-if="product" class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">{{ product.name }}</h1>
      
      <div class="grid md:grid-cols-2 gap-8">
        <div class="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
          <img 
            v-if="product.image"
            :src="product.image" 
            :alt="product.name"
            class="w-full h-full object-cover">
          <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
            No Image Available
          </div>
        </div>

        <div class="space-y-6">
          <div>
            <h2 class="text-lg font-medium mb-2">Product Information</h2>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500">SKU</p>
                <p>{{ product.sku }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Price</p>
                <p>Rp {{ product.price.toLocaleString('id-ID') }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Stock</p>
                <p>{{ product.stock }} units</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Category</p>
                <p>{{ product.categoryName }}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 class="text-lg font-medium mb-2">Description</h2>
            <p class="text-gray-700">{{ product.description || 'No description available' }}</p>
          </div>

          <div>
            <h2 class="text-lg font-medium mb-2">Dimensions & Weight</h2>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500">Weight</p>
                <p>{{ product.weight }} grams</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Dimensions</p>
                <p>{{ product.length }}x{{ product.width }}x{{ product.height }} cm</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <Button 
          variant="outline"
          @click="router.push('/product')"
        >
          Back to Products
        </Button>
      </div>
    </div>

    <div v-else class="text-center min-h-[400px] flex flex-col justify-center">
      <p>Product not found</p>
      <Button class="mt-4 mx-auto" @click="router.push('/product')">
        Back to Products
      </Button>
    </div>
  </div>
</template>