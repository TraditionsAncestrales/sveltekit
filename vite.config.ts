import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import Icons from "unplugin-icons/vite";
import { promises as fs } from "node:fs";
import { FontaineTransform } from "fontaine";

export default defineConfig({
  plugins: [
    sveltekit(),
    Icons({
      compiler: "svelte",
      customCollections: {
        ta: {
          logo: () => fs.readFile("./src/icons/logo.svg", "utf8"),
          stain: () => fs.readFile("./src/icons/stain.svg", "utf8"),
        },
      },
    }),
    FontaineTransform.vite({
      fallbacks: ["Arial"],
      resolvePath: (id) => new URL(id.startsWith("/") ? `public/${id.slice(1)}` : `node_modules/${id}`, import.meta.url),
    }),
  ],
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
});
