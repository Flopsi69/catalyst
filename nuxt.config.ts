import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
// import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
// import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
// import nodePolyfills from 'rollup-plugin-polyfill-node';
// import nodePolyfills from 'rollup-plugin-node-polyfills';
// import { nodePolyfills } from 'vite-plugin-node-polyfills';
// import inject from '@rollup/plugin-inject';

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
    [
      '@nuxtjs/supabase',
      {
        redirect: false,
        redirectOptions: {
          login: '/',
          callback: '/character',
        },
      },
    ],
    '@use-wagmi/nuxt',
    '@nuxt/image',
    ['@pinia/nuxt', { autoImports: ['defineStore'] }],
    'nuxt-swiper',
  ],

  imports: {
    dirs: ['stores'],
  },

  ssr: false,
  // nitro: {
  //   prerender: {
  //     failOnError: false,
  //   },
  // },

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
    plugins: [
      // nodePolyfills({
      //   // To exclude specific polyfills, add them to this list.
      //   exclude: [
      //     'fs', // Excludes the polyfill for `fs` and `node:fs`.
      //   ],
      //   // Whether to polyfill specific globals.
      //   globals: {
      //     Buffer: true, // can also be 'build', 'dev', or false
      //     global: true,
      //     process: true,
      //   },
      //   // Whether to polyfill `node:` protocol imports.
      //   protocolImports: true,
      // }),
    ],
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis', // fix nuxt3 global
        },
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true,
            process: true,
          }),
        ],
      },
    },
    build: {
      rollupOptions: {
        // plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
        // plugins: [rollupNodePolyFill()],
        // plugins: [inject({ Buffer: ['Buffer', 'Buffer'], process: 'process' })],
      },
    },
  },

  components: ['~/components', '~/components/common'],
});
