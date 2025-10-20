import { defineStore } from 'pinia'
import type { Product, ProductCreateInput } from '@/models/Product'
import { API_ENDPOINTS } from '@/constants/api'

type ProductState = {
  products: Product[]
  loading: boolean
  error: string | null
  selectedProduct: Product | null
  isSuccess: boolean
  successMessage: string | null
}

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    products: [],
    loading: false,
    error: null,
    selectedProduct: null,
    isSuccess: false,
    successMessage: null
  }),

  getters: {
    getProducts: (state) => state.products,
    getLoading: (state) => state.loading,
    getError: (state) => state.error,
    getIsSuccess: (state) => state.isSuccess,
    getSuccessMessage: (state) => state.successMessage,
    getSelectedProduct: (state) => state.selectedProduct,
    
    getProductById: (state) => {
      return (productId: string) => state.products.find((product) => product._id === productId)
    }
  },

  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = null
      
      try {
        const response = await fetch(API_ENDPOINTS.PRODUCTS)
        if (!response.ok) throw new Error('Failed to fetch products')
        
        const data = await response.json()
        this.products = data
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An error occurred'
        console.error('Error fetching products:', error)
      } finally {
        this.loading = false
      }
    },

    async createProduct(product: ProductCreateInput) {
      this.loading = true
      this.error = null
      this.isSuccess = false
      this.successMessage = null
      
      try {
        const response = await fetch(API_ENDPOINTS.PRODUCTS, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(product)
        })
        
        if (!response.ok) throw new Error('Failed to create product')
        
        const newProduct = await response.json()
        this.products.push(newProduct)
        this.isSuccess = true
        this.successMessage = 'Product has been created successfully!'
        
        return newProduct
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An error occurred'
        console.error('Error creating product:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    setSelectedProduct(product: Product | null) {
      this.selectedProduct = product
    }
  }
})