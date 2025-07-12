import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/spin-slider/',
  build: {
    outDir: 'dist',
  },
});
