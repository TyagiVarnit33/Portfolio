import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email('Please enter a valid email address')
    .max(255, 'Email must not exceed 255 characters'),
  subject: z
    .string()
    .trim()
    .max(150, 'Subject must not exceed 150 characters')
    .optional()
    .nullable(),
  message: z
    .string({ required_error: 'Message is required' })
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(3000, 'Message must not exceed 3000 characters'),
  service_type: z
    .string()
    .trim()
    .max(100, 'Service type must not exceed 100 characters')
    .optional()
    .nullable(),
  budget_range: z
    .string()
    .trim()
    .max(100, 'Budget range must not exceed 100 characters')
    .optional()
    .nullable(),
  project_deadline: z
    .string()
    .trim()
    .optional()
    .nullable()
    .refine((val) => {
      if (!val) return true;
      const date = new Date(val);
      return !isNaN(date.getTime());
    }, 'Project deadline must be a valid date'),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const adminLoginSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const updateStatusSchema = z.object({
  status: z.enum(['unread', 'read', 'archived'], {
    required_error: 'Status must be one of: unread, read, archived',
  }),
});
