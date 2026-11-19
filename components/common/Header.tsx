"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { CompanyData, HeaderData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { sectionId, useActiveSection } from "@/components/ui/useActiveSection";

/*
  Sizes on this page are taken from the 1920px design: 1 design pixel = 0.046875rem
  (at 1440px the root font is 16px, so the whole 1920px design shows at 75%).
*/

/** Maroon pill button; turns darker on hover */
const ctaClass =
  "inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] font-nav font-bold text-[var(--color-white)] transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-hover)]";

export const Header = ({ data, company }: { data?: HeaderData; company: CompanyData }) => {
  const [ids] = useState(() => data?.navLinks.map((link) => sectionId(link.url)) ?? []);
  const { active, scrolled } = useActiveSection(ids);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!data) return null;

  /** The logo scrolls back to the top and drops any "#section" from the address bar, without reloading the page */
  const goHome = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    window.scrollTo({ top: 0 });
    if (window.location.hash) history.pushState(null, "", window.location.pathname + window.location.search);
  };

  return (
    <header
      className={`sticky top-0 z-40 bg-[var(--color-bg-main)] transition-shadow duration-300 ${scrolled || open ? "shadow-[0_0.5rem_1.75rem_-1rem_var(--color-shadow-soft)]" : ""}`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[90rem] items-center gap-4 px-4 sm:h-[5rem] sm:px-6 lg:h-[6.6094rem] lg:gap-0 lg:pl-[2.2969rem] lg:pr-[2.1094rem]">
        <Link href={data.logoUrl} onClick={goHome} aria-label={data.homeLabel} className="shrink-0 lg:mt-[1.1719rem]">
          <Image
            src={company.logo}
            alt={company.logoAlt}
            width={company.logoWidth}
            height={company.logoHeight}
            preload
            sizes="(min-width: 1024px) 274px, 200px"
            className="h-auto w-[10.5rem] sm:w-[12.5rem] lg:w-[17.1094rem]"
          />
        </Link>

        <span aria-hidden="true" className="ml-[4.1719rem] mt-[1.7813rem] hidden h-[2.6719rem] w-[0.1406rem] bg-[var(--color-text-muted)] opacity-60 lg:block" />

        <nav aria-label={data.mainNavLabel} className="ml-[2.8125rem] mt-[1.2188rem] hidden items-center gap-[3.0938rem] lg:flex">
          {data.navLinks.map((link) => {
            const current = sectionId(link.url) === active;
            return (
              <a
                key={link.id}
                href={link.url}
                aria-current={current ? "location" : undefined}
                className={`relative whitespace-nowrap font-nav text-[1.3125rem] font-bold leading-none transition-colors after:absolute after:-inset-x-[0.0938rem] after:-bottom-[0.9375rem] after:h-[0.2344rem] after:rounded-full after:bg-[var(--color-primary)] after:transition-transform after:duration-300 ${
                  current ? "text-[var(--color-primary)] after:scale-x-100" : "text-[var(--color-ink)] after:scale-x-0 hover:text-[var(--color-primary)] hover:after:scale-x-100"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:mt-[1.7813rem]">
          <a href={data.buttonUrl} className={`${ctaClass} h-11 px-6 text-base max-sm:hidden lg:h-[2.7188rem] lg:w-[11.9063rem] lg:px-0 lg:text-[1.5rem]`}>
            {data.buttonText}
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? data.closeMenuLabel : data.openMenuLabel}
            className="grid size-11 place-items-center rounded-full border border-[var(--color-border-field)] text-[var(--color-primary)] transition-colors hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-white)] lg:hidden"
          >
            <Icon name={open ? "LuX" : "LuMenu"} className="size-6" />
          </button>
        </div>
      </div>

      {/* phones and tablets: the page behind the open menu is dimmed, a tap on it closes the menu */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 top-[4.5rem] -z-10 bg-[var(--color-black-20)] transition-opacity duration-500 sm:top-[5rem] lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      {/* phones and tablets: a card under the bar, only as tall as its links */}
      <nav
        id="mobile-menu"
        aria-label={data.mobileNavLabel}
        className={`absolute inset-x-4 top-full mt-2 grid max-h-[calc(100dvh-5.5rem)] overflow-hidden rounded-2xl bg-[var(--color-white)] shadow-[0_1.25rem_3.125rem_-1.25rem_var(--color-shadow-menu)] transition-[grid-template-rows,opacity] duration-500 sm:inset-x-6 lg:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none invisible grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-y-auto">
          <ul className="flex flex-col px-5 py-3 sm:px-6">
            {data.navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.url}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between border-b border-[var(--color-border)] py-3.5 font-nav text-lg font-bold transition-colors hover:text-[var(--color-primary)] ${
                    sectionId(link.url) === active ? "text-[var(--color-primary)]" : "text-[var(--color-heading)]"
                  }`}
                >
                  {link.label}
                  <Icon name="LuChevronRight" className="size-4 text-[var(--color-primary)]" strokeWidth={2.2} />
                </a>
              </li>
            ))}
            <li className="pb-2 pt-5 sm:hidden">
              <a href={data.buttonUrl} onClick={() => setOpen(false)} className={`${ctaClass} h-12 w-full text-base`}>
                {data.buttonText}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
