import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv'
import path from 'path' // añado el path para poder saber la ruta

dotenv.config();
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    define: {
        'process.env': {
            VITE_URL_SERVER: JSON.stringify(process.env.VITE_URL_SERVER),
        },
    },
})
