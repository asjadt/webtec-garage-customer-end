import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// PWA SETTINGS
const mainfestForPlugin = {
  registerType: "autoUpdate",
  injectRegister: "auto",
  includeAssets: [
    "favicon.ico",
    "android-chrome-192x192.png",
    "android-chrome-512x512.png",
  ],
  mainfest: {
    name: "Garage Booking",
    short_name: "Garage Booking",
    description: "It is an garage booking system by webtec",
    icons: [
      {
        src: "./favicon.ico",
        size: "64x64 32x32 24x24 16x16",
        type: "image/x-icon",
        purpose: "any maskable",
      },
      {
        src: "./android-chrome-192x192.png",
        size: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "./android-chrome-512x512.png",
        size: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    start_url: ".",
    orientation: "portrait",
    theme_color: "#DC2D2A",
    background_color: "##FFFFFF",
    display: "standalone",
  },
};

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
