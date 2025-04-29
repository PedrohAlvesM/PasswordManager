import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { getInputEntries } from './get-build-files';

export default defineConfig({
    plugins: [
        laravel({
            input: getInputEntries(),
            refresh: true,
        }),
    ],
});
