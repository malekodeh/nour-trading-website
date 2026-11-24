"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { contactSchema, fieldErrors, INQUIRY_TYPES } from "@/lib/forms/schema";
import { Field, aria, SpamTrap, postForm, type SubmitState } from "./fields";

export function ContactForm() {
  const [startedAt, setStartedAt] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  useEffect(() => setStartedAt(Date.now()), []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const parsed = contactSchema.safeParse(Object.fromEntries([...fd.entries()].filter(([, v]) => typeof v === "string")));
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      (form.querySelector(`[name="${Object.keys(errs)[0]}"]`) as HTMLElement | null)?.focus();
      return;
    }
    setErrors({});
    setState({ status: "submitting" });
    const res = await postForm("/api/contact", fd);
    if (res.ok) return setState({ status: "success", ref: res.ref });
    if (res.errors) setErrors(res.errors);
    setState({ status: "error", code: res.code, message: res.message || "Something went wrong. Please try again." });
  }

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-3xl border border-line bg-white p-10 text-center shadow-card">
        <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
        <h2 className="mt-4 text-2xl font-bold">Message sent</h2>
        <p className="mt-3 text-slate-text">Thank you for contacting NOUR TRADING INC. A member of our team will get back to you.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5 rounded-3xl border border-line bg-white p-6 shadow-card sm:grid-cols-2 sm:p-9">
      <SpamTrap startedAt={startedAt} />
      <Field name="fullName" label="Full name" required error={errors.fullName}><input {...aria("fullName", errors.fullName)} className="field" autoComplete="name" /></Field>
      <Field name="company" label="Company / Organization" error={errors.company}><input {...aria("company", errors.company)} className="field" autoComplete="organization" /></Field>
      <Field name="email" label="Email" required error={errors.email}><input {...aria("email", errors.email)} type="email" className="field" autoComplete="email" /></Field>
      <Field name="phone" label="Phone" error={errors.phone}><input {...aria("phone", errors.phone)} type="tel" className="field" autoComplete="tel" /></Field>
      <Field name="inquiryType" label="Inquiry type" required error={errors.inquiryType} className="sm:col-span-2">
        <select {...aria("inquiryType", errors.inquiryType)} className="field" defaultValue="">
          <option value="" disabled>Select…</option>
          {INQUIRY_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </Field>
      <Field name="message" label="Message" required error={errors.message} className="sm:col-span-2"><textarea {...aria("message", errors.message)} rows={5} className="field" /></Field>
      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-sm text-slate-text">
          <input type="checkbox" name="consent" value="yes" className="mt-0.5 h-4 w-4 accent-navy" aria-invalid={errors.consent ? true : undefined} />
          <span>I agree to the <Link href="/privacy-policy" className="font-medium text-corporate underline">Privacy Policy</Link>.</span>
        </label>
        {errors.consent && <p className="field-error" role="alert">{errors.consent}</p>}
      </div>
      {state.status === "error" && (
        <div role="alert" className={`flex gap-3 rounded-xl p-4 text-sm sm:col-span-2 ${state.code === "NOT_CONFIGURED" ? "bg-amber-50 text-amber-900" : "bg-red-50 text-red-800"}`}>
          <AlertTriangle className="h-5 w-5 shrink-0" /><p>{state.message}</p>
        </div>
      )}
      <div className="sm:col-span-2">
        <button type="submit" disabled={state.status === "submitting"} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-7 py-3.5 font-semibold text-white transition hover:bg-corporate disabled:opacity-60 sm:w-auto">
          {state.status === "submitting" ? <><Loader2 className="h-4 w-4 animate-spin" />Sending…</> : "Send Message"}
        </button>
      </div>
    </form>
  );
}
