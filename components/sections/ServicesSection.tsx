import type { ServicesData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionSpace } from "@/components/ui/sectionSpace";

/** Four services: a line icon in a blush circle with a maroon arc over its top right, the name, a short line and the text */
export const ServicesSection = ({ data }: { data?: ServicesData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className={`scroll-mt-[4.5rem] bg-[var(--color-bg-main)] sm:scroll-mt-[5rem] lg:scroll-mt-[6.6094rem] ${sectionSpace}`}>
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:pl-[3.7969rem] lg:pr-[4.1719rem]">
        <SectionHeading
          label={data.label}
          titleTop={data.titleTop}
          titleAccent={data.titleAccent}
          description={data.description}
          titleSize="lg:mt-[1.0313rem] lg:text-[3.9984rem]"
          descriptionClass="lg:mt-[0.4219rem] lg:text-[1.3594rem] lg:leading-[1.9688rem]"
        />

        <ul className="mt-12 grid gap-y-12 sm:grid-cols-2 lg:mt-[3.9844rem] lg:grid-cols-4 lg:gap-y-0">
          {data.items.map((item, index) => (
            <li
              key={item.id}
              data-reveal
              data-reveal-delay={index * 100}
              className={`group relative flex flex-col items-center text-center ${index > 0 ? "lg:before:absolute lg:before:bottom-0 lg:before:left-0 lg:before:top-[12.6563rem] lg:before:w-[0.0938rem] lg:before:bg-[var(--color-divider-warm)]" : ""}`}
            >
              <span className="relative grid size-44 place-items-center rounded-full bg-[var(--color-bg-circle)] text-[var(--color-primary)] lg:size-[11.5781rem]">
                {/* the arc: a quarter of a slightly larger circle, from the top round to the right */}
                <svg viewBox="0 0 280 280" className="pointer-events-none absolute -inset-[6.7%] size-[113.4%] overflow-visible transition-transform duration-700 group-hover:rotate-45" aria-hidden="true">
                  <path d="M140 8a132 132 0 0 1 129.1 104.6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <Icon name={item.icon} className="size-[8.5rem] transition-transform duration-500 group-hover:scale-105 lg:size-[9.8438rem]" />
              </span>
              <h3 className="mt-6 font-heading text-[2.2rem] font-[460] leading-none text-[var(--color-heading)] lg:mt-[0.9844rem] lg:text-[2.3906rem]">{item.title}</h3>
              <span aria-hidden="true" className="mt-4 h-[3px] w-14 bg-[var(--color-primary)] transition-[width] duration-300 group-hover:w-20 lg:mt-[0.8438rem] lg:h-[0.1875rem] lg:w-[3.5156rem] lg:group-hover:w-[5.1563rem]" />
              <p className="mt-4 max-w-[18rem] font-text text-base leading-snug text-[var(--color-text-soft)] lg:mt-[1.125rem] lg:max-w-none lg:whitespace-pre-line lg:text-[1.2188rem] lg:leading-[1.6875rem]">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
