import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import Components from 'unplugin-vue-components/vite';
import UnoCSS from 'unocss/vite';
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers';

export default defineConfig({
    root: '.',
    build: {
        rollupOptions: {
            input: './index.html'
        }
    },
    plugins: [
        vue(),
        UnoCSS(),
        Components({
            dts: 'src/components.d.ts',
            resolvers: [
                AntDesignVueResolver({
                    importStyle: false,
                }),
            ],
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'https://localhost:3000',
                changeOrigin: true,
            }
        }
    }
})