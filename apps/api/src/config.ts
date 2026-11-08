import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFile);

// Project structure: portfolio/apps/api/src/config.ts
// Root environment file: portfolio/.env
const envPath = path.resolve(currentDirectory, '../../../.env');

dotenv.config({ path: envPath });

const portValue = Number.parseInt(process.env.PORT || '5000', 10);

if (!Number.isInteger(portValue) || portValue < 1 || portValue > 65535) {
  throw new Error('PORT must be a valid port number between 1 and 65535.');
}

export const config = {
  env: process.env.NODE_ENV || 'development',

  port: portValue,

  databaseUrl: process.env.DATABASE_URL || '',

  allowedOrigins: (
    process.env.ALLOWED_ORIGINS ||
    'http://localhost:3000,http://127.0.0.1:3000'
  )
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),

  jwtSecret:
    process.env.SESSION_SECRET ||
    (process.env.NODE_ENV === 'production'
      ? ''
      : 'dev-secret-varnit-portfolio-2026-secure-key'),

  adminEmail: process.env.ADMIN_EMAIL || 'admin@varnittyagi.dev',

  adminPassword: process.env.ADMIN_PASSWORD || '',

  adminPasswordHash:
    process.env.ADMIN_PASSWORD_HASH ||
    '$2a$10$e7yPSc9NwQcNtrz6K.UAOeH9C4t1ulkoINSrjP1/cP6A4YmOdRegy',

  emailProviderApiKey: process.env.EMAIL_PROVIDER_API_KEY || '',

  contactNotificationEmail:
    process.env.CONTACT_NOTIFICATION_EMAIL || '',
};

// Avoid silently using the development JWT secret in production.
if (config.env === 'production' && !config.jwtSecret) {
  throw new Error(
    'SESSION_SECRET must be configured in production.'
  );
}
