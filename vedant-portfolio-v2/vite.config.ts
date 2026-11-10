import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const page = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/personal-website/",
  build: {
    // One HTML page per URL, so each blog page loads with a 200 on GitHub Pages
    // instead of riding the 404.html fallback.
    rollupOptions: {
      input: {
        main: page("./index.html"),
        blogs: page("./blogs/index.html"),
        "claude-code-terminal-setup": page(
          "./blogs/claude-code-terminal-setup/index.html",
        ),
      },
    },
  },
});
