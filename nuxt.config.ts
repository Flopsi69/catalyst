import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import inject from '@rollup/plugin-inject';

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
    '@nuxtjs/supabase',
    // '@sidebase/nuxt-auth',
    '@use-wagmi/nuxt',
    '@nuxt/image',
    ['@pinia/nuxt', { autoImports: ['defineStore'] }],
    'nuxt-swiper',
  ],

  // auth: {
  //   baseURL: process.env.AUTH_ORIGIN,
  //   provider: {
  //     type: 'authjs',
  //     // addDefaultCallbackUrl: false,
  //   },
  //   // baseURL: 'http://localhost:3000/api/auth',
  //   globalAppMiddleware: {
  //     isEnabled: true,
  //     // addDefaultCallbackUrl: false
  //   },
  // },

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
      script: [
        // { children: `window.Buffer = ${Buffer} || []` }
        {
          children:
            "setTimeout(() => {document.documentElement.classList.add('transition-activated')}, 800)",
        },
      ],
    },
  },

  css: ['@/assets/scss/global.scss'],

  build: {
    transpile: ['vue-toastification'],
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/variables";',
        },
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis', // fix nuxt3 global
        },
        plugins: [
          NodeGlobalsPolyfillPlugin({
            process: true, // fix nuxt3 process
            buffer: true,
          }),
          // NodeModulesPolyfillPlugin(),
        ],
      },
    },
    resolve: {
      alias: {
        stream: 'stream-browserify',
      },
    },
    build: {
      rollupOptions: {
        plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
      },
    },
  },

  components: ['~/components', '~/components/common'],
});
