import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import path from 'node:path';              // ← TAMBAH INI
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
        // Disable wayfinder jika tidak di Railway DAN tidak di env KODAIDEV
        !process.env.RAILWAY_ENVIRONMENT_NAME && !process.env.KODAIDEV_BUILD && wayfinder({
            formVariants: true,
        }),
    ],
    resolve: {
        alias: {
            // Fix case-sensitivity: @/Layouts → @/layouts (Linux case-sensitive)
            '@/Layouts': path.resolve(__dirname, 'resources/js/layouts'),
        },
    },
    esbuild: {
        jsx: 'automatic',
    },
});