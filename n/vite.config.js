import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default ({ mode }) => defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  base: mode === 'development' ? '/' : './',
  server: {
    port: 9000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
      'assets': path.resolve(__dirname, '/src/assets'),
      'coms': path.resolve(__dirname, 'src/components'),
    },
  },
});
