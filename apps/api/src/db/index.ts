import pg from 'pg';
import fs from 'fs';
import path from 'node:path';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { config } from '../config.js';
import { fileURLToPath } from 'node:url';

const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFile);
const { Pool } = pg;

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  service_type?: string | null;
  budget_range?: string | null;
  project_deadline?: string | null;
  status: 'unread' | 'read' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  role: string;
  created_at: string;
}

let pool: pg.Pool | null = null;
let usePostgres = false;

// Fallback local storage directory for offline development when DATABASE_URL is not set
const localDbDir = path.resolve(process.cwd(), 'data');
const localDbFile = path.join(localDbDir, 'submissions.json');

function ensureLocalDbFile() {
  if (!fs.existsSync(localDbDir)) {
    fs.mkdirSync(localDbDir, { recursive: true });
  }
  if (!fs.existsSync(localDbFile)) {
    fs.writeFileSync(localDbFile, JSON.stringify([], null, 2), 'utf-8');
  }
}

const SCHEMA_SQL = `
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(150),
    message TEXT NOT NULL,
    service_type VARCHAR(100),
    budget_range VARCHAR(100),
    project_deadline DATE,
    status VARCHAR(50) DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);

CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
`;

export async function initDb(): Promise<void> {
  if (config.databaseUrl) {
    try {
      const isCloudOrSsl =
        config.databaseUrl.includes('neon.tech') ||
        config.databaseUrl.includes('sslmode=require') ||
        config.databaseUrl.includes('supabase') ||
        config.env === 'production';

      pool = new Pool({
        connectionString: config.databaseUrl,
        ssl: isCloudOrSsl ? { rejectUnauthorized: false } : undefined,
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
      });

      // Test connection
      const client = await pool.connect();
      console.log(' Successfully connected to PostgreSQL database (Neon / Cloud).');

      // Initialize schema (embedded to guarantee availability regardless of file paths)
      await client.query(SCHEMA_SQL);
      console.log(' PostgreSQL database schema initialized.');

      // Check and seed admin account if none exists
      const adminCountRes = await client.query('SELECT COUNT(*) FROM admin_users;');
      const adminCount = parseInt(adminCountRes.rows[0].count, 10);
      if (adminCount === 0) {
        const hashToInsert = config.adminPasswordHash.startsWith('$2')
          ? config.adminPasswordHash
          : await bcrypt.hash(config.adminPassword || 'Admin@1234', 10);

        await client.query(
          `INSERT INTO admin_users (email, password_hash, role) VALUES ($1, $2, 'admin') ON CONFLICT (email) DO NOTHING;`,
          [config.adminEmail.toLowerCase(), hashToInsert]
        );
        console.log(` Admin account seeded into database: ${config.adminEmail}`);

        if (
          config.contactNotificationEmail &&
          config.contactNotificationEmail.toLowerCase() !== config.adminEmail.toLowerCase()
        ) {
          await client.query(
            `INSERT INTO admin_users (email, password_hash, role) VALUES ($1, $2, 'admin') ON CONFLICT (email) DO NOTHING;`,
            [config.contactNotificationEmail.toLowerCase(), hashToInsert]
          );
          console.log(` Notification admin account seeded into database: ${config.contactNotificationEmail}`);
        }
      }

      client.release();
      usePostgres = true;
      return;
    } catch (err) {
      console.warn('⚠️ PostgreSQL connection failed, falling back to persistent local storage adapter:', (err as Error).message);
      usePostgres = false;
    }
  } else {
    console.log('ℹ️ No DATABASE_URL configured. Using persistent local file adapter for development.');
    usePostgres = false;
  }

  ensureLocalDbFile();
}

export async function getAdminUserByEmail(email: string): Promise<AdminUser | null> {
  if (usePostgres && pool) {
    try {
      const res = await pool.query(
        'SELECT * FROM admin_users WHERE LOWER(email) = LOWER($1) LIMIT 1;',
        [email.trim()]
      );
      return res.rows[0] || null;
    } catch (err) {
      console.warn('Error querying admin_users table:', (err as Error).message);
      return null;
    }
  }
  return null;
}

