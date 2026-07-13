"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Web3Forms public access key (safe to expose). Get one free at web3forms.com
// and set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local, then rebuild.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  function validate(form: HTMLFormElement) {
    const data = new FormData(form);
    const next: Record<string, boolean> = {};
    if (!String(data.get("name") || "").trim()) next.name = true;
    const email = String(data.get("email") || "").trim();
    if (!email || !emailRe.test(email)) next.email = true;
    if (!String(data.get("message") || "").trim()) next.message = true;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!validate(form)) {
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }
    if (!WEB3FORMS_KEY) {
      setStatus("error");
      setServerError("The form isn't configured yet. Please email us directly at admin@swiftcode.co.za.");
      return;
    }

    setStatus("submitting");
    setServerError(null);
    const fd = new FormData(form);
    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: `New enquiry — ${fd.get("name")}`,
      from_name: "SwiftCode Innovation website",
      name: fd.get("name"),
      email: fd.get("email"),
      company: fd.get("company") || "—",
      interest: fd.get("interest") || "—",
      message: fd.get("message"),
      botcheck: fd.get("botcheck") || "",
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch {
      setStatus("error");
      setServerError("Something went wrong sending your message. Please email us directly at admin@swiftcode.co.za.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="glass flex flex-col items-center rounded-[24px] p-10 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-cyan/40 bg-cyan/15 text-cyan">
          <Check className="h-8 w-8" strokeWidth={2.5} />
        </div>
        <h3 className="text-2xl">Thank you!</h3>
        <p className="mt-2 text-muted">Your message is on its way. We&apos;ll be in touch within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="glass rounded-[24px] p-[clamp(24px,4vw,36px)]">
      {/* honeypot */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" required error={errors.name} errorMsg="Please enter your name.">
          <input id="name" name="name" type="text" autoComplete="name" placeholder="Atusaye Msiska" aria-invalid={errors.name || undefined} className={inputCls} />
        </Field>
        <Field id="email" label="Email" required error={errors.email} errorMsg="Please enter a valid email address.">
          <input id="email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@company.co.za" aria-invalid={errors.email || undefined} className={inputCls} />
        </Field>
        <Field id="company" label="Company">
          <input id="company" name="company" type="text" autoComplete="organization" placeholder="Your organisation" className={inputCls} />
        </Field>
        <Field id="interest" label="I'm interested in">
          <select id="interest" name="interest" className={inputCls} defaultValue="">
            <option value="" disabled>Select an option</option>
            <option>Digital product development</option>
            <option>AI solutions</option>
            <option>Software engineering</option>
            <option>Cloud solutions</option>
            <option>UI/UX design</option>
            <option>Technology strategy</option>
            <option>Cybersecurity</option>
            <option>Something else</option>
          </select>
        </Field>
      </div>
      <Field id="message" label="Project details" required error={errors.message} errorMsg="Please tell us a little about your project." className="mt-5">
        <textarea id="message" name="message" rows={5} placeholder="Tell us what you're building, who it's for, and where you are today…" aria-invalid={errors.message || undefined} className={`${inputCls} resize-y`} />
      </Field>

      {serverError && <p role="alert" className="mt-4 text-sm text-red-400">{serverError}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-cyan to-royal px-6 font-semibold text-ink shadow-[0_10px_30px_-8px_rgba(24,224,255,.5)] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
        <Send className="h-4 w-4" />
      </button>
      <p className="mt-3 text-center text-[13px] text-faint">
        By submitting you agree to our Privacy Policy. We&apos;ll never share your details.
      </p>
    </form>
  );
}

const inputCls =
  "min-h-[52px] w-full rounded-xl border border-[var(--color-line)] bg-navy px-4 py-3 text-[16px] text-fg placeholder:text-faint transition-all focus:border-royal focus:outline-none focus:ring-2 focus:ring-royal/40 aria-[invalid=true]:border-red-500";

function Field({
  id, label, required, error, errorMsg, className, children,
}: {
  id: string; label: string; required?: boolean; error?: boolean; errorMsg?: string;
  className?: string; children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-[14px] font-medium">
        {label} {required && <span className="text-cyan">*</span>}
      </label>
      {children}
      {error && errorMsg && <p className="mt-1.5 text-[13px] text-red-400">{errorMsg}</p>}
    </div>
  );
}
