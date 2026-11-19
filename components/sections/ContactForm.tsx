"use client";

import { useState, type ReactNode } from "react";
import type { ContactFormData } from "@/types/templates.types";
import { useDummySubmit } from "@/components/ui/useDummySubmit";
import { Icon } from "@/components/ui/Icon";
import { FormSuccess, Spinner } from "@/components/ui/FormSuccess";

/** Outlined fields with a maroon icon on the left */
const base =
  "peer w-full appearance-none rounded-[0.4rem] border-2 border-[var(--color-border-field)] bg-[var(--color-white)] pl-12 pr-4 font-form text-base text-[var(--color-heading)] outline-none transition-colors placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] lg:rounded-[0.3281rem] lg:border-[0.0938rem] lg:pl-[4.0313rem] lg:pr-[1.125rem] lg:text-[1.0313rem]";
const field = `${base} h-[3.25rem] lg:h-[3.6094rem]`;
const iconClass = "pointer-events-none absolute left-4 size-5 text-[var(--color-primary)] lg:left-[1.125rem] lg:size-[1.6875rem]";
const chevron = "pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-[var(--color-heading)] lg:right-[1.125rem] lg:size-[1.2188rem]";

const Field = ({ icon, children }: { icon: string; children: ReactNode }) => (
  <div className="relative flex items-center">
    {children}
    <Icon name={icon} className={`${iconClass} top-1/2 -translate-y-1/2`} strokeWidth={1.5} />
  </div>
);

/** Optional service list; it shows its placeholder until a service is picked */
const ServiceSelect = ({ icon, placeholder, options }: { icon: string; placeholder: string; options: string[] }) => {
  const [value, setValue] = useState("");
  return (
    <Field icon={icon}>
      <select name="service" value={value} onChange={(event) => setValue(event.target.value)} aria-label={placeholder} className={`${field} pr-12 ${value ? "" : "text-[var(--color-text-muted)]"}`}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <Icon name="LuChevronDown" className={chevron} strokeWidth={2.2} />
    </Field>
  );
};

/** Date field that shows "Select Date" until a day is picked; a click anywhere opens the browser's calendar */
const DateSelect = ({ icon, placeholder }: { icon: string; placeholder: string }) => {
  const [value, setValue] = useState("");
  return (
    <Field icon={icon}>
      <input
        name="date"
        type="date"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onClick={(event) => event.currentTarget.showPicker?.()}
        aria-label={placeholder}
        className={`${field} pr-12 [&::-webkit-calendar-picker-indicator]:hidden ${value ? "" : "text-transparent"}`}
      />
      {!value && <span className="pointer-events-none absolute left-12 font-form text-base text-[var(--color-text-muted)] lg:left-[4.0313rem] lg:text-[1.0313rem]">{placeholder}</span>}
      <Icon name="LuChevronDown" className={chevron} strokeWidth={2.2} />
    </Field>
  );
};

/** Contact form with a dummy submit: sending state, then a thank-you message in place of the button */
export const ContactForm = ({ data, serviceOptions }: { data?: ContactFormData; serviceOptions: string[] }) => {
  const submit = useDummySubmit();
  if (!data) return null;
  const { fields } = data;

  // remounting the form (via key) after each send clears every field, including the controlled ones
  return (
    <form
      key={submit.round}
      data-reveal
      onSubmit={submit.onSubmit}
      onInput={submit.onInput}
      aria-busy={submit.sending}
      className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-[3.0938rem] lg:gap-x-[1.8281rem] lg:gap-y-[1.125rem]"
    >
      <Field icon={fields.name.icon}>
        <input name="name" required placeholder={fields.name.placeholder} aria-label={fields.name.placeholder} autoComplete="name" className={field} />
      </Field>
      <Field icon={fields.email.icon}>
        <input name="email" type="email" required placeholder={fields.email.placeholder} aria-label={fields.email.placeholder} autoComplete="email" className={field} />
      </Field>
      <DateSelect icon={fields.date.icon} placeholder={fields.date.placeholder} />
      <ServiceSelect icon={fields.service.icon} placeholder={fields.service.placeholder} options={serviceOptions} />
      <div className="relative sm:col-span-2 lg:mt-[0.2344rem]">
        <textarea
          name="message"
          required
          rows={4}
          placeholder={fields.message.placeholder}
          aria-label={fields.message.placeholder}
          className={`${base} block h-36 resize-y pt-3.5 lg:h-[9.1875rem] lg:pt-[1.0313rem]`}
        />
        <Icon name={fields.message.icon} className={`${iconClass} top-3.5 lg:top-[1.0313rem]`} strokeWidth={1.5} />
      </div>

      {/* the thank-you message takes the place of the button and the consent line, inside the form */}
      {submit.showMessage ? (
        <FormSuccess
          name={submit.name}
          title={data.successTitle}
          message={data.success}
          leaving={submit.status === "leaving"}
          visibleFor={submit.visibleFor}
          onClose={submit.dismiss}
          closeLabel={data.closeLabel}
          className="sm:col-span-2 lg:mt-[0.8906rem]"
        />
      ) : (
        <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center lg:mt-[0.8906rem] lg:gap-0">
          <button
            type="submit"
            disabled={submit.sending}
            className="flex h-14 shrink-0 items-center justify-center gap-3 rounded-[0.25rem] bg-[var(--color-primary-bright)] px-8 font-form text-base font-semibold uppercase text-[var(--color-white)] transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-hover)] disabled:cursor-wait disabled:opacity-80 lg:h-[3.1875rem] lg:w-[12.1875rem] lg:rounded-[0.1875rem] lg:px-0 lg:text-[1.0781rem]"
          >
            {submit.sending ? (
              <>
                <Spinner className="size-5" />
                {data.sending}
              </>
            ) : (
              data.button
            )}
          </button>
          <label className="flex items-center gap-3 font-form text-sm text-[var(--color-text)] lg:ml-[3.3281rem] lg:gap-[0.6094rem] lg:text-[0.9516rem]">
            <input
              type="checkbox"
              name="consent"
              required
              className="size-5 shrink-0 cursor-pointer appearance-none rounded-[0.2rem] border-2 border-[var(--color-border-field)] bg-[var(--color-white)] bg-center bg-no-repeat transition-colors checked:border-[var(--color-primary)] checked:bg-[var(--color-primary)] checked:bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22white%22%20stroke-width=%223.5%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22><path%20d=%22M5%2012.5l4.5%204.5L19%207%22/></svg>')] lg:size-[1.3125rem] lg:rounded-[0.1875rem] lg:border-[0.0938rem]"
            />
            <span>
              {data.consentText}{" "}
              <a href={data.consentUrl} className="underline underline-offset-2 transition-colors hover:text-[var(--color-primary)]">
                {data.consentLinkText}
              </a>
            </span>
          </label>
        </div>
      )}
    </form>
  );
};
