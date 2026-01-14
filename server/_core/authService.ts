
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { parse as parseCookieHeader } from 'cookie';
import type { Request } from 'express';
import * as db from '../db';
import type { User } from '../../drizzle/schema';
import { COOKIE_NAME } from '@shared/const';
import { ENV } from './env';

export interface SessionPayload {
  userId: number;
}

export class AuthService {
  private getSessionSecret(): string {
    if (!ENV.jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    return ENV.jwtSecret;
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async createSessionToken(payload: SessionPayload): Promise<string> {
    const secret = this.getSessionSecret();
    return jwt.sign(payload, secret, { expiresIn: '7d' });
  }

  async verifySession(token: string): Promise<SessionPayload | null> {
    try {
      const secret = this.getSessionSecret();
      const payload = jwt.verify(token, secret) as SessionPayload;
      return payload;
    } catch (error) {
      console.warn('[Auth] Session verification failed', String(error));
      return null;
    }
  }

  private parseCookies(req: Request): Map<string, string | undefined> {
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) {
      return new Map();
    }
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }

  async authenticateRequest(req: Request): Promise<User | null> {
    const cookies = this.parseCookies(req);
    const sessionCookie = cookies.get(COOKIE_NAME);

    if (!sessionCookie) {
      return null;
    }

    const session = await this.verifySession(sessionCookie);

    if (!session || !session.userId) {
      return null;
    }

    const user = await db.getUserById(session.userId);

    if (user) {
        await db.updateUserLastSignedIn(user.id);
        return user;
    }

    return null;
  }
}
