import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

import { manifest } from './src/manifest';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    build: {
      emptyOutDir: true,
      outDir: 'build',
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/chunk-[hash].js'
        }
      }
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './tests/setup.js'
    },
    server: {
      port: 5173,
      strictPort: true,
      hmr: {
        port: 5173
      }
    },
    plugins: [tsconfigPaths(), crx({ manifest }), react()]
  };
});
