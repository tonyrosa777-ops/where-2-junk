# progress.md — Where2 Junk Removal Services LLC Website Build

**Project:** where2junk.com — new website build
**Client:** Where2 Junk Removal Services LLC | Manchester, NH
**Business Type:** Local residential & commercial junk removal service
**Launch Target:** ASAP — April 2026
**Last Updated:** 2026-04-04
**Current Phase:** Phase 12 — Assets (next up)

---

## Phase Overview

| Phase | Name | Status |
|-------|------|--------|
| 0 | Project Initialization | ✅ Complete |
| 1 | Research + Design System | ✅ Complete |
| 2 | Scaffold | ✅ Complete |
| 3 | Design System + Hero | ✅ Complete |
| 4 | Homepage Sections | ✅ Complete |
| 5 | Core Pages | ✅ Complete |
| 6 | Niche-Specific Pages | ✅ Complete |
| 7 | Blog | ✅ Complete |
| 8 | Shop | ⬜ Not Started |
| 9 | Booking | ⬜ Not Started |
| 10 | SEO + AEO | ✅ Complete |
| 11 | Infrastructure | ✅ Complete |
| 12 | Assets | ⬜ Not Started |
| 13 | Pre-Launch Audit | ⬜ Not Started |
| 14 | Client Revision Pass | ⬜ Not Started |
| 15 | Close | ⬜ Not Started |

---

## Custom Builds (beyond base template)

| Feature | Description | Status |
|---------|-------------|--------|
| Service area pages | /areas/[city] slug pages — Manchester, Nashua, Concord, Bedford, Hooksett, Goffstown + more | ⬜ |
| Sticky call bar | Persistent "Call Now" + "Book Online" bar — pattern from codys-complete-junk-removal | ⬜ |
| Quote/text-estimate form | "Text us a photo" CTA pattern — QuoteForm.tsx from ref repo | ⬜ |

---

## Reference Repo

- **tonyrosa777-ops/codys-complete-junk-removal** — same vertical (junk removal), Calendly inline widget, service area slugs, StickyCallBar, QuoteForm, StatsCounter all usable as implementation models

---

## Key Decisions

| Decision | Rationale | Date |
|----------|-----------|------|
| Calendly for booking | Client confirmed — inline embed, never redirect | 2026-04-04 |
| Launch ASAP | Client-confirmed priority | 2026-04-04 |
| No shop | Junk removal service business — no merchandise | 2026-04-04 |
| Calendly widget pattern | Vanilla script inject (not react-calendly package) — from reference repo | 2026-04-04 |

---

## Open Blockers

| Blocker | Impact | Owner |
|---------|--------|-------|
| Calendly URL not set up | /booking page needs NEXT_PUBLIC_CALENDLY_URL | Joshua (client) |
| Photography unknown | Hero + about images TBD — fal.ai applies until received | Joshua (client) |
| Instagram handle unknown | Footer social links | Joshua (client) |
| Budget not confirmed | Tier selection (Starter/Pro/Premium) | Anthony |

---

## Session Log

### Session 1 — 2026-04-04
**Completed:**
- Phase 0A: CLAUDE.md — all 10 variables filled
- Phase 0B: progress.md created (this file)
- Phase 0C: .claude/commands/prime.md saved (543 lines, 0 unfilled variables)
- initial-business-data.md updated with client answers (booking = Calendly, launch = ASAP, goal = self-booking)
- Reference repo tonyrosa777-ops/codys-complete-junk-removal analyzed (CalendlyWidget, StickyCallBar, QuoteForm patterns noted)

**Discovered:**
- No competitor in Manchester proper combines transparent pricing + real-time online booking — this is the gap
- Calendly widget best implemented via vanilla script inject (not react-calendly package) per reference repo
- Service area pages are critical for NH local SEO — minimum 6 cities
- Client has 1 existing blog post (Jan 15, 2026) — seed content for blog

**Decisions Made:**
- Calendly inline embed (never href/redirect)
- Shop = NO (junk removal service, not retail)
- Service area pages = YES (local SEO requirement)
- fal.ai for all imagery until client provides real photos

