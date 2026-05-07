# DispatcherAI — Design Language

> **Editorial dossier outside, mission-control console inside.**
> Long-scroll, footnoted case study at `/`. Dense, deliberate operator console at `/live` and the rest of the auth-gated app.

This document is the source of truth for the visual + interaction system that sits on top of the existing DispatcherAI product. It documents *what* the system is, *why* the choices were made, and *how* to extend it without breaking the language.

The system was added in a redesign pass (May 2026) and lives entirely inside `client/`. It does not change any backend, API route, Prisma schema, Clerk flow, or the 5s polling contract — only the frontend skin and the public landing experience.

---

## 1. Philosophy

The product is a 911 dispatcher. The brand has to feel:

- **Calm under pressure.** Tight type, generous negative space, no decorative gradients, no glassmorphism, no neon.
- **Institutional, not corporate.** Reads like a National Transportation Safety Board report, not a SaaS landing page.
- **Anti-AI-slop.** No purple-blue gradient hero. No "✨" sparkles. No stock illustrations. No glow-on-hover everything.
- **Serious about provenance.** Every claim on the case study is footnoted; every external artifact (GitHub, Devpost, YouTube, Hugging Face, SkyDeck) is one click away from inside the live cockpit.
- **Honest about being a portfolio.** A `Demo build` chip and a dismissible `ProvenanceBar` make it obvious to recruiters this is a hackathon artifact running on seeded data.

We split the surface into two atmospheres so the product can be both *read* and *operated*:

| Surface           | Atmosphere | Bg                    | Body                | Display      | Tone              |
| ----------------- | ---------- | --------------------- | ------------------- | ------------ | ----------------- |
| `/` case study    | `paper`    | `#F4EFE6`             | IBM Plex Sans       | Fraunces     | editorial, sober  |
| `/live` and `/*`  | `ink`      | `#0A0B0D`             | IBM Plex Sans       | Fraunces     | console, tactical |

Both atmospheres share the same type ramp, mono callouts, sodium/signal/phosphor accent system, and stamp/eyebrow patterns. They are inverses of each other on the same skeleton.

---

## 2. Type system

### 2.1 Families

| Role     | Family            | CSS variable        | Source                        |
| -------- | ----------------- | ------------------- | ----------------------------- |
| Display  | **Fraunces**      | `--font-display`    | `next/font/google` (variable, `opsz`, `SOFT`, italic) |
| Body     | **IBM Plex Sans** | `--font-sans`       | `next/font/google`            |
| Mono     | **IBM Plex Mono** | `--font-mono`       | `next/font/google`            |

Fraunces is loaded with `["300","400","500","600","700"]`, normal + italic, with `opsz` and `SOFT` axes — this is what gives the case-study serif its slightly soft, editorial cut at large optical sizes.

Loaded once in `client/src/app/layout.tsx`; every other consumer references the CSS variable through the Tailwind families `font-sans` / `font-mono` / `font-display`.

### 2.2 Ramp

| Use                             | Class                                                   | Notes                                |
| ------------------------------- | ------------------------------------------------------- | ------------------------------------ |
| Editorial hero                  | `font-display text-6xl/none tracking-[-0.02em]`         | Fraunces, slightly negative tracking |
| Section title (h2)              | `font-display text-4xl sm:text-5xl tracking-[-0.02em]`  | Used by `SectionHeading`             |
| Subhead / dispatch headline     | `font-display text-[15px]`                              | Cards, transcript dispatcher voice   |
| Body paragraph                  | `text-base leading-7 text-white/65` (or `paper-ink/70`) | Comfortable reading measure          |
| Mono caller / data              | `font-mono text-sm`                                     | Caller transcript, lat/lng, IDs      |
| Eyebrow / ribbon label          | `font-mono text-[10px] uppercase tracking-ribbon`       | All section markers, status chips    |
| Console label                   | `font-mono text-[11px] uppercase tracking-console`      | Sidebar / header chrome              |

Everything else inherits from these. **Avoid** introducing additional sizes — if a thing doesn't fit, prefer to compress weight or color than to invent a new step.

