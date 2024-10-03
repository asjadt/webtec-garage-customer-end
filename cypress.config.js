import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    e2e: {
      baseUrl: process.env.CYPRESS_BASE_URL || "http://localhost:5173",
    },
  },
});
