import Image from "next/image";
import type { AboutData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { HairProfileArt } from "@/components/ui/LineArt";
import { DesignFrame } from "@/components/ui/DesignFrame";
import { sectionTitleSize } from "@/components/ui/SectionHeading";
import { sectionSpace } from "@/components/ui/sectionSpace";

/** Round badge: the words around a circle (clockwise, starting at the bottom left) with a woman's profile in the middle */
const Badge = ({ words, className = "" }: { words: string[]; className?: string }) => {
  // one dot after every word; the text runs once around the circle (r 84 in a 210 box, so 527.8 long)
  const text = words.map((word) => `${word.toUpperCase()} •`).join(" ");
  return (
    <div className={`relative text-[var(--color-primary)] ${className}`}>
      <svg viewBox="0 0 210 210" className="absolute inset-0 size-full" aria-hidden="true">
        <defs>
          <path id="about-badge-circle" d="M105 105m-84 0a84 84 0 1 1 168 0a84 84 0 1 1-168 0" />
        </defs>
        {/* the path starts at the left (9 o'clock); rotated so "BEAUTY" sits at the bottom left as in the design */}
        <text fontSize="17.5" fontWeight="600" letterSpacing="4.2" fill="currentColor" className="font-sans" transform="rotate(-62 105 105)">
          <textPath href="#about-badge-circle" textLength="520" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <HairProfileArt className="absolute left-[27%] top-[24%] h-[52%] w-auto" strokeWidth={4.5} />
    </div>
  );
};

/*
  Oval salon photo (with a thin rose outline tilted behind it) on the left; badge, script label, title and text on the right.
  From 1024px up every piece sits where the 1920px design has it (1 design pixel = 0.046875rem); DesignFrame trims the
  design's own gaps, so only the section space (the same for every section) is left above and below.
*/
export const AboutSection = ({ data }: { data?: AboutData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className="scroll-mt-[4.5rem] bg-[var(--color-bg-main)] sm:scroll-mt-[5rem] lg:scroll-mt-[6.6094rem]">
      <div className={`relative mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-0 ${sectionSpace}`}>
        {/* the content runs from the top of the oval outline (206) to its foot (1121): 915 design px */}
        <DesignFrame height={42.8906} offset={9.6563}>
        <div className="grid gap-8 sm:gap-10 md:grid-cols-[1fr_1.1fr] md:items-center lg:block">
        {/* photo: an upright oval; the outline is the same oval turned 12°, so it shows at the top right and bottom left */}
        <div data-reveal className="relative mx-auto aspect-[733/915] w-full max-w-[26rem] lg:absolute lg:left-[5.8125rem] lg:top-[9.6563rem] lg:w-[34.3594rem] lg:max-w-none">
          <svg viewBox="0 0 733 915" className="absolute inset-0 size-full overflow-visible text-[var(--color-rose-soft)]" aria-hidden="true">
            <ellipse cx="366.5" cy="457.5" rx="362" ry="461" fill="none" stroke="currentColor" strokeWidth="3" transform="rotate(12 366.5 457.5)" />
          </svg>
          <div className="absolute left-[1.09%] top-[1.53%] h-[96.94%] w-[97.95%] overflow-hidden rounded-[50%] bg-[var(--color-bg-placeholder)]">
            <Image src={data.image} alt={data.imageAlt} fill quality={90} sizes="(min-width: 1024px) 539px, (min-width: 768px) 45vw, 26rem" className="object-cover" />
          </div>
        </div>

        <div className="text-center md:text-left lg:static">
          <div data-reveal>
            <Badge words={data.badgeWords} className="mx-auto size-36 md:mx-0 lg:absolute lg:left-[44.4844rem] lg:top-[11.7656rem] lg:size-[10.6406rem]" />
            <p className="mt-6 flex items-center justify-center gap-4 font-script text-[3.2rem] leading-none text-[var(--color-rose)] md:justify-start lg:absolute lg:left-[44.3438rem] lg:top-[23.4375rem] lg:mt-0 lg:gap-[1.3594rem] lg:text-[4.5656rem]">
              {data.label}
              <span aria-hidden="true" className="h-[2px] w-16 bg-current lg:mt-[0.4688rem] lg:h-[0.1875rem] lg:w-[7.3125rem]" />
            </p>
            <h2 className={`mt-3 font-display ${sectionTitleSize} font-normal uppercase leading-[1.1] tracking-[-0.045em] text-[var(--color-heading)] lg:absolute lg:left-[44.0156rem] lg:top-[27.0469rem] lg:mt-0 lg:whitespace-nowrap lg:leading-none`}>
              {data.titleTop} <span className="font-bold text-[var(--color-primary)]">{data.titleAccent}</span>
            </h2>
            <p className="mt-3 font-text text-base font-light uppercase tracking-[0.3em] text-[var(--color-text)] sm:text-lg lg:absolute lg:left-[44.4844rem] lg:top-[31.8281rem] lg:mt-0 lg:whitespace-nowrap lg:text-[1.7203rem] lg:leading-none lg:tracking-[0.3em]">
              {data.subtitle}
            </p>
          </div>
          <p
            data-reveal
            className="mt-6 font-text text-base leading-relaxed text-[var(--color-text-soft)] sm:text-lg lg:absolute lg:left-[44.4844rem] lg:top-[35.1563rem] lg:mt-0 lg:whitespace-pre-line lg:text-[1.1859rem] lg:leading-[1.7203rem]"
          >
            {data.description}
          </p>
          <a
            data-reveal
            href={data.visitUrl}
            className="group mx-auto mt-8 flex w-fit items-center gap-5 text-left md:mx-0 lg:absolute lg:left-[43.8281rem] lg:top-[44.4844rem] lg:mt-0 lg:gap-0"
          >
            <Icon name={data.visitIcon} className="size-10 shrink-0 text-[var(--color-rose)] transition-transform duration-300 group-hover:-translate-y-1 lg:size-[3.7031rem]" strokeWidth={1.4} />
            <span aria-hidden="true" className="h-12 w-[2px] shrink-0 bg-[var(--color-rose)] lg:ml-[1.2188rem] lg:h-[3.8906rem] lg:w-[0.1875rem]" />
            <span className="lg:ml-[1.5938rem]">
              <span className="block font-text text-base font-semibold uppercase text-[var(--color-heading)] transition-colors group-hover:text-[var(--color-primary)] lg:text-[1.4063rem] lg:leading-none">{data.visitTitle}</span>
              <span className="mt-1 block font-text text-base text-[var(--color-text)] lg:mt-[0.4688rem] lg:text-[1.1672rem] lg:leading-none">{data.visitText}</span>
            </span>
          </a>
        </div>
        </div>
        </DesignFrame>
      </div>
    </section>
  );
};