### 2.3 Typographic split inside the transcript

In `transcript-panel/`, caller speech is set in **mono** and dispatcher (AI) speech is set in **Fraunces**. This is intentional: it visually separates "raw event data the operator is monitoring" from "the calm authored response the system is producing." Don't undo this.

---

## 3. Color system

The system has three layers:

1. **Atmosphere** — `ink` (console) and `paper` (editorial). Pick one per route.
2. **Surface** — `steel`, `panel`, `hairline` — the chrome that sits *on* an atmosphere.
3. **Signal** — `sodium`, `signal`, `phosphor` — the only colors allowed to mean something.

All tokens live in `client/tailwind.config.ts` and are usable as Tailwind classes (`bg-ink`, `text-sodium`, `border-hairline`, etc.).

### 3.1 Atmosphere tokens

| Token         | Value       | Use                                                           |
| ------------- | ----------- | ------------------------------------------------------------- |
| `ink`         | `#0A0B0D`   | Default body bg in the console; used by `body` in `globals.css` |
| `ink.deep`    | `#06070A`   | Deep wells (modals, layered backdrops)                        |
| `ink.panel`   | `#0E1116`   | Default panel surface (used by `.panel`)                      |
| `paper`       | `#F4EFE6`   | Case-study background                                         |
| `paper.warm`  | `#EDE6D6`   | Quoted blocks, secondary editorial surfaces                   |
| `paper.edge`  | `#E2D9C5`   | Borders + subtle dividers on paper                            |
| `paper.ink`   | `#181410`   | Editorial text color (deep warm black, never `#000`)          |

### 3.2 Surface / chrome

| Token             | Value                  | Use                                    |
| ----------------- | ---------------------- | -------------------------------------- |
| `steel`           | `#13171B`              | Neutral panel that needs to lift off ink |
| `steel.raised`    | `#181C22`              | Hover/raised panel                     |
| `steel.sunk`      | `#0F1216`              | Recessed surfaces (search, list rows)  |
| `hairline`        | `rgba(255,255,255,.08)`| Default divider on ink                 |
| `hairline.strong` | `rgba(255,255,255,.16)`| Emphatic divider                       |
| `hairline.soft`   | `rgba(255,255,255,.04)`| Quietest divider                       |

Whites in the console are always `text-white` modulated with opacity (`/45`, `/55`, `/65`, `/85`). **Do not use named greys.** Opacity-on-ink is what gives the cockpit its depth.

### 3.3 Signal palette

This is the only place the system uses chromatic color, and each color has a fixed meaning. **Do not invent new accent colors.**

| Token       | Hex       | Meaning            | Where it shows up                                 |
| ----------- | --------- | ------------------ | ------------------------------------------------- |
| `sodium`    | `#F4B01F` | Active / dispatch lamp / live | LIVE chips, active sidebar item, focus pin, "Demo build" badge, ribbon section indices |
| `sodium.soft` | `#F7C457` | Hover/soft state                                                                      |
| `sodium.deep` | `#B47A0E` | Editorial section index on paper                                                      |
| `signal`    | `#FF3B30` | Critical            | CRITICAL severity chip, critical pin, critical row gutter |
| `signal.soft` | `#FF6A60` | Hover                                                                                |
| `signal.deep` | `#A91D14` | Editorial index for critical sections on paper                                       |
| `phosphor`  | `#7BFFB2` | Safe / resolved / nominal | SAFE chip, positive emotion, resolved row gutter |
| `phosphor.soft` | `#A8FFCB` | Hover                                                                              |
| `phosphor.deep` | `#1E5C3B` | Phosphor on paper                                                                  |

Severity → color mapping (used everywhere — emergency cards, log table gutter, map pins, transcript emotion chips):

```
LIVE      → sodium
CRITICAL  → signal
WARNING   → sodium
SAFE      → phosphor
CLOSED    → white/30 (drained)
```

### 3.4 Legacy `dp.*` palette

The original cyan/grey `dp.*` palette is still defined in `tailwind.config.ts` for backward compatibility (some long-tail components still consume it). **Do not use `dp.*` in new code.** It is being phased out implicitly as components are touched.

