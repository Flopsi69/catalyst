import { defineNuxtConfig } from 'nuxt/config';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
// import nodePolyfills from 'rollup-plugin-polyfill-node';
// import nodePolyfills from 'rollup-plugin-node-polyfills';

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
            buffer: true,
            process: true,
          }),
          NodeModulesPolyfillPlugin(),
        ],
      },
    },
    build: {
      rollupOptions: {
        plugins: [rollupNodePolyFill()],
        // plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
      },
    },
    resolve: {
      alias: {
        // This Rollup aliases are extracted from @esbuild-plugins/node-modules-polyfill,
        // see https://github.com/remorses/esbuild-plugins/blob/master/node-modules-polyfill/src/polyfills.ts
        // process and buffer are excluded because already managed
        // by node-globals-polyfill
        util: 'rollup-plugin-node-polyfills/polyfills/util',
        sys: 'util',
        events: 'rollup-plugin-node-polyfills/polyfills/events',
        stream: 'rollup-plugin-node-polyfills/polyfills/stream',
        path: 'rollup-plugin-node-polyfills/polyfills/path',
        querystring: 'rollup-plugin-node-polyfills/polyfills/qs',
        punycode: 'rollup-plugin-node-polyfills/polyfills/punycode',
        url: 'rollup-plugin-node-polyfills/polyfills/url',
        string_decoder: 'rollup-plugin-node-polyfills/polyfills/string-decoder',
        http: 'rollup-plugin-node-polyfills/polyfills/http',
        https: 'rollup-plugin-node-polyfills/polyfills/http',
        os: 'rollup-plugin-node-polyfills/polyfills/os',
        assert: 'rollup-plugin-node-polyfills/polyfills/assert',
        constants: 'rollup-plugin-node-polyfills/polyfills/constants',
        _stream_duplex:
          'rollup-plugin-node-polyfills/polyfills/readable-stream/duplex',
        _stream_passthrough:
          'rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough',
        _stream_readable:
          'rollup-plugin-node-polyfills/polyfills/readable-stream/readable',
        _stream_writable:
          'rollup-plugin-node-polyfills/polyfills/readable-stream/writable',
        _stream_transform:
          'rollup-plugin-node-polyfills/polyfills/readable-stream/transform',
        timers: 'rollup-plugin-node-polyfills/polyfills/timers',
        console: 'rollup-plugin-node-polyfills/polyfills/console',
        vm: 'rollup-plugin-node-polyfills/polyfills/vm',
        zlib: 'rollup-plugin-node-polyfills/polyfills/zlib',
        tty: 'rollup-plugin-node-polyfills/polyfills/tty',
        domain: 'rollup-plugin-node-polyfills/polyfills/domain',
      },
    },
  },

  components: ['~/components', '~/components/common'],
});
