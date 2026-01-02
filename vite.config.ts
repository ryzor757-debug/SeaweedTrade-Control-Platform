import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Fixed base path for GitHub Pages deployment
  base: '/SeaweedTrade-Control-Platform/',
  define: {
    // Inject API key for Gemini services
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});