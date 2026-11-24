"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { UploadCloud, FileText, X, Loader2, CheckCircle2, AlertTriangle, Lock } from "lucide-react";
import { quoteSchema, fieldErrors, FILE_RULES, US_STATES, SHIPPING_PREFERENCES } from "@/lib/forms/schema";
import { productCategoryNames } from "@/content/products";
import { services } from "@/content/services";
import { Field, aria, SpamTrap, FormSection, postForm, type SubmitState } from "./fields";

const categories = [...productCategoryNames, "Other / Not listed"];

export function QuoteForm() {
  const params = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const [startedAt, setStartedAt] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [drag, setDrag] = useState(false);
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  useEffect(() => setStartedAt(Date.now()), []);

  const presetCategory = (() => {
    const c = params.get("category");
    return c && categories.includes(c) ? c : "";
  })();
  const presetService = services.find((s) => s.slug === params.get("service"));

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = [...files];
    let err = "";
    for (const f of Array.from(list)) {
      const ext = (f.name.split(".").pop() || "").toLowerCase();
      if (!(FILE_RULES.extensions as readonly string[]).includes(ext)) { err = `“${f.name}” is not an accepted file type.`; continue; }
      if (f.size > FILE_RULES.maxFileBytes) { err = `“${f.name}” is larger than ${FILE_RULES.maxFileBytes / 1048576} MB.`; continue; }
      if (next.length >= FILE_RULES.maxFiles) { err = `You can attach up to ${FILE_RULES.maxFiles} files.`; break; }
      if (!next.some((x) => x.name === f.name && x.size === f.size)) next.push(f);
    }
    const total = next.reduce((s, f) => s + f.size, 0);
    if (total > FILE_RULES.maxTotalBytes) { err = `Total attachments must be under ${FILE_RULES.maxTotalBytes / 1048576} MB.`; return setErrors((e) => ({ ...e, files: err })); }
    setFiles(next);
    setErrors((e) => { const { files: _omit, ...rest } = e; return err ? { ...rest, files: err } : rest; });
  }

  function validateField(name: string, value: string) {
    const shape = quoteSchema.shape as Record<string, { safeParse: (v: unknown) => { success: boolean; error?: { issues: { message: string }[] } } }>;
    if (!shape[name]) return;
    const r = shape[name].safeParse(value);
    setErrors((e) => {
      const n = { ...e };
      if (r.success) delete n[name]; else n[name] = r.error!.issues[0].message;
      return n;
    });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.delete("files");
    files.forEach((f) => fd.append("files", f));

    const raw = Object.fromEntries([...fd.entries()].filter(([, v]) => typeof v === "string"));
    const parsed = quoteSchema.safeParse(raw);
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors((prev) => ({ ...(prev.files ? { files: prev.files } : {}), ...errs }));
      const first = Object.keys(errs)[0];
      (form.querySelector(`[name="${first}"]`) as HTMLElement | null)?.focus();
      return;
    }

    setState({ status: "submitting" });
    const res = await postForm("/api/quote", fd);
    if (res.ok) {
      setState({ status: "success", ref: res.ref });
      window.scrollTo({ top: (formRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 120, behavior: "smooth" });
      return;
    }
    if (res.errors) setErrors(res.errors);
    setState({ status: "error", code: res.code, message: res.message || "Something went wrong. Please try again." });
  }

  if (state.status === "success") {
    return (
      <motion.div ref={formRef as never} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-line bg-white p-10 text-center shadow-card sm:p-14" role="status" aria-live="polite">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-navy"><CheckCircle2 className="h-8 w-8 text-gold-light" /></span>
        <h2 className="mt-6 text-2xl font-bold sm:text-3xl">Request received</h2>
        <p className="mx-auto mt-4 max-w-lg text-[17px] leading-relaxed text-slate-text">
          Thank you for contacting NOUR TRADING INC. Our team will review your sourcing requirements and contact you regarding the next steps.
        </p>
        {state.ref && <p className="mt-4 text-sm text-slate-text">Your reference: <strong className="text-navy">{state.ref}</strong></p>}
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-navy hover:border-navy">Back to home</Link>
          <Link href="/how-it-works" className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white">What happens next</Link>
        </div>
      </motion.div>
    );
  }

  const submitting = state.status === "submitting";
  const fmt = (b: number) => (b > 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.ceil(b / 1024)} KB`);

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative space-y-10 rounded-3xl border border-line bg-white p-6 shadow-card sm:p-10"
      onBlur={(e) => { const t = e.target as unknown as HTMLInputElement; if (t.name && errors[t.name] !== undefined) validateField(t.name, t.value); }}>
      <SpamTrap startedAt={startedAt} />

      <FormSection n={1} title="Customer Information">
        <Field name="fullName" label="Full name" required error={errors.fullName}><input {...aria("fullName", errors.fullName)} className="field" autoComplete="name" /></Field>
        <Field name="company" label="Company / Organization" required error={errors.company}><input {...aria("company", errors.company)} className="field" autoComplete="organization" /></Field>
        <Field name="email" label="Email" required error={errors.email}><input {...aria("email", errors.email)} type="email" className="field" autoComplete="email" /></Field>
        <Field name="phone" label="Phone number" required error={errors.phone}><input {...aria("phone", errors.phone)} type="tel" className="field" autoComplete="tel" /></Field>
        <Field name="website" label="Business website" error={errors.website} className="sm:col-span-2"><input {...aria("website", errors.website)} className="field" placeholder="www.example.com" autoComplete="url" /></Field>
      </FormSection>

      <FormSection n={2} title="Product Information">
        <Field name="category" label="Product category" required error={errors.category}>
          <select {...aria("category", errors.category)} className="field" defaultValue={presetCategory}>
            <option value="" disabled>Select a category…</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field name="quantity" label="Estimated quantity" required error={errors.quantity} hint="e.g. 500 units, 2,000 bags, 1 container">
          <input {...aria("quantity", errors.quantity, "x")} className="field" />
        </Field>
        <Field name="productDescription" label="Product name or description" required error={errors.productDescription} className="sm:col-span-2">
          <textarea {...aria("productDescription", errors.productDescription)} rows={3} className="field" placeholder="What would you like to source?" defaultValue={presetService ? `Service of interest: ${presetService.title}\n` : ""} />
        </Field>
        <Field name="specifications" label="Required specifications" error={errors.specifications} className="sm:col-span-2" hint="Size, materials, colors, certifications, packaging, etc.">
          <textarea {...aria("specifications", errors.specifications, "x")} rows={3} className="field" />
        </Field>
        <Field name="branding" label="Custom logo or printing requirements" error={errors.branding}><input {...aria("branding", errors.branding)} className="field" placeholder="e.g. 1-color logo on front" /></Field>
        <Field name="deliveryDate" label="Preferred delivery date" error={errors.deliveryDate}><input {...aria("deliveryDate", errors.deliveryDate)} type="date" className="field" /></Field>
      </FormSection>

      <FormSection n={3} title="Shipping Information">
        <Field name="city" label="Destination city" required error={errors.city}><input {...aria("city", errors.city)} className="field" autoComplete="address-level2" /></Field>
        <div className="grid grid-cols-2 gap-4">
          <Field name="state" label="State" required error={errors.state}>
            <select {...aria("state", errors.state)} className="field" defaultValue="">
              <option value="" disabled>State</option>
              {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field name="zip" label="ZIP code" required error={errors.zip}><input {...aria("zip", errors.zip)} className="field" inputMode="numeric" autoComplete="postal-code" /></Field>
        </div>
        <Field name="shippingPreference" label="Shipping preference" error={errors.shippingPreference} className="sm:col-span-2">
          <select {...aria("shippingPreference", errors.shippingPreference)} className="field" defaultValue="">
            <option value="">If known…</option>
            {SHIPPING_PREFERENCES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
      </FormSection>

      <FormSection n={4} title="Files & Additional Requirements">
        <div className="sm:col-span-2">
          <span className="field-label">Upload files <span className="font-normal text-slate-text/70">(optional)</span></span>
          <div
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files); }}
            className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 text-center transition ${drag ? "border-gold bg-gold/5" : errors.files ? "border-red-400" : "border-line bg-mist/60"}`}
          >
            <UploadCloud className="h-8 w-8 text-corporate" strokeWidth={1.5} />
            <p className="mt-3 text-[15px] text-navy">
              Drag &amp; drop, or{" "}
              <button type="button" onClick={() => fileInput.current?.click()} className="font-semibold text-corporate underline underline-offset-2">browse files</button>
            </p>
            <p className="mt-1 text-xs text-slate-text">Product photos, drawings, specifications · PDF, JPG, PNG, Word, Excel, PowerPoint · up to {FILE_RULES.maxFiles} files, {FILE_RULES.maxTotalBytes / 1048576} MB total</p>
            <input ref={fileInput} id="files" type="file" multiple accept={FILE_RULES.accept} className="sr-only" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} aria-describedby={errors.files ? "files-error" : undefined} />
          </div>
          {errors.files && <p id="files-error" className="field-error" role="alert">{errors.files}</p>}
          {files.length > 0 && (
            <ul className="mt-3 space-y-2">
              {files.map((f, i) => (
                <li key={f.name + f.size} className="flex items-center gap-3 rounded-xl border border-line px-4 py-2.5 text-sm">
                  <FileText className="h-4 w-4 text-corporate" /><span className="flex-1 truncate text-navy">{f.name}</span><span className="text-slate-text">{fmt(f.size)}</span>
                  <button type="button" aria-label={`Remove ${f.name}`} onClick={() => setFiles(files.filter((_, j) => j !== i))} className="rounded-full p-1 text-slate-text hover:bg-mist hover:text-navy"><X className="h-4 w-4" /></button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Field name="additional" label="Additional requirements" error={errors.additional} className="sm:col-span-2">
          <textarea {...aria("additional", errors.additional)} rows={5} className="field" placeholder="Budget range, certifications, packaging, timeline constraints, or anything else we should know." />
        </Field>
      </FormSection>

      <div className="border-t border-line pt-8">
        <label className="flex items-start gap-3 text-sm text-slate-text">
          <input type="checkbox" name="consent" value="yes" className="mt-0.5 h-4 w-4 rounded border-line accent-navy" aria-invalid={errors.consent ? true : undefined} aria-describedby={errors.consent ? "consent-error" : undefined} />
          <span>I agree that Nour Trading Inc. may use the information I provide to respond to my request, as described in the <Link href="/privacy-policy" className="font-medium text-corporate underline">Privacy Policy</Link>. We never sell your information.</span>
        </label>
        {errors.consent && <p id="consent-error" className="field-error" role="alert">{errors.consent}</p>}

        <AnimatePresence>
          {state.status === "error" && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} role="alert"
              className={`mt-6 flex gap-3 rounded-xl p-4 text-sm ${state.code === "NOT_CONFIGURED" ? "bg-amber-50 text-amber-900" : "bg-red-50 text-red-800"}`}>
              <AlertTriangle className="h-5 w-5 shrink-0" />
              <div>
                <p className="font-semibold">{state.code === "NOT_CONFIGURED" ? "Online submission isn’t connected yet" : "We couldn’t submit your request"}</p>
                <p className="mt-0.5">{state.message}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-xs text-slate-text"><Lock className="h-3.5 w-3.5" />Your information is sent securely and is used only to prepare your quotation.</p>
          <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 font-semibold text-navy-950 shadow-[0_8px_24px_-10px_rgba(201,162,77,0.8)] transition hover:bg-gold-light disabled:opacity-60 sm:w-auto">
            {submitting ? <><Loader2 className="h-4 w-4 animate-spin" />Submitting…</> : "Submit My Sourcing Request"}
          </button>
        </div>
      </div>
    </form>
  );
}
