import type { SafeFile } from "./security";

/**
 * Delivery adapters. Each runs only when its environment variables are present.
 * If NO adapter is configured, submissions are rejected with NOT_CONFIGURED so the
 * website never claims to have received a request that went nowhere.
 *
 * STATUS: These adapters are implemented against the public Resend and Airtable REST APIs
 * but have NOT been tested with live credentials. Test end-to-end before launch (see README).
 */

type Row = Record<string, string | number | undefined>;

export function deliveryConfigured() {
  return Boolean(resendReady() || airtableReady());
}
const resendReady = () => process.env.RESEND_API_KEY && process.env.QUOTE_NOTIFY_TO && process.env.QUOTE_NOTIFY_FROM;
const airtableReady = () => process.env.AIRTABLE_API_TOKEN && process.env.AIRTABLE_BASE_ID;

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function sendEmail(subject: string, fields: Row, replyTo: string, files: SafeFile[] = []) {
  const rows = Object.entries(fields)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `<tr><td style="padding:6px 12px;color:#4a5a6a;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:6px 12px;color:#102D57">${esc(String(v)).replace(/\n/g, "<br>")}</td></tr>`)
    .join("");
  const html = `<div style="font-family:Arial,sans-serif"><h2 style="color:#102D57">${esc(subject)}</h2><table style="border-collapse:collapse">${rows}</table></div>`;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.QUOTE_NOTIFY_FROM,
      to: process.env.QUOTE_NOTIFY_TO!.split(",").map((s) => s.trim()),
      reply_to: replyTo,
      subject,
      html,
      attachments: files.map((f) => ({ filename: f.filename, content: f.base64 })),
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text().catch(() => "")}`);
}

async function createAirtableRecord(table: string, fields: Row) {
  const res = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${encodeURIComponent(table)}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ records: [{ fields }], typecast: true }),
  });
  if (!res.ok) throw new Error(`Airtable ${res.status}: ${await res.text().catch(() => "")}`);
}

export async function deliver(kind: "quote" | "contact", data: Row, replyTo: string, files: SafeFile[] = []) {
  const ref = `${kind === "quote" ? "NTQ" : "NTC"}-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  const record: Row = { Reference: ref, "Submitted At": new Date().toISOString(), Status: "New", ...data };
  if (files.length) record["Attachments (filenames)"] = files.map((f) => `${f.filename} (${Math.round(f.size / 1024)} KB)`).join(", ");

  const tasks: Promise<unknown>[] = [];
  if (resendReady()) {
    const subject = kind === "quote" ? `New sourcing request ${ref} — ${data["Company"] ?? ""}` : `New website message ${ref} — ${data["Full Name"] ?? ""}`;
    tasks.push(sendEmail(subject, record, replyTo, files));
  }
  if (airtableReady()) {
    const table = kind === "quote" ? process.env.AIRTABLE_QUOTES_TABLE || "Quote Requests" : process.env.AIRTABLE_CONTACTS_TABLE || "Contact Messages";
    tasks.push(createAirtableRecord(table, record));
  }
  const results = await Promise.allSettled(tasks);
  const failures = results.filter((r): r is PromiseRejectedResult => r.status === "rejected");
  failures.forEach((f) => console.error(`[forms] ${kind} delivery failed:`, f.reason));
  return { ref, delivered: results.length - failures.length, failed: failures.length };
}
