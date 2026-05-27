# Gainday

**Built for proof, not paper.**

Gainday is an early-career hiring platform that replaces CV-first screening with role-based challenges. Candidates demonstrate real capability through short, structured tasks. Employers receive a ranked shortlist based on demonstrated performance — not formatting or buzzwords.

> Now in early access · London, 2026

---

## What it does

- Candidates complete a **role-specific challenge** (45–90 min) as their application
- Submissions are scored against structured, role-specific criteria with human oversight
- Employers see a **ranked list of candidates** who've already shown they can do the work
- CVs are used as supporting context — not the primary filter

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Inline CSS via `<style>` tag, CSS custom properties |
| Font | Raleway (Google Fonts) — weights 200–800 |
| Animations | CSS transitions + IntersectionObserver (no library) |
| Routing | Next.js `Link` component |

---

## Project structure

```
app/
├── page.tsx                  # Main landing page
├── candidates/
│   └── page.tsx              # Candidate waitlist page
├── employers/
│   └── page.tsx              # Employer waitlist page
└── components/
    └── WaitlistPage.tsx      # Shared waitlist layout + email form
```

---

## Pages

### `/` — Landing page
Full marketing page covering:
- Hero with P&L demo challenge card
- Social proof ticker
- How it works (3 feature cards + callout)
- 3-minute challenge demo with interactive memo card
- Audience split (candidates / employers)
- FAQ
- Dark CTA band
- Footer

### `/candidates` — Candidate waitlist
Waitlist page for job seekers. Includes email form with validation, loading state, and success confirmation.

### `/employers` — Employer waitlist
Waitlist page for hiring teams. Same form component, employer-specific copy and detail panel.

---

## Brand spec

| Token | Value | Use |
|---|---|---|
| `--ink` | `#0A0A0A` | Primary text, buttons, dark cards |
| `--ink-2` | `#2B2B2B` | Secondary text, light subheads |
| `--ink-3` | `#5A5A5A` | Body subtle, metadata |
| `--ink-4` | `#8A8A8A` | Captions, micro-copy |
| `--line` | `#E6E6E6` | Hairline dividers |
| `--line-2` | `#D0D0D0` | Stronger borders, pill outlines |
| `--tint` | `#F6F6F6` | Strip backgrounds, card heads |
| `--tint-2` | `#F0F0F0` | Hover tint |

No accent colour. The brand is intentionally black and white — contrast does all the work.

**Typography:** Raleway across all weights. Display headings use `700/300` weight pairing on the same line for editorial rhythm. Letter-spacing tightened on display (`-0.02` to `-0.03em`), opened on uppercase eyebrows (`+0.12` to `+0.18em`).

---

## Getting started

```bash
# Clone the repo
git clone https://github.com/Jobstacktalentsolutions/Gainday.git
cd Gainday

# Install dependencies
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Connecting the waitlist form

The email form in `WaitlistPage.tsx` currently simulates a submission. To wire it up to a real endpoint, replace the stub in the `handleSubmit` function:

```ts
// app/components/WaitlistPage.tsx
async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  if (!isValid) return;
  setStatus("loading");

  // Replace this with your actual endpoint
  await fetch("/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, variant }), // variant: "candidates" | "employers"
  });

  setStatus("success");
}
```

You can route submissions to Mailchimp, Loops, Resend, Airtable, or any API endpoint.

---

## Scripts

```bash
npm run dev        # Start development server (port 3000)
npm run build      # Production build
npm run start      # Run production build locally
npm run lint       # Run ESLint
npx tsc --noEmit   # Type-check without building
```

---

## Deployment

The project is a standard Next.js app and deploys to Vercel with zero configuration.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect the GitHub repo directly in the [Vercel dashboard](https://vercel.com) for automatic deployments on every push to `main`.

---

## Roadmap

- [ ] Wire waitlist form to email provider (Loops / Mailchimp)
- [ ] Add `/api/waitlist` route handler
- [ ] Build `/challenge` page with full Google Form embed or native form
- [ ] Add mobile navigation drawer
- [ ] Implement challenge submission and scoring flow
- [ ] Employer dashboard — view ranked candidate submissions

---

## Licence

Private. © 2026 Gainday Ltd. All rights reserved.
