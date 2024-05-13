import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/socket.io': {
                target: 'https://itacaapi2-0-1oon.onrender.com/api/3001',
                ws: true
            }
        }
    }
})