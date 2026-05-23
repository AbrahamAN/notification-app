# NotifyApp

A full-stack notification management app built as a monorepo. Users can register, log in, and manage notifications sent via Email, SMS, or Push channels.

---

## Tech Stack

### Frontend — `apps/web`

| Technology | Version | Why we chose it |
|---|---|---|
| **Next.js** | 16 | React framework with file-based routing and SSR support |
| **React** | 19 | UI component library |
| **TypeScript** | 5 | Type safety across the entire frontend |
| **Tailwind CSS** | 4 | Utility-first CSS, fast to build consistent UI without writing custom styles |
| **Zustand** | 5 | Lightweight global state for auth — no Provider boilerplate, persists to localStorage automatically |
| **TanStack Query** | 5 | Server state management for notifications — handles caching, loading states, and cache updates after mutations |

### Backend — `apps/api`

| Technology | Version | Why we chose it |
|---|---|---|
| **NestJS** | 11 | Structured, opinionated Node.js framework with modules, decorators, and dependency injection |
| **TypeScript** | 5 | Type safety and better DX across the API |
| **TypeORM** | 1 | ORM for database entities and relations with decorator-based models |
| **MySQL** | — | Relational database to store users and notifications |
| **Passport + JWT** | — | Industry-standard authentication. JWT keeps the API stateless |
| **bcrypt** | 6 | Secure password hashing before storing in the database |
| **class-validator** | — | DTO validation with decorators — rejects bad input before it reaches the service layer |

### Monorepo tooling

| Tool | Why |
|---|---|
| **pnpm workspaces** | Manages both apps from a single root, shared lockfile, fast installs |
| **concurrently** | Runs frontend and backend in parallel with a single command |

---

## Project Structure

```
notification-app/
├── apps/
│   ├── web/          # Next.js frontend
│   │   └── app/
│   │       ├── features/
│   │       │   ├── auth/         # Login, register forms and hooks
│   │       │   └── notifications/ # Notification list, card, form, hooks
│   │       ├── stores/           # Zustand auth store
│   │       ├── lib/              # API client, query client
│   │       └── types/            # Shared TypeScript types
│   └── api/          # NestJS backend
│       └── src/
│           ├── auth/             # Register, login, JWT strategy
│           ├── notifications/    # CRUD, Strategy pattern per channel
│           └── users/            # User entity and service
└── packages/         # Shared packages (future use)
```

---

## What we built

### Frontend
- User registration and login with form validation and error messages
- JWT token stored via Zustand `persist` middleware (localStorage)
- Protected dashboard route — redirects to login if not authenticated
- Notification list with loading skeletons
- Create, edit, and delete notifications via modal forms
- Delete confirmation modal (no browser `alert`)
- Channel badge display (EMAIL / SMS / PUSH)
- Automatic cache updates after mutations (no extra network requests)
- Handles session expiry — auto logout on 401 from the API

### Backend
- `POST /Auth/register` — creates a user with a hashed password, returns JWT
- `POST /Auth/login` — validates credentials, returns JWT
- `GET /notifications` — returns all notifications for the authenticated user
- `POST /notifications` — creates a notification and runs the channel strategy
- `PATCH /notifications/:id` — updates a notification
- `DELETE /notifications/:id` — deletes a notification
- JWT guard protecting all notification routes
- Strategy pattern for notification channels (Email, SMS, Push) — each channel has its own class implementing a shared interface
- Global validation pipe — rejects requests with invalid DTOs

---

## How to run

### Prerequisites
- Node.js 18+
- pnpm 11+ (`npm install -g pnpm`)
- MySQL running on port `3307`

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Copy the example files and fill in your own values:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

For `JWT_SECRET`, generate a strong random value — never use a plain string:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Paste the output as the value of `JWT_SECRET` in `apps/api/.env`.

> The real `.env` files are git-ignored and should never be committed.

### 3. Run both apps

```bash
pnpm dev
```

Or run them separately:

```bash
# Frontend only — http://localhost:3000
pnpm dev:web

# Backend only — http://localhost:3001
pnpm dev:api
```

---

## If I had more time I would add

- **Email/SMS/Push delivery** — right now the strategies log to console. I would integrate real providers: SendGrid for email, Twilio for SMS, and Firebase for push notifications.
- **Notification read/unread status** — track which notifications the user has seen.
- **Pagination** — the list currently loads all notifications at once. I would add cursor-based pagination with infinite scroll.
- **End-to-end tests** — cover the main user flows (register → create notification → delete) with Playwright.
- **Refresh token** — replace the current long-lived JWT with short-lived access tokens and a refresh token flow.
