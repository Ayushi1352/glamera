import Image from "next/image";
import type { ContactData, ContactFormData } from "@/types/templates.types";
import { ContactForm } from "@/components/sections/ContactForm";
import { accentClass, titleClass } from "@/components/ui/SectionHeading";
import { sectionSpace } from "@/components/ui/sectionSpace";

/** The arch photo's corners: round at the top and bottom right, square at the bottom left (as % of the box) */
const archShape = "[border-radius:34%_35%_30.5%_0/33.3%_27.6%_24.7%_0]";
const outlineShape = "[border-radius:34.4%_35.4%_31.2%_0/33.7%_28.2%_25.3%_0]";

type Props = {
  data?: ContactData;
  form?: ContactFormData;
  /** choices of the form's service list (built in app/page.tsx from the Services and Packages sections) */
  serviceOptions: string[];
};

/** Title, text and the message form on the left; the stylist photo in an arch with a thin maroon outline on the right */
export const ContactSection = ({ data, form, serviceOptions }: Props) => {
  if (!data) return null;

  return (
    <section id={data.id} className={`scroll-mt-[4.5rem] bg-[var(--color-bg-main)] sm:scroll-mt-[5rem] lg:scroll-mt-[6.6094rem] ${sectionSpace}`}>
      <div className="mx-auto grid max-w-[90rem] gap-12 px-4 sm:px-6 lg:grid-cols-[44.1563rem_32.9531rem] lg:justify-between lg:gap-0 lg:pl-[5.3906rem] lg:pr-[5.1094rem]">
        <div className="lg:pt-[2.2969rem]">
          <div data-reveal>
            <p className="flex items-center gap-4 font-sans text-[1.05rem] font-semibold uppercase leading-none tracking-[0.2em] lg:tracking-[0.15em] text-[var(--color-primary-bright)] sm:text-[1.25rem] lg:gap-[1.2188rem] lg:text-[1.7344rem]">
              <span aria-hidden="true" className="h-[0.0938rem] w-12 shrink-0 bg-current lg:w-[3.7031rem]" />
              <span className="-mr-[0.2em] lg:-mr-[0.15em]">{data.label}</span>
              <span aria-hidden="true" className="h-[0.0938rem] w-12 shrink-0 bg-current lg:ml-[0.6094rem] lg:w-[3.75rem]" />
            </p>
            <h2 className={`mt-4 text-[length:min(2.6rem,calc((100vw-2rem)/8.4))] sm:text-[3.2rem] lg:mt-[1.6406rem] lg:text-[3.8906rem] lg:leading-none ${titleClass}`}>
              {data.titleTop} <span className={accentClass}>{data.titleAccent}</span>
            </h2>
            <p className="mt-4 font-form text-base leading-relaxed text-[var(--color-text-soft)] sm:text-lg lg:mt-[0.5156rem] lg:text-[1.2984rem] lg:leading-[1.7813rem]">
              {data.descriptionLines.map((line) => (
                <span key={line} className="lg:block">
                  {line}{" "}
                </span>
              ))}
            </p>
          </div>
          <ContactForm data={form} serviceOptions={serviceOptions} />
        </div>

        <div data-reveal className="relative mx-auto aspect-[703/909] w-full max-w-[26rem] lg:mt-0 lg:w-[32.9531rem] lg:max-w-none">
          {/* the outline fades out towards the bottom left, as in the design */}
          <span
            aria-hidden="true"
            className={`absolute inset-0 border-[3px] border-[var(--color-primary)] opacity-80 [mask-image:linear-gradient(to_top_right,transparent_24%,black_46%)] lg:border-[0.1406rem] ${outlineShape}`}
          />
          <div className={`absolute left-[1.71%] top-[1.32%] h-[97.14%] w-[96.44%] overflow-hidden bg-[var(--color-bg-placeholder)] ${archShape}`}>
            <Image src={data.image} alt={data.imageAlt} fill quality={90} sizes="(min-width: 1024px) 509px, 26rem" className="object-cover object-[60%_50%]" />
          </div>
        </div>
      </div>
    </section>
  );
};
