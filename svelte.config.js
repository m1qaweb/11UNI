import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const dev = process.argv.includes('dev');
const base = dev ? '' : process.env.BASE_PATH || '';

const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: "404.html",
      precompress: true,
      strict: true,
    }),
    paths: {
      base: base,
    },
    prerender: {
      handleHttpError: "warn",
      handleMissingId: "warn",
      entries: ["*"],
    },
    alias: {
      $assets: "src/assets",
    },
  },
};

export default config;
