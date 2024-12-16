import { sveltekit } from "@sveltejs/kit/vite";
import { FontaineTransform } from "fontaine";
import { promises as fs } from "node:fs";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    sveltekit(),
    FontaineTransform.vite({
      fallbacks: ["Arial"],
      resolvePath: (id) => new URL(id.startsWith("/") ? `public/${id.slice(1)}` : `node_modules/${id}`, import.meta.url),
    }),
    Icons({
      compiler: "svelte",
      customCollections: {
        ta: {
          logo: () => fs.readFile("./src/icons/logo.svg", "utf8"),
          stain: () => fs.readFile("./src/icons/stain.svg", "utf8"),
        },
      },
    }),
  ],
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
});