**Next Session Starts At:** Stage 1C — content-writer agent (fills site.ts) + animation-specialist agent (Hero animation) — run in parallel

**Scaffold deliverables committed:**
- 50 files, 2 commits, pushed to github.com/tonyrosa777-ops/where-2-junk
- Next.js 16 + Tailwind 4, TypeScript strict, 0 build errors

### Session 2 — 2026-04-04 (animation-specialist subagent)
**Completed:**
- Hero animation selected: SVG Lightning Bolts + CSS speed lines + pulse rings (adapted from codys-complete-junk-removal HeroEffects.tsx, recolored to brand CSS vars)
- `src/components/sections/HeroEffects.tsx` created — client component, "use client" first token, `prefers-reduced-motion` guard, CSS var-only colors
- `src/components/sections/Hero.tsx` created — server component, two-column desktop / single-column mobile layout, `.hero-item-*` entrance animations, owner photo placeholder
- `src/app/globals.css` extended — boltFlicker, particleFloat, ringPulse, glowBreathe, arcDash, scanLine keyframes added
- `src/app/page.tsx` wired — Hero imported and rendered as Section 1

**Discovered:**
- Design system Section 8 confirms Explosive/Kinetic axis — SVG lightning is correct over Forge canvas (wrong register: making vs removing things)
- Build-log error #9 confirmed: "use client" absolute first token (Turbopack)
- Build-log error #8 confirmed: framer-motion v12 named ease strings only — hero animations use CSS keyframes only (no Framer Motion), avoids this class of error
- CSS custom properties used as animation params (--dur, --delay, --p-opacity) on individual elements — allows per-element timing without JS

**Stage 1C Complete — 2026-04-04**
- content-writer: site.ts fully populated, 32 testimonials, 0 [FILL] strings, 0 em dashes in string values
- animation-specialist: HeroEffects.tsx (SVG lightning + pulse rings), Hero.tsx (2-col desktop layout)
- Hero H1: "Manchester's Only Junk Hauler With Upfront Prices and Same-Day Pickup"
- Committed: bc00534 (content), c718b49 (animation), pushed to origin/main

**Confirm with Joshua before launch:**
- Email: using hello@where2junk.com placeholder
- Stats: 500+ jobs, 100% satisfaction (LOW CONFIDENCE — no source data)
- Hours: Mon-Sat 7am-7pm, Sun by appointment (LOW CONFIDENCE — assumed)
- Photography: fal.ai placeholders throughout until real photos received

### Session 3 — 2026-04-04 (Stage 1D complete)
**Completed:**
- Agent 1: Header.tsx (sticky dark nav, services dropdown), MobileNav.tsx (slide-out drawer), Footer.tsx (4-col: brand/services/areas/contact), StickyCallBar.tsx (mobile fixed bottom bar)
- Agent 2: TrustBar.tsx (4 trust signals strip, bg-elevated), HowItWorks.tsx (4 numbered steps with ghost numbers)
- Agent 3: ServicesGrid.tsx (2x2 grid, StaggerContainer, icon map), WhyChooseUs.tsx (4 icon cards, FadeUp stagger)
- Agent 4: StatsCounter.tsx (red accent band, CountUp, grid-cols-4), AboutTeaser.tsx (2-col, photo placeholder, faith statement)
- Agent 5: TestimonialsCarousel.tsx (embla-carousel, 4 featured, auto-advance 6s, dot indicators)
- Agent 6: BlogPreview.tsx (3 post cards, placeholder slots), FinalCTABanner.tsx (red accent band, white CTAs)
- Agent 7: QuizCTA.tsx (4 option pills → /quiz), BookingTeaser.tsx (CalendlyWidget inline)
- Orchestrator: page.tsx wired with all 12 sections in order, layout.tsx gets Header+Footer+StickyCallBar
- Build fixes: Facebook icon (lucide-react removed it, replaced with inline SVG), FinalCTABanner + Footer missing 'use client', staggerItem ease cast to cubic bezier
- Commit 2259a0f pushed to tonyrosa777-ops/where-2-junk

**Build status:** 27 routes clean, 0 TypeScript errors

