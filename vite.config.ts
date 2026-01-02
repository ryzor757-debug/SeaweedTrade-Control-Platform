import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // This ensures assets are loaded correctly on GitHub Pages sub-directories
  base: './',
  define: {
    // This allows process.env.API_KEY to work in the browser as required by the guidelines
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});