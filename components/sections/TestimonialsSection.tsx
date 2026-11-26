import type { TestimonialsData } from "@/types/templates.types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialSlider } from "@/components/sections/TestimonialSlider";
import { sectionSpace } from "@/components/ui/sectionSpace";

/** Centred heading above the review cards and their dots */
export const TestimonialsSection = ({ data }: { data?: TestimonialsData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className={`scroll-mt-[4.5rem] bg-[var(--color-bg-main)] sm:scroll-mt-[5rem] lg:scroll-mt-[6.6094rem] ${sectionSpace}`}>
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-[4.5938rem]">
        <SectionHeading
          label={data.label}
          titleTop={data.titleTop}
          titleAccent={data.titleAccent}
          description={data.description}
          titleSize="lg:mt-[1.3125rem]"
          descriptionClass="lg:-mt-[0.375rem] lg:text-[1.6406rem] lg:leading-[2.0625rem]"
        />
        <div className="mt-4 sm:mt-6 lg:mt-[2.25rem]">
          <TestimonialSlider data={data} />
        </div>
      </div>
    </section>
  );
};
