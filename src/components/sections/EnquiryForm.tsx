"use client";

import { useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { CheckCircle2, Loader2, Mail, MessageCircle, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import {
  enquirySchema,
  type EnquiryFieldErrors,
  type EnquiryResult,
} from "@/lib/validation";
import {
  contact,
  contactMethodOptions,
  contactTimeOptions,
  supportTypeOptions,
} from "@/content/landing-page";
import {
  getMailtoHref,
  getTelHref,
  getWhatsappHref,
  siteConfig,
} from "@/config/site";
import { Button } from "@/components/ui/Button";

type Values = {
  name: string;
  email: string;
  phone: string;
  country: string;
  parentCity: string;
  supportType: string;
  contactMethod: string;
  contactTime: string;
  message: string;
  consent: boolean;
  company: string; // honeypot
};

const initialValues: Values = {
  name: "",
  email: "",
  phone: "",
  country: "",
  parentCity: "",
  supportType: "",
  contactMethod: "",
  contactTime: "",
  message: "",
  consent: false,
  company: "",
};

// Order used to move focus to the first invalid field.
const FIELD_ORDER: (keyof Values)[] = [
  "name",
  "email",
  "phone",
  "country",
  "parentCity",
  "supportType",
  "contactMethod",
  "contactTime",
  "message",
  "consent",
];

type Status = "idle" | "submitting" | "success" | "error" | "unconfigured";

const inputClass =
  "w-full rounded-xl border bg-surface px-4 py-3 text-[1rem] text-text placeholder:text-muted/70 transition-colors focus:border-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta";

function ContactFallbacks() {
  const tel = getTelHref();
  const wa = getWhatsappHref(
    "Hello Dear Ones, I would like to learn more about your elder-support services."
  );
  const mail = getMailtoHref("Dear Ones enquiry");
  if (!tel && !wa && !mail) return null;
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {tel && (
        <a href={tel} onClick={() => trackEvent("phone_click")} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-brown">
          <Phone aria-hidden="true" className="h-4 w-4" /> {siteConfig.phone}
        </a>
      )}
      {wa && (
        <a href={wa} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("whatsapp_click")} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-brown">
          <MessageCircle aria-hidden="true" className="h-4 w-4" /> WhatsApp
        </a>
      )}
      {mail && (
        <a href={mail} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-brown">
          <Mail aria-hidden="true" className="h-4 w-4" /> Email
        </a>
      )}
    </div>
  );
}

