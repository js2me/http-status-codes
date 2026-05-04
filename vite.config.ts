/* eslint-disable import/default */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import babelPlugin, { defineRolldownBabelPreset } from '@rolldown/plugin-babel';
import viteLegacyPlugin from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import browserslist from 'browserslist';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';
import { default as checker } from 'vite-plugin-checker';
import { default as eslint } from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';

import packageJson from './package.json';

import "./data/generate";
// @ts-ignore ts(6307) ignore

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;
const isPreview = process.env.MODE === 'preview';

dotenv.config({
  path: !isPreview && isProd ? '.env.production' : '.env'
});

const browserTargets = browserslist.loadConfig({ path: '.' });

/** Vite ожидает base с ведущим и завершающим `/`; иначе ломаются пути к entry и HMR. */
function normalizeAppBase(url: string): string {
  const raw = (url || '/').trim();
  if (raw === '' || raw === '/') {
    return '/';
  }
  const withLeading = raw.startsWith('/') ? raw : `/${raw}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

const baseUrl = normalizeAppBase(process.env.PUBLIC_URL || '/');
const port = +Number(process.env.PORT) || 8081;

/** OXC в Vite 8 не ловерит декораторы MobX; Babel — рекомендованный обход (см. vite migration / discussions). */
const mobxDecoratorsBabelPreset = defineRolldownBabelPreset({
  preset: () => ({
    presets: [
      [
        '@babel/preset-typescript',
        {
          allowDeclareFields: true,
          jsx: 'preserve',
        },
      ],
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-transform-class-properties', { loose: true }],
    ],
  }),
  rolldown: {
    filter: {
      code: /@/,
    },
  },
});


const useProxyTargetApiUrl = isPreview || isDev;

const buildEnvs = {
  VERSION: packageJson.version,
  DEV: !isProd,
  BASE_URL: baseUrl,
  PREVIEW: isPreview,
} satisfies BuildEnvariables

// https://vitejs.dev/config/
export default defineConfig({
  appType: 'spa',
  mode: isProd ? 'production' : 'development',
  base: baseUrl,
  clearScreen: true,
  define: {
    buildEnvs: JSON.stringify(
      Object.assign(buildEnvs),
    ),
  },
  server: {
    port,
    hmr: true,
    cors: false,
  },
  preview: {
    port,
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  logLevel: 'info',
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        api: 'modern-compiler',
      },
    },
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName: isProd
        ? '[hash:base64:4]'
        : '[name]__[local]___[hash:base64:5]',
    },
  },
  build: {
    cssCodeSplit: true,
    reportCompressedSize: true,
    emptyOutDir: true,
    minify: isProd,
    cssMinify: isProd,
    cssTarget: false,
    ssrEmitAssets: false,
    ssrManifest: false,
    ssr: false,
    rollupOptions: {
      output: {
        entryFileNames: 'static/js/bundle.[hash].js',
        assetFileNames: 'static/assets/[name].[hash].[ext]',
        chunkFileNames: 'static/js/[name].[hash].js',
      },
    },
  },
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        experimentalDecorators: true,
      },
    },
  },
  plugins: [
    babelPlugin({
      presets: [mobxDecoratorsBabelPreset],
    }),
    react(),
    viteLegacyPlugin({
      targets: browserTargets,
      // Tailwind v4 требует современные браузеры; legacy-трансформация Babel не парсит MobX 2023-05 decorators.
      renderLegacyChunks: false,
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
    svgr({}),
    isProd && eslint(),
    isProd &&
      checker({
        typescript: true,
      }),
  ].filter(Boolean),
});
