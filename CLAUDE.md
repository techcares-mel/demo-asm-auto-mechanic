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
- **Theme**: LIGHT — white/off-white background, charcoal text, dark charcoal footer
- **Template**: DL Auto Care reference — Light Professional Automotive
- **Accent color**: #240c94 (deep indigo, from colors.json — brand/CTA/icons)
- **Accent hover**: #1a0870
- **Accent glow**: rgba(36, 12, 148, 0.12)
- **Gold**: #f5a623 (star ratings and hero trust icons only)
- **Background**: #ffffff
- **Surface**: #f7f7f9
- **Card**: #ffffff
- **Text**: #1f2328
- **Text muted**: #6b7280
- **Footer bg**: #15171a (dark charcoal)
- **Heading font**: 'Montserrat', sans-serif (weights 600/700/800)
- **Body font**: 'Inter', sans-serif (weights 400/500/600)
- **Inspiration**: Clean, modern corporate-automotive. Lots of white space, rounded cards with soft shadows, full-bleed hero with dark overlay, professional split-section layouts. Modelled on DL Auto Care reference aesthetic — NOT the Oswald/condensed industrial dark template.

## Assets
- **Logo**: logo.png — deep-indigo car+wrench logo with white background.
  - Nav: `<img src="logo.png" height="46">` — sits directly on white/light nav (white bg on logo matches light theme).
  - Footer: wrapped in a small white chip `background:#fff; padding:6px 10px; border-radius:8px` so it reads on dark footer.
- **images/**: 10 images present — image1.jpg through image10.jpg (all JPEG).
  See pexels-credits.json for context, descriptions, and photographer credits.

## Image Placement
| File        | Context  | Used In                              | Alt Text (from pexels-credits.json)                                    |
|-------------|----------|--------------------------------------|------------------------------------------------------------------------|
| image1.jpg  | exterior | Hero background (CSS bg-image)       | A mechanic in blue overalls inspects the exhaust system of a car       |
| image2.jpg  | interior | About section (left column)          | Interior of an automotive repair shop with cars undergoing maintenance |
| image3.jpg  | team     | Team / Meet Andy (left column)       | Portrait of a skilled mechanic holding a lug wrench                    |
| image4.jpg  | work     | Gallery (span-2 wide tile)           | Detailed image of a mechanic repairing a car engine                    |
| image5.jpg  | work     | Gallery                              | Red automotive brake caliper and disc brake                            |
| image6.jpg  | work     | Gallery                              | Close-up of a car engine inspection using a diagnostic tool            |
| image7.jpg  | work     | Gallery                              | A young mechanic works on a car's underside                            |
| image8.jpg  | work     | Gallery                              | Detailed view of an electric car battery                               |
| image9.jpg  | gallery  | Gallery                              | Mechanic inspecting a raised car in an auto workshop                   |
| image10.jpg | gallery  | Gallery                              | A woman kneels, cleaning the interior of a red BMW                     |

## Page Sections
1. **Nav** — Fixed top, transparent → white blurred on scroll (scrollY > 50). Logo left (46px), nav links right (Montserrat 600), "Get a Quote" pill CTA. Hamburger overlay on mobile (<768px), closes on link click + ESC.
2. **Hero** — Full-bleed 92vh, background image1.jpg with dark gradient overlay (rgba 0.62→0.55). Left-aligned: eyebrow, H1 (gold `<em>`), tagline, address+phone, two CTA buttons, inline trust strip.
3. **Service Tags Strip** — Full-width accent indigo band, marquee animation scrolling 12 service names as pill tags.
4. **About + Stats** — Light bg, 2-col grid. Left: image2.jpg (workshop interior). Right: eyebrow, H2, 2 paragraphs from research.json description, stats row (4 items: "12 Services", "100% Mobile", "All Makes & Models", "Same-Day*").
5. **Services** — Surface bg, 3-col grid of 12 cards (one per research.json service). Each card: icon in accent-tinted square, service name, one-line description. Hover lift.
6. **Why Choose Us** — Dark section (uses --text color #1f2328 as bg). 4-col grid of feature cards: "We Come To You", "Honest Upfront Pricing", "All Makes & Models", "Qualified & Experienced". Gold icons, white text on dark.
7. **Gallery** — Light bg, responsive 3-col grid with 7 images (image4–image10). First item spans 2 columns. Caption overlay on hover (from pexels-credits.json descriptions).
8. **Team / Meet Andy** — Surface bg, 2-col split. Left: image3.jpg (mechanic portrait). Right: "Meet Your Mechanic" eyebrow, H2, 2 description paragraphs, feature checklist, "Book With Andy" CTA. ONE person only — no fake staff.
9. **Contact** — Light bg, 2-col. Left: phone, address, Facebook rows + Google Maps iframe. Right: contact form (Name, Phone, Email, Message → Thank You on submit). No email address row (none in research.json). No hours (none in research.json).
10. **Footer** — Dark charcoal (#15171a). 4 columns: brand+tagline+Facebook icon | Quick Links | Services | Contact. Logo in white chip. Only Facebook social icon rendered. Bottom bar with copyright + Pexels credit.

## Sections Intentionally Omitted
- **Testimonials** — research.json testimonials[] is empty. NOT fabricated. Section omitted entirely.
- **Hours** — research.json opening_hours is empty object. No hours row in contact section.
- **Email** — research.json email is empty string. No email row anywhere.
- **Google rating** — research.json rating is empty. No star rating displayed in hero or stats. Gold is used only for decorative trust icons.

## Honesty Decisions
- Stats use qualitative labels ("100% Mobile", "All Makes & Models", "Same-Day*") rather than fabricated numeric claims (no invented "20 years" or "5000 cars serviced").
- Only "12 Services Offered" uses a real numeric count-up (data-target="12"), taken directly from research.json services[].
- Team section is a single operator (Andy) — no fake staff members invented.
- No testimonial carousel or fake quotes.
- No fake email address, fake hours, or fake Google rating.

## Rules
- Mobile-first, breakpoints: 480/768/1024/1280px
- Scroll-reveal on all cards and headings (80ms stagger via .d1–.d4)
- Back-to-top button (fixed bottom-right, visible when scrollY > 300)
- DEMO watermark (fixed right side, rotated 90deg, pulsing opacity 0.20–0.35, indigo)
- Scroll progress bar (fixed top, 3px, accent indigo)
- No Lorem Ipsum — real business data only
- Pure HTML5/CSS3/vanilla JS — no frameworks, no build step
- Font Awesome included (Facebook social link present in research.json)
- Google Maps iframe uses real encoded address

## Redeployment
After making changes, commit and redeploy from inside this folder:
```bash
git add -A
git commit -m "describe your changes"
git push
vercel --prod --yes
```
The Vercel project is already linked (`.vercel/project.json`) — no token or scope flags needed.