export function EnquiryForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<EnquiryFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState<string>("");
  const baseId = useId();
  const formRef = useRef<HTMLFormElement | null>(null);

  const fieldId = (name: keyof Values) => `${baseId}-${name}`;
  const errorId = (name: keyof Values) => `${baseId}-${name}-error`;

  function update<K extends keyof Values>(name: K, value: Values[K]) {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof EnquiryFieldErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof EnquiryFieldErrors];
        return next;
      });
    }
  }

  const onInput =
    (name: keyof Values) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      update(name, e.target.value as Values[typeof name]);

  function focusFirstError(fieldErrors: EnquiryFieldErrors) {
    const first = FIELD_ORDER.find((f) => fieldErrors[f as keyof EnquiryFieldErrors]);
    if (first) document.getElementById(fieldId(first))?.focus();
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const parsed = enquirySchema.safeParse(values);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      const next: EnquiryFieldErrors = {};
      for (const key of FIELD_ORDER) {
        const msg = flat[key]?.[0];
        if (msg) next[key as keyof EnquiryFieldErrors] = msg;
      }
      setErrors(next);
      setStatus("error");
      setServerMessage("Please review the highlighted fields.");
      focusFirstError(next);
      return;
    }

    setStatus("submitting");
    setServerMessage("");
    setErrors({});

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = (await res.json()) as EnquiryResult;

      if (result.status === "success") {
        setStatus("success");
        trackEvent("enquiry_submit_success");
        return;
      }
      if (result.status === "unconfigured") {
        setStatus("unconfigured");
        setServerMessage(result.message);
        return;
      }
      setStatus("error");
      setServerMessage(result.message || "Something went wrong.");
      if (result.status === "error" && result.fieldErrors) {
        setErrors(result.fieldErrors);
        focusFirstError(result.fieldErrors);
      }
    } catch {
      setStatus("error");
      setServerMessage(
        "We couldn’t reach the server. Please try again or contact us directly."
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-gold/40 bg-surface p-8 text-center shadow-[0_10px_30px_rgba(76,37,13,0.08)]"
      >
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-terracotta/10 text-terracotta">
          <CheckCircle2 aria-hidden="true" className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-serif text-2xl text-brown">Thank you.</h3>
        <p className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-muted">
          Your enquiry has been received. A care coordinator will be in touch to
          understand your family’s needs and explain the available options.
        </p>
      </div>
    );
  }

  const isBusy = status === "submitting";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Live status region for non-success outcomes */}
      {(status === "error" || status === "unconfigured") && serverMessage && (
        <div
          role={status === "error" ? "alert" : "status"}
          className={cn(
            "rounded-xl border px-4 py-3 text-sm leading-relaxed",
            status === "error"
              ? "border-[#c96a53]/40 bg-[#fbeae5] text-[#8f2d18]"
              : "border-gold/40 bg-background-soft text-brown-soft"
          )}
        >
          {serverMessage}
          {status === "unconfigured" && <ContactFallbacks />}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id={fieldId("name")} name="name" label="Your name" value={values.name} onChange={onInput("name")} error={errors.name} errorId={errorId("name")} autoComplete="name" required />
        <TextField id={fieldId("email")} name="email" type="email" label="Email address" value={values.email} onChange={onInput("email")} error={errors.email} errorId={errorId("email")} autoComplete="email" required />
        <TextField id={fieldId("phone")} name="phone" type="tel" label="Phone or WhatsApp number" value={values.phone} onChange={onInput("phone")} error={errors.phone} errorId={errorId("phone")} autoComplete="tel" required />
        <TextField id={fieldId("country")} name="country" label="Country you live in" value={values.country} onChange={onInput("country")} error={errors.country} errorId={errorId("country")} autoComplete="country-name" required />
        <TextField id={fieldId("parentCity")} name="parentCity" label="Your parent’s city" value={values.parentCity} onChange={onInput("parentCity")} error={errors.parentCity} errorId={errorId("parentCity")} required />
        <SelectField id={fieldId("supportType")} name="supportType" label="Type of support" value={values.supportType} onChange={onInput("supportType")} error={errors.supportType} errorId={errorId("supportType")} options={supportTypeOptions} placeholder="Select support type" required />
        <SelectField id={fieldId("contactMethod")} name="contactMethod" label="Preferred contact method" value={values.contactMethod} onChange={onInput("contactMethod")} error={errors.contactMethod} errorId={errorId("contactMethod")} options={contactMethodOptions} placeholder="Select a method" required />
        <SelectField id={fieldId("contactTime")} name="contactTime" label="Preferred contact time" value={values.contactTime} onChange={onInput("contactTime")} error={errors.contactTime} errorId={errorId("contactTime")} options={contactTimeOptions} placeholder="Select a time" required />
      </div>

      <TextAreaField id={fieldId("message")} name="message" label="Anything you’d like us to know (optional)" value={values.message} onChange={onInput("message")} error={errors.message} errorId={errorId("message")} />

      {/* Honeypot — hidden from users and assistive tech */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={fieldId("company")}>Company (leave blank)</label>
        <input
          id={fieldId("company")}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={onInput("company")}
        />
      </div>

      {/* Consent */}
      <div>
        <label className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-brown-soft">
          <input
            id={fieldId("consent")}
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => update("consent", e.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? errorId("consent") : undefined}
            className="mt-1 h-5 w-5 shrink-0 rounded border-line accent-terracotta"
          />
          <span>{contact.consentLabel}</span>
        </label>
        {errors.consent && (
          <p id={errorId("consent")} className="mt-1.5 text-sm text-[#8f2d18]">
            {errors.consent}
          </p>
        )}
      </div>

      <div className="pt-1">
        <Button type="submit" size="lg" disabled={isBusy} aria-busy={isBusy} className="w-full sm:w-auto">
          {isBusy ? (
            <>
              <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin" />
              Sending…
            </>
          ) : (
            "Send enquiry"
          )}
        </Button>
      </div>
    </form>
  );
}

/* ---------- Field primitives ---------- */

interface BaseFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  error?: string;
  errorId: string;
  required?: boolean;
}

function FieldLabel({ id, label, required }: { id: string; label: string; required?: boolean }) {
  return (
    <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-brown">
      {label}
      {required && <span className="ml-0.5 text-terracotta" aria-hidden="true">*</span>}
    </label>
  );
}

function FieldError({ error, errorId }: { error?: string; errorId: string }) {
  if (!error) return null;
  return (
    <p id={errorId} className="mt-1.5 text-sm text-[#8f2d18]">
      {error}
    </p>
  );
}

interface TextFieldProps extends BaseFieldProps {
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function TextField({ id, name, label, type = "text", value, onChange, error, errorId, autoComplete, required }: TextFieldProps) {
  return (
    <div>
      <FieldLabel id={id} label={label} required={required} />
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(inputClass, error ? "border-[#c96a53]" : "border-line")}
      />
      <FieldError error={error} errorId={errorId} />
    </div>
  );
}

interface SelectFieldProps extends BaseFieldProps {
  options: { value: string; label: string }[];
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function SelectField({ id, name, label, value, onChange, error, errorId, options, placeholder, required }: SelectFieldProps) {
  return (
    <div>
      <FieldLabel id={id} label={label} required={required} />
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(inputClass, "appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10", error ? "border-[#c96a53]" : "border-line")}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23A8783F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <FieldError error={error} errorId={errorId} />
    </div>
  );
}

interface TextAreaFieldProps extends BaseFieldProps {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextAreaField({ id, name, label, value, onChange, error, errorId }: TextAreaFieldProps) {
  return (
    <div>
      <FieldLabel id={id} label={label} />
      <textarea
        id={id}
        name={name}
        rows={4}
        value={value}
        onChange={onChange}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(inputClass, "resize-y", error ? "border-[#c96a53]" : "border-line")}
      />
      <FieldError error={error} errorId={errorId} />
    </div>
  );
}
