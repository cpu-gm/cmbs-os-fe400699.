# CMBS OS - Commercial Mortgage-Backed Securities Operating System

A full-stack platform for managing commercial real estate capital stacks, waterfall distributions, and deal lifecycle management.

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 16+
- Windows (optimized for Windows development)

### 1. Backend Setup

```bash
cd backend
npm install
# Configure backend/.env (see backend/.env.example)
npm start
```

Backend will run on `http://localhost:3001`

### 2. Frontend Setup

```bash
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

**Important:** The frontend ALWAYS runs on port **5173**. If the port is occupied, Vite will fail (strictPort mode) to prevent confusion.

## Port Hygiene (Fixing Port Conflicts)

If you see an error like:
```
Port 5173 is in use, trying another one...
Error: Port 5173 is already in use
```

**Quick Fix:**
```bash
# Option 1: Use npm script
npm run kill-port

# Option 2: Run PowerShell script directly
powershell -ExecutionPolicy Bypass -File ./scripts/kill-port-5173.ps1

# Option 3: Use batch file
scripts\kill-port-5173.bat
```

This will kill any process using port 5173 and free it for Vite.

## Architecture

- **Frontend:** Vite + React + TailwindCSS (Port 5173)
- **Backend:** Node.js + Express (Port 3001)
- **Database:** PostgreSQL (Port 5432)
- **AI:** Claude Sonnet 4.5 via Anthropic API

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001/api
VITE_WEB_BASE_URL=http://localhost:5173
```

### Backend (backend/.env)
```
CORS_ORIGIN=http://localhost:5173
PORT=3001
DB_NAME=cmbs_os
ANTHROPIC_API_KEY=your_key_here
```

## Building for Production

```bash
npm run build
```

## Continuous Integration

GitHub Actions runs on push to `main` and on pull requests:
- Starts Postgres 15
- Applies backend migrations `001` through `005`, seeds regulator data, and runs regulator tests
- Builds `regulator-platform`

To run the same steps locally (PowerShell example):
```powershell
$env:DATABASE_URL="postgres://postgres:postgres@localhost:5432/creos_test"
psql $env:DATABASE_URL -v ON_ERROR_STOP=1 -f backend/src/config/migrations/001_event_ledger.sql
psql $env:DATABASE_URL -v ON_ERROR_STOP=1 -f backend/src/config/migrations/002_actor_registry.sql
psql $env:DATABASE_URL -v ON_ERROR_STOP=1 -f backend/src/config/migrations/003_phase0_hardening.sql
psql $env:DATABASE_URL -v ON_ERROR_STOP=1 -f backend/src/config/migrations/004_evidence_enhanced.sql
psql $env:DATABASE_URL -v ON_ERROR_STOP=1 -f backend/src/config/migrations/005_anchoring.sql
cd backend
npm ci
npm run seed:regulator
npm run test:regulator
cd ../regulator-platform
npm ci
npm run build
```

## Troubleshooting

### Port 5173 keeps changing to 5174/5175
- **Solution:** The vite.config.js now enforces `strictPort: true`. Kill stray processes with `npm run kill-port`

### CORS errors in browser console
- **Solution:** Ensure `backend/.env` has `CORS_ORIGIN=http://localhost:5173`

### Cannot connect to backend
- **Solution:** Verify backend is running on port 3001: `curl http://localhost:3001/health`

### Vite won't start
- **Solution:** Run `npm run kill-port` to free port 5173, then try again

## Available Scripts

- `npm run dev` - Start frontend dev server (port 5173, strict)
- `npm run build` - Build for production
- `npm run kill-port` - Kill process using port 5173
- `npm run preview` - Preview production build

For more details, see the project documentation in `/docs`.
