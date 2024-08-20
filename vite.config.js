import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import chokidar from "chokidar";

// PWA SETTINGS
const mainfestForPlugin = {
  registerType: "prompt",
  includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.png"],
  mainfest: {
    name: "Garage Booking",
    short_name: "Garage Booking",
    description: "It is an garage booking system by webtec",
    icons: [
      {
        src: "./android-chrome-192x192.png",
        size: "192x192",
        type: "image/png",
      },
      {
        src: "./android-chrome-512x512.png",
        size: "512x512",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "./apple-touch-icon.png",
        size: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
      {
        src: "./apple-touch-icon.png",
        size: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
    ],
    theme_color: "#DC2D2A",
    background_color: "##FFFFFF",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(mainfestForPlugin)],
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
