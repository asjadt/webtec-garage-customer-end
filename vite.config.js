import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import chokidar from "chokidar";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",
  },

  server: {
    host: true,
    hmr: {
      overlay: false,
    },
    watch: {
      usePolling: true,
      interval: 100,
      depth: 99,
      ignored: ["**/node_modules/**", "**/dist/**"],
    },
  },
});
