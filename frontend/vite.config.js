import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://guest-onborad.vercel.app", // Backend API URL
        changeOrigin: true, // Set to true if backend uses a different domain
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove '/api' prefix
      },
    },
  },
});