import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Carregar variáveis do arquivo .env
dotenv.config();

// Default database URL - works out of the box!
const connectionString = process.env.DATABASE_URL || "mysql://root:root@127.0.0.1:3306/cryptoguard";

// Log para debug (remover em produção)
if (process.env.NODE_ENV !== 'production') {
  console.log("[Drizzle] Database URL configured:", connectionString.replace(/:[^@]*@/, ":***@"));
}

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    url: connectionString,
  },
});
