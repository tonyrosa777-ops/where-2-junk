# progress.md — Where2 Junk Removal Services LLC Website Build

**Project:** where2junk.com — new website build
**Client:** Where2 Junk Removal Services LLC | Manchester, NH
**Business Type:** Local residential & commercial junk removal service
**Launch Target:** ASAP — April 2026
**Last Updated:** 2026-04-04
**Current Phase:** Phase 3 — Design System + Hero (next up)

---

## Phase Overview

| Phase | Name | Status |
|-------|------|--------|
| 0 | Project Initialization | ✅ Complete |
| 1 | Research + Design System | ✅ Complete |
| 2 | Scaffold | ✅ Complete |
| 3 | Design System + Hero | ⬜ Not Started |
| 4 | Homepage Sections | ⬜ Not Started |
| 5 | Core Pages | ⬜ Not Started |
| 6 | Niche-Specific Pages | ⬜ Not Started |
| 7 | Blog | ⬜ Not Started |
| 8 | Shop | ⬜ Not Started |
| 9 | Booking | ⬜ Not Started |
| 10 | SEO + AEO | ⬜ Not Started |
| 11 | Infrastructure | ⬜ Not Started |
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
