import devtoolsJson from "vite-plugin-devtools-json";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { version } from "./package.json";

export default defineConfig({
  plugins: [sveltekit(), devtoolsJson()],
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  server: {
    port: 6124, // GRAF in leet (G=6, R=1, A=2, F=4)
    allowedHosts: [".robo.online"], // tailnet proxy via Caddy
  },
  preview: {
    port: 6124,
  },
});
