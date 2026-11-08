import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../app.js';
import { initDb } from '../db/index.js';

describe('Portfolio API Integration Tests', () => {
  const app = createApp();

  beforeAll(async () => {
    await initDb();
  });

  describe('GET /api/health', () => {
    it('should return 200 and healthy status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.service).toContain('Varnit Tyagi Portfolio');
    });
  });

  describe('POST /api/contact', () => {
    it('should successfully submit a valid contact inquiry', async () => {
      const payload = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        subject: 'Frontend Project Collaboration',
        service_type: 'Responsive Website Development',
        budget_range: '$1,000 - $3,000',
        message: 'Hello Varnit, I would love to collaborate on a new responsive web application project.',
      };

      const res = await request(app).post('/api/contact').send(payload);
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBeDefined();
    });

    it('should reject missing required fields', async () => {
      const res = await request(app).post('/api/contact').send({});
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe('Validation failed');
      expect(res.body.details).toBeInstanceOf(Array);
    });

    it('should reject invalid email format', async () => {
      const payload = {
        name: 'Jane Doe',
        email: 'not-an-email',
        message: 'This is a message with sufficient characters.',
      };

      const res = await request(app).post('/api/contact').send(payload);
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should reject too short messages (< 10 chars)', async () => {
      const payload = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        message: 'Hi',
      };

      const res = await request(app).post('/api/contact').send(payload);
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('Admin Endpoints Authentication & Access Control', () => {
    it('should reject unauthenticated access to /api/admin/submissions', async () => {
      const res = await request(app).get('/api/admin/submissions');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should fail login with wrong credentials', async () => {
      const res = await request(app).post('/api/admin/login').send({
        email: 'admin@varnittyagi.dev',
        password: 'IncorrectPassword',
      });
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should authenticate admin and allow access with valid token', async () => {
      // Default dev credentials
      const loginRes = await request(app).post('/api/admin/login').send({
        email: 'admin@varnittyagi.dev',
        password: 'Admin@1234',
      });

      expect(loginRes.status).toBe(200);
      expect(loginRes.body.success).toBe(true);
      expect(loginRes.body.token).toBeDefined();

      const token = loginRes.body.token;

      // Access protected endpoint with token
      const submissionsRes = await request(app)
        .get('/api/admin/submissions')
        .set('Authorization', `Bearer ${token}`);

      expect(submissionsRes.status).toBe(200);
      expect(submissionsRes.body.success).toBe(true);
      expect(Array.isArray(submissionsRes.body.data)).toBe(true);
    });
  });
});
