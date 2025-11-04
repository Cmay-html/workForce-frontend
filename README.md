# WorkForce Frontend

Modern React + Vite frontend for the WorkForce platform — a client–freelancer marketplace with role-based dashboards, projects and milestones, and real-time chat.

This app is built with React 19, React Router, Tailwind CSS, Axios, and Socket.IO and connects to the WorkForce backend API.

Backend (default): https://workforce-backend-kfxw.onrender.com


## Features

- Authentication and roles: client, freelancer, admin
- Protected routing and smart redirects
- Client dashboard: projects, milestones, reviews, settings
- Freelancer dashboard: projects, proposals, payments, profile/portfolio
- Admin area: analytics, user management (guarded)
- Real-time chat widget (Socket.IO) and project chat
- API services with token injection and error handling
- Comprehensive test suite (Vitest + Testing Library)


## Tech Stack

- React 19 + Vite 5
- React Router v7
- Tailwind CSS 3
- Axios for API
- Socket.IO client
- Vitest + React Testing Library for tests
- ESLint 9


## Project Structure

```
workForce-frontend/
├─ public/
│  └─ _redirects                 # SPA redirect rules for Netlify/SPA hosts
├─ src/
│  ├─ components/                # Reusable UI and feature components
│  ├─ contexts/                  # Auth context provider
│  ├─ hooks/                     # Custom hooks (auth, chat, data)
│  ├─ pages/                     # Route pages by area (client, freelancer, admin)
│  ├─ services/
│  │  └─ api/                    # Axios instance and service modules
│  ├─ styles/                    # Global styles
│  └─ __tests__/                 # Automated + manual tests and guides
│     ├─ routing/                # Route/guard/navigation tests
│     ├─ components/             # Integration tests
│     ├─ e2e/                    # End-to-end user flow tests
│     ├─ MANUAL_TEST_CASES.md    # 40+ manual test procedures
│     └─ TESTING_GUIDE.md        # How to run and extend tests
└─ vite.config.js
```


## Getting Started

### Prerequisites

- Node.js 18+ (recommended LTS)
- npm 9+

### Install

```bash
npm install
```

### Environment

Create a `.env` file at the project root with:

```bash
# Base URL of the backend API (do NOT include trailing /api)
VITE_API_URL=https://workforce-backend-kfxw.onrender.com
```

Notes:
- The Axios instance automatically appends `/api` to `VITE_API_URL` and injects the `Authorization: Bearer <token>` header when available.
- Socket.IO connects using `VITE_API_URL` with path `/socket.io`.

### Run

```bash
npm run dev
```

App runs at http://localhost:5173


## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — run ESLint
- `npm test` — run tests (Vitest)


## Routing Overview

Route guards live in `src/App.jsx` and use the auth context:

- Public routes: `/`, `/login`, `/register`, `/register/client`, `/register/freelancer`
- Client-only: `/client/**` (dashboard, projects, milestones, reviews, settings)
- Freelancer-only: `/freelancer/**` (dashboard, projects, proposals, payments, profile)
- Admin-only: `/admin`, `/admin/users`, `/admin/analytics`
- Chat: `/chat` and `/projects/:projectId/chat` (requires auth)
- Smart root redirect: `/dashboard` forwards to role dashboard
- Catch-all: `*` → `/` (landing)

Guards:
- `ProtectedRoute` for general auth
- `ClientRoute`, `FreelancerRoute` for role checks
- `AdminRoute` for admin area


## API & Auth

- Axios instance: `src/services/api/index.js`
	- Normalizes baseURL to `${VITE_API_URL}/api`
	- Adds `Authorization` header if `authToken` is present in localStorage
	- Intercepts 401 to clear auth and redirect to `/login`
- Tokens: stored in `localStorage` under `authToken` (and `userData` for profile)


## Real-time Chat

- Hook: `src/hooks/useChat.js`
- Uses Socket.IO (preferred) and a legacy WebSocket fallback
- Joins project room and conversation room when available
- Emits/receives presence and message events


## Testing

We ship a complete test suite for routing, flows, and integrations.

Quick commands:

```bash
npm test                 # Run all tests
npm test -- --watch      # Watch mode
npm test -- --coverage   # Coverage report
```

Docs:
- `src/__tests__/TESTING_GUIDE.md`
- `src/__tests__/MANUAL_TEST_CASES.md`
- `src/__tests__/QUICK_REFERENCE.md`


## Deployment (Netlify or static hosts)

1. Build: `npm run build`
2. Publish directory: `dist/`
3. Set env var in dashboard: `VITE_API_URL=https://workforce-backend-kfxw.onrender.com`
4. Ensure SPA redirects: `public/_redirects` is included (routes → index.html)


## Troubleshooting

- 401 Unauthorized after deploy: verify `VITE_API_URL` and that backend’s CORS allows the site
- Chat not connecting: confirm Socket.IO enabled on backend and `VITE_API_URL` is correct (no trailing slash)
- API timeouts: backend cold starts may take time; axios has a 10s timeout (see console)


## Contributing

1. Create a feature branch
2. Commit with clear messages
3. Add/update tests where relevant
4. Open a pull request


## License

This project is part of the WorkForce platform. All rights reserved.
