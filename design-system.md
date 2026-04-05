# design-system.md
# Where2 Junk Removal Services LLC
# Generated: 2026-04-04
# Sources: initial-business-data.md + market-intelligence.md

---

## Section 1 — Brand Identity Statement

Where2 Junk Removal Services LLC is Manchester, NH's own junk removal company -- owner-operated by Joshua Ortega, anchored at 181 Beech Hill Avenue, and the only junk hauler in this market with a real city-center address. The brand is built on three pillars that no competitor combines: ruthless speed (the audience's #1 desire), total pricing transparency (the market's #1 unmet demand), and a faith-grounded work ethic that signals personal accountability over franchise polish. The visual language is motorsport -- bold red, charcoal black, white; heavy condensed block type; speed-line accents -- communicating that this crew moves fast, takes every job, and doesn't mess around. Within 5 seconds a visitor should feel: *these guys will show up, haul it all, and tell me exactly what it costs.* Where2 Junk is NOT a green eco-template site, NOT a multi-state franchise, and NOT a corporate-quiet operator hiding behind a contact form. It is a pit-crew brand: high contrast, high energy, and personally accountable.

Source: market-intelligence.md Section 1 (executive summary + differentiation gap), Section 8 (visual landscape + motorsport opportunity); initial-business-data.md Section 4 (brand values, tagline, visual references).

---

## Section 2 — Color Palette

**Theme decision: DARK.** The motorsport aesthetic and competitive differentiation both demand a dark base. Every competitor uses white backgrounds. Trash King's dark theme (8/10 design quality) is the closest proof point -- their dark design outperforms all green-template competitors visually. Where2 Junk's dark theme is higher-contrast and more aggressive than Trash King's gold/charcoal. The red-on-black combination signals speed and urgency -- exactly what the audience wants ("I needed everything empty...FAST!!").

