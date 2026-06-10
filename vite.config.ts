import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The admin API (Express) runs on 5174; Vite proxies /api and /products to it.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    host: "localhost",
    proxy: {
      "/api": "http://localhost:5174",
    },
  },
});
