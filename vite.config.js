import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import viteCompression from 'vite-plugin-compression';

/**
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [vue(),viteCompression()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  server: {
    host:'0.0.0.0',
    port: 8085,
    strictPort:false
  }
}
