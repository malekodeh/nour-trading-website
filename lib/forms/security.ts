import { FILE_RULES } from "./schema";

/* ---------- Simple in-memory rate limiter (per server instance) ----------
 * Good enough as a first line of defense. For multi-instance production traffic,
 * replace with a shared store (e.g. Upstash Redis / Vercel KV).
 */
const hits = new Map<string, number[]>();
export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const arr = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (arr.length >= limit) { hits.set(key, arr); return false; }
  arr.push(now);
  hits.set(key, arr);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  return true;
}

export function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

/** Honeypot + minimum fill time. Returns true when the submission looks automated. */
export function looksLikeBot(form: FormData) {
  const honeypot = String(form.get("company_website") ?? "");
  const startedAt = Number(form.get("_t") ?? 0);
  const elapsed = Date.now() - startedAt;
  return honeypot.length > 0 || !startedAt || elapsed < 2500 || elapsed > 1000 * 60 * 60 * 24;
}

/** Optional Cloudflare Turnstile verification — only enforced when TURNSTILE_SECRET_KEY is set. */
export async function verifyTurnstile(form: FormData, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  const token = String(form.get("cf-turnstile-response") ?? "");
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  const data = (await res.json().catch(() => ({}))) as { success?: boolean };
  return data.success === true;
}

/* ---------- File validation: extension + size + magic-byte signature ---------- */
export type SafeFile = { filename: string; contentType: string; size: number; base64: string };

const SIG = {
  pdf: [0x25, 0x50, 0x44, 0x46],
  png: [0x89, 0x50, 0x4e, 0x47],
  jpg: [0xff, 0xd8, 0xff],
  zip: [0x50, 0x4b, 0x03, 0x04], // docx/xlsx/pptx
  ole: [0xd0, 0xcf, 0x11, 0xe0], // legacy doc/xls/ppt
  riff: [0x52, 0x49, 0x46, 0x46], // webp
};
const startsWith = (b: Uint8Array, sig: number[]) => sig.every((v, i) => b[i] === v);
const MIME: Record<string, string> = {
  pdf: "application/pdf", jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp",
  doc: "application/msword", docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel", xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ppt: "application/vnd.ms-powerpoint", pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  csv: "text/csv", txt: "text/plain",
};

function signatureOk(ext: string, b: Uint8Array) {
  switch (ext) {
    case "pdf": return startsWith(b, SIG.pdf);
    case "png": return startsWith(b, SIG.png);
    case "jpg": case "jpeg": return startsWith(b, SIG.jpg);
    case "webp": return startsWith(b, SIG.riff);
    case "docx": case "xlsx": case "pptx": return startsWith(b, SIG.zip);
    case "doc": case "xls": case "ppt": return startsWith(b, SIG.ole);
    case "csv": case "txt": return !b.slice(0, 1024).includes(0); // plain text: no NUL bytes
    default: return false;
  }
}

export async function validateFiles(files: File[]): Promise<{ ok: true; files: SafeFile[] } | { ok: false; error: string }> {
  const real = files.filter((f) => f && typeof f === "object" && f.size > 0);
  if (real.length > FILE_RULES.maxFiles) return { ok: false, error: `Please upload no more than ${FILE_RULES.maxFiles} files.` };
  const total = real.reduce((s, f) => s + f.size, 0);
  if (total > FILE_RULES.maxTotalBytes) return { ok: false, error: `Total upload size must be under ${FILE_RULES.maxTotalBytes / 1024 / 1024} MB.` };

  const out: SafeFile[] = [];
  for (const f of real) {
    const ext = (f.name.split(".").pop() || "").toLowerCase();
    if (!(FILE_RULES.extensions as readonly string[]).includes(ext)) return { ok: false, error: `“${f.name}” is not an accepted file type.` };
    if (f.size > FILE_RULES.maxFileBytes) return { ok: false, error: `“${f.name}” is larger than ${FILE_RULES.maxFileBytes / 1024 / 1024} MB.` };
    const buf = new Uint8Array(await f.arrayBuffer());
    if (!signatureOk(ext, buf)) return { ok: false, error: `“${f.name}” doesn’t appear to be a valid ${ext.toUpperCase()} file.` };
    const safeName = f.name.replace(/[^\w.\- ]+/g, "_").slice(0, 120);
    out.push({ filename: safeName, contentType: MIME[ext], size: f.size, base64: Buffer.from(buf).toString("base64") });
  }
  return { ok: true, files: out };
}
