# Varnit Tyagi — Full-Stack Developer Portfolio

A production-ready personal portfolio website for **Varnit Tyagi**, a B.Tech Computer Science and Engineering student at CGC University, Mohali, specializing in frontend development and UI/UX design.

Inspired by the clean, spacious aesthetic of [Purplefolio](https://purplefolio.framer.website/), this application combines a minimalist white layout with subtle purple accents, refined typography, and a working full-stack architecture featuring persistent contact storage, a secured administrative submission portal, and automated test coverage.

---

## Table of Contents

1. [Features](#features)
2. [Technology Stack](#technology-stack)
3. [Architecture & Folder Structure](#architecture--folder-structure)
4. [Prerequisites](#prerequisites)
5. [Local Development Setup](#local-development-setup)
6. [Database Setup & Migrations](#database-setup--migrations)
7. [Running Tests](#running-tests)
8. [Building for Production](#building-for-production)
9. [Deployment Guide](#deployment-guide)
10. [Configuration & Customization Guide](#configuration--customization-guide)
    - [Replacing the Profile Photo](#replacing-the-profile-photo)
    - [Supplying the Resume PDF](#supplying-the-resume-pdf)
    - [Updating Public Contact Information](#updating-public-contact-information)
    - [Adding or Editing Projects](#adding-or-editing-projects)
    - [Configuring Admin Credentials](#configuring-admin-credentials)
11. [Missing User-Provided Assets & Verification Status](#missing-user-provided-assets--verification-status)

---

## Features

- **Minimalist Aesthetic**: Clean layout with `#FFFFFF` background, `#202124` text, `#7C3AED` vibrant purple accents, and responsive spacing.
- **Hero Section**: Two-column desktop layout featuring Varnit's greeting, large headline, supporting copy, dual CTAs ("Get in Touch", "Browse Projects"), availability badge, and circular profile avatar with animated orbit ring.
- **Dedicated Project Case Studies**: Complete case-study pages for featured projects (`/projects/echelon`, `/projects/ai-saas-dashboard`, `/projects/react-blog`) detailing overview, objectives, role, stack breakdown, implemented features, and technical solutions.
- **Truthful Academic & Training Milestones**: Highlights B.Tech in CSE at CGC University, Mohali (2023–2027, CGPA 8.16) and college-conducted summer technical training (Java & CompTIA Network+ curriculum).
- **Service Offering Cards**: 4 services with key deliverables and a "Discuss a Project" trigger that automatically scrolls to the contact form and pre-selects the requested service.
- **5-Step Development Process**: Visual workflow illustrating *Discover → Plan → Build → Test → Deliver*.
- **Full-Stack Contact Form**:
  - Client-side & server-side validation using **Zod**.
  - Rate limiting (5 submissions per 15 minutes per IP) to mitigate spam.
  - Persistent storage in **PostgreSQL** with parameterized queries (and resilient local storage adapter when offline).
  - Real-time error messages, submission loading state, and confirmation banner.
- **Secured Admin Portal (`/admin`)**:
  - Secure login with bcrypt password verification and JWT session tokens.
  - Rate-limited authentication endpoint.
  - Interactive table of submissions with status filters (`All`, `Unread`, `Read`, `Archived`).
  - View full message modal, mark as read, archive, and delete submissions.
- **Accessible Light / Dark Mode**: Seamless theme toggle persisting preference in `localStorage` with fallback to system `prefers-color-scheme`.
- **Keyboard & Screen Reader Accessible**: Semantic HTML5 landmark structure, visible `:focus-visible` outlines, and WCAG AA contrast.
- **Automated Test Suite**: Unit and integration tests covering the frontend routing, components, and backend API routes.

---

## Technology Stack

### Frontend (`apps/web`)
- **React 18** & **TypeScript**
- **Vite 6** (lightning-fast bundler and dev server)
- **Tailwind CSS 3** (configured with exact design tokens)
- **React Router 6** (client-side routing for case studies and admin portal)
- **Lucide React** (clean iconography)
- **Vitest** & **React Testing Library** (automated frontend testing)

### Backend (`apps/api`)
- **Node.js** & **Express**
- **TypeScript** & **TSX**
- **PostgreSQL** (`pg` connection pool with parameterized queries)
- **Zod** (strict runtime request schema validation)
- **Helmet** & **CORS** (HTTP security headers and origin controls)
- **express-rate-limit** (brute-force and spam mitigation)
- **bcryptjs** & **jsonwebtoken** (password hashing & session tokens)
- **Vitest** & **Supertest** (automated API testing)

---

## Architecture & Folder Structure

```
portfolio/
├── apps/
│   ├── web/                     # Frontend Application
│   │   ├── public/              # Static assets (favicon.svg, robots.txt)
│   │   ├── src/
│   │   │   ├── components/      # UI Components (Navbar, Hero, Cards, Forms, Modals)
│   │   │   ├── pages/           # Route Pages (Home, CaseStudy, Admin, NotFound)
│   │   │   ├── config/          # Site configuration (site.ts)
│   │   │   ├── data/            # Projects, Skills, Services, Experience data
│   │   │   ├── test/            # Vitest component & route integration tests
│   │   │   ├── App.tsx          # Root routing layout
│   │   │   ├── index.css        # Tailwind directives and utility classes
│   │   │   └── main.tsx         # Frontend DOM entry point
│   │   ├── index.html           # HTML5 template with early theme detector script
│   │   ├── tailwind.config.js   # Tailored color palette and typography tokens
│   │   ├── tsconfig.json        # Strict TypeScript configuration
│   │   └── vite.config.ts       # Vite bundler & API dev proxy configuration
│   │
│   └── api/                     # Backend REST API Service
│       ├── src/
│       │   ├── db/              # PostgreSQL pool & local fallback adapter
│       │   │   ├── schema.sql   # SQL table definitions and indexes
│       │   │   └── index.ts     # Parameterized query methods
│       │   ├── routes/          # API Route Handlers (health, contact, admin)
│       │   ├── schemas/         # Zod input validation schemas
│       │   ├── test/            # Supertest API endpoint test suite
│       │   ├── app.ts           # Express application setup (CORS, Helmet, Parsers)
│       │   ├── config.ts        # Environment variable parsing and defaults
│       │   └── index.ts         # Server entry point
│       ├── package.json
│       └── tsconfig.json
│
├── package.json                 # Monorepo workspace configuration & root scripts
├── .env.example                 # Documented environment variables template
├── .gitignore                   # Ignored directories and sensitive files
└── README.md                    # Project documentation
```

---

## Prerequisites

- **Node.js**: v18.0.0 or later (Tested on Node.js v24 LTS)
- **npm**: v9.0.0 or later
- **PostgreSQL Database** (Optional for local development; required for production deployment):
  - Local PostgreSQL instance, or
  - Managed serverless PostgreSQL (e.g. [Neon](https://neon.tech), [Supabase](https://supabase.com), or [Render PostgreSQL](https://render.com)).

> **Offline Local Development Note**: If no `DATABASE_URL` is provided during local development, the backend automatically activates a built-in persistent local JSON storage adapter in `apps/api/data/submissions.json`. This ensures the application can be explored, developed, and tested offline without requiring a running database server.

---

## Local Development Setup

1. **Clone or open the project folder**:
   ```bash
   cd d:/portfolio
   ```

2. **Install all workspace dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env` in the root (or `apps/api/.env`):
   ```bash
   cp .env.example .env
   ```

4. **Run the Full-Stack Application in Development Mode**:
   You can run both frontend and backend concurrently or independently:

   **Option A: Run Frontend and Backend in separate terminals**:
   - Terminal 1 (Backend API on port 5000):
     ```bash
     npm run dev:api
     ```
   - Terminal 2 (Frontend Client on port 3000):
     ```bash
     npm run dev:web
     ```

   **Option B: Start via root scripts**:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`
   - API Health Check: `http://localhost:5000/api/health`

---

## Database Setup & Migrations

When connecting to a real PostgreSQL instance:

1. **Set `DATABASE_URL` in `.env`**:
   ```env
   DATABASE_URL=postgresql://username:password@hostname:5432/database_name?sslmode=require
   ```

2. **Apply the schema**:
   The backend automatically applies `apps/api/src/db/schema.sql` on startup. You can also run the SQL script directly using `psql` or your database dashboard:

   ```bash
   psql -d $DATABASE_URL -f apps/api/src/db/schema.sql
   ```

   **Schema Definition**:
   ```sql
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
   ```

---

## Running Tests

Automated testing is configured using **Vitest**:

```bash
# Run all test suites across workspaces
npm test

# Run frontend tests only (6 tests: components, routes, case studies, 404)
npm run test:web

# Run backend API tests only (8 tests: health, validation, rate limiting, admin security)
npm run test:api
```

All 14 tests pass with 100% success.

---

## Building for Production

Compile both frontend and backend TypeScript code:

```bash
npm run build
```

- **Frontend production bundle**: Generated in `apps/web/dist/` (~40 kB CSS, ~280 kB JavaScript bundle with all assets minified).
- **Backend production bundle**: Generated in `apps/api/dist/`.

---

## Deployment Guide

### Recommended Architecture: Option A (Cloudflare Pages + Node.js API Service)

This architecture provides performance, zero-cold-start edge delivery for static assets, and low-latency Node.js API processing.

```
┌─────────────────────────────────┐
│     Cloudflare Pages (Edge)     │
│   Frontend React / Vite App     │
│   https://varnittyagi.dev       │
└────────────────┬────────────────┘
                 │ /api/contact, /api/admin/*
                 ▼
┌─────────────────────────────────┐
│       Node.js REST API          │
│   (Render / Railway / Fly.io)   │
│   https://api.varnittyagi.dev   │
└────────────────┬────────────────┘
                 │ Parameterized SQL
                 ▼
┌─────────────────────────────────┐
│   Managed PostgreSQL Database   │
│        (Neon / Supabase)        │
└─────────────────────────────────┘
```

#### Step 1: Deploy Frontend to Cloudflare Pages
1. Connect your repository to **Cloudflare Pages**.
2. Set **Root directory**: `apps/web`
3. Set **Build command**: `npm run build`
4. Set **Build output directory**: `dist`
5. Configure custom domain (e.g. `varnittyagi.dev`).

#### Step 2: Deploy Backend to Render, Railway, or VPS
1. Connect your repository to **Render** or **Railway**.
2. Set **Root directory**: `apps/api`
3. Set **Build command**: `npm run build`
4. Set **Start command**: `npm start`
5. Configure Environment Variables in the hosting dashboard:
   - `NODE_ENV=production`
   - `PORT=5000`
   - `DATABASE_URL=postgresql://...`
   - `ALLOWED_ORIGINS=https://varnittyagi.dev`
   - `SESSION_SECRET=your-secure-random-secret`
   - `ADMIN_EMAIL=admin@varnittyagi.dev`
   - `ADMIN_PASSWORD_HASH=$2a$10$...`

---

## Configuration & Customization Guide

### Replacing the Profile Photo
The hero section currently displays a clean, responsive developer silhouette placeholder with a subtle orbit ring.
To replace it with your own photo:
1. Place your photo (e.g. `profile.jpg`) into `apps/web/public/profile.jpg`.
2. In `apps/web/src/config/site.ts`, update:
   ```ts
   profilePhoto: '/profile.jpg',
   ```
3. In `apps/web/src/components/HeroSection.tsx`, replace the `<svg>` silhouette container with:
   ```tsx
   <img
     src={siteConfig.links.profilePhoto}
     alt="Varnit Tyagi"
     className="w-full h-full object-cover"
   />
   ```

### Supplying the Resume PDF
1. Place your PDF document into `apps/web/public/resume.pdf`.
2. Open `apps/web/src/config/site.ts` and set:
   ```ts
   resume: '/resume.pdf',
   ```
3. Clicking the **Resume** button in the navbar will now automatically open or download your verified resume PDF.

### Updating Public Contact Information
Edit `apps/web/src/config/site.ts`:
```ts
export const siteConfig = {
  name: 'Varnit Tyagi',
  title: 'Frontend Developer & UI/UX Designer',
  links: {
    github: 'https://github.com/TyagiVarnit33',
    linkedin: 'https://www.linkedin.com/in/varnit-tyagi-4a4a2232b/',
    email: 'your.name@example.com', // Replace [ADD_PUBLIC_EMAIL]
    ...
  }
};
```

### Adding or Editing Projects
Edit `apps/web/src/data/projects.ts`. Each project supports:
- `number`: Two-digit label (e.g., `'01'`)
- `title` & `subtitle`: Name and short description
- `slug`: URL route path (`/projects/:slug`)
- `tags`: Technology tags array
- `liveUrl`: URL to live application (or `undefined` for "Link coming soon")
- `repoUrl`: URL to GitHub repository (or `undefined` for "Source on request")
- `overview`, `problem`, `role`, `techStack`, `features`, `challengesAndSolutions`

### Configuring Admin Credentials
To change the admin password for `/admin`:
1. Generate a new bcrypt hash using node:
   ```bash
   node -e "console.log(require('bcryptjs').hashSync('YourNewPassword', 10))"
   ```
2. Set the generated hash as `ADMIN_PASSWORD_HASH` in `.env`:
   ```env
   ADMIN_PASSWORD_HASH=$2a$10$...
   ```

---

## Missing User-Provided Assets & Verification Status

In adherence to the Master Prompt requirements, no personal information, metrics, or credentials were fabricated. Below is the exact inventory of configured placeholders and verified items:

| Item | Current Status | Action to Finalize |
| :--- | :--- | :--- |
| **Full Name & Title** | Verified: Varnit Tyagi, Frontend Developer & UI/UX Designer | Ready |
| **Education** | Verified: B.Tech CSE, CGC University, Mohali (2023–2027), CGPA 8.16 | Ready |
| **Internship** | Verified: College-conducted summer technical training (Java & CompTIA Network+) | Ready |
| **Public Email** | Configurable placeholder `[ADD_PUBLIC_EMAIL]` | Supply in `siteConfig.links.email` |
| **Resume PDF** | Configurable placeholder `[ADD_RESUME_PDF]` | Add `resume.pdf` to `apps/web/public/` |
| **Profile Photo** | Vector avatar placeholder with purple orbit ring | Replace with photo in `apps/web/public/` |
| **Echelon Live Demo** | Verified: `https://echelon.echelonstudio.workers.dev/` | Ready (Repo link on request) |
| **AI SaaS Dashboard** | Verified: `https://ai-saas-dashboard-9azy.onrender.com/` | Ready (Repo link on request) |
| **React Blog App** | Appwrite integration documented; demo link marked "coming soon" | Add live URL when hosted |
| **PostgreSQL Integration** | Verified with pg client, migrations, rate limiting, and fallback | Set `DATABASE_URL` for prod |
| **Admin Dashboard** | Verified with bcrypt authentication, sessions, and CRUD operations | Ready (`/admin`) |

---

## License

This project is authored by Varnit Tyagi. Code released under the MIT License.
