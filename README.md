# Mellith

A Bun + Hono + Vite + React monorepo with end-to-end type safety.

> Update the badge URL above to match your repository. CI runs lint, format checks,
> type-checks, and builds on every push to `main` and pull request.

## Stack

Bun-powered Turborepo monorepo:

| Workspace        | Description                                      |
| ---------------- | ------------------------------------------------ |
| `apps/client`    | React 19 + Vite + Tailwind CSS v4 + shadcn/ui UI |
| `apps/server`    | Bun + Hono, type-safe API with a typed client    |
| `packages/types` | Shared API types (`@mellith/types`)              |
| `packages/db`    | Drizzle schema + Postgres client (`@mellith/db`) |

Tooling: TypeScript 7, OXC (`oxlint` + `oxfmt`), Lefthook, Zed.

## Getting started

Requires [Bun](https://bun.sh) 1.3+ and Postgres.

```sh
bun install        # installs dependencies, builds types/db/server
bun run dev        # runs client and server in watch mode via turbo
```

- Client: http://localhost:5173
- Server: http://localhost:3000
- Smoke test: http://localhost:3000/hello

### Database

Copy `apps/server/.env.example` to `apps/server/.env` and set `DATABASE_URL` to your
Postgres connection string. Then, from `packages/db`:

```sh
bun run db:generate   # generate SQL from schema
bun run db:migrate    # apply migrations
bun run db:studio     # browse tables in Drizzle Studio
```

## Scripts

| Command              | Description                   |
| -------------------- | ----------------------------- |
| `bun run dev`        | Run client and server         |
| `bun run build`      | Build all packages            |
| `bun run lint`       | Lint and autofix (oxlint)     |
| `bun run format`     | Format code (oxfmt)           |
| `bun run type-check` | Type-check all packages (tsc) |

## Environment

- `VITE_SERVER_URL` — API base URL for the client (default `http://localhost:3000`)
- `PORT` — server port (default `3000`)
- `CLIENT_URL` — allowed CORS origin for the server (default `http://localhost:5173`)
- `DATABASE_URL` — Postgres connection string used by `@mellith/db`
