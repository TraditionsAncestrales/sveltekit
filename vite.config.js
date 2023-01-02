import { sveltekit } from '@sveltejs/kit/vite';
import { promises as fs } from 'fs';
import Icons from 'unplugin-icons/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    sveltekit(),
    Icons({
      compiler: 'svelte',
      customCollections: {
        ta: {
          logo: () => fs.readFile('./src/icons/logo.svg', 'utf-8'),
          stain: () => fs.readFile('./src/icons/stain.svg', 'utf-8'),
        },
      },
    }),
  ],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
};

export default config;
