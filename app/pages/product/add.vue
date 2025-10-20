<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Spinner } from '@/components/ui/spinner'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from '@/components/ui/alert'
import { useProductStore } from '@/stores/product'
import { useRouter } from 'vue-router'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { PRODUCT_CATEGORIES } from '@/models/Product'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const formSchema = toTypedSchema(z.object({
  name: z.string()
    .min(2, 'Nama produk minimal 2 karakter')
    .max(100, 'Nama produk maksimal 100 karakter'),
  sku: z.string().min(1, 'SKU wajib diisi'),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(0, 'Harga tidak boleh kurang dari 0')
  ),
  CategoryId: z.preprocess(
    (val) => Number(val),
    z.number().min(1, 'Kategori wajib dipilih')
  ),
  categoryName: z.string().min(1, 'Kategori wajib dipilih'),
  description: z.string()
    .min(10, 'Deskripsi minimal 10 karakter')
    .max(1000, 'Deskripsi maksimal 1000 karakter'),
  image: z.string().url('URL gambar tidak valid'),
  weight: z.preprocess(
    (val) => Number(val),
    z.number().min(0, 'Berat tidak boleh kurang dari 0')
  ),
  length: z.preprocess(
    (val) => Number(val),
    z.number().min(0, 'Panjang tidak boleh kurang dari 0')
  ),
  width: z.preprocess(
    (val) => Number(val),
    z.number().min(0, 'Lebar tidak boleh kurang dari 0')
  ),
  height: z.preprocess(
    (val) => Number(val),
    z.number().min(0, 'Tinggi tidak boleh kurang dari 0')
  ),
}))

const router = useRouter()
const productStore = useProductStore()

const { handleSubmit, isSubmitting, errors, setFieldValue } = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: '',
    price: 0,
    description: '',
    image: '',
    sku: '',
    CategoryId: 0,
    categoryName: '',
    weight: 0,
    width: 0,
    length: 0,
    height: 0
  }
})

const onInvalidSubmit = () => {
  console.log('validation Errors:', errors.value)
}

const onSubmit = handleSubmit(async (values) => {
  try {
    await productStore.createProduct(values)

    if (productStore.getIsSuccess) {
      setTimeout(() => {
        router.push('/')
      }, 2000)
    }
  } catch (error) {
    console.error('Failed to create product:', error)
  }
}, onInvalidSubmit)
</script>

<template>
  <section>
    <img src="/images/products/header.jpg" alt="Bunch of snackes inside a box" class="object-cover object-center">
    <div class="container mx-auto py-8 px-4">
      <Alert v-if="productStore.getIsSuccess" class="mb-6 bg-green-100 border-green-500 text-green-900">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>{{ productStore.getSuccessMessage }}</AlertDescription>
      </Alert>
      <Alert v-if="productStore.getError" class="mb-6 bg-red-100 border-red-500 text-red-900">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{{ productStore.getError }}</AlertDescription>
      </Alert>

      <h1 class="text-2xl font-bold mb-6">Tambah Produk Baru</h1>

      <form 
        class="space-y-6" 
        @submit="onSubmit"
      >
        <div class="grid gap-4 md:grid-cols-2">
          <div class="space-y-4">
            <FormField v-slot="{ componentField }" name="name">
              <FormItem>
                <FormLabel>Nama Produk</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Nama produk"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="price">
              <FormItem>
                <FormLabel>Harga</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Harga produk"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="image">
              <FormItem>
                <FormLabel>URL Gambar</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="URL gambar produk"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="description">
              <FormItem>
                <FormLabel>Deskripsi</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Deskripsi produk"
                    rows="3"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="space-y-4">
            <FormField name="categoryName" v-slot="{ field }">
              <FormItem>
                <FormLabel>Kategori</FormLabel>
                <Select
                  v-bind="field"
                  @update:model-value="(value) => {
                    const category = PRODUCT_CATEGORIES.find(c => c.name === value)
                    if (category) {
                      setFieldValue('categoryName', category.name)
                      setFieldValue('CategoryId', category.id)
                    }
                  }"
                >
                  <FormControl>
                    <SelectTrigger class="w-full">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem 
                      v-for="category in PRODUCT_CATEGORIES" 
                      :key="category.id"
                      :value="category.name"
                    >
                      {{ category.name }}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="sku">
              <FormItem>
                <FormLabel>SKU</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="SKU produk"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </div>

        <!-- Dimensions -->
        <div>
          <h3 class="text-lg font-medium mb-3">Dimensi & Berat</h3>
          <div class="grid gap-4 md:grid-cols-4">
            <FormField v-slot="{ componentField }" name="weight">
              <FormItem>
                <FormLabel>Berat (gram)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Berat"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="length">
              <FormItem>
                <FormLabel>Panjang (cm)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Panjang"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="width">
              <FormItem>
                <FormLabel>Lebar (cm)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Lebar"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="height">
              <FormItem>
                <FormLabel>Tinggi (cm)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Tinggi"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </div>

        <div class="flex gap-4 justify-end">
          <Button 
            type="button" 
            variant="outline"
            @click="router.back()"
          >
            Batal
          </Button>
          <Button type="submit" :disabled="isSubmitting">
            <template v-if="isSubmitting">
              <Spinner class="mr-2 h-4 w-4" />
              Menyimpan...
            </template>
            <template v-else>
              Simpan Produk
            </template>
          </Button>
        </div>
      </form>
    </div>
  </section>
</template>