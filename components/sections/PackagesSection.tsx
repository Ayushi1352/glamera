import Image from "next/image";
import type { PackageItem, PackagesData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { HairProfileArt, LotusArt, RingsArt } from "@/components/ui/LineArt";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionSpace } from "@/components/ui/sectionSpace";

/** the pale drawing in the bottom-right corner of each card, by the name templates.json stores */
const decorArt = {
  lotus: { Art: LotusArt, className: "right-[5%] bottom-[7%] w-[27%] lg:bottom-[2.0156rem] lg:right-[1.0313rem] lg:w-[7.3125rem]" },
  hair: { Art: HairProfileArt, className: "right-[6%] bottom-[3%] w-[24%] lg:bottom-[0.6563rem] lg:right-[1.5938rem] lg:w-[6.0938rem]" },
  rings: { Art: RingsArt, className: "right-[4%] bottom-[8%] w-[22%] lg:bottom-[2.25rem] lg:right-[1.2188rem] lg:w-[5.8125rem]" },
} as const;

const PackageCard = ({ item, checkIcon, index }: { item: PackageItem; checkIcon: string; index: number }) => {
  const decor = decorArt[item.decor as keyof typeof decorArt];

  return (
    <li
      data-reveal
      data-reveal-delay={index * 100}
      className="group relative flex flex-col overflow-hidden rounded-[0.5rem] border border-[var(--color-border-card)] bg-gradient-to-b from-[var(--color-bg-card-top)] to-[var(--color-bg-card)] shadow-[0_0.6rem_1.6rem_-1rem_var(--color-shadow-card)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_1.2rem_2.4rem_-1.2rem_var(--color-shadow-soft)] lg:rounded-[0.375rem]"
    >
      <div className="relative aspect-[574/281] overflow-hidden bg-[var(--color-bg-placeholder)]">
        <Image src={item.image} alt={item.imageAlt} fill quality={90} sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="relative isolate flex-1 px-6 pb-8 pt-6 lg:px-[2.625rem] lg:pb-[2.0625rem] lg:pt-[0.75rem]">
        {decor && <decor.Art className={`pointer-events-none absolute -z-10 h-auto text-[var(--color-rose-pale)] opacity-70 ${decor.className}`} strokeWidth={3.5} />}
        <h3 className="font-heading text-[2rem] font-[460] leading-tight text-[var(--color-heading)] lg:text-[2.4375rem] lg:leading-[3.0938rem]">
          <span className="font-[460] italic text-[var(--color-primary)]">{item.nameAccent}</span> {item.name}
        </h3>
        <p className="mt-2 font-sans text-base leading-relaxed text-[var(--color-text-soft)] lg:-mt-[0.0469rem] lg:whitespace-pre-line lg:text-[1.1672rem] lg:leading-[1.6406rem]">{item.description}</p>
        <span aria-hidden="true" className="mt-5 block h-[3px] w-14 bg-[var(--color-primary)] lg:mt-[0.9375rem] lg:h-[0.1875rem] lg:w-[3.5156rem]" />
        <ul className="mt-5 grid gap-3 lg:mt-[1.0313rem] lg:gap-[0.8438rem]">
          {item.features.map((feature) => (
            <li key={feature.id} className="flex items-center gap-3 font-sans text-base text-[var(--color-heading)] lg:gap-[0.8438rem] lg:text-[1.1953rem] lg:leading-[1.3594rem]">
              <Icon name={checkIcon} className="size-5 shrink-0 text-[var(--color-primary)] lg:size-[1.3125rem]" strokeWidth={2.6} />
              {feature.text}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

/** Three package cards: photo on top, the name with its maroon italic word, text, a short line and what is included */
export const PackagesSection = ({ data }: { data?: PackagesData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className={`scroll-mt-[4.5rem] bg-[var(--color-bg-main)] sm:scroll-mt-[5rem] lg:scroll-mt-[6.6094rem] ${sectionSpace}`}>
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-[3.3281rem]">
        <SectionHeading
          label={data.label}
          titleTop={data.titleTop}
          titleAccent={data.titleAccent}
          description={data.description}
          titleSize="lg:mt-[1.0781rem]"
          descriptionClass="lg:mt-[0.1875rem] lg:text-[1.3453rem] lg:leading-[1.875rem]"
        />
        <ul className="mx-auto mt-8 grid max-w-md gap-5 sm:mt-10 sm:gap-6 md:max-w-none md:grid-cols-2 lg:mt-[2.5313rem] lg:grid-cols-3 lg:gap-[1.3125rem]">
          {data.items.map((item, index) => (
            <PackageCard key={item.id} item={item} checkIcon={data.checkIcon} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
};
