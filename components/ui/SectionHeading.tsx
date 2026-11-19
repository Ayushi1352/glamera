/*
  Sizes on this page are taken from the 1920px design: 1 design pixel = 0.046875rem
  (at 1440px the root font is 16px, so the whole 1920px design shows at 75%).
*/

type LabelProps = {
  label: string;
  /** "both": a line on each side (centred headings); "both-left": the same, starting at the left edge (Contact) */
  align?: "center" | "left";
  className?: string;
};

/** Small spaced-out maroon uppercase label between two thin rose lines */
const SectionLabel = ({ label, align = "center", className = "" }: LabelProps) => {
  const line = <span aria-hidden="true" className="h-[0.0938rem] w-12 shrink-0 bg-[var(--color-rose-line)] sm:w-16 lg:w-[4.875rem]" />;
  return (
    <p
      className={`flex items-center gap-4 font-heading text-[1.05rem] font-bold uppercase leading-none tracking-[0.2em] text-[var(--color-primary)] sm:text-[1.25rem] lg:gap-[1.1719rem] lg:text-[1.6875rem] lg:tracking-[0.145em] ${
        align === "center" ? "justify-center" : ""
      } ${className}`}
    >
      {line}
      {/* the letter spacing also follows the last letter, so it is taken off again to keep the lines even */}
      <span className="-mr-[0.2em] lg:-mr-[0.145em]">{label}</span>
      {line}
    </p>
  );
};

/** Two-tone title: the accent words in maroon italics */
export const titleClass = "font-heading font-[460] leading-[1.1] tracking-[-0.01em] text-[var(--color-heading)]";
export const accentClass = "whitespace-nowrap font-[460] italic text-[var(--color-primary)]";

type HeadingProps = {
  label: string;
  titleTop: string;
  titleAccent: string;
  description?: string;
  /** desktop sizes and gaps of this section's title and text */
  titleSize?: string;
  descriptionClass?: string;
  className?: string;
};

/** Centred section intro: label, title, one or two lines of text */
export const SectionHeading = ({ label, titleTop, titleAccent, description, titleSize = "", descriptionClass = "", className = "" }: HeadingProps) => (
  <div data-reveal className={`text-center ${className}`}>
    <SectionLabel label={label} />
    {/* on phones the size follows the screen width (at most 2.4rem) so a title never takes more than two lines */}
    <h2 className={`mt-4 text-[length:min(2.4rem,calc((100vw-2rem)/9))] sm:text-[3rem] ${titleClass} ${titleSize}`}>
      {titleTop} <span className={accentClass}>{titleAccent}</span>
    </h2>
    {description && (
      <p className={`mx-auto mt-3 max-w-[40rem] font-text text-base leading-relaxed text-[var(--color-text-soft)] sm:text-lg lg:max-w-none lg:whitespace-pre-line ${descriptionClass}`}>{description}</p>
    )}
  </div>
);
