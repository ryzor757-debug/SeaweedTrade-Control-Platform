import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Explicitly setting the base path to the repository name for GitHub Pages deployment.
  // This ensures assets (JS/CSS) are loaded from the correct sub-directory.
  base: '/SeaweedTrade-Control-Platform/',
  define: {
    // Inject API key for Gemini services. 
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  },
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