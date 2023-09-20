import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { URL } from "url";
import path from "path";

const __dirname = decodeURI(new URL(".", import.meta.url).pathname);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@pages": path.resolve(__dirname, "./src/pages"),
    },
  },
  plugins: [react()],
});
