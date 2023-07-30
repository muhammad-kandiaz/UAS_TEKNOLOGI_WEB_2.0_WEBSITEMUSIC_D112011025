import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot instead of render
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

createInertiaApp({
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        return createRoot(el).render(<App {...props} />); // Use createRoot instead of render
    },
});

InertiaProgress.init();
