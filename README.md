# Glaméra Landing Page

One-page landing page for **Glaméra Beauty Salon & Spa**, built with Next.js 16, React 19 and Tailwind CSS 3 from the Glaméra design. It follows the same project structure as the other landing pages (GlowMist, Men's Salon, Tastera): every piece of text, image, icon and link lives in `data/templates.json`, and the components only render it.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
app/
  layout.tsx            fonts, metadata (title, description, favicon), header, footer, scroll reveal
  page.tsx              the sections in page order
  globals.css           theme colours (CSS variables)
components/
  common/               Header (sticky bar, dropdown card menu on phones and tablets), Footer
  sections/             Hero, About, Services, Packages, Gallery (+ GalleryGrid: filters and photo viewer),
                        Testimonials (+ TestimonialSlider), Contact (+ ContactForm)
  ui/                   Icon, LineArt (lotus, hair profile, rings, footer leaves), SectionHeading (label, title),
                        ScrollReveal, FormSuccess, useDummySubmit, useActiveSection, text
data/templates.json     all content (sections and their variants)
types/templates.types.ts
public/images/          photos, logo, favicon (WebP / PNG)
```

Each section's `id` in `templates.json` matches a header link (`#about` → `id="about"`).

The contact form's service list is built in `app/page.tsx` from the Services and Packages sections.

## Fonts

Newsreader (titles), Jost (package text), Kumbh Sans (hero, About, services, testimonials and section texts), Lato (menu, footer text), Inter (contact form) and Allura (the "Glaméra" and "About Us" script). They are set in `templates.json` (`common.theme.fonts`).

## Images and icons

- **Photos** (`public/images/*.webp`) are plain pictures; the shapes are drawn with CSS on top of them (the About oval with its tilted outline, the Contact arch with its outline, the round client photos). A new photo only needs to replace the file with the same name.
- **Icons** are [react-icons](https://react-icons.github.io/react-icons/) names stored in `templates.json`. The four service icons, the envelope and the calendar are drawn for this design in `components/ui/Icon.tsx`.
- **Line drawings** (the pale lotus, hair profile and rings on the package cards, the profile in the About badge, the footer leaves) are SVG in `components/ui/LineArt.tsx`.

After replacing a photo, delete `.next/cache/images` (or restart `next dev`) so the image optimiser does not keep serving the old file.

## Responsive

Designed for phones, tablets, 1024px and desktop. From 1024px up the root font size follows the 1440px design (`1rem = 100vw / 90`, at most 16px), so 1024px shows exactly the 1440px layout, only smaller. Sizes are taken from the 1920px design (1 design pixel = 0.046875rem).

Every section has the same space above and below its content (`--section-space` in `globals.css`, used through `sectionSpace` in `components/ui/sectionSpace.ts`), so every gap between two sections is the same: 120px on phones, tablets, 1024px and 1440px. It is a pixel value on purpose, so it does not shrink with the rem sizes. The About section places its pieces where the design has them; `DesignFrame` keeps them in place and trims the design's own uneven gaps.

## Interactions

- Gallery: filter buttons (All, Facials, Hair, Make-Up, Nails); a photo opens in a full-screen viewer (arrow keys step through the shown photos).
- Testimonials: dots choose the review in the middle; autoplay pauses on hover. Phones and tablets show one card.
- Header and footer links scroll smoothly to their section; the current section is underlined in the menu.

## Forms

The contact form uses a dummy submit (`useDummySubmit`): it shows a sending state and a thank-you message in place of the button, but nothing is sent anywhere yet.
