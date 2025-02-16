import type { UserConfig } from 'vite'

import { fileURLToPath } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import uno from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VueUseDirectiveResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import vueDevTools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts'
import { VineVitePlugin } from 'vue-vine/vite'

import { build, imports } from './vite.custom'
import { viteProxy } from './vite.proxy'

const dir = (dir: string = '.') => fileURLToPath(new URL(dir, import.meta.url))

// https://vitejs.dev/config/
export default (cfg: UserConfig) => {
  const { mode = 'development' } = cfg
  const env = loadEnv(mode, dir(), '')
  const prod = mode === 'production'
  const base = env.ROOT || '/'

  return defineConfig({
    base,
    build,
    plugins: [
      uno(),
      vueDevTools(),
      AutoImport(imports),
      Components({
        directoryAsNamespace: true,
        resolvers: [
          VueUseDirectiveResolver(),
        ],
      }),
      Layouts(),
      VueRouter({
        extensions: ['.vine.ts'],
      }),
      vue(),
      VineVitePlugin(),

      createHtmlPlugin({ minify: true }),
      prod && visualizer({ gzipSize: true }),
    ],
    resolve: {
      alias: {
        '@': dir('./src'),
      },
    },
    server: {
      host: env.HOST,
      port: Number.parseInt(env.PORT),
      proxy: prod ? undefined : viteProxy(cfg),
    },
  })
}
