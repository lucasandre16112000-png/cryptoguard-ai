import { eq, desc, and, gte, lte, sql, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users, 
  addresses, InsertAddress,
  transactions, InsertTransaction,
  alerts, InsertAlert,
  reports, InsertReport,
  systemConfig, InsertSystemConfig
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && ENV.databaseUrl) {
    try {
      _db = drizzle(ENV.databaseUrl);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ========== USER OPERATIONS ==========

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ========== ADDRESS OPERATIONS ==========

export async function upsertAddress(address: InsertAddress) {
  const db = await getDb();
  if (!db) return null;
  
  const existing = await db.select().from(addresses).where(eq(addresses.address, address.address)).limit(1);
  
  if (existing.length > 0) {
    await db.update(addresses)
      .set({
        ...address,
        updatedAt: new Date(),
        lastSeen: new Date(),
      })
      .where(eq(addresses.address, address.address));
    return existing[0];
  } else {
    const result = await db.insert(addresses).values(address);
    return { id: Number(result[0].insertId), ...address };
  }
}

export async function getAddressByAddress(addr: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(addresses).where(eq(addresses.address, addr)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getAllAddresses(limit = 100) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(addresses).orderBy(desc(addresses.riskScore)).limit(limit);
}

export async function updateAddressRiskScore(addressId: number, riskScore: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(addresses).set({ riskScore, updatedAt: new Date() }).where(eq(addresses.id, addressId));
}

// ========== TRANSACTION OPERATIONS ==========

export async function insertTransaction(tx: InsertTransaction) {
  const db = await getDb();
  if (!db) return null;
  
  try {
    const result = await db.insert(transactions).values(tx);
    return { id: Number(result[0].insertId), ...tx };
  } catch (error) {
    // Ignore duplicate key errors
    return null;
  }
}

export async function getTransactions(filters: {
  limit?: number;
  network?: string;
  isSuspicious?: boolean;
  minRiskScore?: number;
  startDate?: Date;
  endDate?: Date;
}) {
  const db = await getDb();
  if (!db) return [];
  
  const conditions = [];
  
  if (filters.network) {
    conditions.push(eq(transactions.network, filters.network as any));
  }
  if (filters.isSuspicious !== undefined) {
    conditions.push(eq(transactions.isSuspicious, filters.isSuspicious));
  }
  if (filters.minRiskScore !== undefined) {
    conditions.push(gte(transactions.riskScore, filters.minRiskScore));
  }
  if (filters.startDate) {
    conditions.push(gte(transactions.timestamp, filters.startDate));
  }
  if (filters.endDate) {
    conditions.push(lte(transactions.timestamp, filters.endDate));
  }
  
  let query = db.select().from(transactions);
  
  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as any;
  }
  
  return query.orderBy(desc(transactions.timestamp)).limit(filters.limit || 100);
}

export async function getTransactionStats(startDate?: Date, endDate?: Date) {
  const db = await getDb();
  if (!db) return { total: 0, suspicious: 0, avgRiskScore: 0 };
  
  const conditions = [];
  if (startDate) conditions.push(gte(transactions.timestamp, startDate));
  if (endDate) conditions.push(lte(transactions.timestamp, endDate));
  
  const result = await db.select({
    total: sql<number>`COUNT(*)`,
    suspicious: sql<number>`SUM(CASE WHEN ${transactions.isSuspicious} = 1 THEN 1 ELSE 0 END)`,
    avgRiskScore: sql<number>`AVG(${transactions.riskScore})`,
  }).from(transactions).where(conditions.length > 0 ? and(...conditions) : undefined);
  
  return result[0] || { total: 0, suspicious: 0, avgRiskScore: 0 };
}

// ========== ALERT OPERATIONS ==========

export async function insertAlert(alert: InsertAlert) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(alerts).values(alert);
  return { id: Number(result[0].insertId), ...alert };
}

export async function getAlerts(filters: { limit?: number; isRead?: boolean; severity?: string }) {
  const db = await getDb();
  if (!db) return [];
  
  const conditions = [];
  if (filters.isRead !== undefined) {
    conditions.push(eq(alerts.isRead, filters.isRead));
  }
  if (filters.severity) {
    conditions.push(eq(alerts.severity, filters.severity as any));
  }
  
  let query = db.select().from(alerts);
  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as any;
  }
  
  return query.orderBy(desc(alerts.createdAt)).limit(filters.limit || 50);
}

export async function markAlertAsRead(alertId: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(alerts).set({ isRead: true }).where(eq(alerts.id, alertId));
}

export async function resolveAlert(alertId: number, userId: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(alerts).set({ 
    isResolved: true, 
    resolvedBy: userId, 
    resolvedAt: new Date() 
  }).where(eq(alerts.id, alertId));
}

// ========== REPORT OPERATIONS ==========

export async function insertReport(report: InsertReport) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(reports).values(report);
  return { id: Number(result[0].insertId), ...report };
}

export async function getReports(limit = 20) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(reports).orderBy(desc(reports.createdAt)).limit(limit);
}

// ========== CONFIG OPERATIONS ==========

export async function getConfig(key: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(systemConfig).where(eq(systemConfig.key, key)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function setConfig(key: string, value: string, description?: string) {
  const db = await getDb();
  if (!db) return;
  
  const existing = await getConfig(key);
  if (existing) {
    await db.update(systemConfig).set({ value, description, updatedAt: new Date() }).where(eq(systemConfig.key, key));
  } else {
    await db.insert(systemConfig).values({ key, value, description });
  }
}
