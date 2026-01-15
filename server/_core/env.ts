// Configuration with default values - Can be overridden with .env file
export const ENV = {
  // Database configuration
  databaseUrl: process.env.DATABASE_URL || "mysql://root:root@127.0.0.1:3306/cryptoguard",
  
  // Security
  cookieSecret: process.env.COOKIE_SECRET || "cryptoguard-secret-key-change-in-production-12345678",
  jwtSecret: process.env.JWT_SECRET || "jwt-secret-key-change-in-production-87654321",
  
  // OAuth (optional - for production use)
  appId: process.env.VITE_APP_ID || "cryptoguard-app",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL || "https://api.manus.im",
  ownerOpenId: process.env.OWNER_OPEN_ID || "admin-user",
  
  // API Keys (optional - for production use)
  forgeApiUrl: process.env.FORGE_API_URL || "https://api.manus.im",
  forgeApiKey: process.env.FORGE_API_KEY || "test-key",
  
  // Environment
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development" || !process.env.NODE_ENV,
  
  // Server
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
};

// Log configuration on startup (development only)
if (ENV.isDevelopment) {
  console.log("[ENV] Database configured:", ENV.databaseUrl.replace(/:[^@]*@/, ":***@"));
}
