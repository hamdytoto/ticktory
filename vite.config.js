import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
  },
  optimizeDeps: {
    include: ['moment/locale/ar'], // 💥 force-load Arabic locale
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined, // 💥 prevent Vite from dropping moment/locale
      },
    },
  },
});

