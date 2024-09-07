import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schema.js",
  out: "./drizzle",
  dialect: "postgresql", // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});
