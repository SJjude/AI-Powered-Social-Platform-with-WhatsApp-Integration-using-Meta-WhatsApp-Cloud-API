# SocialConnect

SocialConnect is a scalable, production-ready foundation for a social networking web application. This repository intentionally contains **project infrastructure only**: clean folder structure, TypeScript configuration, linting/formatting, environment handling, Docker support, logging, CORS, database wiring, and error handling. Product features are not implemented yet.

## Tech Stack

### Frontend

- React 19
- Vite
- TypeScript
- TailwindCSS
- React Router
- React Query
- Axios

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- JWT-ready configuration
- bcrypt dependency for future authentication

## Architecture

The project is organized as a monorepo with separate applications:

```text
socialconnect/
├── backend/              # Express API using Clean Architecture + MVC boundaries
├── frontend/             # React/Vite client application
├── docker-compose.yml    # MongoDB + backend + frontend orchestration
├── eslint.config.mjs     # Shared ESLint configuration
├── tsconfig.base.json    # Shared TypeScript strict settings
└── package.json          # npm workspaces and shared scripts
```

### Backend boundaries

```text
backend/src/
├── application/          # Use cases, DTOs, application services
├── config/               # Environment, CORS, database configuration
├── domain/               # Entities, value objects, repository contracts
├── infrastructure/       # Logging, persistence, external integrations
├── interfaces/http/      # MVC controllers, routes, HTTP middleware
├── shared/               # Cross-cutting errors/utilities
├── app.ts                # Express app composition
└── server.ts             # HTTP server/bootstrap lifecycle
```

### Frontend boundaries

```text
frontend/src/
├── app/                  # App providers and router
├── assets/               # Static assets
├── components/           # Shared UI components
├── features/             # Future feature modules
├── pages/                # Route-level pages
└── shared/               # API client, config, hooks, utilities, types
```

## Prerequisites

- Node.js 20+
- npm 10+
- Docker and Docker Compose, optional but recommended
- MongoDB, if running the backend without Docker

## Getting Started Locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create environment files:

   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

   On Windows Command Prompt:

   ```cmd
   copy backend\.env.example backend\.env
   copy frontend\.env.example frontend\.env
   ```

3. Update `backend/.env` with your MongoDB URI and secure JWT secrets.

4. Start both applications:

   ```bash
   npm run dev
   ```

5. Open the apps:

   - Frontend: <http://localhost:5173>
   - Backend health check: <http://localhost:5000/api/v1/health>

## Docker Setup

Run the full stack with MongoDB, backend, and frontend:

```bash
docker compose up --build
```

Stop containers:

```bash
docker compose down
```

If you want to override ports or the frontend API URL, copy the root `.env.example` to `.env` and update the values.

## Available Scripts

### Root scripts

- `npm run dev` - run backend and frontend concurrently
- `npm run build` - build backend and frontend
- `npm run typecheck` - run TypeScript checks in all workspaces
- `npm run lint` - lint the repository
- `npm run format` - format files with Prettier
- `npm run format:check` - check formatting
- `npm run docker:up` - build and start Docker services
- `npm run docker:down` - stop Docker services

### Backend scripts

- `npm run dev --workspace backend` - start Express with hot reload
- `npm run build --workspace backend` - compile TypeScript
- `npm run start --workspace backend` - run compiled API
- `npm run lint --workspace backend` - lint backend files
- `npm run typecheck --workspace backend` - type-check backend files

### Frontend scripts

- `npm run dev --workspace frontend` - start Vite dev server
- `npm run build --workspace frontend` - build production frontend
- `npm run preview --workspace frontend` - preview production build
- `npm run lint --workspace frontend` - lint frontend files
- `npm run typecheck --workspace frontend` - type-check frontend files

## Environment Variables

Backend variables are documented in `backend/.env.example`.

Frontend variables are documented in `frontend/.env.example`.

Root Docker Compose variables are documented in `.env.example`.

## Foundation Capabilities Included

- Separate frontend and backend folders
- Strict TypeScript setup
- ESLint and Prettier configuration
- TailwindCSS configuration
- Environment variable examples
- Reusable clean architecture folders
- Dockerfiles and Docker Compose
- CORS configuration
- Winston + Morgan request logging
- Centralized Express error handling middleware
- MongoDB/Mongoose connection lifecycle
- Health endpoint for infrastructure verification only

## Notes

- Authentication, profiles, posts, feeds, messaging, and other social networking features are intentionally not implemented yet.
- JWT and bcrypt dependencies/configuration are included so authentication can be added later without restructuring the project.