### Session 4 — 2026-04-04 (Phase 5 complete)
**Completed:**
- About page: hero, story (2-col w/ photo placeholder), values grid, faith statement, CTA
- Booking page: hero, CalendlyWidget (graceful fallback), phone row, trust strip
- Services index: hero, StaggerContainer card grid (ServicesCardGrid.tsx client component), CTA
- Services [slug]: SSG ×4, service hero, features grid, ServiceFAQAccordion (client), CTA
- Contact: server+client split (ContactClient.tsx), contact form → /api/contact, info panel, map placeholder
- FAQ: server+client split (FAQClient.tsx), AnimatePresence accordion (8 items)
- Testimonials: server+client split (TestimonialsClient.tsx), featured quote, filter bar, paginated grid 8/page
- Quiz: 4-step state machine (multiSelect pills → singleSelect cards × 2 → lead capture → result), /api/quote POST
- Fixed: /api/contact Zod schema swapped phone/email required — phone now required, email optional (correct for local service biz)
- Commit 248ad7e pushed to tonyrosa777-ops/where-2-junk

**Build status:** 27 routes clean, 0 TypeScript errors — first try

**Next Session Starts At:** Phase 6 — Niche-Specific Pages (service area pages /areas/[city])
- 27 routes build clean (static + SSG + dynamic)
- Design tokens: red/black/white motorsport palette, Barlow Condensed + Barlow + JetBrains Mono
- 8 animation wrappers (FadeIn, FadeUp, SlideIn, ScaleIn, StaggerContainer, CountUp, ParallaxWrapper, RevealText)
- UI primitives: Button, Card, Badge, CalendlyWidget (vanilla script), StickyCallBar
- src/data/site.ts: full schema, 0 hard-coded strings in components
- All 8 NH service area slugs pre-built (Manchester, Nashua, Concord, Bedford, Hooksett, Goffstown, Londonderry, Merrimack)
- vercel.json: rootDirectory = where2junk
- .env.local.example: Calendly URL, Resend, Google Maps

**Build note:** Zod v4 uses `.issues` not `.errors` — fixed and logged.

**Blockers:**
- Calendly URL: Joshua needs to create account + booking type (blocks /booking live wiring)
- Photography: fal.ai applies until Joshua provides job photos + headshot
- Instagram handle: unknown (conditional component not activated)

### Session 5 (continued) — Phase 11 complete
**Completed:**
- `resend` npm package installed
- `/api/contact` wired: sends email to `RESEND_NOTIFICATION_EMAIL` (default `hello@where2junk.com`) when contact form submits
- `/api/quote` wired: sends email with name, phone, email, job description on quiz quote submission
- Both routes: graceful no-op when `RESEND_API_KEY` is unset (build/dev works without it)
- `.env.local.example` updated with `RESEND_NOTIFICATION_EMAIL` and `RESEND_FROM_EMAIL` vars
- Build: 39 pages, 0 TS errors

**For Joshua to activate:** Create Resend account at resend.com, verify where2junk.com domain, add `RESEND_API_KEY` to Vercel env vars.

### Session 5 — 2026-04-04 (Phase 10 complete)
**Completed:**
- Agent 1: `src/app/sitemap.ts` (new) — covers all static pages, service slugs, area slugs, blog posts; /pricing excluded
- Agent 1: `src/app/robots.ts` (new) — allows all, disallows /pricing and /api/
- Agent 1: `src/app/layout.tsx` — openGraph extended with OG image (1200x630); twitter card added
- Agent 2: `src/app/page.tsx` — LocalBusiness+HomeAndConstructionBusiness + WebSite JSON-LD before Hero
- Agent 2: `src/app/blog/[slug]/page.tsx` — Article JSON-LD before article header
- Agent 2: `src/app/faq/page.tsx` — FAQPage JSON-LD from siteData.faq; file rewritten to wrap FAQClient in fragment
- Agent 2: `src/app/services/[slug]/page.tsx` — Service JSON-LD before service hero section
- Build: 39 pages, 0 TypeScript errors

**Next Session Starts At:** Phase 11 — Infrastructure (Resend wiring for /api/contact and /api/quote)
**Blockers (unchanged):**
- Calendly URL — Joshua
- Photography — Joshua
- Instagram handle — Joshua
