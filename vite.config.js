import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/socket.io': {
                target: 'https://itacaapi-puw8.onrender.com:3001',
                changeOrigin: true,
                ws: true
            },
            '/api': {
                target: 'https://itacaapi-puw8.onrender.com:3000',
                changeOrigin: true
            }
        }
    }
})
