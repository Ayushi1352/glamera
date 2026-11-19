import type { GalleryData } from "@/types/templates.types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { sectionSpace } from "@/components/ui/sectionSpace";

/** Centred heading, the filter buttons and eight photos */
export const GallerySection = ({ data }: { data?: GalleryData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className={`scroll-mt-[4.5rem] bg-[var(--color-bg-main)] sm:scroll-mt-[5rem] lg:scroll-mt-[6.6094rem] ${sectionSpace}`}>
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-[3.3281rem]">
        <SectionHeading
          label={data.label}
          titleTop={data.titleTop}
          titleAccent={data.titleAccent}
          description={data.description}
          titleSize="lg:mt-[0.5156rem] lg:text-[3.5391rem]"
          descriptionClass="lg:-mt-[0.3281rem] lg:text-[1.3125rem] lg:leading-[1.875rem]"
        />
        <div className="mt-8 lg:mt-[1.875rem]">
          <GalleryGrid data={data} />
        </div>
      </div>
    </section>
  );
};
