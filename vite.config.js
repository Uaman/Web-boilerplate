import { defineConfig } from "vite";

console.log(`\x1b[90m${new Date().toLocaleTimeString("en-GB")}\x1b[0m \x1b[36m[vite-config]\x1b[0m \x1b[32mloaded\x1b[0m`);

export default defineConfig({
    server: { proxy: { "/api": "http://localhost:3001" } }
});
