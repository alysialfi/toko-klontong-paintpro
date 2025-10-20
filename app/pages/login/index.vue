<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

const router = useRouter()

const formSchema = toTypedSchema(
  z.object({
    username: z.string()
      .min(3, 'Username must be at least 3 characters')
      .max(50, 'Username must not exceed 50 characters'),
    password: z.string()
      .min(6, 'Password must be at least 6 characters')
      .max(50, 'Password must not exceed 50 characters')
  })
)

const error = ref('')

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  error.value = ''

  try {
    console.log('Login attempt with:', values)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    router.push('/')
  } catch {
    error.value = 'Invalid username or password'
  }
})

</script>

<template>
  <section class="flex relative h-screen w-screen flex-col md:flex-row">
    <div class="flex order-2 md:order-1 flex-col p-8 md:p-16 w-full md:w-1/2">
      <div class="w-full mx-auto">
        <div class="space-y-2 mb-8 text-left">
          <h1 class="text-3xl font-bold">Welcome back</h1>
          <p class="text-gray-500">Enter your credentials to access your account</p>
        </div>

        <form class="space-y-4" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="username">
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input 
                  type="text" 
                  placeholder="Enter your username"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  placeholder="Enter your password"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <div v-if="error" class="text-red-500 text-sm mt-2">
            {{ error }}
          </div>

          <Button type="submit" class="w-full" :disabled="isSubmitting">
            {{ isSubmitting ? 'Signing in...' : 'Sign in' }}
          </Button>
        </form>
      </div>
    </div>

    <div class="w-full md:w-1/2 md:h-screen order-1 md:order-2 pt-24 md:pt-0">
      <img 
        src="/images/hero/illustration.jpg" 
        alt="Snacks di Toko Kelontong Mas Yanto" 
        class="w-full h-full object-cover object-center"
      >
    </div>
  </section>
</template>