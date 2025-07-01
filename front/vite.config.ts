import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Utilise la variable d'environnement VITE_API_URL pour le proxy backend, ou localhost:5002 par défaut
const apiUrl = process.env.VITE_API_URL || 'http://localhost:5002';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // permet d'accéder au serveur Vite depuis d'autres appareils 
    port: 3000,
    open: true, // ouvre automatiquement le navigateur lorsque le serveur est lancé
    proxy: {
      '/api': {
        target: apiUrl,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})