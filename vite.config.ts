import { defineConfig, loadEnv } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import { resolve } from 'path'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    VueI18nPlugin({
      include: [resolve(__dirname, 'src/lang/locales/**')]
    }),
    Components({
      dts: true,
      resolvers: [],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/charge-app-server': {
        target: loadEnv('', process.cwd()).VITE_APP_API,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/charge-app-server/, '/charge-app-server')
      },
    }
  }
});
