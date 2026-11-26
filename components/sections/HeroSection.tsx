import Image from "next/image";
import type { HeroData } from "@/types/templates.types";

/** Plays once on load (CSS @starting-style), so the hero never waits for JavaScript */
const enter = "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] starting:translate-y-6 starting:opacity-0";

/*
  Blush band with the headline, the pale "Glaméra" script behind it and the outlined button on the right; below it
  two photos side by side, edge to edge. From 1024px up every piece sits where the 1920px design has it
  (1 design pixel = 0.046875rem, measured from the top of the band). Phones and tablets stack everything.
*/
export const HeroSection = ({ data }: { data?: HeroData }) => {
  if (!data) return null;
  const [first, second] = data.photos;

  return (
    <section id={data.id} className="scroll-mt-[4.5rem] bg-[var(--color-bg-main)] pb-[var(--section-space)] sm:scroll-mt-[5rem] lg:scroll-mt-[6.5625rem]">
      <div className="relative isolate overflow-hidden bg-[var(--color-bg-hero)]">
        <div className="relative mx-auto max-w-[90rem] px-4 pb-9 pt-8 sm:px-6 sm:pb-14 sm:pt-14 lg:h-[28.1719rem] lg:p-0">
          <p
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 top-2 -z-10 select-none whitespace-nowrap font-script text-[7rem] leading-none text-[var(--color-watermark)] sm:right-0 sm:text-[10rem] lg:left-[41.25rem] lg:right-auto lg:top-[2.1563rem] lg:text-[13.1953rem]"
          >
            {data.watermark}
          </p>

          <div className={enter}>
            {/* on phones the size follows the screen width so "Natural Beauty" always stays on one line */}
            <h1 className="font-heading text-[length:min(3.5rem,calc((100vw-2rem)/6.4))] font-[470] leading-[1.02] tracking-[-0.01em] text-[var(--color-heading)] sm:text-[5rem] lg:absolute lg:left-[8.0156rem] lg:top-[6.4219rem] lg:whitespace-nowrap lg:text-[6.3281rem] lg:leading-[6.1406rem]">
              <span className="block lg:tracking-[-0.04em]">{data.titleTop}</span>
              {data.titleBottom} <span className="font-[500] italic text-[var(--color-primary)]">{data.titleAccent}</span>
            </h1>
            <p className="mt-5 max-w-xl font-text text-lg leading-relaxed text-[var(--color-text)] sm:text-xl lg:absolute lg:left-[8.1094rem] lg:top-[19.5938rem] lg:mt-0 lg:max-w-none lg:whitespace-pre-line lg:text-[1.6875rem] lg:leading-[2.0625rem]">
              {data.description}
            </p>
            <span aria-hidden="true" className="mt-6 block h-[0.2rem] w-16 bg-[var(--color-primary)] lg:absolute lg:left-[8.0625rem] lg:top-[25.2188rem] lg:mt-0 lg:h-[0.2813rem] lg:w-[6.0469rem]" />
            <a
              href={data.buttonUrl}
              className="mt-6 inline-flex h-14 items-center justify-center border-2 border-[var(--color-primary)] px-8 font-text text-sm font-semibold uppercase tracking-[0.13em] text-[var(--color-heading)] transition-colors duration-300 hover:bg-[var(--color-primary)] hover:text-[var(--color-white)] sm:mt-8 lg:absolute lg:left-[64.5469rem] lg:top-[16.7344rem] lg:mt-0 lg:h-[3.5625rem] lg:w-[17.4844rem] lg:border-[0.1406rem] lg:px-0 lg:text-[1.0547rem]"
            >
              {data.buttonText}
            </a>
          </div>
        </div>
      </div>

      {/* two photos edge to edge on every screen, in the design's widths (773 : 1114); only the height changes */}
      <div className={`grid grid-cols-[773fr_1114fr] gap-1.5 sm:gap-2 lg:gap-[1.5469rem] ${enter} delay-150`}>
        {[first, second].filter(Boolean).map((photo, index) => (
          <div key={photo.id} className={`relative h-[34.3vw] overflow-hidden bg-[var(--color-bg-placeholder)] lg:h-[30.3281rem]`}>
            <Image src={photo.image} alt={photo.imageAlt} fill preload quality={90} sizes={index === 0 ? "41vw" : "59vw"} className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
};
