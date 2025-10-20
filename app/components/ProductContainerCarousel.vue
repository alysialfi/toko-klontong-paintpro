<script setup lang="ts">
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { Product } from '@/models/Product'
import ProductCTA from './ProductCTA.vue'

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

// Calculate total items (products + CTA card)
const totalItems = computed(() => props.products.length + 1)

// Calculate items per view based on screen size
const itemsPerView = computed(() => {
  if (typeof window === 'undefined') return 1
  if (window.innerWidth >= 1024) return 4 // lg
  if (window.innerWidth >= 768) return 3  // md
  if (window.innerWidth >= 640) return 2  // sm
  return 1                                // mobile
})

// Determine if navigation is needed
const showNavigation = computed(() => totalItems.value > itemsPerView.value)
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

    <div v-else class="relative">
      <Carousel
        class="w-full"
        :opts="{
          align: 'start',
          dragFree: true,
          skipSnaps: true
        }"
      >
        <CarouselContent class="-ml-4">
          <CarouselItem v-for="product in products" :key="product.id" class="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
            <Card class="h-full">
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
                  :disabled="product.stock === 0"
                  @click="emit('add-to-cart', product)"
                >
                  Beli
                </Button>
              </CardFooter>
            </Card>
          </CarouselItem>

          <CarouselItem class="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
            <ProductCTA />
          </CarouselItem>
        </CarouselContent>
        
        <CarouselPrevious 
          v-if="showNavigation" 
          class="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-5"
        />
        <CarouselNext 
          v-if="showNavigation" 
          class="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-5"
        />
      </Carousel>
    </div>
  </div>
</template>
