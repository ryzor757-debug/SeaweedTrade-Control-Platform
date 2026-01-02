import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Explicitly setting the base path to the repository name for GitHub Pages deployment.
  // This ensures assets (JS/CSS) are loaded from the correct sub-directory.
  base: '/SeaweedTrade-Control-Platform/',
  fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${import.meta.env.AIzaSyDl08nqHhD3jTXlfbon1px7VlpfyvTuGTc}`)

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'lucide-react', 'recharts'],
        },
      },
    },
  }
});
