import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import { adminLoginSchema, updateStatusSchema } from '../schemas/contact.js';
import {
  getContactSubmissions,
  updateSubmissionStatus,
  deleteContactSubmission,
  getAdminUserByEmail,
  isPostgresConnected,
} from '../db/index.js';
import { config } from '../config.js';

export const adminRouter = Router();

// Rate limiter for admin login attempts (relaxed in development)
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: config.env === 'development' ? 100 : 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many login attempts. Please try again after 15 minutes.',
  },
});

interface AuthRequest extends Request {
  user?: { email: string; role: string };
}

// Authentication middleware
export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.admin_token || req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ success: false, error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { email: string; role: string };
    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Forbidden: Insufficient privileges' });
    }
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ success: false, error: 'Invalid or expired session token' });
  }
}

async function verifyPassword(inputPassword: string, storedHashOrPlain: string): Promise<boolean> {
  if (!storedHashOrPlain) return false;

  // Check bcrypt hash ($2a$, $2b$, $2y$)
  if (
    storedHashOrPlain.startsWith('$2a$') ||
    storedHashOrPlain.startsWith('$2b$') ||
    storedHashOrPlain.startsWith('$2y$')
  ) {
    try {
      const matches = await bcrypt.compare(inputPassword, storedHashOrPlain);
      if (matches) return true;
    } catch {
      // Fall through to plain text check
    }
  }

  // Plain text match (in case user configured plain text in .env)
  if (inputPassword === storedHashOrPlain) {
    return true;
  }

  // Default dev credentials fallback in development
  if (config.env === 'development' && inputPassword === 'Admin@1234') {
    return true;
  }

  return false;
}

// POST /api/admin/login
adminRouter.post('/login', loginRateLimiter, async (req: Request, res: Response) => {
  try {
    const parseResult = adminLoginSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ success: false, error: 'Invalid credentials format' });
    }

    const { email, password } = parseResult.data;
    const normalizedInputEmail = email.trim().toLowerCase();

    // 1. Check against .env configured admin emails
    const envAdminEmail = config.adminEmail.trim().toLowerCase();
    const envNotificationEmail = config.contactNotificationEmail
      ? config.contactNotificationEmail.trim().toLowerCase()
      : '';

    let authenticatedEmail: string | null = null;

    if (
      normalizedInputEmail === envAdminEmail ||
      (envNotificationEmail && normalizedInputEmail === envNotificationEmail)
    ) {
      const targetHashOrPassword = config.adminPassword || config.adminPasswordHash;
      const isPasswordValid = await verifyPassword(password, targetHashOrPassword);
      if (isPasswordValid) {
        authenticatedEmail = normalizedInputEmail;
      }
    }

    // 2. If not matched via .env, check database admin_users table in PostgreSQL
    if (!authenticatedEmail) {
      const dbAdmin = await getAdminUserByEmail(normalizedInputEmail);
      if (dbAdmin) {
        const isDbPasswordValid = await verifyPassword(password, dbAdmin.password_hash);
        if (isDbPasswordValid) {
          authenticatedEmail = dbAdmin.email;
        }
      }
    }

    if (!authenticatedEmail) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password. Please verify your admin credentials.',
      });
    }

    const token = jwt.sign(
      { email: authenticatedEmail, role: 'admin' },
      config.jwtSecret,
      { expiresIn: '8h' }
    );

    // Set HTTP-only cookie
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: config.env === 'production',
      sameSite: config.env === 'production' ? 'strict' : 'lax',
      maxAge: 8 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: 'Authentication successful',
      token,
      databaseConnected: isPostgresConnected(),
      user: {
        email: authenticatedEmail,
        role: 'admin',
      },
    });
  } catch (error) {
    console.error('Admin login error:', (error as Error).message);
    return res.status(500).json({ success: false, error: 'Authentication processing failed' });
  }
});

// POST /api/admin/logout
adminRouter.post('/logout', (_req: Request, res: Response) => {
  res.clearCookie('admin_token', {
    httpOnly: true,
    secure: config.env === 'production',
    sameSite: config.env === 'production' ? 'strict' : 'lax',
  });
  return res.status(200).json({ success: true, message: 'Successfully logged out' });
});

// GET /api/admin/me
adminRouter.get('/me', requireAdmin, (req: AuthRequest, res: Response) => {
  return res.status(200).json({
    success: true,
    user: req.user,
    databaseConnected: isPostgresConnected(),
  });
});

// GET /api/admin/submissions
adminRouter.get('/submissions', requireAdmin, async (req: Request, res: Response) => {
  try {
    const status = req.query.status as string | undefined;
    const limit = parseInt(req.query.limit as string || '50', 10);
    const offset = parseInt(req.query.offset as string || '0', 10);

    const result = await getContactSubmissions({ status, limit, offset });
    return res.status(200).json({
      success: true,
      data: result.submissions,
      total: result.total,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error fetching submissions:', (error as Error).message);
    return res.status(500).json({ success: false, error: 'Failed to retrieve contact submissions' });
  }
});

// PATCH /api/admin/submissions/:id
adminRouter.patch('/submissions/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parseResult = updateStatusSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status update request',
      });
    }

    const updated = await updateSubmissionStatus(id, parseResult.data.status);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Submission not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      data: updated,
    });
  } catch (error) {
    console.error('Error updating submission:', (error as Error).message);
    return res.status(500).json({ success: false, error: 'Failed to update submission' });
  }
});

// DELETE /api/admin/submissions/:id
adminRouter.delete('/submissions/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await deleteContactSubmission(id);

    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Submission not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Submission successfully deleted',
    });
  } catch (error) {
    console.error('Error deleting submission:', (error as Error).message);
    return res.status(500).json({ success: false, error: 'Failed to delete submission' });
  }
});
