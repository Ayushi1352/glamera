"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { TestimonialItem, TestimonialsData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { fill } from "@/components/ui/text";

const AUTOPLAY_MS = 6000;

const Card = ({ item, ratingLabel }: { item: TestimonialItem; ratingLabel: string }) => (
  <blockquote className="relative flex h-full flex-col items-center rounded-[0.75rem] border-2 border-[var(--color-border-card)] bg-gradient-to-b from-[var(--color-bg-review)] to-[var(--color-bg-review-bottom)] px-6 pb-7 pt-14 text-center shadow-[0_0.75rem_2rem_-1.5rem_var(--color-shadow-card)] lg:h-[24.0469rem] lg:rounded-[0.6563rem] lg:border-[0.0938rem] lg:px-[1.4063rem] lg:pb-[1.2188rem] lg:pt-[3.0938rem]">
    {/* round quote badge sitting on the top edge, with a white ring that cuts the border */}
    <span
      aria-hidden="true"
      className="absolute left-1/2 top-0 grid size-16 -translate-x-1/2 -translate-y-[43%] place-items-center rounded-full bg-[var(--color-bg-quote)] font-heading text-[3.4rem] font-[700] leading-none text-[var(--color-primary)] shadow-[0_0_0_0.3rem_var(--color-white),0_0.4rem_1rem_-0.4rem_var(--color-shadow-soft)] lg:size-[4.4063rem] lg:text-[5.1563rem] lg:shadow-[0_0_0_0.3281rem_var(--color-white),0_0.375rem_0.9375rem_-0.375rem_var(--color-shadow-soft)]"
    >
      <span className="mt-[0.42em]">“</span>
    </span>

    <span role="img" aria-label={fill(ratingLabel, { stars: item.stars })} className="flex gap-1.5 text-[var(--color-primary)] lg:gap-[0.4688rem]">
      {Array.from({ length: 5 }, (_, n) => (
        <Icon key={n} name={n < item.stars ? "FaStar" : "FaRegStar"} className="size-5 lg:size-[1.4063rem]" />
      ))}
    </span>

    <div className="flex flex-1 items-center py-5 lg:py-0 lg:pb-[1.4063rem]">
      <p className="font-text text-base leading-relaxed text-[var(--color-text-soft)] lg:whitespace-pre-line lg:text-[1.1953rem] lg:leading-[1.7344rem]">{item.quote}</p>
    </div>

    <span aria-hidden="true" className="h-[2px] w-14 bg-[var(--color-primary)] lg:h-[0.1406rem] lg:w-[3.9844rem]" />

    <footer className="mt-6 flex w-full items-center gap-5 text-left lg:mt-[1.0781rem] lg:gap-[1.5938rem] lg:pl-[1.6406rem]">
      {/* maroon ring, a thin white gap, then the photo filling the whole inner circle */}
      <span className="size-20 shrink-0 rounded-full border-2 border-[var(--color-primary)] bg-[var(--color-white)] p-[3px] lg:size-[6.375rem] lg:border-[0.1406rem] lg:p-[0.1875rem]">
        <span className="relative block size-full overflow-hidden rounded-full bg-[var(--color-bg-placeholder)]">
          <Image src={item.image} alt="" fill sizes="(min-width: 1024px) 102px, 80px" className="object-cover" />
        </span>
      </span>
      <span>
        <cite className="block font-heading text-xl font-[600] not-italic text-[var(--color-ink)] lg:text-[1.6875rem] lg:leading-none">{item.name}</cite>
        <span className="mt-1 block font-sans text-base text-[var(--color-text-light)] lg:mt-[0.6563rem] lg:text-[1.2656rem] lg:leading-none">{item.time}</span>
      </span>
    </footer>
  </blockquote>
);

/**
 * Each dot features one review in the middle. Desktop shows it between its neighbours (three cards),
 * phones and tablets show only the featured card. Moves on by itself and waits while the visitor hovers it.
 */
export const TestimonialSlider = ({ data }: { data: TestimonialsData }) => {
  const { items } = data;
  const [index, setIndex] = useState(Math.min(data.startIndex, items.length - 1));
  const [paused, setPaused] = useState(false);
  const at = (offset: number) => items[(index + offset + items.length) % items.length];

  useEffect(() => {
    if (paused || items.length < 2) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % items.length), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, items.length]);

  const fade = "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] starting:translate-y-5 starting:opacity-0";

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="mx-auto grid max-w-[34rem] gap-[1.3125rem] lg:max-w-none lg:grid-cols-3" aria-live="polite">
        {[-1, 0, 1].map((offset) => {
          const item = at(offset);
          return (
            // keyed by review, so a card that changes fades in
            <div key={`${offset}-${item.id}`} className={`pt-9 lg:pt-[1.9688rem] ${offset === 0 ? "" : "max-lg:hidden"} ${fade}`}>
              <Card item={item} ratingLabel={data.ratingLabel} />
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-center gap-4 sm:mt-8 lg:mt-[2.0156rem] lg:gap-[1.2188rem]">
        {items.map((item, n) => (
          <button
            key={item.id}
            type="button"
            aria-label={fill(data.showLabel, { name: item.name })}
            aria-current={n === index}
            onClick={() => setIndex(n)}
            className={`size-3.5 rounded-full transition-colors lg:size-[0.9844rem] ${n === index ? "bg-[var(--color-primary-bright)]" : "bg-[var(--color-dot)] hover:bg-[var(--color-rose)]"}`}
          />
        ))}
      </div>
    </div>
  );
};
