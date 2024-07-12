import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@public': './public',
      '@atoms': './src/atoms',
      '@components': './src/components',
      '@constants': './src/constants',
      '@hooks': './src/hooks',
      '@pages': './src/pages',
      '@styles': './src/styles',
      '@views': './src/views',
      '@types': './src/types',
    },
  },
});
