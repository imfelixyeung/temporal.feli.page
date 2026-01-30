# CLAUDE.md

This file guides Claude Code when working with this repository.

## Common Commands
- **Start dev server**: `pnpm dev`.
- **Build for production**: `pnpm build`.
- **Serve built app**: `pnpm start`.
- **Lint**: `pnpm lint`.
- **Run a single test file**: `pnpm test -- <path>` (e.g., `pnpm test -- tests/example.test.ts`).

## Project Structure Overview
- The project is a Next.js 13 app using the App Router (`app/`).
- Styling uses Tailwind CSS with shadcn/ui components.
- Global types and utilities live under `src/`.
- Configuration files: `next.config.mjs`, `tailwind.config.ts`, `tsconfig.json`.
- Scripts are defined in `package.json`; the dev, build, start, and lint commands use Next.js defaults.

## Key Architectural Points
1. **Next.js App Router** – pages under `app/` define routes; components can be server or client‑side based on the `'use client'` directive.
2. **Component Library** – shadcn/ui provides reusable UI primitives; see `components/ui/*` for custom wrappers.
3. **Styling** – Tailwind CSS with JIT mode and a custom config in `tailwind.config.ts`. Global styles are imported in `app/globals.css`.
4. **TypeScript** – strict type checking enabled via `tsconfig.json`; all components and utilities are typed.
5. **Build Process** – Next.js handles SSR, SSG, and static asset bundling automatically.

## Important Files
- `next.config.mjs`: custom Next.js configuration.
- `tailwind.config.ts`: Tailwind CSS settings.
- `app/layout.tsx` & `app/page.tsx`: root layout and home page.
- `components/ui/*`: shadcn component wrappers.
- `src/utils/*`: helper functions.

## Git Commit Convention
This project follows **Conventional Commits** format for git commits:
- Use `feat:` for new features
- Use `fix:` for bug fixes  
- Use `docs:` for documentation changes
- Use `refactor:` for code refactoring
- Use `chore:` for maintenance tasks
- Use `perf:` for performance improvements

Example: `feat: add timestamp conversion tools with validation`

## Helpful Tips for Future Instances
- Use `pnpm dev` for hot‑reloading during development.
- Run tests with Jest (configured via `jest.config.js`; see test scripts).
- Refer to the README for deployment instructions on Vercel.
- Always use conventional commits when committing changes.