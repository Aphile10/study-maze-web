# Study Maze public website

Exhibition marketing website with a local-only school registration demonstration. Built with Next.js App Router, TypeScript and Tailwind CSS. There is no authentication, database connection, document storage or registration-processing backend.

## Local development and checks

Install the lockfile dependencies with `npm ci`, then run `npm run dev`. Open the local address printed by Next.js.

Run `npm run lint`, `npx tsc --noEmit --incremental false`, `npm run build` and `git diff --check`. Use `npm start` to preview a production build.

## Routes and source

- `/`: public homepage, including the product experience and School Portal links.
- `/portal`: exhibition school-onboarding introduction.
- `/portal/register`: organization, main contact, teachers, students, documents, review and demo confirmation.
- `src/components/marketing.tsx`, `experience.tsx`, `navbar.tsx`: public-site content and navigation.
- `src/components/portal/registration-form.tsx`: registration UI.
- `src/lib/portal-registration.ts`: field definitions, validation and isolated demo submission boundary.
- `src/app/globals.css` and `src/app/portal/portal.css`: public and portal styling.

## Exhibition boundaries

Use fictional details in the portal. Entries remain only in component memory while moving between steps and reset on reload or leaving the form. No accounts, invitations or permissions are created. The pending-verification confirmation is a demonstration, not a real review queue.

Spreadsheet import and supporting-document collection are disabled and explicitly labelled. Reward interactions and leaderboard values on the homepage are illustrative, not live transactions or student records. Keep these disclosures.

Artwork in `public/artwork` is approved Study Maze mobile artwork. Other product visuals are complete CSS/SVG illustrations, not app screenshots. The browser icon reuses the existing website maze mark. There is no published contact email yet; update the footer content in `marketing.tsx` once the official address exists.

## GitHub and Vercel

Use standard Next.js framework detection, the repository root, the existing `npm run build` script and a Node.js release supported by the installed Next.js version. No `vercel.json`, external backend or application secrets are required. Use `npm ci` with the committed lockfile.

Vercel supplies `VERCEL_PROJECT_PRODUCTION_URL` / `VERCEL_URL` when automatic system environment variables are enabled. Metadata uses that real hostname and the existing local Maze Runner artwork for social sharing. Without a deployment hostname, local builds omit the social image URL. No production domain or canonical URL is invented. After deployment, verify the actual share image and routes on the assigned HTTPS domain.

The portal carries `noindex` metadata because it is a demonstration. Environment files, dependencies, build output, TypeScript caches and local Vercel state are ignored. Include all required source and `public/artwork` files when preparing the GitHub commit; do not commit local environment or build files.

## Release smoke check

Check `/`, `/portal` and `/portal/register` at 320, 390, 768, 1024 and 1440px. Verify header/footer anchors, portal entry points, mobile Escape/focus behavior, reduced motion, artwork loading, validation, add/remove, optional roster skipping, review editing, submission disclosure and reload reset. Inspect the browser console/network for errors. Confirm that no registration request or browser-storage write occurs.

The official contact domain, real registration persistence, verification and secure uploads are future work. They are not prerequisites for this disclosed exhibition demo.