Source: market-intelligence.md Section 8 (dominant green palette = differentiation opportunity; Trash King dark theme = proof of concept); initial-business-data.md Section 4 (colors: #CC0000/#D72B2B, #1A1A1A, white).

```css
:root {
  /* Brand Colors */
  --primary: #D72B2B;
  /* Usage: Primary CTAs, key interactive elements, "Book Now" and "Get a Quote" buttons,
     active nav states, selected form states, badge borders on trust signals.
     Source: initial-business-data.md Section 4 -- client's existing brand red (~#CC0000/#D72B2B). */

  --primary-muted: rgba(215, 43, 43, 0.55);
  /* Usage: Hover overlays, ghost button borders and text, form focus rings,
     pricing tier card borders on non-featured tiers, decorative speed-line accents. */

  --accent: #FF4444;
  /* Usage: Hover state for primary buttons (lighter red to show interactivity),
     urgency callouts ("Same-Day Available" badge), pricing anchor numbers,
     notification dots. Slightly brighter than --primary to create clear hover signal.
     NOTE: This is NOT a second brand color -- it is a hover/alert escalation of primary.
     Source: motorsport palette logic (brighter highlight from base red). */

  /* Background Scale (dark theme) */
  --bg-base: #0F0F0F;
  /* Usage: Page background, hero section, overall canvas.
     Slightly warmer than pure black to prevent harshness; cooler than #1A1A1A to give
     bg-elevated visible contrast. */

  --bg-elevated: #1A1A1A;
  /* Usage: Navigation bar, footer, full-bleed secondary sections (about, stats bars).
     This is the client's existing brand background value -- kept for brand consistency. */

  --bg-card: #242424;
  /* Usage: Service cards, testimonial cards, pricing tier cards, form containers, FAQ
     accordion panels. One step lighter than --bg-elevated for legible card separation. */

  /* Text Scale */
  --text-primary: #F5F5F5;
  /* Usage: All body copy, card body text, form labels.
     Slightly off-white reduces harsh contrast on dark screens (accessibility + comfort). */

  --text-secondary: rgba(245, 245, 245, 0.72);
  /* Usage: Supporting copy under section headlines, card subtitles, pricing subtext,
     footer secondary links. */

  --text-muted: rgba(245, 245, 245, 0.42);
  /* Usage: Placeholder text in form fields, date/timestamp metadata, fine-print copy,
     inactive nav links, legal disclaimers. */
}
```

### Color decision rationale

Every top-3 competitor (Trash Can Willy's, Trash King, LoadUp) uses green, dark charcoal/gold, or blue/white respectively. One Call Junk Haul is the closest to red but executes it poorly (6.5/10 design score). A bold red-on-near-black site with motorsport aesthetic has zero direct visual competition in this market. The dark theme is confirmed correct by: (1) Trash King's 8/10 rating with the only dark design in the market, (2) the motorsport reference in initial-business-data.md Section 4 -- motorsport branding is inherently dark, (3) the audience persona (Karen Mercier, Dave Ouellette) -- this is blue-collar urgency, not organic softness.

---

## Section 3 — Typography System

**Brand direction:** Heavy condensed block type -- all-caps display, punchy, no-apology. No competitor uses this style. In a market of standard WordPress sans-serifs (Roboto, Open Sans variants), condensed block type is a pure visual differentiator. Source: initial-business-data.md Section 4 ("heavy condensed sans-serif, all-caps block style on card -- similar to Impact, Bebas Neue"); market-intelligence.md Section 8 ("typography across the market is uniformly sans-serif, bold headers, standard WordPress theme fonts -- no competitor uses condensed block typography").

### font-display (Headlines)

| Property | Value |
|----------|-------|
| Font | Barlow Condensed |
| Google Fonts URL | https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&display=swap |
| Weights | 700 (section subheads), 800 (service card titles), 900 (hero headline, H1) |
| Style | All-caps (`text-transform: uppercase`) on hero and H1; title-case on H2/H3 |
| Sizes | Hero (H1): clamp(3.5rem, 8vw, 7rem) / Section H2: clamp(2rem, 4vw, 3.25rem) / Card H3: clamp(1.25rem, 2.5vw, 1.75rem) |
| Tracking | H1: -0.02em / H2: -0.01em / H3: 0 |

**Why Barlow Condensed over Bebas Neue:** Barlow Condensed has true lowercase letters (Bebas is caps-only), enabling mixed-case headlines without font switching. Weight range 700-900 provides the bold aggressive quality of Impact/Bebas without the compromises. Bebas Neue is acceptable as a fallback if branding materials confirm it.

### font-body (Paragraphs)

| Property | Value |
|----------|-------|
| Font | Barlow |
| Google Fonts URL | https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&display=swap |
| Weights | 400 (body), 500 (emphasized body, card copy), 600 (call-outs, bold in body) |
| Sizes | Body: 1rem (16px) / Lead paragraph: 1.125rem / Small: 0.875rem |
| Line height | 1.6 for body / 1.4 for lead |

**Why Barlow for body:** Same font family as display creates typographic cohesion without importing a second family. Barlow regular is a clean geometric sans -- readable, neutral, works well at small sizes. The extended font family pattern (condensed display + regular body from same family) is a proven pattern from the motorsport/athletic brand playbook.

### font-mono (Labels/UI)

| Property | Value |
|----------|-------|
| Font | JetBrains Mono |
| Google Fonts URL | https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap |
| Weights | 400 (eyebrow labels), 500 (pricing numbers, stat counters, phone numbers) |
| Sizes | Eyebrow: 0.75rem (12px) all-caps + 0.12em tracking / Stat numbers: clamp(2rem, 4vw, 3.5rem) |
| Usage | Section eyebrow labels ("OUR SERVICES"), pricing tier numbers, stat counter digits (pounds hauled, jobs completed), phone number in header, code/data display |

**Why JetBrains Mono for labels:** Mono fonts give pricing numbers and phone numbers a mechanical, precise quality that reinforces the "transparent pricing" brand promise. The technical/mechanical feel contrasts with the aggressive display type in a way that reads as "no-nonsense, exact." This is consistent with the motorsport aesthetic (scoreboards, lap timers, telemetry data).

### CSS font-family declarations (globals.css)

```css
:root {
  --font-display: 'Barlow Condensed', 'Impact', sans-serif;
  --font-body: 'Barlow', 'Helvetica Neue', Arial, sans-serif;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;
}
```

---

## Section 4 — Spacing & Layout System

Source: website-build-template.md (design tokens + directory structure); frontend-design.md (spatial composition principles); mobile-first breakpoint mandate from CLAUDE.md.

### Container widths

```css
:root {
  --container-max: 1200px;       /* Full content width -- service pages, blog, pricing */
  --container-wide: 1440px;      /* Hero full-bleed sections, stats banners */
  --container-narrow: 760px;     /* Blog post content, long-form copy */
}
```

Tailwind equivalent: `max-w-[1200px]` / `max-w-[1440px]` / `max-w-[760px]`

### Section vertical padding

| Context | Mobile (390px) | Desktop (1200px+) |
|---------|---------------|-------------------|
| Standard section | `py-12` (48px) | `py-24` (96px) |
| Hero section | `pt-20 pb-16` (80px top, 64px bottom) | `pt-32 pb-28` (128px top, 112px bottom) |
| Compact section (trust bar, sticky CTA) | `py-4` (16px) | `py-5` (20px) |
| Footer | `py-12` (48px) | `py-16` (64px) |

### Card padding

```
Card body: p-6 (24px) on mobile / p-8 (32px) on desktop
Card image area: aspect-video (16:9) for service cards
```

### Grid system

| Grid use | Mobile | Tablet (768px) | Desktop (1200px) |
|----------|--------|----------------|------------------|
| Service cards | 1 column | 2 columns | 3 columns |
| Testimonials | 1 column | 2 columns | 3 columns |
| Stats bar | 2 columns | 4 columns | 4 columns |
| Pricing tiers | 1 column | 1 column | 3 columns |
| Blog grid | 1 column | 2 columns | 3 columns |

Tailwind classes: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

### Gutter

Standard gutter: `gap-6` (24px) on mobile, `gap-8` (32px) on desktop.

### Dark/light section rhythm

Follow build-log.md Build Patterns #8: plan dark/light alternation before building. Recommended rhythm:
- Hero: dark (`--bg-base`)
- Trust signal bar: dark elevated (`--bg-elevated`)
- Services: dark card (`--bg-card`) on dark base
- How It Works: dark base with red accents
- Pricing: dark elevated (featured tier uses red border)
- Testimonials: dark base
- CTA banner: red background (`--primary`) -- only full-red section
- Footer: dark elevated

No 3 consecutive same-background sections allowed without a visual break.

---

## Section 5 — Component Style Rules

Source: market-intelligence.md Section 7 (friction elimination, trust stack); initial-business-data.md Section 4 (bold, direct aesthetic); frontend-design.md (motion, hover states).

### Buttons

**Primary Button** (Book a Pickup, Get My Quote)
```
Background: --primary (#D72B2B)
Text: --text-primary (#F5F5F5), font-display, weight 700, uppercase, tracking 0.05em
Size: px-8 py-4 (desktop) / px-6 py-3 (mobile)
Shape: rounded-none (sharp corners -- motorsport aesthetic, no soft pill shapes)
Border: none
Hover: background escalates to --accent (#FF4444), scale(1.02) transition 150ms
Active: scale(0.98)
Focus: outline-2 offset-2 --primary-muted
Icon: Optional right arrow or checkered flag emoji before text on booking CTAs
Transition: all 150ms ease-out
```

**Secondary Button** (Learn More, See All Services)
```
Background: transparent
Text: --primary (#D72B2B), font-display, weight 700, uppercase, tracking 0.05em
Border: 2px solid --primary-muted
Shape: rounded-none
Hover: background --primary-muted (0.15 opacity red wash), border solid --primary
Transition: all 150ms ease-out
```

**Ghost Button** (Phone Call, Text Us)
```
Background: transparent
Text: --text-primary, font-body, weight 600
Border: 1px solid rgba(245,245,245,0.2)
Shape: rounded-none
Hover: border rgba(245,245,245,0.5), background rgba(245,245,245,0.06)
Transition: all 150ms ease-out
```

**Mobile sticky CTA bar** (always visible on mobile scroll)
```
Two buttons side-by-side: "Call Now" (ghost) + "Book Pickup" (primary)
Fixed bottom-0, full width, height h-14 (56px)
Background: --bg-elevated with border-top 1px --primary-muted
z-index: 50
Source: initial-business-data.md Section 5 (sticky bar reference); market-intelligence.md Section 7 (phone + CTA both above fold)
```

### Cards

**Service Card**
```
Background: --bg-card (#242424)
Border: 1px solid rgba(245,245,245,0.08) -- subtle light hairline
Border-hover: 1px solid --primary-muted
Shape: rounded-none (sharp corners throughout)
Image: aspect-video, object-cover, grayscale-[20%] filter, brightness on hover
Title: font-display weight 800, --text-primary, uppercase
Body: font-body weight 400, --text-secondary
CTA link: --primary color, font-body weight 600, underline on hover
Transition: border-color 200ms, shadow 200ms
Shadow-hover: 0 4px 24px rgba(215,43,43,0.15) -- red glow on hover
```

**Testimonial Card**
```
Background: --bg-card
Border-left: 3px solid --primary (red left accent bar)
Padding: p-6
Quote text: font-body weight 400, --text-secondary, italic
Attribution: font-body weight 600, --text-primary
Star rating: render as filled star SVGs, --primary color
Shape: rounded-none
```

**Pricing Tier Card**
```
Standard tier: --bg-card, border 1px rgba(245,245,245,0.08)
Featured tier (Pro): border 2px solid --primary, box-shadow 0 0 24px rgba(215,43,43,0.2)
"Most Popular" badge: background --primary, font-mono weight 500, uppercase, absolute top-right
Shape: rounded-none
Price number: font-mono weight 500, --text-primary, large (3rem)
Feature list: font-body weight 400, --text-secondary, checkmark icons in --primary
```

### Form Inputs

```
Background: rgba(255,255,255,0.06) -- barely-there white fill on dark bg
Border: 1px solid rgba(245,245,245,0.15)
Border-focus: 1px solid --primary
Text: --text-primary, font-body weight 400
Placeholder: --text-muted, font-body weight 400
Label: font-mono weight 500, --text-secondary, uppercase, tracking 0.08em, font-size 0.75rem
Shape: rounded-none (consistent with button/card sharp corners)
Error state: border --primary (red), error message --primary below field
Transition: border-color 150ms
```

**No math CAPTCHAs.** No complex validation on mobile. Source: market-intelligence.md Section 7 ("No math CAPTCHAs on forms -- Trash Bandits uses 'What is 28+37?' -- this kills conversions on mobile").

### Navigation

```
Position: sticky top-0, z-50
Background: --bg-elevated, border-bottom 1px rgba(245,245,245,0.08)
Logo: left-aligned, max-height 40px
Nav links: font-mono weight 500, --text-secondary, uppercase, tracking 0.08em, font-size 0.8rem
Nav link hover: --text-primary, no underline
Primary CTA ("Book Now"): primary button style, right-aligned, always visible
Phone number: font-mono weight 500, --primary color, clickable tel: link, center/right area
Mobile: hamburger icon (3 lines) → slide-in panel from right, full-height overlay
Mobile nav background: --bg-elevated, full overlay
```

---

## Section 6 — Photography & Media Direction

**Current status:** Client has NO photography. fal.ai generates all imagery until client provides real job photos (initial-business-data.md Section 4 confirmed: "⚠️ NOT FOUND -- confirm with client (no photos in source material; fal.ai default applies per Optimus policy)"). Build-log.md Pattern #4 confirms fal.ai prompt-driven generation as standard.

**Processing style:** High contrast, deep blacks, punchy reds where brand color appears in environment (red truck branding, red equipment). Natural outdoor lighting for "before" shots; clean reveal lighting for "after" shots. Not over-processed. Gritty realism over staged perfectionism. No soft pastel filters. No overhead drone shots. Eye-level, action-oriented, crew-forward.

Source: market-intelligence.md Section 8 ("no competitor has photography that conveys energy, speed, or personality -- every site feels utilitarian"; "action photography of the crew working fast would stop the scroll").

**Prohibited content:**
- Stock circular illustrations (M.A.D. Junk Man style -- explicitly called out as trust-negative in market-intelligence.md Section 7)
- Generic stock photography of strangers loading trucks
- Soft-focus lifestyle imagery (wrong brand register)
- Green color casts in imagery (visual confusion with competitors)
- Before photos only without corresponding afters (incomplete social proof)
- Any image that reads as staged or corporate

### Required shot types

**Hero image / background**
```
fal.ai prompt: "Action photograph of a two-person junk removal crew loading a red and black branded
pickup truck in a Manchester NH residential driveway on a bright day. The crew are focused and
moving fast, mid-action. One crew member carries a large cardboard box toward the truck,
the other reaches from inside the truck bed. Red brand logo visible on truck door. Clean
suburban house in background. High contrast, punchy saturation. Shot from slightly below
eye level, wide angle. Photorealistic. No stock photo feel."
```

**Service card images (4 needed: general junk, garage cleanout, yard waste, construction debris)**
```
fal.ai prompt [general junk]: "Before photo: a cluttered residential living room with old furniture,
cardboard boxes, and miscellaneous junk piled floor to ceiling. Dim interior lighting.
Shot from doorway. Photorealistic, slightly gritty, believable household clutter. No people."

fal.ai prompt [garage cleanout]: "Before photo: a packed two-car garage in suburban New Hampshire
completely filled with old appliances, furniture, boxes, yard equipment, and bicycles.
A single path leads to the back. Overhead shop lighting. Photorealistic, believable clutter."

fal.ai prompt [yard waste]: "Before photo: a residential backyard in New England with large piles
of branches, leaves, and brush debris following a storm. Wooden fence in background.
Early spring light. Photorealistic."

fal.ai prompt [construction debris]: "Before photo: a residential driveway with a large pile of
construction debris -- drywall fragments, lumber offcuts, shingles, and concrete chunks.
A renovation in progress is visible through the open front door. Photorealistic."
```

**About section (Owner photo stand-in until client provides headshot)**
```
fal.ai prompt: "Portrait photograph of a confident working-class man in his late 30s, Hispanic,
wearing a black work shirt with a red company logo. He is smiling naturally, standing in front
of a branded work truck. Manchester NH neighborhood visible in background. Natural light,
warm tones. Professional but not studio -- real working environment. High resolution."

NOTE: Replace immediately when client provides real photo of Joshua Ortega.
```

**After photos (corresponding to before shots above)**
```
fal.ai prompt [empty room]: "After photo: the same residential living room, completely empty and clean.
Hardwood or carpeted floor visible. Late afternoon light through window. A sense of space and
relief. Photorealistic. No people."
```

---

## Section 7 — Tone of Voice

Source: market-intelligence.md Section 2 (audience language verbatim), Section 7 (friction elimination); initial-business-data.md Section 4 (tagline "You Point, We Haul!", tone: bold, direct, blue-collar confident, action-oriented).

### Principle 1: Lead with the action, not the explanation

**Rule:** Every headline starts with what happens, not what you are. Speed + outcome first. Company backstory last.

**BEFORE (wrong):** "We are a locally-owned junk removal company serving Manchester, NH and surrounding communities."

**AFTER (correct):** "You Point. We Haul. Gone in hours -- not days."

*Source: tagline "You Point, We Haul!" (initial-business-data.md Section 2); audience verbatim "I literally turned my head for a moment, and the whole job was done" (market-intelligence.md Section 2).*

### Principle 2: Name the fear, kill the fear

**Rule:** The #1 buyer blocker is hidden pricing. Name it directly, then destroy it with specifics. Do not dodge the pricing conversation.

**BEFORE (wrong):** "Contact us for a free estimate and we'll get back to you with our competitive rates."

**AFTER (correct):** "Garage cleanout: $300 to $800. Told upfront. No surprises when we show up."

*Source: market-intelligence.md Section 2 (buyer blocker: "Trash Can Willys quoted me $80-$120... The final bill came out to $600! It's a scam"), Section 7 ("No pricing opacity -- the #1 complaint in this market is surprise pricing").*

### Principle 3: Sound like a person from Manchester, not a press release

**Rule:** Write how Joshua Ortega would say it to someone's face. Contractions, direct second person ("you"), specific. No passive voice. No corporate euphemisms like "seamless experience" or "comprehensive solutions."

**BEFORE (wrong):** "Our team provides comprehensive junk removal solutions with a seamless customer experience."

**AFTER (correct):** "Call before noon, we'll be there today. No truck-load minimums, no mystery fees."

*Source: market-intelligence.md Section 2 (audience verbatim: "Called, came by next day, gave me a great price, explained everything clearly and took it ALL right then"); initial-business-data.md Section 4 (tone: blue-collar confident).*

### Principle 4: Urgency is real -- write it that way

**Rule:** The audience has an actual problem right now (estate closing deadline, tenant move-out, renovation debris). Write with that time pressure in mind. Every CTA should feel like it helps them *today*, not someday.

**BEFORE (wrong):** "When you're ready to reclaim your space, our team is here to help with your junk removal needs."

**AFTER (correct):** "Closing in 3 days? We've emptied houses in 6 hours. Book before noon -- we can be there today."

*Source: market-intelligence.md Section 2 (verbatim: "I was selling a relative's house and closing was very near. I needed everything empty...FAST!!"; buying triggers section).*

### Principle 5: Faith as character, not marketing copy

**Rule:** The Isaiah 6:8 / "Send Me!" identity is integrated as who Joshua is, not as a selling point. It appears as a brief human note in the About section, not as a featured badge or headline. Keep it factual and grounded.

**BEFORE (wrong):** "As a faith-driven Christian business, we bring God's grace to your junk removal experience."

**AFTER (correct):** "Joshua started Where2 Junk because he believes in showing up when called. The name 'Send Me' comes from Isaiah 6:8 -- it's how he runs every job."

*Source: market-intelligence.md Section 8 ("faith element must be integrated as a subtle brand layer, not a design-dominant feature -- Trash King's approach works because 'Christian-owned' is stated as a fact badge, not as visual messaging"); initial-business-data.md Section 4 (faith-driven brand identity).*

---

## Section 8 — Brand Personality Axes

These axes drive the animation-specialist's selection and all motion design decisions. Source: market-intelligence.md Section 8 (visual landscape + differentiator); initial-business-data.md Section 4 (brand personality, motorsport aesthetic, faith element).

**Axis 1 — Energy level**
```
[Gentle / Ambient]  ◄━━━━━━━━━━━━━━━━●━━━━━━► [Explosive / Kinetic]
```
Position: Hard right of center. The brand communicates speed, action, and urgency. Animations must feel fast and purposeful -- not leisurely or ambient. Entry animations are quick (0.3s-0.45s, not 0.6s-0.8s). No slow drift effects. Counter animations fire fast. Scroll-triggered reveals snap in rather than float. The ONE exception: before/after image reveals can use a slower 0.8s transition to let the transformation land.

**Axis 2 — Personality register**
```
[Corporate / Formal]  ◄━━━━━━━━━━●━━━━━━━━━━► [Raw / Street-level]
```
Position: Right of center, closer to raw but not chaotic. Blue-collar confident -- direct, no polish theater, no corporate language, but also not crude or aggressive. Think: a contractor who's proud of their work, not trying to impress. Visual roughness is intentional (sharp corners, no rounded softness), not a lack of skill.

**Axis 3 — Trust signal style**
```
[Credential-forward]  ◄━━━━━━●━━━━━━━━━━━━━► [Personality-forward]
```
Position: Slightly left of center. The trust stack leads with verifiable specifics (Google star count, licensed + insured badge, Manchester address) before personal story. But Joshua's face and name appear above the fold -- person-forward builds trust faster in this market than badges alone. Source: market-intelligence.md Section 7, trust signal stack ordering (Google reviews = #1, owner photo = #3, faith badge = #7).

---

## Section 9 — Competitor Differentiation Statement

Source: market-intelligence.md Section 3 (full competitor profiles).

**Trash Can Willy's (Hooksett, NH -- the market leader)**
Trash Can Willy's wins on volume: 511 Facebook reviews, BBB A+, 16 years, "$35 starting" anchor, and the most aggressive local SEO in the NH market. Their weakness is a gap between the low-price anchor and actual billing -- multiple Yelp reviews document $80-$120 quotes becoming $600 invoices, creating a bait-and-switch reputation that their review volume currently masks. They also use a Gmail address on a professional site, and their base is in Hooksett, not Manchester. Where2 Junk differentiates visually (red/black motorsport vs. their muted green template), geographically (actual Manchester address), and on pricing integrity ("price quoted = price paid" vs. their disputed billing history). Where2 should not try to match their review count on launch -- focus on verified pricing transparency as the counter-narrative.

**Trash King LLC (Salem/Derry, NH -- closest brand parallel)**
Trash King is the most direct brand threat: Christian-owned, dark modern design, 500+ reviews, and professional agency execution. They prove the faith-based + dark theme combination works in NH. Where2 Junk's differentiation is threefold: (1) Manchester-native address vs. Trash King's Salem/Derry base -- the geo gap is a real competitive advantage, (2) motorsport visual identity vs. Trash King's gold/dark charcoal -- Where2 is faster and bolder, (3) online booking via Calendly vs. Trash King's zero online booking capability -- Where2 can close the sale the moment a customer is ready. Trash King's Gmail address is also a credibility gap Where2 should exploit with a professional where2junk.com email from day one.

**LoadUp (Atlanta-based national platform -- the technology standard)**
LoadUp sets the technology ceiling in this market: real-time instant pricing, slick 9/10 design, 5,170+ reviews, text-a-photo, same-day booking. But LoadUp is not local -- it's a technology platform connecting customers with independent contractors, and its Manchester page is a thinly personalized national template. Where2 Junk cannot match LoadUp's review count or tech budget, but can beat them on: authenticity (real Manchester owner vs. Atlanta HQ), consistency (your own employee vs. an independent contractor who may cancel), and personal trust (Joshua Ortega's name and face vs. "a Loader will arrive"). The message: "We're the local version of that -- same ease, same pricing transparency, but an actual Manchester crew who knows your neighborhood."

---

## Section 10 — Design Anti-Patterns (The Prohibited List)

Source: market-intelligence.md Section 3 (competitor weaknesses), Section 7 (friction elimination), Section 8 (visual landscape analysis); initial-business-data.md Section 4.

1. **No forest green, sage green, or olive green in any part of the UI.** These are the dominant colors of NH Junk Removal, Trash Bandits, Grunts Move Junk, The M.A.D. Junk Man, LoadUp, and JDog -- the brand disappears into the competition the moment green appears.

2. **No rounded corners (border-radius) on buttons, cards, or containers.** The motorsport aesthetic requires sharp, uncompromising geometry. Rounded corners signal "friendly SaaS" -- wrong register entirely.

3. **No soft gradients or pastel tones in any color.** Specifically prohibited: purple gradients, blue-to-white gradients, green-to-teal gradients. These read as generic AI aesthetics (frontend-design.md) or eco-template competitors.

4. **No generic stock photography of anonymous workers.** Any person photographed on this site must be Joshua Ortega or a named member of the actual crew. Stock photography of strangers hauling junk (M.A.D. Junk Man pattern) destroys the authenticity advantage.

5. **No circular illustration icons as service visuals.** Circular "flat illustration" icons (used by The M.A.D. Junk Man) read as outdated, generic, and low-trust compared to real job photography. Use photography or minimal line icons only.

6. **No "call for a free estimate" as the primary CTA.** 70% of competitors use this exact phrase. It is the single most trust-eroding CTA in this market because it implies pricing opacity. Primary CTAs must be: "Get My Price" (with a price range visible nearby), "Book a Pickup," or "Text Us a Photo."

7. **No Gmail address visible anywhere on the site.** 7 of 10 competitors use Gmail accounts (Trash Bandits, Trash King, Grunts, etc.) -- it is the most common professionalism gap in this market. Only where2junk.com email addresses are used. Source: market-intelligence.md Section 7.

8. **No multi-state or "all of New England" service area claims on launch.** Classic Cleanouts, Grunts Move Junk, and One Call Junk Haul all suffer from appearing non-local by claiming too broad a footprint. The Manchester specificity IS the competitive advantage.

9. **No hero section without a phone number visible and tappable.** Market-intelligence.md Section 7 mandates phone number above the fold in large, tappable format. Hiding the phone in the footer or behind a contact page is a friction pattern from corporate templates.

10. **No math CAPTCHA or multi-step verification on contact forms.** Trash Bandits' "What is 28+37?" form friction is cited as a specific conversion killer (market-intelligence.md Section 7). Forms must have zero friction on mobile.

11. **No slider/carousel hero.** Trash Bandits uses a dated image slider hero (design score 5/10). Sliders are a 2012 pattern; they hide content and perform poorly on mobile. Single hero image or video loop only.

12. **No Bebas Neue or Impact as a web font.** These are valid as fallback options but must not be the primary declared font face -- they have poor browser rendering at small sizes and no lowercase letters. Barlow Condensed is the declared display font.

13. **No blue color palette in any variation.** Classic Cleanouts uses blue/orange -- blue signals cleaning services or corporate, not junk removal urgency. Blue and green are both competitor territory and wrong brand register.

---

## Section 11 — Sections Matrix

### Core Pages Matrix

| Section | Include? | Notes |
|---------|----------|-------|
| Shop (Stripe + Printful) | No | Junk removal service business -- no merchandise inventory or merchandise brand identity. Would dilute the fast-booking conversion flow. No source in either research file supports merchandise. |
| Blog (Sanity CMS) | Yes (always) | 9-10 SEO articles minimum per Optimus standard. 1 existing post ("How to Simplify Junk Removal with Where2 Junk," January 15, 2026) as seed content. SEO content gaps are confirmed high-value (market-intelligence.md Section 6 -- pricing guides, service comparisons, neighborhood guides). |
| Quiz / Lead capture | Yes | Multi-step lead capture -- confirms service type (residential vs. commercial), job size estimate, and location. Ends at booking CTA or text-a-photo flow. Quiz answers emailed via Resend. Market-intelligence.md Section 5 confirms zero competitors have interactive instant quote tools locally. |
| Booking widget (Calendly) | Yes (always) | Inline InlineWidget embed on /booking and homepage. Brand colors via URL params (primary_color = D72B2B, background_color = 1A1A1A, text_color = F5F5F5). Configured via NEXT_PUBLIC_CALENDLY_URL. Online booking is the primary conversion goal (initial-business-data.md Section 5, confirmed 2026-04-04). |
| Google Maps embed | Yes | /contact page -- embed Manchester NH service area (181 Beech Hill Avenue). Use free embed pattern (build-log.md Pattern #11: maps.google.com/maps?q= without API key). Service radius visualization confirms Manchester-native positioning. |
| Instagram feed | Conditional | ⚠️ Instagram handle not confirmed (initial-business-data.md Section 5). Mark as conditional in /contact and footer. Add placeholder component that activates when NEXT_PUBLIC_INSTAGRAM_HANDLE env var is set. Do not build or leave a broken embed. |
| Service area pages | Yes | /areas/[city] -- minimum 6 NH cities for local SEO: Manchester (primary), Bedford, Goffstown, Hooksett, Londonderry, Auburn. LoadUp's exact SEO playbook (market-intelligence.md Section 9, strategic recommendation #2). Each page: unique H1, intro paragraph, local landmark reference, embedded map, services list, booking CTA. |
| Pricing page | Yes | Optimus sales tool -- always built, always in nav during build/demo, deleted before launch per CLAUDE.md. 3-tier cards (Starter/Pro/Premium), ROI calculator, full comparison chart, inline Calendly on each tier CTA. |
| Testimonials page | Yes | 32 testimonials per Optimus standard. Zero em dashes. Written in Karen Mercier / Dave Ouellette voice (market-intelligence.md Section 2 persona profiles). Paginated 8/page. Filter by service type (general junk, garage cleanout, yard waste, construction debris). Featured quote full-width at top. Source: CLAUDE.md Always-Built Features Rule. |

### Custom Features Table

| Custom Feature | Source | Complexity estimate |
|----------------|--------|---------------------|
| Sticky call/book bar (mobile, fixed bottom) | initial-business-data.md Section 5 (confirmed booking as primary conversion goal) + market-intelligence.md Section 7 (phone above fold mandatory) + Trash King reference (sticky mobile CTA bar noted as "What works" in competitor analysis) | Low -- fixed-position two-button bar, CSS only |
| Service area slug pages (/areas/[city]) | market-intelligence.md Section 6 (LoadUp SEO playbook) + Section 9 (strategic recommendation #2) | Medium -- dynamic route, unique content per city, embedded map per page |
| Text-a-photo quote form | market-intelligence.md Section 7 ("Text us a photo for an instant ballpark -- matches how the audience actually behaves -- standing in their garage looking at the problem"), Section 9 (strategic recommendation #4) | Low -- 3-step instructions + phone number display + optional Resend email trigger |
| Interactive pricing slider / truck-fraction visual | market-intelligence.md Section 5 (gap: "no local competitor has a true automated calculator") + Section 4 (pricing tiers confirmed with dollar ranges) | Medium -- volume slider with price output, truck-fraction visual guide (5 tiers), no backend required if ranges are static |
| Before/after job photo gallery | market-intelligence.md Section 9 (strategic recommendation #3: "exploit the total absence of before/after photography") + Section 5 (gap: "no competitor has a prominent labeled before/after gallery") | Low -- static image grid with toggle, seeded with fal.ai generated pairs until real job photos arrive |
| "What we accept / what we don't" page | market-intelligence.md Section 5 (gap: "only Trash Can Willy's and One Call Junk Haul have dedicated pages -- none have a comprehensive visual guide") | Low -- structured list page, no dynamic content |
| Eco/donation impact counter | market-intelligence.md Section 5 (gap: "no local competitor displays quantifiable environmental impact") | Low -- CountUp animation component (build template animation library), static number seeded, update manually per quarter |

---

## Design Token Reference (globals.css summary)

The following block consolidates all tokens defined above. Use this as the single source for the globals.css initial setup.

```css
:root {
  /* Colors */
  --primary: #D72B2B;
  --primary-muted: rgba(215, 43, 43, 0.55);
  --accent: #FF4444;
  --bg-base: #0F0F0F;
  --bg-elevated: #1A1A1A;
  --bg-card: #242424;
  --text-primary: #F5F5F5;
  --text-secondary: rgba(245, 245, 245, 0.72);
  --text-muted: rgba(245, 245, 245, 0.42);

  /* Typography */
  --font-display: 'Barlow Condensed', 'Impact', sans-serif;
  --font-body: 'Barlow', 'Helvetica Neue', Arial, sans-serif;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;

  /* Layout */
  --container-max: 1200px;
  --container-wide: 1440px;
  --container-narrow: 760px;
}
```

---

## Confidence Flags

**No LOW CONFIDENCE flags on core brand decisions.** The color palette, typography, dark theme, and motorsport aesthetic are all grounded in: (1) client-provided existing brand identity (initial-business-data.md Section 4), (2) confirmed competitive differentiation via market analysis (market-intelligence.md Section 8), and (3) prior successful builds (Cody's Complete Junk Removal junk removal build, confirmed in build-log.md Project Retrospectives).

The following items are flagged for client confirmation but do NOT block any design decisions:

- ⚠️ Exact display font: client's existing logo uses a custom or unlicensed sport font. Barlow Condensed is the closest freely available match. If client provides the exact logo font file, update --font-display accordingly. (initial-business-data.md Section 4)
- ⚠️ Instagram handle: not confirmed. Conditional embed component built but not activated until NEXT_PUBLIC_INSTAGRAM_HANDLE is set. (initial-business-data.md Section 5)
- ⚠️ Real owner photography: all hero and about images are fal.ai generated until Joshua Ortega provides a real headshot and job site photos. Replace immediately when available.
- ⚠️ Calendly URL: NEXT_PUBLIC_CALENDLY_URL env var must be set by client before booking widget activates.
- ⚠️ Pricing tiers: specific dollar amounts for the interactive pricing slider are confirmed as market ranges (market-intelligence.md Section 4) but must be approved by Joshua Ortega before going live. Display as "starting from" ranges, not fixed quotes.
