# Karthik Vijay (Veer) — Portfolio v2

A high-end, interactive, neo-brutalist **multi-page** personal portfolio.
Built with **Vite + React + TypeScript + React Router + Tailwind CSS v4 +
Framer Motion**, with a lightweight, lazily-loaded **three.js** particle
backdrop in the hero.

This is v2: the original single-page build merged with the real content
depth from the old HTML portfolio (`Portfolio.zip`) — real projects,
real certificates (with images), real journey/education facts, and
dedicated routes instead of modals.

> **Before you ship this:** a few fields still need your input. See
> "Placeholders to replace" below — everything is flagged with a comment
> in the data files too.

---

## Tech stack

| Layer        | Choice                                    | Why |
|--------------|--------------------------------------------|-----|
| Build tool   | Vite 8                                     | Fast dev server, small, modern code-splitting |
| UI           | React 19 + TypeScript                      | Type-safe, component-based |
| Routing      | React Router 7                             | Real routes per page, lazy-loaded per route |
| Styling      | Tailwind CSS v4 (`@theme`, CSS variables)  | Fast iteration, design tokens as CSS vars |
| Motion       | Framer Motion                              | Scroll-linked transforms, layout animations, `prefers-reduced-motion`-aware |
| 3D           | three.js (vanilla, dynamically imported)   | Kept out of React's render loop and out of the initial bundle — loads only when the hero mounts and WebGL + motion are both available |

