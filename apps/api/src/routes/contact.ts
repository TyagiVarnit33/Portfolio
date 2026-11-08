
import { Router, type Request, type Response } from 'express';
import rateLimit from 'express-rate-limit';
import { Resend } from 'resend';
import { contactSchema } from '../schemas/contact.js';
import { saveContactSubmission } from '../db/index.js';

export const contactRouter = Router();

// Limit contact form submissions to 5 requests per IP every 15 minutes.
const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many messages sent from this IP. Please wait 15 minutes before trying again.',
  },
});

contactRouter.post(
  '/',
  contactRateLimiter,
  async (req: Request, res: Response) => {
    try {
      // Validate submitted form data.
      const parseResult = contactSchema.safeParse(req.body);

      if (!parseResult.success) {
        const formattedErrors = parseResult.error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: formattedErrors,
        });
      }

      // Save the submission first. Do not send email before saving.
      const submission = await saveContactSubmission(parseResult.data);

      // Email notification is optional. Database storage remains successful
      // even if the email provider is unavailable.
      const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
      const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL;

      if (apiKey && notificationEmail) {
        try {
          const resend = new Resend(apiKey);

          const { error } = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: [notificationEmail],
            subject: `New portfolio message: ${submission.subject || 'No subject'}`,
            text: [
              'You received a new message through your portfolio.',
              '',
              `Name: ${submission.name}`,
              `Email: ${submission.email}`,
              `Subject: ${submission.subject || 'Not provided'}`,
              `Service: ${submission.service_type || 'Not specified'}`,
              `Budget: ${submission.budget_range || 'Not specified'}`,
              `Deadline: ${submission.project_deadline || 'Not specified'}`,
              '',
              'Message:',
              submission.message,
              '',
              `Submission ID: ${submission.id}`,
            ].join('\n'),
            replyTo: submission.email,
          });

          if (error) {
            console.error('Contact notification email failed:', error.message);
          } else {
            console.log('Contact notification email sent.');
          }
        } catch (emailError) {
          // Log the email failure without losing the saved contact submission.
          console.error(
            'Contact notification email failed:',
            emailError instanceof Error ? emailError.message : 'Unknown email error',
          );
        }
      } else {
        console.warn(
          'Email notification skipped: EMAIL_PROVIDER_API_KEY or CONTACT_NOTIFICATION_EMAIL is missing.',
        );
      }

      return res.status(201).json({
        success: true,
        message:
          'Thank you for reaching out! Your message has been recorded and I will get back to you soon.',
        data: {
          id: submission.id,
          created_at: submission.created_at,
        },
      });
    } catch (error) {
      console.error(
        'Error handling contact submission:',
        error instanceof Error ? error.message : 'Unknown error',
      );

      return res.status(500).json({
        success: false,
        error:
          'An unexpected error occurred while processing your message. Please try again later.',
      });
    }
  },
);
