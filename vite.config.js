import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sassDart from 'sass';

// https://vite.dev/config/
export default defineConfig({
  base: '/', 
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sassDart,
      },
    },
  },
  
});
