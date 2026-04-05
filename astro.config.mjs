// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://iliclinic.pl',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
