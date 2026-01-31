# AGENTS.md

This file guides AI coding agents when working with this repository.

---

## Common Commands

- **Start dev server**: `pnpm dev`.
- **Build for production**: `pnpm build`.
- **Serve built app**: `pnpm start`.
- **Lint**: `pnpm lint`.
- **Format code**: `pnpm format:fix` (to fix) or `pnpm format:check` (to check).
- **Run a single test file**: `pnpm test -- <path>` (e.g., `pnpm test -- tests/example.test.ts`).

---

## Project Structure Overview

- The project is a Next.js 13 app using the App Router (`app/`).
- Styling uses Tailwind CSS with shadcn/ui components.
- Global types and utilities live under `src/`.
- Configuration files: `next.config.mjs`, `tailwind.config.ts`, `tsconfig.json`.
- Scripts are defined in `package.json`; the dev, build, start, and lint commands use Next.js defaults.

---

## Key Architectural Points

1. **Next.js App Router** – Pages under `app/` define routes; components can be server or client-side based on the `'use client'` directive.
2. **Component Library** – shadcn/ui provides reusable UI primitives; see `components/ui/*` for custom wrappers.
3. **Styling** – Tailwind CSS with JIT mode and a custom config in `tailwind.config.ts`. Global styles are imported in `app/globals.css`.
4. **TypeScript** – Strict type checking enabled via `tsconfig.json`; all components and utilities are typed.
5. **Build Process** – Next.js handles SSR, SSG, and static asset bundling automatically.

---

## Code Style Guidelines

### Imports

- Group imports with the following hierarchy:
  1. Built-in Node.js modules (e.g., `fs`, `path`).
  2. Third-party dependencies from `node_modules`.
  3. Aliased paths in the project (e.g., `@/components`, `@/utils`).
  4. Relative imports.
- Use consistent ordering within each group.

### Formatting

- Adhere to Prettier formatting rules. Use `pnpm format:check` to verify format.
- Use Tailwind's class order conventions for styling.
- Avoid inline styles unless absolutely necessary.

### Types

- Prefer TypeScript interfaces for object types.
- Use `type` for unions, primitive types, and utility-type structures.
- Always annotate function/method parameters and return values unless inferred by TypeScript.

### Naming Conventions

#### Files and Folders

- Use `kebab-case` for filenames (e.g., `user-card.tsx`).
- Group related files into directories (e.g., styles, utils, components).

#### Variables

- Use `camelCase` for variables and functions (e.g., `userName`).

#### Components

- Use `PascalCase` for React components (e.g., `UserCard`).

#### Constants

- Use `UPPER_SNAKE_CASE` for constants (e.g., `BASE_URL`).

### Error Handling

- Use `try/catch` blocks for async operations.
- Log errors appropriately with contextual information.
- Avoid exposing stack traces publicly; sanitize error messages.

### Best Practices

- Write pure functions whenever possible.
- Avoid prop drilling by using context or state management solutions when suitable.
- Use environment variables for secrets and configuration.

---

## Important Files

- `next.config.mjs`: Custom Next.js configuration.
- `tailwind.config.ts`: Tailwind CSS settings.
- `app/layout.tsx` & `app/page.tsx`: Root layout and home page.
- `components/ui/*`: shadcn component wrappers.
- `src/utils/*`: Helper functions.

---

## Git Commit Convention

This project follows **Conventional Commits** format for git commits:

- Use `feat:` for new features.
- Use `fix:` for bug fixes.
- Use `docs:` for documentation changes.
- Use `refactor:` for code refactoring.
- Use `chore:` for maintenance tasks.
- Use `perf:` for performance improvements.

Example:

```plaintext
feat: add timestamp conversion tools with validation
```

---

## Helpful Tips for Future Agents

- Use `pnpm dev` for hot-reloading during development.
- Run tests with Jest (configured via `jest.config.js`; see test scripts).
- Ensure all code follows the above style guidelines.
- Refer to the README for deployment instructions on Vercel.
- Always use conventional commits when committing changes.
- Review and adhere to these guidelines strictly when contributing.
