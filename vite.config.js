import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  css: { preprocessorOptions: { scss: { api: 'modern-compiler' } } },
  build: {
    target: 'es2020',
    cssMinify: true,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 600,
  },
});
