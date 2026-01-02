import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Using './' ensures that the application works regardless of the sub-directory it is hosted in.
  // This is the most robust setting for GitHub Pages and other shared hosting.
  base: './',
  define: {
    // Inject API key for Gemini services. 
    // This value must be available in the environment during the build process.
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
  }
});