<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { ref, watch } from 'vue'
import { useProductStore } from '@/stores/product'
import { useDebounce } from '@/lib/utils'

const props = defineProps({
  showBackButton: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['search'])
const searchQuery = ref('')
const productStore = useProductStore()

const debouncedSearch = useDebounce((query: string) => {
  const results = productStore.searchProducts(query)
  emit('search', results)
}, 300)

watch(searchQuery, (newQuery) => {
  debouncedSearch(newQuery)
})
</script>

<template>
  <div class="px-4 md:px-0 sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-14 max-w-screen-2xl items-center">
      <div v-if="showBackButton" class="mr-4">
        <button class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9" @click="$router.back()">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
        </button>
      </div>
      <div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
        <div class="w-full flex-1 md:w-auto md:flex-none">
          <div class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <Input 
              v-model="searchQuery"
              type="search"
              placeholder="Cari produk..."
              class="pl-8 md:w-[300px]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>