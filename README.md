# Career guidance system

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/idalanewton9-gmailcoms-projects/v0-career-guidance-system)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/cs9TpfmCJiL)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/idalanewton9-gmailcoms-projects/v0-career-guidance-system](https://vercel.com/idalanewton9-gmailcoms-projects/v0-career-guidance-system)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/cs9TpfmCJiL](https://v0.app/chat/cs9TpfmCJiL)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Deploy on Render

This project includes a Render blueprint file: `render.yaml`.

### 1) Push your latest code to GitHub

Render deploys from your Git repository, so make sure your latest changes are pushed.

### 2) Create a new Web Service on Render

- In Render, click **New +** → **Blueprint** (recommended) or **Web Service**.
- Select this repository.
- If using Blueprint, Render reads `render.yaml` automatically.

### 3) Required environment variable

Set this in Render service settings:

- `DATABASE_URL` = your hosted MySQL connection string

Example format:

`mysql://USER:PASSWORD@HOST:3306/DATABASE_NAME`

Important:
- Do not use local XAMPP database URL for production.
- Use a hosted MySQL provider (e.g., Railway, PlanetScale, Aiven, or your own VPS MySQL).

### 4) Build and start commands

Configured in `render.yaml`:

- Build: `corepack enable; pnpm install --frozen-lockfile; pnpm prisma generate; pnpm build`
- Start: `pnpm build; pnpm start`

### 5) First deploy checks

After deploy succeeds:

- Open `/admin/login`
- Confirm API routes respond (`/api/admin/stats` when logged in)
- Test student flow: profile → assessment → recommendations