No React Three Fiber: a single rotating particle field doesn't need a
scene-graph abstraction, and vanilla three.js keeps lifecycle/disposal
fully explicit and the bundle smaller.

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build       # type-checks, then builds to dist/
npm run preview     # serve the production build locally
```

Node 18+ recommended.

---

## Routes

| Path                | Page              | Notes |
|----------------------|-------------------|-------|
| `/`                  | Home              | Hero, Who Am I, Project Universe, Creative Universe, Contact — an introduction, not the whole site |
| `/about`             | About             | Full bio, stats, identity nodes, Anant Vyuha teaser |
| `/journey`           | Journey           | Full timeline |
| `/projects`          | Projects hub      | All technical projects |
| `/projects/:id`      | Project detail    | HealthLens, CareerIQ, TraceCam, … — problem/solution/features/tech/links |
| `/creative`          | Creative hub      | All creative universes |
| `/creative/:id`      | Creative detail   | Khwaab, Dashavatar, PanchTatva, … |
| `/anant-vyuha`       | Anant Vyuha       | Full brand/universe manifesto |
| `/skills`            | Skills            | Capability map |
| `/certificates`      | Certificates      | Certificate archive with real images, click-through gallery |
| `/now`               | Now               | Currently building/learning/exploring |
| `/contact`           | Contact           | Contact form |
| `*`                  | 404               | Falls back to a brutalist "not found" page |

Every page below Home is lazy-loaded (`React.lazy` + `Suspense` in
`App.tsx`) so the initial bundle only pays for what the landing page
needs. `_redirects` (Netlify) and `vercel.json` are included so a hard
refresh on `/projects/healthlens` works on static hosting — if you
deploy elsewhere, make sure your host rewrites unknown paths to
`index.html`.

---

## Architecture

```
src/
├── data/            ← EDIT HERE to change site content
│   ├── types.ts            Typed content models
│   ├── siteConfig.ts        Name, tagline, email, URL
│   ├── profile.ts           Bio + "Who Am I" identity nodes + stats
│   ├── timeline.ts          "My Journey" entries
│   ├── projects.ts          Technical projects (HealthLens, CareerIQ, TraceCam…)
│   ├── creativeProjects.ts  Creative universe (Khwaab, Dashavatar, PanchTatva…)
│   ├── anantVyuha.ts        Anant Vyuha manifesto copy
│   ├── skills.ts            Capability map
│   ├── certificates.ts      Certificate archive, each with real image(s)
│   ├── currentlyBuilding.ts "Currently" building/learning/exploring
│   └── socials.ts           Social links
├── components/       Reusable UI: Nav, CustomCursor, MagneticButton,
│                      SectionLabel, PageWrapper, NotFoundInline,
│                      HeroCanvas, accentClasses
├── sections/          One file per content block (Hero, IdentityMap,
│                      Journey, ProjectUniverse, CreativeUniverse,
│                      SkillMap, NowSection, Contact, Footer) — reused
│                      across Home and the dedicated routes
├── pages/             One file per route (Home, About, JourneyPage,
│                      ProjectsPage, ProjectDetail, CreativePage,
│                      CreativeDetail, AnantVyuha, SkillsPage,
│                      CertificatesPage, NowPage, ContactPage, NotFound)
├── three/             HeroField.ts — the vanilla three.js particle system
├── hooks/             useReducedMotion, useDeviceCapability, useInView
└── styles/index.css   Design tokens (@theme) + brutalist primitives
```

### The data-driven contract

Every section reads from `src/data/`. **Add, edit, or remove an entry and
the UI follows automatically** — no component edits required:

- Add a project to `projects.ts` → a new card appears in Project Universe.
- Remove every entry from `certificates.ts` → the whole Certificates
  section disappears (it already does today — it starts empty).
- Leave a project's `links.github` empty → that button simply isn't
  rendered, instead of linking nowhere.
- A longer `description` just wraps — cards use natural flex/grid sizing,
  nothing is hardcoded to a fixed number of items or a fixed card height.

To add a new technical project, open `src/data/projects.ts` and add an
object matching the `TechnicalProject` interface in `types.ts`. Same
pattern for every other data file.

---

## Placeholders still to replace

Most of these are now filled with real content pulled from the old
portfolio (`Portfolio.zip`) and from existing `src/data/` — nothing
here is invented. What's still genuinely missing:

- **`src/data/socials.ts`** — only GitHub (`github.com/kartik-108`) was
  found in the old portfolio. Add LinkedIn/Instagram once you have real
  URLs — don't fill them with placeholders.
- **`src/data/projects.ts`** — HealthLens now has real problem/solution/
  features from the old synopsis. `links.github` / `links.live` are
  still empty for every project — add the real repo/demo URLs when
  ready (buttons auto-appear once a link is present).
- **`src/data/creativeProjects.ts`** — Khwaab has full real detail;
  Dashavatar and PanchTatva still carry the lighter placeholder
  synopses from the old portfolio (that's genuinely all the content
  that existed there — expand once you have more to add).
- **`src/data/profile.ts`** — the `stats` array are still placeholder
  numbers (projects shipped, comic pages, etc.) — swap for real ones.
- **Project/creative screenshots** — no image galleries were wired in
  yet (`images: []` in the types). Certificates already use real
  images (`public/assets/certificates/`); project/creative visuals are
  the next thing to add once you have exportable art/screens.
- **Resume** — the old portfolio's resume file was empty/placeholder,
  so nothing was carried over; add a real PDF under `public/` and link
  it from `/about` or `/contact` when ready.

## Contact form backend

The contact form submits to the Vercel serverless function at
`/api/contact`, which sends mail through Resend. Configure these server-only
variables in `.env` for local development and in the Vercel project settings
for production:

```text
RESEND_API_KEY=your_resend_api_key_here
CONTACT_TO_EMAIL=your-email@example.com
CONTACT_FROM_EMAIL=Portfolio <contact@yourdomain.com>
```

Run `npx vercel dev` to test the frontend and `/api/contact` together
locally. The API validates the name, email, and message, and never exposes
the Resend key to the browser.

---

## Performance

- Hero's three.js module is **dynamically imported** — it's not in the
  initial JS bundle, so first paint doesn't wait on it. It mounts only
  if WebGL is available and `prefers-reduced-motion` is off.
- Particle count and pixel ratio scale down automatically on low-power
  devices (`useDeviceCapability` checks `hardwareConcurrency`,
  `deviceMemory`, and touch/viewport heuristics).
- The three.js render loop pauses when the tab is hidden
  (`visibilitychange`); `HeroField.setVisible` is there to extend the
  same pause behavior to scroll-out-of-view if you wire it to an
  IntersectionObserver later.
- Framer Motion's `whileInView` + `viewport={{ once: true }}` means
  scroll animations run once, not on every re-render.
- `three` and `framer-motion` are split into their own chunks
  (`vite.config.ts` → `manualChunks`) so neither blocks the other.
- Images aren't used anywhere yet (no project screenshots supplied) —
  when you add them to `images: []` arrays, serve WebP/AVIF and keep
  them reasonably sized; add `loading="lazy"` if you build an `<img>`
  renderer for them.

Run `npm run build` and check the printed bundle sizes/gzip figures if
you want to track this over time.

---

## Accessibility

- Semantic headings (`h1`–`h4`), `<label htmlFor>` on every form field,
  `aria-label`/`aria-expanded` on icon-only controls (mobile menu,
  modal close buttons).
- Respects `prefers-reduced-motion`: the three.js hero and Framer Motion
  scroll transforms are skipped/disabled; CSS also disables smooth
  scrolling.
- Custom cursor is disabled entirely on touch devices
  (`body.touch-device`), and every interactive element still has normal
  focus/hover behavior underneath it — the cursor is cosmetic only.
- Contrast: off-white text (`--color-paper`) on near-black
  (`--color-ink`) throughout; accent colors are used for labels/borders,
  never as the only carrier of meaning.

## WebGL fallback

If WebGL isn't available (or motion is reduced), `HeroCanvas` renders a
static CSS radial-gradient background instead of a broken `<canvas>` —
see `src/components/HeroCanvas.tsx`.

## Responsive behavior

Mobile gets the same content with simplified interaction: the custom
cursor and magnetic-button pull are desktop-only (through `isTouch`
checks and `pointerType` checks), the hero particle count and pixel
ratio drop automatically, and layouts collapse from multi-column grids
to single-column stacks via Tailwind breakpoints.

---

## Deployment

The frontend is built to `dist/` by `npm run build`. Deploy the project to
Vercel (rather than only uploading `dist/`) to run the `/api/contact`
serverless function. Add `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and
`CONTACT_FROM_EMAIL` to the Vercel project environment settings before
production deployment.

