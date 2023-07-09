// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    [
      'nuxt-svgo',
      {
        global: false,
        defaultImport: 'url',
      },
    ],
    '@nuxt/image',
    ['@pinia/nuxt', { autoImports: ['defineStore'] }],
    'nuxt-swiper',
  ],

  nitro: {
    // preset: 'vercel',
    // preset: 'node-server',
    // output: {
    // dir: './src',
    //   serverDir: 'src/.output/server',
    //   publicDir: 'src/.output/public',
    // },
  },

  imports: {
    dirs: ['stores'],
  },

  // plugins: [{ src: '~/plugins/particles', mode: 'client', ssr: false }],

  alias: {
    '@img': '/assets/images',
  },

  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      apiBase: '/api',
    },
  },

  rootDir: './src/',

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'AlfaCatalyst',
      meta: [
        // <meta name="description" content="My amazing site">
        { name: 'description', content: 'My amazing site.' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Unbounded:wght@200;300;400;500;600;700;800;900&display=swap',
        },
      ],
    },
  },

  css: ['@/assets/scss/global.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/variables";',
        },
      },
    },
  },

  components: ['~/components', '~/components/common'],
});
