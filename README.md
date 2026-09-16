# 🏫 School Management System | نظام إدارة مدرسي متكامل

A full-stack school management platform for **Kafr Aqab Mixed Basic School** — a public-facing bilingual (Arabic/English) site plus a role-based dashboard for admins and teachers to manage classes, schedules, grades, attendance and files.

منصّة متكاملة لإدارة المدرسة — موقع عام ثنائي اللغة (عربي/إنجليزي) بالإضافة إلى لوحة تحكم لكل من الإدارة والمعلمين لإدارة الصفوف والجداول والدرجات والحضور والملفات.

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" />
  <img alt="React" src="https://img.shields.io/badge/React-19-blue?logo=react" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" />
  <img alt="Express" src="https://img.shields.io/badge/Express-4-black?logo=express" />
  <img alt="Prisma" src="https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-Neon-336791?logo=postgresql" />
  <img alt="Deployed on Vercel" src="https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel" />
</p>

## 🔗 Live

| | URL |
|---|---|
| 🌐 Website (Frontend) | https://kafraqab-school.vercel.app |
| 🔌 API (Backend) | https://scool-backend.vercel.app |

Pushing to `main` auto-deploys both projects via Vercel's GitHub integration.

## ✨ Features

- **Bilingual public site** (Arabic / English toggle) — browse grades, semesters, subjects, weekly schedules and study files without logging in.
- **Role-based dashboards** — separate experiences for **admins** and **teachers**.
- **Class & schedule management** — weekly timetables per class and semester.
- **Grades & attendance tracking** for students, per subject and semester.
- **File library** — teachers upload subject files (PDFs, images, links) that students can browse publicly.
- **QR code access** — signed QR tokens for quick, scoped access to a grade's content.
- **Analytics dashboard** for admins.
- **JWT authentication** with access/refresh tokens.
- **Light/dark theme** and a configurable accent color for the admin dashboard.

## 🗂️ Repository Structure

```text
scool/
├── frontend/   → Next.js 16 (React 19 + TypeScript) web app
│   ├── app/            # App Router pages (public site, login, dashboard, teacher portal)
│   ├── components/     # Shared UI + feature components
│   └── lib/             # API hooks, contexts (auth, theme, i18n), utilities
│
├── backend/    → Node.js + Express + Prisma REST API
│   ├── src/
│   │   ├── routes/      # auth, classes, students, teachers, grades, attendance, files, schedule, qr, analytics
│   │   ├── controllers/ # request handlers
│   │   ├── services/    # business logic + storage providers (local/S3)
│   │   └── middleware/  # auth, error handling, logging
│   ├── prisma/          # Prisma schema & migrations
│   └── api/index.ts     # Vercel serverless entrypoint
│
└── README.md
```

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS |
| Backend API | Node.js, Express.js |
| ORM | Prisma Client |
| Database | PostgreSQL (Neon, serverless) |
| Auth | JSON Web Tokens (access + refresh) |
| Hosting | Vercel (frontend + backend, serverless functions) |

## 🚀 Getting Started

### 1. Prerequisites

- Node.js 20+
- A PostgreSQL database (e.g. [Neon](https://neon.tech), or local Postgres)

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env    # then fill in DATABASE_URL, JWT_SECRET, JWT_REFRESH_SECRET, ...
npm run prisma:generate
npx prisma db push
npm run dev              # http://localhost:3001
```

### 3. Frontend setup

```bash
cd frontend
npm install
cp .env.local.example .env.local   # then fill in NEXT_PUBLIC_API_URL, Supabase keys, ...
npm run dev               # http://localhost:3000
```

## ⚙️ Environment Variables

**`backend/.env`**

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` / `JWT_REFRESH_SECRET` | Secrets for signing access/refresh tokens (must be non-default, 16+ chars in production) |
| `JWT_EXPIRES_IN` / `JWT_REFRESH_EXPIRES_IN` | Token lifetimes (e.g. `15m`, `7d`) |
| `CORS_ORIGIN` | Allowed frontend origin |
| `STORAGE_PROVIDER` | `local` or `s3` for file uploads |

**`frontend/.env.local`**

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL (e.g. `http://localhost:3001/api`) |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project credentials |

> Neither `.env` file is committed — see `.gitignore`.

## 🧪 Useful Scripts

| Command | Where | Description |
|---|---|---|
| `npm run dev` | frontend / backend | Start the dev server |
| `npm run build` | frontend / backend | Production build |
| `npm run prisma:studio` | backend | Open Prisma Studio (visual DB browser) at `localhost:5555` |
| `npm run prisma:migrate` | backend | Apply pending migrations |

## ☁️ Deployment

Both apps are deployed on **Vercel**, connected directly to this repository's `main` branch — every push triggers an automatic production deployment.

- The backend runs as a Vercel serverless function (`backend/api/index.ts`), with `prisma generate` wired into the build step.
- File uploads with `STORAGE_PROVIDER=local` are ephemeral on serverless — production should use the S3 storage provider for persistence.

## 📄 License

Private project — all rights reserved.
