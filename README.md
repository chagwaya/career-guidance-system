# CareerPath Kenya

A career guidance system for Kenyan high school students. Students complete a RIASEC personality assessment, receive personalised university course and TVET recommendations, and can message a career counselor — all through one web app.

Built with **Next.js 16**, **React 19**, **Prisma** (MySQL), **shadcn/ui**, and **Tailwind CSS v4**.

---

## Features

- **Student authentication** — register, login, password hashing (bcrypt)
- **Profile management** — school, county, KCSE subjects & grades
- **RIASEC assessment** — 18 questions across personality, interests, and strengths with importance weighting and custom answers
- **Course recommendations** — 50 courses matched to RIASEC scores, filterable by category
- **Counselor messaging** — two-way messaging between students and admin counselors
- **Admin dashboard** — view all students, stats, and respond to messages (auth-protected API)
- **Automated deploy checks** — DB connection, table creation, and admin seeding on every deploy

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, shadcn/ui, Tailwind CSS v4 |
| Database | MySQL via Prisma ORM |
| Auth | bcryptjs, localStorage sessions |
| Testing | Vitest, React Testing Library |
| Hosting | Render (render.yaml blueprint) |

---

## Getting Started (Local Development)

### Prerequisites

- **Node.js** 22+
- **pnpm** (corepack enable)
- A MySQL database (local or hosted)

### Setup

```bash
# Clone the repo
git clone https://github.com/chagwaya/career-guidance-system.git
cd career-guidance-system

# Install dependencies
pnpm install

# Create .env with your database URL
echo 'DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"' > .env

# Push schema to database & seed admin account
pnpm db:push
pnpm db:seed-admin

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Default Admin Credentials

| Email | Password |
|-------|----------|
| `admin@careerpath.ke` | `admin123` |

---

## Testing

```bash
pnpm test            # Run all 112 tests once
pnpm test:watch      # Watch mode
pnpm test:coverage   # With coverage report
```

**Test suite covers:**
- **Lib** — `cn()` utility, password hashing, career data functions, admin auth middleware
- **API routes** — all auth, student, assessment, message, recommendation, and admin endpoints
- **Components** — assessment quiz, course card, course filters

---

## Project Structure

```
app/
  api/            # API routes (auth, students, assessments, messages, recommendations, admin)
  admin/          # Admin login & dashboard pages
  assessment/     # Student assessment page
  counselor/      # Student counselor messaging page
  profile/        # Student profile page
  recommendations/ # Course recommendations page
  student-login/  # Student auth page
components/       # React components (assessment, landing, profile, recommendations, ui)
lib/              # Utilities, types, Prisma client, career data, admin auth
prisma/           # Prisma schema (MySQL)
scripts/          # Admin seeder, deploy checks
tests/            # Vitest test suites
```

---

## Deploy to Render

### Step 1 — Push to GitHub

Make sure all your changes are committed and pushed:

```bash
git add -A
git commit -m "Ready for deployment"
git push origin main
```

### Step 2 — Create the service

1. Log in to [render.com](https://render.com)
2. Click **New +** → **Blueprint**
3. Connect your GitHub repository (`chagwaya/career-guidance-system`)
4. Render auto-detects `render.yaml` and configures everything

> **Alternative:** Click **New +** → **Web Service**, select the repo, and manually enter the build/start commands from `render.yaml`.

### Step 3 — Set environment variables

In the Render service **Environment** settings, add:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Your MySQL connection string, e.g. `mysql://USER:PASS@HOST:PORT/DB?sslaccept=strict` |
| `NEXT_PUBLIC_APP_URL` | Your Render URL, e.g. `https://career-guidance-system.onrender.com` |

The following are already set automatically by `render.yaml`:
- `NODE_VERSION=22`
- `NODE_ENV=production`
- `NEXT_TELEMETRY_DISABLED=1`

### Step 4 — Deploy

Click **Create Web Service**. Render will execute:

**Build phase:**
```
pnpm install --frozen-lockfile
pnpm prisma generate
pnpm test              ← 112 tests must pass or build fails
pnpm build             ← Next.js production build
```

**Start phase:**
```
pnpm deploy:checks     ← Connects to DB, creates tables if missing, seeds admin
pnpm start             ← Launches Next.js
```

### Step 5 — Verify

Once deployed:

1. Open your Render URL → landing page should load
2. Go to `/admin/login` → login with `admin@careerpath.ke` / `admin123`
3. Go to `/student-login` → register a student account
4. Complete the student flow: **Profile → Assessment → Recommendations → Counselor**

### Database Providers

Any MySQL-compatible host works. Recommended:

| Provider | Free Tier | Notes |
|----------|-----------|-------|
| [TiDB Cloud](https://tidbcloud.com) | Yes (Serverless) | Use the **public** endpoint, not privatelink |
| [Railway](https://railway.app) | Trial credits | Simple MySQL provisioning |
| [Aiven](https://aiven.io) | Free plan | Managed MySQL |
| [PlanetScale](https://planetscale.com) | Hobby tier | MySQL-compatible (Vitess) |

> **Important:** Do not use a local XAMPP/MAMP database URL for production — Render cannot reach your local machine.

---

## Scripts Reference

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm test` | Run test suite |
| `pnpm lint` | ESLint check |
| `pnpm db:push` | Push Prisma schema to database |
| `pnpm db:studio` | Open Prisma Studio GUI |
| `pnpm db:seed-admin` | Create/update admin account |
| `pnpm deploy:checks` | Full deploy preflight (DB + tables + seed) |

---

## License

Private project — all rights reserved.
