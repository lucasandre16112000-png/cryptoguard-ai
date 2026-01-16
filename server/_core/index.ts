import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import net from 'net';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from '../routers';
import { createContext } from './context';
import { serveStatic, setupVite } from './vite';
import cookieParser from 'cookie-parser';
import { startMonitoring } from '../blockchainMonitor';

async function startServer() {
  const app = express();
  const server = createServer(app);
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use(cookieParser());

  app.use(
    '/api/trpc',
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  if (process.env.NODE_ENV === 'development') {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    
    // ✅ ATIVAR MONITORAMENTO EM TEMPO REAL
    console.log('[✓] Iniciando monitoramento em tempo real de transações...');
    startMonitoring(10000); // Gera novas transações a cada 10 segundos
  });
}

startServer().catch(console.error);