---

## 4. Letter-spacing scale

Tracking is part of the language. Three named steps live in `tailwind.config.ts`:

| Token              | Value     | Use                                                    |
| ------------------ | --------- | ------------------------------------------------------ |
| `tracking-ribbon`  | `0.32em`  | Eyebrows, status ribbons, severity chips, section markers |
| `tracking-console` | `0.22em`  | Console chrome (sidebar nav, header, stamps)           |
| `tracking-editorial` | `0.04em` | Long-form editorial paragraphs that need just-perceptible widening |

If text is uppercase + mono and isn't wearing one of these, it's a bug.

---

## 5. Utilities

Defined in `client/src/app/globals.css` under `@layer utilities`. These are the system's "verbs."

| Class            | What it is                                                             | Where used                                |
| ---------------- | ---------------------------------------------------------------------- | ----------------------------------------- |
| `.editorial`     | Paper bg + 4×4 dotted radial grid + warm-black text                    | Case-study sections                       |
| `.console`       | Ink bg + 32×32 cross-hatched grid                                      | Auth-gated layout shell                   |
| `.grain`         | Subtle SVG fractal-noise overlay (`mix-blend-mode: overlay`)           | Anywhere a flat surface needs film grain  |
| `.hairline`      | `border-color: rgba(255,255,255,.08)` shortcut                         | Quick hairline borders                    |
| `.panel`         | Ink panel surface w/ inset highlight + soft drop shadow                | Default cockpit cards                     |
| `.panel-raised`  | Steel panel surface, slightly stronger inset + shadow                  | Hovered / focused cards                   |
| `.text-eyebrow`  | `font-mono text-[10px] uppercase tracking-ribbon text-white/55`        | Section eyebrows on ink                   |
| `.text-eyebrow-dark` | Same but warm-black/55                                             | Eyebrows on paper                         |
| `.display-italic` | Fraunces italic with `ss01`                                           | Pull quotes / "you are here" callouts     |
| `.scanlines`     | 3px repeating horizontal lines at 2% white                             | Map overlays, monitor effect              |
| `.stamp`         | Outlined mono micro-label, e.g. `LIVE • 12:04:19`                      | Status chips, "Demo build" badge, ribbon  |
| `.rule`          | 1px transparent → white/12 → transparent gradient line                 | Dividers on ink                           |
| `.rule-paper`    | Same but warm-black/18                                                 | Dividers on paper                         |
| `.pulse-dot`     | 8px filled dot with an animated outward `pulseRing` ring (2.4s)        | LIVE indicators, polling status           |
| `.ticker`        | `tickerScroll` 38s linear infinite (translateX 0 → -50%)               | Status ribbon at top of `/`               |
| `.flex-center`   | `flex items-center justify-center`                                     | Convenience                               |
| `.flex-between`  | `flex items-center justify-between`                                    | Convenience                               |
| `.wrapper`       | Centered max-w-screen-2xl with horizontal padding                      | Editorial section gutter                  |

**`::selection`** is set globally to `bg-sodium text-ink` — selecting any text turns it into a dispatch lamp. Don't override.

---

## 6. Geometry

- **Radius**: corner radius in the cockpit is intentionally tight — `rounded-[3px]` (cards, chips, inputs) and `rounded-[2px]` (severity bars, stamps). The Tailwind `sm/md/lg` radii still exist but are reserved for incoming shadcn primitives. **Do not use `rounded-xl` or `rounded-2xl` in new code.**
- **Spacing**: stick to multiples of `4` (Tailwind default). The custom `spacing.15 = 60px` exists for legacy reasons; prefer `gap-4` / `gap-6` / `gap-8` in new code.
- **Borders**: 1px, always. Use `border-white/10` (default), `border-white/20` (hover), `border-sodium/45` (selected/active). On paper, `border-paper-ink/15` and friends.
- **Shadows**: only `.panel` / `.panel-raised` carry shadow. **Do not add bespoke shadow utilities.** A "lift" should come from the panel utility, not from a one-off shadow.
- **Header height** is fixed by `HEADER_HEIGHT = 50` (Tailwind exposes `h-header` and `h-fullWithHeader = calc(100dvh - 50px)`).
- **Sidebar / modules width** is fixed by `MODULES_WIDTH = 350` (Tailwind exposes `w-modules`).

