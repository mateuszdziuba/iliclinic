// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://iliclinic.pl',
  adapter: vercel(),
  integrations: [sitemap()],
  prefetch: {
    prefetchAll: false,
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Noto Serif',
      cssVariable: '--font-ili-heading',
      weights: [300, 400],
      styles: ['normal', 'italic'],
      subsets: ['latin', 'latin-ext'],
    },
    {
      provider: fontProviders.google(),
      name: 'Work Sans',
      cssVariable: '--font-ili-body',
      weights: [300, 400, 500, 600],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
    },
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
