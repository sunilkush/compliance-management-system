# Corporate Compliance Management System (MERN)

Role-based compliance management platform built with the MERN stack.

## Architecture
- **Frontend**: React + Vite single-page app for Admin, Compliance Officer, Auditor, Control Owner, Employee, and Executive personas.
- **Backend**: Node.js + Express REST APIs with JWT auth and RBAC.
- **Database**: MongoDB with Mongoose models for obligations, policies, controls, risks, incidents, audits, training, and vendors.

## Project Structure
- `backend/` Express API server
- `frontend/` React web app

## Quick Start
### 1) Backend
```bash
cd backend
cp .env.example .env
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

Frontend defaults to calling `http://localhost:5000/api`.

## Demo Accounts (seeded)
All seeded users use password: `Password123!`
- admin@corp.com (ADMIN)
- cco@corp.com (COMPLIANCE_OFFICER)
- auditor@corp.com (AUDITOR)
- owner@corp.com (CONTROL_OWNER)
- employee@corp.com (EMPLOYEE)
- exec@corp.com (EXECUTIVE)

## Implemented Modules (Phase 1)
- Obligation registry
- Policy management
- Control library
- Risk & issue register
- Incident cases
- Vendor assessments
- Training modules and certifications
- Audit plans/findings
- KPI dashboard

## Security Highlights
- JWT authentication
- Role-based authorization middleware
- Entity scoping (`entityId`) for multi-business-unit support
- Immutable-style audit log collection

## Notes
This is an MVP baseline aligned to the provided corporate compliance plan and designed for iterative expansion in Phases 2 and 3.
