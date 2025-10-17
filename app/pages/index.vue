<script setup lang="ts">
import { Button } from '@/components/ui/button'
import ProductContainer from '@/components/ProductContainer'
import type { Product } from '@/models/Product'

const dummyProducts = [
  {
    "id": 1,
    "CategoryId": 19,
    "categoryName": "Frozen",
    "sku": "UYHTSR",
    "name": "Energen Cereal",
    "description": "Delicious Energen Cereal, only at our general store",
    "weight": 80,
    "width": 4,
    "length": 11,
    "height": 16,
    "image": "https://picsum.photos/id/7/400/400",
    "price": 112000
  },
  {
    "id": 2,
    "CategoryId": 12,
    "categoryName": "Beverages",
    "sku": "PLMOKN",
    "name": "Teh Botol Sosro",
    "description": "Refreshing Teh Botol Sosro, perfect for any occasion",
    "weight": 500,
    "width": 7,
    "length": 7,
    "height": 20,
    "image": "https://picsum.photos/id/10/400/400",
    "price": 8500
  },
  {
    "id": 3,
    "CategoryId": 5,
    "categoryName": "Snacks",
    "sku": "ZXCVBN",
    "name": "Chitato Potato Chips",
    "description": "Crispy Chitato Potato Chips, a tasty snack for everyone",
    "weight": 150,
    "width": 15,
    "length": 20,
    "height": 3,
    "image": "https://picsum.photos/id/20/400/400",
    "price": 15000
  },
  {
    "id": 4,
    "CategoryId": 5,
    "categoryName": "Snacks",
    "sku": "ZXCVBN",
    "name": "Chitato Potato Chips",
    "description": "Crispy Chitato Potato Chips, a tasty snack for everyone",
    "weight": 150,
    "width": 15,
    "length": 20,
    "height": 3,
    "image": "https://picsum.photos/id/20/400/400",
    "price": 15000
  },
  {
    "id": 5,
    "CategoryId": 5,
    "categoryName": "Snacks",
    "sku": "ZXCVBN",
    "name": "Chitato Potato Chips",
    "description": "Crispy Chitato Potato Chips, a tasty snack for everyone",
    "weight": 150,
    "width": 15,
    "length": 20,
    "height": 3,
    "image": "https://picsum.photos/id/20/400/400",
    "price": 15000
  },
  {
    "id": 6,
    "CategoryId": 5,
    "categoryName": "Snacks",
    "sku": "ZXCVBN",
    "name": "Chitato Potato Chips",
    "description": "Crispy Chitato Potato Chips, a tasty snack for everyone",
    "weight": 150,
    "width": 15,
    "length": 20,
    "height": 3,
    "image": "https://picsum.photos/id/20/400/400",
    "price": 15000
  }
]

const addToCart = (product: Product) => {
  console.log('Add to cart:', product)
}
</script>

<template>
  <section>
    <!-- Hero Section -->
    <section class="flex relative h-screen w-screen flex-col md:flex-row">
      <div class="absolute top-8 left-8 md:top-16 md:left-16">
        <div class="flex gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          Login
        </div>
      </div>
      <!-- description -->
      <div class="flex order-2 md:order-1 flex-col justify-end p-8 md:p-16 w-full md:w-1/2">
        <h1 class="text-2xl md:text-5xl font-bold mb-4">Toko Kelontong <br class="hidden md:block"> Mas Yanto</h1>
        <p class="text-lg md:text-2xl mb-6">
          Selamat datang di Toko Kelontong Mas Yanto! Kami menyediakan berbagai macam
          kebutuhan sehari-hari dengan harga terjangkau dan kualitas terbaik.
        </p>
        <Button class="self-start">
          <a href="#products" class="text-lg">
            Belanja Sekarang
          </a>
        </Button>
      </div>
      <!-- illustration -->
      <div class="w-full md:w-1/2 md:h-screen order-1 md:order-2 pt-24 md:pt-0">
          <img src="/images/hero/illustration.jpg" alt="Snacks di Toko Kelontong Mas Yanto" class="w-full h-full object-cover object-center">
      </div>
    </section>

    <!-- Products Section -->
    <section id="products" class="py-28 px-8 md:px-0">
      <div class="container mx-auto">
        <div class="text-center">
          <h2 class="text-xl md:text-4xl font-bold mb-4">Snacks & Minuman</h2>
          <p class="text-base md:text-xl mb-6">Dari kebutuhan dapur, minuman dingin, hingga perlengkapan rumah tangga ada di satu tempat! Nikmati harga terjangkau.</p>
        </div>
        <ProductContainer :products="dummyProducts" @add-to-cart="addToCart" />
      </div>
    </section>
  </section>
</template>
