// Configuration with default values - No .env file needed!
export const ENV = {
  // Database configuration
  databaseUrl: "mysql://root:root@127.0.0.1:3306/cryptoguard",
  
  // Security
  cookieSecret: "cryptoguard-secret-key-change-in-production-12345678",
  
  // OAuth (optional - for production use)
  appId: "cryptoguard-app",
  oAuthServerUrl: "https://api.manus.im",
  ownerOpenId: "admin-user",
  
  // API Keys (optional - for production use)
  forgeApiUrl: "https://api.manus.im",
  forgeApiKey: "test-key",
  
  // Environment
  isProduction: process.env.NODE_ENV === "production",
  
  // Server
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
};
