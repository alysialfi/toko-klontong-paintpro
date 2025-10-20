<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from '@/components/ui/pagination'
import type { Product } from '@/models/Product'

const emit = defineEmits(['add-to-cart'])

const props = defineProps({
  products: {
    type: Array as () => Product[],
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const currentPage = ref(1)
const isMobile = ref(true)
const itemsPerPage = computed(() => isMobile.value ? 6 : 12)

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return props.products.slice(start, end)
})

const handleResize = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  isMobile.value = window.innerWidth < 768
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price)
}

const handleImageError = (event) => {
  const img = event.target
  img.src = '/images/products/doritos.jpg'
  img.onerror = null
}
</script>

<template>
  <div class="w-full">
    <div v-if="loading" class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <Card v-for="g in 4" :key="g" class="animate-pulse">
        <CardHeader class="h-48 bg-gray-200" />
        <CardContent class="flex flex-col items-center">
          <div class="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div class="h-4 bg-gray-200 rounded w-1/2" />
        </CardContent>
      </Card>
    </div>

    <div v-else-if="!products.length" class="text-center py-8">
      <p class="text-gray-500">Tidak ada produk yang tersedia</p>
    </div>

    <div v-else class="space-y-6">
      <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card v-for="product in paginatedProducts" :key="product.id" class="h-full">
          <CardHeader class="p-0 h-48 flex justify-center">
            <img 
              :src="product.image" 
              :alt="product.name" 
              class="w-full h-48 object-cover"
              @error="handleImageError">
          </CardHeader>
          <CardContent class="text-center">
            <CardTitle class="line-clamp-1">{{ product.name }}</CardTitle>
            <CardDescription v-if="product.description" class="line-clamp-2 mt-2">
              {{ product.description }}
            </CardDescription>
            <p class="text-lg font-semibold text-primary mt-2">{{ formatPrice(product.price) }}</p>
          </CardContent>
          <CardFooter>
            <Button 
              class="w-full"
              @click="emit('add-to-cart', product)"
            >
              Beli
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div class="flex justify-center mt-8">
        <Pagination 
          v-slot="{ page }" 
          :items-per-page="itemsPerPage" 
          :total="products.length" 
          v-model:page="currentPage"
        >
          <PaginationContent v-slot="{ items }">
            <PaginationPrevious />

            <div v-for="(item, index) in items" :key="index">
              <PaginationItem
                v-if="item.type === 'page'"
                :value="item.value"
                :is-active="item.value === page"
              >
                {{ item.value }}
              </PaginationItem>
              <PaginationEllipsis v-else-if="item.type === 'ellipsis'" :index="index" />
            </div>

            <PaginationNext />
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  </div>
</template>
