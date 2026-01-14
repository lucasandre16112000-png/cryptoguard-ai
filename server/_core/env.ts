// Configuration with default values - No .env file needed!
export const ENV = {
  // Database configuration
  databaseUrl: "mysql://root:root@127.0.0.1:3306/cryptoguard",
  
  // Security
  cookieSecret: "cryptoguard-secret-key-change-in-production-12345678",
  jwtSecret: "jwt-secret-key-change-in-production-87654321",
  
  // OAuth (optional - for production use)
  appId: process.env.VITE_APP_ID || "cryptoguard-app",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL || "https://api.manus.im",
  ownerOpenId: process.env.OWNER_OPEN_ID || "admin-user",
  
  // API Keys (optional - for production use)
  forgeApiUrl: process.env.FORGE_API_URL || "https://api.manus.im",
  forgeApiKey: process.env.FORGE_API_KEY || "test-key",
  
  // Environment
  isProduction: process.env.NODE_ENV === "production",
  
  // Server
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
};
