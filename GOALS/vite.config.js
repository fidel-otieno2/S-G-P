import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './' // 👈 required for Vercel to find assets properly in the dist folder
});
