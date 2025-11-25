## create-convex-next

A small CLI that scaffolds a Next.js 15 + Tailwind v4 + Shadcn UI starter, with optional Convex, Clerk, and DodoPayments integrations. It copies templates from `templates/`, merges feature `package.json` dependencies, and installs with pnpm/yarn/npm (auto-detected).

### Prerequisites
- Node.js 18+
- pnpm recommended (CLI falls back to yarn then npm)

### Local install & usage
```bash
# from the repo root
pnpm install
pnpm unlink --global  # only if previously linked
pnpm link --global

# scaffold a new app (you'll be prompted)
create-convex-next my-app
cd my-app
pnpm dev
```

### What the prompts do
- Project name
- Add Tailwind CSS?
- Add ShadCN UI components?
- Include Convex setup?
- Include Clerk Auth + webhook?
- Include DodoPayments integration?
- Install dependencies?

### What gets generated
- Base Next.js app in `/app` with a demo homepage (`use client`) showing Shadcn button/input/card, theme toggle, and path aliases (`@/*`).
- Tailwind v4 config and `styles/globals.css`.
- Shadcn primitives in `components/ui` (button, input, card) and `lib/utils.ts`.
- Optional overlays:
  - Tailwind: adds config and deps.
  - Shadcn: adds UI components/config + deps.
  - Clerk: adds auth layout wrapper, `/sign-in` + `/sign-up` pages, middleware, and Clerk deps.
  - Convex: copies `templates/convex`.
  - Clerk: copies `templates/clerk`.
  - DodoPayments: copies `templates/dodo`.

### How it works (code map)
- `bin/index.js`: entry point; runs prompts, scaffolds, installs deps.
- `src/prompts.js`: inquirer questions.
- `src/scaffold.js`: copies base + selected feature templates; merges `package.json` deps for overlays to avoid overwriting the base.
- `src/installer.js`: merges package.json files; chooses pnpm → yarn → npm to install.
- `src/utils/copyDir.js`: safe recursive copy with optional `skipPackageJson`.

### Clerk setup in generated app
- After scaffolding with Clerk enabled, rename `.env.example` to `.env.local` and set:
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...`
  - `CLERK_SECRET_KEY=...`
- Start dev server (`pnpm dev`) and visit `/sign-in` or `/sign-up`. The header also shows `SignIn/SignUp/UserButton` by default.

### Notes
- The homepage text uses `replace_project_name`; swap it after scaffolding.
- Templates live under `templates/`; edit those to change future scaffolds.
- If you tweak templates, re-run `pnpm link --global` before scaffolding again.
