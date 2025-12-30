import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: 'postgresql',
    schema: './app/_db/schema'
})