---

## What's intentionally scoped down from "ideal"

In the interest of shipping something real and tested rather than an
unfinishable spec, a few things from the original brief are simplified:

- **One shared detail-page template** is used for all Technical projects,
  and a second shared template for all Creative projects — rather than a
  bespoke visual language per project (medical-data visuals for
  HealthLens, OCR/resume visuals for CareerIQ, a camera/tracing scene for
  TraceCam, a cosmic/mythology scene for Dashavatar, a sci-fi protocol
  scene for PanchTatva). Real per-project visual identity is a multi-week
  production per project; this version gets you real routes, real
  content, and a working, data-driven, good-looking site now. Each
  template can be split into its own bespoke component later without
  touching the data layer — `ProjectDetail.tsx` / `CreativeDetail.tsx` are
  the two files to fork.
- **Journey** is a horizontal-scroll card rail rather than a pinned,
  camera-driven 3D corridor — same "past → present → future" read, far
  less engineering risk.
- **Khwaab** doesn't yet have a horizontal comic-panel reader — its
  detail page shows the real story content from the old portfolio. A
  dedicated panel-by-panel reader is a good follow-up once you have page
  art ready to feed it.
- **Certificates** get a real click-through image gallery (including all
  12 MongoDB module certificates); project/creative work doesn't have
  image galleries yet since no screenshots/art files were supplied.
- **CareerIQ** is kept honest as "Early concept" — the old portfolio had
  no CareerIQ project at all, so nothing beyond what was already in this
  codebase's placeholder (Resume Studio / ATS / OCR / RAG / interview
  practice) is claimed as built.
