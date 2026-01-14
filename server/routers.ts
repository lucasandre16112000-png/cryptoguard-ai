import { z } from 'zod';
import { publicProcedure, protectedProcedure, router } from './_core/trpc';
import * as db from './db';
import { AuthService } from './_core/authService';
import { TRPCError } from '@trpc/server';
import { COOKIE_NAME } from '@shared/const';
import { getSessionCookieOptions } from './_core/cookies';
import { systemRouter } from './_core/systemRouter';
import { generateSeedData } from './blockchainMonitor';
import { generatePDFReport } from './pdfGenerator';

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,

  auth: router({
    register: publicProcedure
      .input(z.object({ 
        name: z.string(),
        email: z.string().email(), 
        password: z.string().min(8) 
      }))
      .mutation(async ({ input }) => {
        const { email, password, name } = input;
        const authService = new AuthService();
        const passwordHash = await authService.hashPassword(password);
        const user = await db.createUser({ email, passwordHash, name });
        return { id: user.id, email: user.email, name: user.name };
      }),

    login: publicProcedure
      .input(z.object({ 
        email: z.string().email(), 
        password: z.string() 
      }))
      .mutation(async ({ input, ctx }) => {
        const { email, password } = input;
        const user = await db.getUserByEmail(email);

        if (!user || !user.passwordHash) {
          throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid email or password' });
        }

        const authService = new AuthService();
        const passwordMatch = await authService.comparePasswords(password, user.passwordHash);

        if (!passwordMatch) {
          throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid email or password' });
        }

        const token = await authService.createSessionToken({ userId: user.id });
        
        ctx.res.cookie(COOKIE_NAME, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        });

        return { id: user.id, email: user.email, name: user.name, role: user.role };
      }),

    me: protectedProcedure.query(opts => opts.ctx.user),

    logout: publicProcedure.mutation(({ ctx }) => {
      ctx.res.clearCookie(COOKIE_NAME, { path: '/' });
      return { success: true } as const;
    }),
  }),

  // ========== DASHBOARD ==========
  dashboard: router({
    stats: protectedProcedure.query(async () => {
      const now = new Date();
      const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const last7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      const [stats24h, stats7d, statsTotal] = await Promise.all([
        db.getTransactionStats(last24h, now),
        db.getTransactionStats(last7d, now),
        db.getTransactionStats(),
      ]);
      
      const alerts = await db.getAlerts({ limit: 10, isRead: false });
      const recentTransactions = await db.getTransactions({ limit: 10, isSuspicious: true });
      
      return {
        last24h: stats24h,
        last7d: stats7d,
        total: statsTotal,
        unreadAlerts: alerts.length,
        recentSuspicious: recentTransactions.length,
      };
    }),
    
    recentActivity: protectedProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(async ({ input }) => {
        return db.getTransactions({ limit: input.limit || 20 });
      }),
  }),

  // ========== TRANSACTIONS ==========
  transactions: router({
    list: protectedProcedure
      .input(z.object({
        limit: z.number().optional(),
        network: z.enum(['ethereum', 'bsc', 'polygon']).optional(),
        isSuspicious: z.boolean().optional(),
        minRiskScore: z.number().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      }))
      .query(async ({ input }) => {
        return db.getTransactions(input);
      }),
      
    stats: protectedProcedure
      .input(z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      }))
      .query(async ({ input }) => {
        return db.getTransactionStats(input.startDate, input.endDate);
      }),
  }),

  // ========== ADDRESSES ==========
  addresses: router({
      list: protectedProcedure
        .input(z.object({ limit: z.number().optional() }))
        .query(async ({ input }) => {
            return db.getAllAddresses(input.limit);
        }),
      getByAddress: protectedProcedure
        .input(z.object({ address: z.string() }))
        .query(async ({ input }) => {
            return db.getAddressByAddress(input.address);
        }),
  }),

  // ========== ALERTS ==========
  alerts: router({
    list: protectedProcedure
      .input(z.object({ 
          limit: z.number().optional(), 
          isRead: z.boolean().optional(),
          severity: z.string().optional(),
        }))
      .query(async ({ input }) => {
        return db.getAlerts(input);
      }),
    markAsRead: protectedProcedure
      .input(z.object({ alertId: z.number() }))
      .mutation(async ({ input }) => {
        await db.markAlertAsRead(input.alertId);
        return { success: true };
      }),
    resolve: protectedProcedure
      .input(z.object({ alertId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        await db.resolveAlert(input.alertId, ctx.user.id);
        return { success: true };
      }),
  }),

  // ========== REPORTS ==========
  reports: router({
    list: protectedProcedure.query(async () => {
      return db.getReports();
    }),
    generate: protectedProcedure
      .input(z.object({
        title: z.string(),
        type: z.enum(['daily', 'weekly', 'monthly', 'custom']),
        startDate: z.date(),
        endDate: z.date(),
      }))
      .mutation(async ({ input, ctx }) => {
        const stats = await db.getTransactionStats(input.startDate, input.endDate);
        const alerts = await db.getAlerts({ });
        const reportUrl = await generatePDFReport({
            title: input.title,
            type: input.type,
            startDate: input.startDate,
            endDate: input.endDate,
            totalTransactions: stats.total,
            suspiciousTransactions: stats.suspicious,
            alertsGenerated: alerts.length,
            avgRiskScore: stats.avgRiskScore || 0,
        });
        const report = await db.insertReport({
            ...input,
            totalTransactions: stats.total,
            suspiciousTransactions: stats.suspicious,
            alertsGenerated: alerts.length,
            pdfUrl: reportUrl,
            generatedBy: ctx.user.id,
        });
        return report;
      }),
  }),

  // ========== ADMIN ==========
  admin: router({
    users: adminProcedure.query(async () => {
        return db.getAllUsers();
    }),
    config: adminProcedure.query(async () => {
        const riskThreshold = await db.getConfig('risk_threshold');
        const alertEmail = await db.getConfig('alert_email');
        return {
            riskThreshold: riskThreshold ? parseInt(riskThreshold.value) : 60,
            alertEmail: alertEmail ? alertEmail.value : null,
        };
    }),
    seedData: adminProcedure
      .input(z.object({ count: z.number().min(1).max(100) }))
      .mutation(async ({ input }) => {
        await generateSeedData(input.count);
        return { success: true, generated: input.count };
      }),
  }),
});

export type AppRouter = typeof appRouter;
