import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Charger les variables d'environnement
  const env = loadEnv(mode, process.cwd(), '');
  
  // variable d'environnement VITE_API_URL pour le proxy backend, ou localhost:5001 par défaut
  const apiUrl = env.VITE_API_URL || 'http://localhost:5002';

  return {
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
        },
      },
    },
  };
});