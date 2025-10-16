// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils',
    'shadcn-nuxt',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
  ],
  css: ['~/assets/tailwind.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  googleFonts: {
    families: {
      'Plus Jakarta Sans': [100, 200, 300, 400, 500, 600, 700, 800],
      // Inter: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
  }
})