---

## 7. Iconography

- Library: [`lucide-react`](https://lucide.dev). Stroke-only, no fill, no other library.
- Default sizes: `size-3` (inline), `size-3.5` (sidebar/header), `size-4` (panel headers), `size-5` (page headers).
- Icons should **inherit color** (`currentColor`); never hardcode hex. They take on the row/chip's signal color.
- The brand mark is `client/src/components/brand/DossierMark.tsx`. It comes in `tone="ink"` and `tone="paper"`. **Do not use the legacy cyan Siren badge** in new surfaces.

---

## 8. Motion

Motion is restrained — every animation has to justify itself.

| Effect          | Use                                                                | Driver                            |
| --------------- | ------------------------------------------------------------------ | --------------------------------- |
| `pulseRing`     | LIVE state, polling indicator, selected map pin                    | `.pulse-dot::after` (2.4s)        |
| `tickerScroll`  | Status ribbon at top of `/`                                        | `.ticker` (38s)                   |
| Map pin pulse   | Selected incident on the map                                       | `map.module.css`                  |
| `accordion-*`   | Radix collapsibles in details panel                                | tailwindcss-animate               |
| Hover transition| Border opacity / chip background                                   | Tailwind `transition` (200ms)     |

**Forbidden:** Framer Motion entry/exit animations on landing sections, parallax, blurred glass on hover, color-shifting gradients. The system is observational, not theatrical.

`prefers-reduced-motion` should be respected by anything new — keep the `.pulse-dot`, `.ticker`, and pin pulses opt-out behind a media query when adding more.

---

## 9. Component catalog

Components introduced or reskinned by this design system. File paths are absolute from repo root.

### 9.1 Brand
- `client/src/components/brand/DossierMark.tsx` — wordmark + dispatch icon, `tone="ink" | "paper"`, three sizes.

### 9.2 Case study (`/`)
All under `client/src/components/case-study/`:

| Component         | Purpose                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------- |
| `SectionHeading`  | Eyebrow + index + Fraunces title + optional deck. Tone-aware (`ink`/`paper`).            |
| `HeroRibbon`      | Top status ribbon: project name, codename, hackathon stamp, dispatcher coordinates.      |
| `AwardBlock`      | The Win — $25K SkyDeck Fund, Pad-13 Golden Ticket, Best Use of Intel AI, 930/293 stat.  |
| `SystemDiagram`   | Inline SVG of Caller → Twilio → Retell WS → FastAPI → Hume / Mistral / Maps → operator. |
| `ModelCard`       | Mistral-7B + LoRA, IPEX on Intel Dev Cloud, 2:53 → <10s claim, HF model + dataset links. |
| `TeamCard`        | Contributor card (name, role, attribution). `youAreHere` highlights Bill in sodium.      |
| `Footnotes`       | Numbered citation list at the bottom of `/`.                                             |
| `CockpitPreview`  | **Read-only** replica of `/live` driven by seeded `MESSAGES`. No auth. No `/api/calls`. |

### 9.3 Cockpit shell (auth-gated)
- `client/src/components/sidebar/*` — mono nav, hairline rules, sodium-active state, polling status block, mini provenance footer back to `/#case-study`.
- `client/src/components/header/*` — operator status bar: polling chip + 24h PT clock + dispatcher number + "Demo build" badge.

### 9.4 Live cockpit
- `client/src/components/dashboard/alerts-emergencies-panel/*` — incident list, ALL CAPS mono severity chips, search + filter.
- `client/src/components/dashboard/emergency-details-panel/*` — metadata grid, collapsibles, street-view block.
- `client/src/components/dashboard/transcript-panel/*` — caller mono / dispatcher Fraunces split, phosphor/sodium emotion chips.
- `client/src/components/live/map/Map.tsx` + `map.module.css` — MapTiler `streets-v2-dark`, custom pin with concentric pulse on the selected incident.

### 9.5 Cross-app
- `client/src/components/shared/ProvenanceBar.tsx` — dismissible (localStorage) bottom ribbon: GitHub · Devpost · YouTube · HF model · HF dataset · "Back to dossier."
- `client/src/components/shared/DemoModeBadge.tsx` — sodium chip surfaced when `useEmergencyContext()` indicates no real call has been observed in the active window.

---

## 10. Page anatomy

Where each piece of the system gets used.

### 10.1 `/` — editorial dossier (atmosphere: `paper`)
1. **Status ribbon** — `.ticker` of project metadata + Berkeley AI Hackathon 2024 + Grand Prize + Pad-13.
2. **Hero** — Fraunces display headline + Plex Sans deck. `SignInButton` (Clerk) + jump-to-preview anchor.
3. **The Win** — `AwardBlock`.
4. **The Problem** — narrative on 911 wait times + AI/human-in-the-loop framing.
5. **The System** — `SystemDiagram` (inline SVG architecture).
6. **The Model** — `ModelCard` with HF links.
7. **The Interface** — embedded `CockpitPreview`, captioned "Read-only preview of the operator console; sign in to open the live system."
8. **The Team** — four `TeamCard`s; current viewer highlighted via `youAreHere`.
9. **Tradeoffs & Limitations** — short, honest paragraph on dataset scale, bias, oversight.
10. **CTAs** — "Step into the live console" (Clerk-gated) + "Watch the demo" (YouTube).
11. **Footnotes** — `Footnotes` with all external citations.

### 10.2 `/live` — operator console (atmosphere: `ink`)
- Outer chrome: layout `.console` background + radial gradient atmosphere + grid mask.
- Top: `Header` (status bar) + 1-line editorial ribbon describing the console + `DemoModeBadge` (when seeded-only).
- Left: `Sidebar` (mono nav, polling status block, provenance link).
- Center: `Map` (dark MapTiler, custom pulse pin) + bottom-left `Field` ribbon with lat/lng of focused incident.
- Right: panels — alerts/emergencies → details → transcript.
- Bottom: `ProvenanceBar`.

### 10.3 Other auth-gated routes
- `/data-management` — static analytics, paper-influenced layout but on ink.
- `/log` — mono-tabular table with severity gutter; `axios.get("/api/calls")` flow unchanged.
- `/settings` — "operator profile / dispatch routing"; `PATCH /api/user/phone`; required-onboarding redirect intact.
- `/modular` — light reskin; `react-grid-layout` untouched.
- `/playground` — light reskin; dev primitives showcase.

---

## 11. Voice & copy

Copy is part of the design.

- **Be terse.** Eyebrows are 2–4 words. CTAs are verbs ("Open live console", "Step into the dossier").
- **Use 24-hour time and cardinal coordinates.** Time displays as `14:32 PT`. Coordinates render as `37.7749, -122.4194` (4 decimals).
- **Use dispatch vocabulary** in the cockpit: `Field`, `Dispatch`, `Caller`, `Incident`, `Resolved`, `LIVE / CRITICAL / WARNING / SAFE / CLOSED`.
- **Use editorial vocabulary** on `/`: `The Win`, `The System`, `The Model`, `The Interface`, `The Team`, `Tradeoffs & Limitations`, `Footnotes`.
- **Do not** say "showcase," "museum piece," "powered by AI," or anything that screams resume. The design itself communicates that.
- **Cite, don't claim.** Every external claim on `/` is footnoted with a real URL (Devpost, GitHub, YouTube, Hugging Face, SkyDeck).

---

## 12. Accessibility

- **Contrast.** Body copy in the console is `text-white/65` on `bg-ink`, which clears WCAG AA for body text. Anything smaller than 14px must be at `/85` or solid white. On paper, body is `text-paper-ink/70` on `#F4EFE6`, also AA. **Do not** drop ink-mode body below `/55`.
- **Focus.** Default `outline-ring/50` from shadcn applies. For custom buttons (sidebar links, severity chips), focus state is the same as hover — sodium border or `bg-sodium/[0.04]` — never invisible.
- **Semantics.** `SectionHeading` always emits `<h2>`. Severity chips include both an icon and a text label; color is never the only carrier of meaning.
- **Motion.** All looping animations (`pulse-dot`, `ticker`, map pin) should be wrapped in `@media (prefers-reduced-motion: reduce)` overrides as new ones are added.
- **Selection color** is sodium-on-ink — high contrast, intentional.

---

## 13. Adding to the system

When you reach for something new, walk this checklist before inventing:

1. **Is there a token for this?** Check `tailwind.config.ts` (`ink`, `steel`, `paper`, `sodium`, `signal`, `phosphor`, `hairline`).
2. **Is there a utility for this?** Check `globals.css` (`.panel`, `.stamp`, `.pulse-dot`, `.rule`, `.text-eyebrow`, etc.).
3. **Is there a component for this?** Check `case-study/` (paper) or `dashboard/` + `sidebar/` + `header/` (ink).
4. **If still missing**, add it at the lowest layer where it would be reused (token → utility → component). Add it to this doc in the same PR.

### Do
- Use mono + `tracking-ribbon` for any uppercase metadata label.
- Use Fraunces for any headline ≥ 24px.
- Use `sodium` only for *active* / *dispatch lamp* meaning; never decorative.
- Use `.panel` for any new card surface in the console.
- Use seeded `MESSAGES` for any non-authenticated preview surface — never fetch from `/api/calls` in public surfaces.

### Don't
- Don't add new accent colors.
- Don't introduce gradients beyond the existing ones in `(layout)/layout.tsx` and `.editorial` / `.console`.
- Don't use `rounded-xl`/`rounded-2xl`, glass blur, or drop shadows outside the panel utilities.
- Don't introduce a new font family.
- Don't use `dp.*` tokens in new code.
- Don't write copy that telegraphs "this is a portfolio" — the `Demo build` badge and `ProvenanceBar` are the only places the site acknowledges that.

---

## 14. Files to know

- `client/tailwind.config.ts` — tokens (colors, families, tracking, sizing).
- `client/src/app/globals.css` — base + utilities (`.editorial`, `.console`, `.panel`, `.stamp`, `.pulse-dot`, `.ticker`, `.rule`, …).
- `client/src/app/layout.tsx` — font loading (Fraunces, IBM Plex Sans, IBM Plex Mono) + `ClerkProvider`.
- `client/src/app/page.tsx` — case study composition.
- `client/src/app/(layout)/layout.tsx` — auth-gated console shell (atmosphere, gradient, grid, `Sidebar`, `Header`, `ProvenanceBar`).
- `client/src/app/(layout)/live/page.tsx` — live cockpit composition.
- `client/src/components/brand/DossierMark.tsx` — brand mark.
- `client/src/components/case-study/*` — editorial components.
- `client/src/components/sidebar/*`, `client/src/components/header/*` — console chrome.
- `client/src/components/dashboard/*` — incident list / details / transcript.
- `client/src/components/live/map/Map.tsx` + `map.module.css` — map style + pin design.
- `client/src/components/shared/ProvenanceBar.tsx`, `client/src/components/shared/DemoModeBadge.tsx` — cross-app provenance.

---

## 15. Functional invariants the design depends on

The visual system assumes — and the redesign preserves — these contracts:

- Clerk auth, post-sign-in redirect to `/api/auth/new-user`, phone-required redirect from `(layout)/layout.tsx` and `/settings`.
- 5s polling against `/api/calls` with idle / visibility / hard-cap rules in `dashboard/emergency-context.tsx`.
- Seeded `MESSAGES` shape in `(layout)/live/messages.ts` (reused by `CockpitPreview`).
- Prisma schema, `/api/calls` and `/api/user` contracts, FastAPI / Retell / Hume / Twilio integrations on the server.
- `useEmergencyContext()` is the *only* source of truth for live call state in the cockpit.

If any of those change, this doc and the component catalog above need to move with them.
