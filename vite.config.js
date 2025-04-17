import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enables global `test`, `expect`, etc.
    environment: "jsdom", // Simulates a browser for React components
    setupFiles: "./setupTests.js", // Optional setup for global configs
  },
});
