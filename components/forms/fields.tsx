import type { ReactNode } from "react";

export function Field({
  name, label, error, required, hint, children, className = "",
}: { name: string; label: string; error?: string; required?: boolean; hint?: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="field-label">
        {label} {required ? <span className="text-gold-dark" aria-hidden>*</span> : <span className="font-normal text-slate-text/70">(optional)</span>}
      </label>
      {children}
      {hint && !error && <p id={`${name}-hint`} className="mt-1.5 text-xs text-slate-text/80">{hint}</p>}
      {error && <p id={`${name}-error`} className="field-error" role="alert">{error}</p>}
    </div>
  );
}

export const aria = (name: string, error?: string, hint?: string) => ({
  id: name,
  name,
  "aria-invalid": error ? (true as const) : undefined,
  "aria-describedby": error ? `${name}-error` : hint ? `${name}-hint` : undefined,
});

/** Hidden honeypot + timestamp used by the server's spam checks. */
export function SpamTrap({ startedAt }: { startedAt: number }) {
  return (
    <>
      <div aria-hidden className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor="company_website">Leave this field empty</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="_t" value={startedAt} />
    </>
  );
}

export function FormSection({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <fieldset className="border-t border-line pt-8 first:border-0 first:pt-0">
      <legend className="flex items-center gap-3 font-display text-lg font-bold text-navy">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-sm text-gold-light">{n}</span>{title}
      </legend>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

export type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; ref?: string }
  | { status: "error"; message: string; code?: string };

export async function postForm(url: string, fd: FormData): Promise<{ ok: boolean; code?: string; message?: string; errors?: Record<string, string>; ref?: string }> {
  try {
    const res = await fetch(url, { method: "POST", body: fd });
    const json = await res.json().catch(() => null);
    if (json && typeof json === "object") return json;
    // No JSON (e.g. static preview without a server, or 404/405)
    return { ok: false, code: "NOT_CONFIGURED", message: "The submission service is not connected in this environment." };
  } catch {
    return { ok: false, code: "NETWORK", message: "We couldn’t reach the server. Please check your connection and try again." };
  }
}
