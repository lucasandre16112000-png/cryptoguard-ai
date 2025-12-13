import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import * as db from "./db";
import { generateSeedData } from "./blockchainMonitor";
import { generatePDFReport } from "./pdfGenerator";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
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
        network: z.enum(["ethereum", "bsc", "polygon"]).optional(),
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
      
    get: protectedProcedure
      .input(z.object({ address: z.string() }))
      .query(async ({ input }) => {
        const address = await db.getAddressByAddress(input.address);
        if (!address) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Address not found' });
        }
        
        // Get transactions for this address
        const allTxs = await db.getTransactions({ limit: 1000 });
        const addressTxs = allTxs.filter(
          tx => tx.fromAddress === input.address || tx.toAddress === input.address
        );
        
        return {
          address,
          transactions: addressTxs,
        };
      }),
      
    updateWhitelist: adminProcedure
      .input(z.object({
        address: z.string(),
        isWhitelisted: z.boolean(),
      }))
      .mutation(async ({ input }) => {
        await db.upsertAddress({
          address: input.address,
          network: "ethereum",
          isWhitelisted: input.isWhitelisted,
          riskScore: 0,
          label: null,
          totalTransactions: 0,
          suspiciousTransactions: 0,
        });
        return { success: true };
      }),
      
    updateBlacklist: adminProcedure
      .input(z.object({
        address: z.string(),
        isBlacklisted: z.boolean(),
      }))
      .mutation(async ({ input }) => {
        await db.upsertAddress({
          address: input.address,
          network: "ethereum",
          isBlacklisted: input.isBlacklisted,
          riskScore: 100,
          label: null,
          totalTransactions: 0,
          suspiciousTransactions: 0,
        });
        return { success: true };
      }),
  }),

  // ========== ALERTS ==========
  alerts: router({
    list: protectedProcedure
      .input(z.object({
        limit: z.number().optional(),
        isRead: z.boolean().optional(),
        severity: z.enum(["low", "medium", "high", "critical"]).optional(),
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
    list: protectedProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(async ({ input }) => {
        return db.getReports(input.limit);
      }),
      
    generate: protectedProcedure
      .input(z.object({
        title: z.string(),
        type: z.enum(["daily", "weekly", "monthly", "custom"]),
        startDate: z.date(),
        endDate: z.date(),
      }))
      .mutation(async ({ input, ctx }) => {
        const stats = await db.getTransactionStats(input.startDate, input.endDate);
        const alerts = await db.getAlerts({ limit: 1000 });
        
        // Generate PDF report
        const pdfUrl = await generatePDFReport({
          title: input.title,
          startDate: input.startDate,
          endDate: input.endDate,
          totalTransactions: stats.total,
          suspiciousTransactions: stats.suspicious,
          alertsGenerated: alerts.length,
          avgRiskScore: stats.avgRiskScore,
        });
        
        const report = await db.insertReport({
          title: input.title,
          type: input.type,
          startDate: input.startDate,
          endDate: input.endDate,
          totalTransactions: stats.total,
          suspiciousTransactions: stats.suspicious,
          alertsGenerated: alerts.length,
          pdfUrl,
          generatedBy: ctx.user.id,
        });
        
        return report;
      }),
  }),

  // ========== ADMIN ==========
  admin: router({
    users: adminProcedure.query(async () => {
      const db_instance = await db.getDb();
      if (!db_instance) return [];
      const { users } = await import("../drizzle/schema");
      return db_instance.select().from(users);
    }),
    
    config: adminProcedure.query(async () => {
      const riskThreshold = await db.getConfig("risk_threshold");
      const alertEmail = await db.getConfig("alert_email");
      
      return {
        riskThreshold: riskThreshold?.value || "60",
        alertEmail: alertEmail?.value || "",
      };
    }),
    
    updateConfig: adminProcedure
      .input(z.object({
        key: z.string(),
        value: z.string(),
      }))
      .mutation(async ({ input }) => {
        await db.setConfig(input.key, input.value);
        return { success: true };
      }),
      
    seedData: adminProcedure
      .input(z.object({ count: z.number().optional() }))
      .mutation(async ({ input }) => {
        await generateSeedData(input.count || 50);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
