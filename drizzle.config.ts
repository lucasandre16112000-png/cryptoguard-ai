import { defineConfig } from "drizzle-kit";

// Default database URL - works out of the box!
const connectionString = process.env.DATABASE_URL || "mysql://root:root@127.0.0.1:3306/cryptoguard";

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    url: connectionString,
  },
});
