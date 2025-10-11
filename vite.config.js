import {
    registerChangeFavouriteTeacher
} from './src/api-mock/endpoints/change-favourite-teacher.mock-endpoint.js';
import { defineConfig } from "vite";
import { registerAddTeacher } from './src/api-mock/endpoints/add-teacher.mock-endpoint.js';

console.log(`\x1b[90m${new Date().toLocaleTimeString("en-GB")}\x1b[0m \x1b[36m[vite-config]\x1b[0m \x1b[32mloaded\x1b[0m`);

export default defineConfig({
    server: {
        port: 5173,
        open: true,
    },
    plugins: [
        {
            name: 'mock-api',
            configureServer(server) {
                registerChangeFavouriteTeacher(server);
                registerAddTeacher(server);
            },
        },
    ],
});
