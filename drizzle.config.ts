import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
import * as path from "path";

// Tentar carregar do .env.local primeiro (Windows), depois .env
const envPath = process.env.NODE_ENV === 'production' 
  ? undefined 
  : path.resolve(process.cwd(), '.env.local');

// Carregar variáveis do arquivo .env ou .env.local
if (envPath) {
  dotenv.config({ path: envPath });
}
dotenv.config();

// Construir a URL de conexão
const user = process.env.DB_USER || "root";
const password = process.env.DB_PASSWORD || "161120";
const host = process.env.DB_HOST || "127.0.0.1";
const port = process.env.DB_PORT || "3306";
const database = process.env.DB_NAME || "cryptoguard";

// Usar DATABASE_URL se disponível, senão construir a partir das variáveis individuais
const connectionString = process.env.DATABASE_URL || `mysql://${user}:${password}@${host}:${port}/${database}`;

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
