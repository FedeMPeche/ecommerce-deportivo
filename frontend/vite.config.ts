import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3001", // redirige llamadas a /api al backend
      "/uploads": "http://localhost:3001", // también para las imágenes
    },
  },
});
