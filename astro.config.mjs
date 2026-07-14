import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.seoustaad.com',
  compressHTML: true,

  build: {
    format: 'directory',
  },

  integrations: [sitemap()],
});