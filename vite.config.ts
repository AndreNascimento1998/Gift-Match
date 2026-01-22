import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import tailwind from "@tailwindcss/vite"
import * as path from "node:path"

export default defineConfig({
    plugins: [react(), tailwind()],
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: ["./src/setupTests.ts"],
        css: true,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
})
