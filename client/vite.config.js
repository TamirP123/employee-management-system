import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {
  resolve
} from "path";

const aliases = {
  '@crema': 'src/@crema',
  'core': 'src/core',
  'assets': 'src/assets',
  '@hook': 'src/@hook',
  'components': 'src/components',
  'features': 'src/features',
  'guards': 'src/guards',
  'pages': 'src/pages',
  'types': 'src/types',
};

const resolvedAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [key, resolve(__dirname, value)]),
);

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      }
    },
    build: {
      rollupOptions: {
          external: [
              "react", // ignore react stuff
              "react-dom",
          ],
      }
  },
  resolve: {
      alias: {
          ...resolvedAliases,
          './runtimeConfig': './runtimeConfig.browser',
          'jss-plugin-{}': 'jss-plugin-global'
      },
  }
  },
  plugins: [react()],
})