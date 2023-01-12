import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/christmas-gifts-list-adviency/",
  plugins: [react()],
});
