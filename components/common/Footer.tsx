import Image from "next/image";
import type { CompanyData, FooterData, LinkItem } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { FooterDecorArt } from "@/components/ui/LineArt";
import { fill } from "@/components/ui/text";

/** Fills `{year}` in the copyright line; cached so the footer can still be prerendered. */
async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

const heading = "font-heading text-[1.35rem] font-[560] sm:text-[1.5rem] leading-none text-[var(--color-ink)] lg:text-[1.9125rem]";
const underline = "mt-3 block h-[3px] w-14 bg-[var(--color-primary)] lg:mt-[0.7031rem] lg:h-[0.1875rem] lg:w-[3.6563rem]";
const divider = "hidden w-[0.0938rem] shrink-0 bg-[var(--color-divider)] lg:mt-[6.1406rem] lg:block lg:h-[15rem]";

const LinkList = ({ title, links }: { title: string; links: LinkItem[] }) => (
  <nav aria-label={title}>
    <h2 className={heading}>{title}</h2>
    <span aria-hidden="true" className={underline} />
    <ul className="mt-5 grid gap-3 lg:-ml-[0.2813rem] lg:mt-[1.3594rem] lg:gap-[0.8906rem]">
      {links.map((link) => (
        <li key={link.id}>
          <a href={link.url} className="group inline-flex items-center gap-2.5 font-sans text-[0.95rem] leading-none sm:gap-4 sm:text-[1.05rem] text-[var(--color-heading)] transition-colors hover:text-[var(--color-primary)] lg:gap-[1.125rem] lg:text-[1.3125rem] lg:leading-[1.5938rem]">
            <Icon name="LuChevronRight" className="size-4 text-[var(--color-primary)] transition-transform group-hover:translate-x-1 lg:size-[1.0313rem]" strokeWidth={2.4} />
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

// Logo, text and social links; quick links; more links; contact details; then the maroon copyright bar.
export const Footer = async ({ data, company }: { data?: FooterData; company: CompanyData }) => {
  if (!data) return null;
  // the footer lists the company contact details in its own order
  const contactItems = data.contactIds.flatMap((id) => company.contactItems.filter((item) => item.id === id));
  const copyright = fill(data.copyrightText, { year: await currentYear() });

  return (
    <footer className="relative isolate overflow-hidden bg-[var(--color-bg-footer)]">
      <FooterDecorArt className="pointer-events-none absolute right-0 top-0 -z-10 h-[calc(100%-4.1719rem)] w-[60%] max-lg:opacity-60 lg:w-[38.4375rem]" />

      {/* phones and tablets: the brand on top, Quick Links and More Links side by side, then the contact details */}
      <div className="mx-auto grid max-w-[90rem] grid-cols-2 gap-x-4 gap-y-10 px-4 pb-12 pt-12 sm:grid-cols-3 sm:gap-x-6 sm:px-6 lg:flex lg:h-[25.8281rem] lg:gap-0 lg:px-0 lg:pb-0 lg:pl-[3.3281rem] lg:pt-0">
        {/* brand */}
        <div className="col-span-2 sm:col-span-3 lg:w-[25.2188rem] lg:shrink-0">
          <Image src={company.logo} alt={company.logoAlt} width={company.logoWidth} height={company.logoHeight} sizes="(min-width: 1024px) 370px, 260px" className="h-auto w-[16rem] lg:mt-[5.3438rem] lg:w-[23.1094rem]" />
          <p className="mt-5 font-nav text-base leading-relaxed text-[var(--color-text)] lg:ml-[0.4688rem] lg:mt-[1.5rem] lg:whitespace-pre-line lg:text-[1.2rem] lg:leading-[1.5938rem]">{data.description}</p>
          <ul aria-label={data.socialLabel} className="mt-6 flex gap-3 lg:ml-[0.4688rem] lg:mt-[1.6406rem] lg:gap-[1.0313rem]">
            {data.socialLinks.map((social) => (
              <li key={social.id}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="grid size-11 place-items-center rounded-full border-2 border-[var(--color-primary)] text-[var(--color-primary)] transition-colors duration-300 hover:bg-[var(--color-primary)] hover:text-[var(--color-white)] lg:size-[2.4375rem] lg:border-[0.0938rem]"
                >
                  <Icon name={social.icon} className="size-[1.1rem] lg:size-[1.125rem]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <span aria-hidden="true" className={divider} />
        <div className="lg:ml-[2.4844rem] lg:mt-[6.2344rem] lg:w-[13.5469rem] lg:shrink-0">
          <LinkList title={data.quickLinksTitle} links={data.quickLinks} />
        </div>
        <span aria-hidden="true" className={divider} />
        <div className="lg:ml-[2.4844rem] lg:mt-[6.2344rem] lg:w-[13.6406rem] lg:shrink-0">
          <LinkList title={data.moreLinksTitle} links={data.moreLinks} />
        </div>
        <span aria-hidden="true" className={divider} />

        {/* contact details */}
        <div className="col-span-2 sm:col-span-1 lg:ml-[2.8125rem] lg:mt-[6.2344rem]">
          <h2 className={heading}>{data.contactTitle}</h2>
          <span aria-hidden="true" className={underline} />
          <ul className="mt-5 grid gap-5 lg:mt-[1.2188rem] lg:gap-[1.4063rem]">
            {contactItems.map((item) => {
              const external = item.url.startsWith("http");
              return (
                <li key={item.id}>
                  <a
                    href={item.url}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    aria-label={`${item.title}: ${item.lines.join(" ")}`}
                    className="group flex items-start gap-4 font-sans text-[1.02rem] leading-snug text-[var(--color-heading)] transition-colors hover:text-[var(--color-primary)] lg:gap-[1.5rem] lg:text-[1.2656rem] lg:leading-[1.5rem]"
                  >
                    <Icon name={item.icon} className="mt-0.5 size-5 shrink-0 text-[var(--color-primary)] lg:mt-0 lg:size-[1.5938rem]" strokeWidth={1.6} />
                    <span className="min-w-0 break-words">
                      {item.lines.map((line) => (
                        <span key={line} className="block lg:whitespace-nowrap">
                          {line}
                        </span>
                      ))}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="bg-[var(--color-primary)]">
        <p className="mx-auto max-w-[90rem] px-4 py-5 text-center font-nav text-sm text-[var(--color-white)] sm:px-6 sm:text-left lg:flex lg:h-[4.1719rem] lg:items-center lg:px-[3.7969rem] lg:py-0 lg:pb-[1.125rem] lg:text-[1.0547rem]">{copyright}</p>
      </div>
    </footer>
  );
};
