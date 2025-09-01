import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'types': resolve(__dirname, './src/types'),
      'utils': resolve(__dirname, './src/utils'),
      'hooks': resolve(__dirname, './src/hooks'),
      'components': resolve(__dirname, './src/components')
    }
  }
})