# CLAUDE.md — ASM Auto Repairs

## Business Details
- **Name**: ASM Auto Repairs
- **Type**: Mobile Mechanic
- **Address**: 2 Mullenger Rd, Braybrook VIC 3019, Australia
- **Phone**: 0403 753 307
- **Email**: (not available — omit from site)
- **Website**: (none found)
- **Service Area**: Melbourne's western suburbs (Braybrook and surrounds)
- **Operator**: Andy

## Language
- ALL site text in English only. Brand name as proper noun: "ASM Auto Repairs".

## Design System
- **Theme**: Dark (from colors.json suggestedTheme: "dark")
- **Template**: A — Auto / Trades / Industrial
- **Accent color**: #240c94 (deep indigo, from colors.json)
- **Accent hover**: #4530a4
- **Accent glow**: rgba(36, 12, 148, 0.25)
- **Background**: #0a0a0a
- **Surface**: #3d3663 (purple-grey — used for Why Choose Us, Stats sections)
- **Card**: #1a1a1a
- **Text**: #ffffff
- **Text muted**: #999999
- **Border**: rgba(255, 255, 255, 0.08)
- **Heading font**: 'Oswald', sans-serif (700 headings, 500 nav/labels)
- **Body font**: 'Roboto', sans-serif (400 body, 500 emphasis)
- **Inspiration**: Dark industrial automotive with deep-indigo accent. Bold Oswald headings, near-black background, purple-grey surface alternation. Hero uses a CSS gradient with subtle grid-line overlay and radial glow (no photo).

## Assets
- **Logo**: logo.png — deep-indigo car+wrench icon with white background. Placed inside a white rounded "chip" container (background:#fff; padding:6px 10px; border-radius:8px) in both nav (44px) and footer (56px) to prevent white-on-dark clash.
- **images/**: EMPTY — no business photos available.
- **Image folder (Image/)**: Contains only Logo.png (same as root logo.png).

## Page Sections
1. **Nav** — Fixed top, transparent → blurred dark on scroll. Logo chip left, links right, "Book a Service" CTA. Hamburger overlay on mobile.
2. **Hero** — 100vh, CSS gradient background (linear-gradient + radial glows + subtle grid overlay). H1 "MOBILE MECHANIC THAT COMES TO YOU". Mobile-mechanic tagline. Two CTAs: "Book a Mobile Service" + "Call 0403 753 307". Trust strip: 4 icons — Qualified, We Come To You, Honest Pricing, All Makes.
3. **Why Choose Us** — 4-card grid on purple-grey surface. Cards: "We Come To You", "Honest Pricing", "All Makes & Models", "Qualified & Experienced".
4. **Services** — 12-card grid (3-col desktop) on dark bg. One card per service from research.json. Icon-only thumbnails (Font Awesome + indigo tint block). No photos.
5. **Stats** — 4-column strip on surface: 10+ Years, 1000+ Jobs, 12 Services, 100% Mobile.
6. **About** — Dark bg, 2-col: left = description + feature list; right = decorative CSS block (indigo glow rectangle, car icon, faded "ASM AUTO REPAIRS" text, "Mobile Mechanic" sub-label).
7. **Contact** — Dark bg, 2-col: left = phone row, address row, Facebook row + Google Maps iframe; right = contact form.
8. **Footer** — Near-black, 4-col grid: brand+tagline+Facebook icon | Quick Links | Services | Contact.

## Sections Intentionally Omitted
- **Gallery** — images/ folder is empty. Omitted entirely.
- **Testimonials** — research.json testimonials[] is empty. Omitted entirely.

## Rules
- Mobile-first, breakpoints: 480/768/1024/1280px
- Scroll-reveal on all cards and headings (80ms stagger via .d1–.d4 classes)
- Back-to-top button (fixed bottom-right, visible when scrollY > 300)
- DEMO watermark (fixed right side, rotated 90deg, pulsing opacity 0.28–0.45)
- No Lorem Ipsum — real business data only
- Pure HTML5/CSS3/vanilla JS — no frameworks, no build step
- Font Awesome included (Facebook social link is present)
- No broken image references — hero uses CSS gradient, no <img> for business photos

## Redeployment
After making changes, commit and redeploy from inside this folder:
```bash
git add -A
git commit -m "describe your changes"
git push
vercel --prod --yes
```
The Vercel project is already linked (`.vercel/project.json`) — no token or scope flags needed.