export async function saveContactSubmission(data: {
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  service_type?: string | null;
  budget_range?: string | null;
  project_deadline?: string | null;
}): Promise<ContactSubmission> {
  const now = new Date().toISOString();

  if (usePostgres && pool) {
    const query = `
      INSERT INTO contact_submissions 
      (name, email, subject, message, service_type, budget_range, project_deadline, status, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, 'unread', NOW(), NOW())
      RETURNING *;
    `;
    const values = [
      data.name,
      data.email,
      data.subject || null,
      data.message,
      data.service_type || null,
      data.budget_range || null,
      data.project_deadline || null,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Local fallback storage
  ensureLocalDbFile();
  const fileContent = fs.readFileSync(localDbFile, 'utf-8');
  const submissions: ContactSubmission[] = JSON.parse(fileContent);

  const newSubmission: ContactSubmission = {
    id: crypto.randomUUID(),
    name: data.name,
    email: data.email,
    subject: data.subject || null,
    message: data.message,
    service_type: data.service_type || null,
    budget_range: data.budget_range || null,
    project_deadline: data.project_deadline || null,
    status: 'unread',
    created_at: now,
    updated_at: now,
  };

  submissions.unshift(newSubmission);
  fs.writeFileSync(localDbFile, JSON.stringify(submissions, null, 2), 'utf-8');
  return newSubmission;
}

export async function getContactSubmissions(options: {
  status?: string;
  limit?: number;
  offset?: number;
} = {}): Promise<{ submissions: ContactSubmission[]; total: number }> {
  const limit = options.limit || 50;
  const offset = options.offset || 0;

  if (usePostgres && pool) {
    let countQuery = 'SELECT COUNT(*) FROM contact_submissions';
    let dataQuery = 'SELECT * FROM contact_submissions';
    const values: any[] = [];

    if (options.status && ['unread', 'read', 'archived'].includes(options.status)) {
      countQuery += ' WHERE status = $1';
      dataQuery += ' WHERE status = $1';
      values.push(options.status);
    }

    dataQuery += ` ORDER BY created_at DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;

    const countRes = await pool.query(countQuery, values);
    const dataRes = await pool.query(dataQuery, [...values, limit, offset]);

    return {
      submissions: dataRes.rows,
      total: parseInt(countRes.rows[0].count, 10),
    };
  }

  // Local fallback
  ensureLocalDbFile();
  const fileContent = fs.readFileSync(localDbFile, 'utf-8');
  let submissions: ContactSubmission[] = JSON.parse(fileContent);

  if (options.status && ['unread', 'read', 'archived'].includes(options.status)) {
    submissions = submissions.filter(s => s.status === options.status);
  }

  const total = submissions.length;
  const paginated = submissions.slice(offset, offset + limit);

  return {
    submissions: paginated,
    total,
  };
}

export async function updateSubmissionStatus(id: string, status: 'unread' | 'read' | 'archived'): Promise<ContactSubmission | null> {
  const now = new Date().toISOString();

  if (usePostgres && pool) {
    const query = `
      UPDATE contact_submissions
      SET status = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *;
    `;
    const res = await pool.query(query, [status, id]);
    return res.rows[0] || null;
  }

  // Local fallback
  ensureLocalDbFile();
  const fileContent = fs.readFileSync(localDbFile, 'utf-8');
  const submissions: ContactSubmission[] = JSON.parse(fileContent);

  const index = submissions.findIndex(s => s.id === id);
  if (index === -1) return null;

  submissions[index].status = status;
  submissions[index].updated_at = now;

  fs.writeFileSync(localDbFile, JSON.stringify(submissions, null, 2), 'utf-8');
  return submissions[index];
}

export async function deleteContactSubmission(id: string): Promise<boolean> {
  if (usePostgres && pool) {
    const query = 'DELETE FROM contact_submissions WHERE id = $1;';
    const res = await pool.query(query, [id]);
    return (res.rowCount ?? 0) > 0;
  }

  // Local fallback
  ensureLocalDbFile();
  const fileContent = fs.readFileSync(localDbFile, 'utf-8');
  const submissions: ContactSubmission[] = JSON.parse(fileContent);

  const initialLength = submissions.length;
  const filtered = submissions.filter(s => s.id !== id);

  if (filtered.length !== initialLength) {
    fs.writeFileSync(localDbFile, JSON.stringify(filtered, null, 2), 'utf-8');
    return true;
  }
  return false;
}

export function isPostgresConnected(): boolean {
  return usePostgres;
}

export async function closeDb(): Promise<void> {
  if (pool) {
    await pool.end();
  }
}
