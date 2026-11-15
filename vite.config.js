import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Vite dev server moved off 3000 because server.js (the API) already uses 3000.
    port: 5173,
    open: true,
    proxy: {
      '/api': 'http://127.0.0.1:3000'
    }
  }
});
