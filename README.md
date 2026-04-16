# Enterprise Compliance Management System (MERN)

Centralized compliance platform for GDPR, HIPAA, ISO 27001, and SOC 2 programs.

## Tech Stack
- **Frontend**: React 18 + Vite
- **Backend**: Node.js 20 + Express + JWT RBAC
- **Database**: MongoDB + Mongoose
- **AI Layer**: `ai-service/prompts` + backend AI endpoints (Claude-ready stub integration)

## Implemented Platform Modules
### Foundation
- JWT access + refresh token auth with role-based authorization.
- Expanded enterprise role catalog (Super Admin, CCO, Legal/Risk, Internal Auditor, Department Manager, Employee, External Auditor, Executive).
- User management API (`/api/users`) for role governance.
- Core schemas: `User`, `Policy`, `Risk`, `Task`, `Audit`, `Training`.
- Central dashboard shell with role-aware summaries.

### Core Modules
- Policy Management CRUD + workflow fields (draft/review/approved/archive, versioning, attestation).
- Risk Register CRUD + likelihood × impact scoring fields + residual risk fields.
- Task Tracker CRUD with Kanban states, priority, due dates, dependencies, reminder channels.
- Evidence-ready Audit CRUD with findings + CAP actions + compliance rating fields.
- Training module CRUD with assignment/completion tracking.

### Audit, Reporting, Analytics
- Dashboard API now emits:
  - Real-time style compliance score
  - Framework status overview
  - Risk heatmap dataset
  - Overdue task counts
  - Audit status distribution

### AI Integration
- AI feature endpoint: `POST /api/ai/:feature`
- Built prompt packs for:
  - regulation_summarizer
  - gap_analyzer
  - risk_predictor
  - compliance_chatbot
  - audit_report
- Frontend AI workbench to run AI features and inspect structured output.

## API Overview
- `POST /api/auth/login|signup|refresh|forgot-password|reset-password|logout`
- `GET /api/auth/me`
- `GET /api/dashboard`
- `GET/PATCH /api/users`
- `GET/POST/PATCH/DELETE /api/policies`
- `GET/POST/PATCH/DELETE /api/risks`
- `GET/POST/PATCH/DELETE /api/tasks`
- `GET/POST/PATCH/DELETE /api/audits`
- `GET/POST/PATCH/DELETE /api/trainings`
- `POST /api/ai/:feature`

## Quick Start
### 1) Backend
```bash
cd backend
npm install
npm run seed
npm run dev
```

### 2) Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend defaults to `http://localhost:5000/api`.

## Seeded Accounts
All accounts use password: `Password123!`
- admin@corp.com (SUPER_ADMIN)
- cco@corp.com (COMPLIANCE_OFFICER)
- legal@corp.com (LEGAL_RISK_MANAGER)
- auditor@corp.com (INTERNAL_AUDITOR)
- manager@corp.com (DEPARTMENT_MANAGER)
- employee@corp.com (EMPLOYEE)
- external.auditor@corp.com (EXTERNAL_AUDITOR)
- exec@corp.com (EXECUTIVE)

## Notes
- AI routes return structured stub output when `CLAUDE_API_KEY` is not configured.
- This repository now includes the phase-spanning architecture and APIs needed to continue enterprise production hardening (SSO, MFA, queue workers, notifications, deployment).
