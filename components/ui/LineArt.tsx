/*
  Line drawings of the design, drawn in SVG so they stay sharp and take their colour from `currentColor`
  (the pale drawings on the package cards, the woman's profile in the About badge, the footer leaves).
*/

type ArtProps = { className?: string; strokeWidth?: number };

const outline = { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Lotus flower: one tall petal, two side petals and two low outer petals (Glow package) */
export const LotusArt = ({ className, strokeWidth = 4 }: ArtProps) => (
  <svg viewBox="0 0 160 112" className={className} aria-hidden="true" {...outline} strokeWidth={strokeWidth}>
    <path d="M80 4C65 26 62 64 80 106 98 64 95 26 80 4Z" />
    <path d="M80 106C57 84 41 62 35 31c18 4 33 16 42 34M80 106c23-22 39-44 45-75-18 4-33 16-42 34" />
    <path d="M78 106c-29 2-58-6-74-25 21-8 46-5 66 10M82 106c29 2 58-6 74-25-21-8-46-5-66 10" />
  </svg>
);

/** Woman's profile facing right, with long hair flowing behind (Hair Care package, About badge) */
export const HairProfileArt = ({ className, strokeWidth = 4 }: ArtProps) => (
  <svg viewBox="0 0 130 160" className={className} aria-hidden="true" {...outline} strokeWidth={strokeWidth}>
    <path d="M98 40c6 9 8 19 7 28l8 12-6 4c2 5 1 9-2 11 2 6-2 11-9 11-3 8-8 14-14 18" />
    <path d="M98 40C84 18 50 20 37 45c-9 18-6 35-14 55M86 33c-25 3-39 22-41 47-2 21-8 37-20 52" />
    <path d="M72 50c-12 21-8 47-20 75-4 10-10 18-17 25M62 58C44 80 33 100 8 113" />
    <path d="M86 121c2 12 9 21 20 25" />
  </svg>
);

/** Two interlinked rings with a small heart above (Bridal package) */
export const RingsArt = ({ className, strokeWidth = 4 }: ArtProps) => (
  <svg viewBox="0 0 124 140" className={className} aria-hidden="true" {...outline} strokeWidth={strokeWidth}>
    <path d="M62 30c-6-11-22-8-21 4 1 9 10 15 21 23 11-8 20-14 21-23 1-12-15-15-21-4Z" />
    <circle cx="43" cy="100" r="31" />
    <circle cx="81" cy="100" r="31" />
  </svg>
);

/** Pale leaf spray and soft waves along the right side of the footer */
export const FooterDecorArt = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 700 550" className={className} aria-hidden="true" fill="none" preserveAspectRatio="xMaxYMid slice">
    <path d="M330 60c120-40 230-10 370-70" stroke="var(--color-decor)" strokeWidth="16" strokeLinecap="round" opacity="0.7" />
    <path d="M60 520c120-60 260-50 420-10" stroke="var(--color-decor-light)" strokeWidth="22" strokeLinecap="round" />
    <path d="M700 170c-70 20-108 82-96 150 64-14 104-70 96-150Z" fill="var(--color-decor)" opacity="0.75" />
    <path d="M700 300c-92-6-160 40-176 116 80 10 146-34 176-116Z" fill="var(--color-decor)" opacity="0.6" />
    <path d="M700 420c-60 18-96 64-92 118 56-6 90-52 92-118Z" fill="var(--color-decor-light)" />
    <path d="M700 170c-40 50-64 104-60 150M700 300c-60 30-110 70-150 108" stroke="var(--color-bg-footer)" strokeWidth="3" strokeLinecap="round" />
  </svg>
);
