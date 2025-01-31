import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/css/password.css', 'resources/css/notification.css', 'resources/js/app.js', 'resources/js/notification.js', 'resources/js/password.js'],
            refresh: true,
        }),
    ],
});
