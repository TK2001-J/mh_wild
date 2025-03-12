import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mdx from '@mdx-js/rollup';
import RemarkGfm from 'remark-gfm';
import path from 'path';

export default defineConfig({
  plugins: [
    {
      ...mdx({
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [RemarkGfm]
      })
    },
    react()
  ],
  resolve: {
    alias: {
      '@docs': '/docs'
    }
  },
  optimizeDeps: {
    include: [
      '@mdx-js/react',
      'typewriter-effect',
      'react-simple-code-editor',
      'js-beautify'
    ]
  },
  server: {
    port: 3030
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const moduleName = id.split('node_modules/')[1].split('/')[0];
            return path.join('chunk', moduleName);
          }

          return null;
        }
      }
    }
  }
});
