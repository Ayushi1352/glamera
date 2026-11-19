"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import type { GalleryData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { fill } from "@/components/ui/text";

const ViewerButton = ({ label, className, onClick, children }: { label: string; className: string; onClick: () => void; children: ReactNode }) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    className={`absolute grid size-11 place-items-center rounded-full bg-[var(--color-white-10)] text-[var(--color-white)] backdrop-blur transition-colors hover:bg-[var(--color-primary)] ${className}`}
  >
    {children}
  </button>
);

/** Filter buttons above a 4 x 2 photo grid; a photo opens in a full-screen viewer that steps through the shown photos */
export const GalleryGrid = ({ data }: { data: GalleryData }) => {
  const allId = data.filters[0]?.id;
  const [filter, setFilter] = useState(allId);
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const items = filter === allId ? data.items : data.items.filter((item) => item.category === filter);
  const show = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const step = (delta: number) => setIndex((i) => (i === null ? i : (i + delta + items.length) % items.length));
  const item = index === null ? null : items[index];

  return (
    <>
      <div role="group" aria-label={data.filterLabel} className="flex flex-wrap justify-center gap-2.5 sm:gap-4 lg:gap-[1.3125rem]">
        {data.filters.map((option) => {
          const current = option.id === filter;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={current}
              onClick={() => setFilter(option.id)}
              className={`h-11 min-w-[4.5rem] rounded-[0.35rem] border-2 px-5 font-sans text-base transition-colors duration-300 lg:h-[2.625rem] lg:min-w-[6.0469rem] lg:rounded-[0.3281rem] lg:border-[0.0938rem] lg:px-[2.0156rem] lg:text-[1.125rem] ${
                current
                  ? "border-[var(--color-primary-bright)] bg-[var(--color-primary-bright)] text-[var(--color-white)] hover:border-[var(--color-hover)] hover:bg-[var(--color-hover)]"
                  : "border-[var(--color-border-field)] bg-[var(--color-white)] text-[var(--color-heading)] hover:border-[var(--color-primary-bright)] hover:bg-[var(--color-hover-soft)] hover:text-[var(--color-primary-bright)]"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {/* keyed by filter, so the photos fade in again when the filter changes */}
      <div key={filter} className="mt-8 grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4 lg:mt-[2.3906rem] lg:gap-[0.6094rem]">
        {items.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => show(i)}
            aria-label={fill(data.openLabel, { title: photo.title })}
            className="group relative aspect-[434/282] cursor-zoom-in overflow-hidden rounded-[0.4rem] bg-[var(--color-bg-placeholder)] transition-[opacity,transform] duration-500 starting:translate-y-3 starting:opacity-0 lg:rounded-[0.375rem]"
          >
            <Image quality={90} src={photo.image} alt="" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
            <span className="absolute inset-0 flex items-end justify-between gap-3 bg-gradient-to-t from-[var(--color-black-70)] via-[var(--color-black-20)] to-transparent p-3 text-left opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 lg:p-[0.9375rem]">
              <span className="font-heading text-base font-[500] leading-snug text-[var(--color-white)] max-sm:hidden lg:text-[1.3125rem]">{photo.title}</span>
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--color-primary)] text-[var(--color-white)] max-sm:ml-auto lg:size-[2.1563rem]">
                <Icon name="LuPlus" className="size-[1.125rem]" strokeWidth={2.2} />
              </span>
            </span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialog}
        aria-label={data.viewerLabel}
        onClose={() => setIndex(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
        className="m-auto h-[min(85dvh,56.25rem)] w-[calc(100%-2rem)] max-w-5xl bg-transparent p-0 backdrop:bg-[var(--color-black-85)] open:transition-[opacity,transform] open:duration-500 open:ease-[cubic-bezier(0.22,1,0.36,1)] open:starting:translate-y-5 open:starting:opacity-0"
      >
        {item && index !== null && (
          <figure className="relative flex h-full flex-col">
            <div className="relative flex-1">
              <Image quality={90} src={item.image} alt={item.title} fill sizes="100vw" className="object-contain" />
            </div>
            <figcaption className="pt-4 text-center font-heading text-xl text-[var(--color-white)]">
              {item.title}
              <span className="ml-3 font-sans text-xs text-[var(--color-white-80)]">
                {index + 1} / {items.length}
              </span>
            </figcaption>
            <ViewerButton label={data.closeLabel} className="right-2 top-2" onClick={() => dialog.current?.close()}>
              <Icon name="LuX" className="size-5" />
            </ViewerButton>
            {items.length > 1 && (
              <>
                <ViewerButton label={data.previousLabel} className="left-2 top-1/2 -translate-y-1/2" onClick={() => step(-1)}>
                  <Icon name="LuChevronLeft" className="size-5" strokeWidth={2.2} />
                </ViewerButton>
                <ViewerButton label={data.nextLabel} className="right-2 top-1/2 -translate-y-1/2" onClick={() => step(1)}>
                  <Icon name="LuChevronRight" className="size-5" strokeWidth={2.2} />
                </ViewerButton>
              </>
            )}
          </figure>
        )}
      </dialog>
    </>
  );
};
