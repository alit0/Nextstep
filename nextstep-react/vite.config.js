import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { compression } from 'vite-plugin-compression2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({ // Compresión gzip para archivos estáticos
      include: /\.(js|mjs|json|css|html)$/i,
      threshold: 10240, // Solo comprimir archivos mayores a 10KB
    }),
  ],
  build: {
    // Optimizaciones de build
    cssCodeSplit: true, // Separar CSS por componente
    chunkSizeWarningLimit: 1000, // Límite para advertencia de tamaño de chunks
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Separar los paquetes por dependencias
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'vendor-react';
            } else if (id.includes('fortawesome')) {
              return 'vendor-icons';
            } else {
              return 'vendor';
            }
          }
        }
      }
    },
    // Minificación
    minify: 'esbuild',
  },
  // Optimización de imágenes
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  // Configuración del servidor
  server: {
    open: true, // Abrir automáticamente en el navegador
  },
})
