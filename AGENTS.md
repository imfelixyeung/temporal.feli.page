# AGENTS.md

This file guides AI coding agents when working with this repository.

---

## Common Commands

- **Start dev server**: `pnpm dev`.
- **Build for production**: `pnpm build`.
- **Serve built app**: `pnpm start`.
- **Lint**: `pnpm lint`.
- **Format code**: `pnpm format:fix` (to fix) or `pnpm format:check` (to check).
- **Run tests**: `pnpm test` (run all tests once).
- **Watch tests**: `pnpm test:watch` (run tests in watch mode).
- **Test UI**: `pnpm test:ui` (open Vitest UI for interactive testing).
- **Run a single test file**: `pnpm test -- <path>` (e.g., `pnpm test -- src/lib/converters/__tests__/date-difference.test.ts`).

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

## Working on a GitHub Issue

When working on a GitHub issue, follow these steps to ensure a smooth and efficient workflow:

1. **View the Issue**
   - Use the GitHub CLI to view the issue details:
     ```bash
     gh issue view <number>
     ```

2. **Create a Development Branch**
   - Create and switch to a development branch for the issue:
     ```bash
     gh issue develop --base main --checkout --name <branch-name>
     ```

3. **Plan the Implementation**
   - Make a detailed plan on how to implement or fix the issue using a structured todo list. Break down the work into actionable steps.

4. **Start Development Work**
   - Write the code for the feature or fix.
   - Include any necessary unit tests to ensure the functionality is properly covered.

5. **Ensure Code Quality**
   - Run the following checks to ensure all code quality standards are met:
     - **ESLint**: Check for linting errors.
       ```bash
       pnpm run lint
       ```
     - **Prettier**: Verify code formatting.
       ```bash
       pnpm run format:check
       ```
     - **TypeScript**: Perform type checking.
       ```bash
       pnpm exec tsc --noEmit
       ```
     - **Unit Tests**: Run all unit tests.
       ```bash
       pnpm run test
       ```
     - **Next.js Build**: Ensure the project builds successfully.
       ```bash
       pnpm run build
       ```

6. **Push Changes and Create a Pull Request**
   - Push the changes to the remote branch.
   - Use the GitHub CLI to create a pull request:
     ```bash
     gh pr create
     ```

7. **View Pull Request and Comments**
   - View the pull request details:
     ```bash
     gh pr view <number>
     ```
   - View the pull request with comments:
     ```bash
     gh pr view <number> --comments
     ```
