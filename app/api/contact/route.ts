import { NextResponse } from "next/server";
import { contactSchema, fieldErrors, withDefaults } from "@/lib/forms/schema";
import { rateLimit, clientIp, looksLikeBot, verifyTurnstile } from "@/lib/forms/security";
import { deliver, deliveryConfigured } from "@/lib/forms/deliver";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (!rateLimit(`contact:${ip}`)) {
    return NextResponse.json({ ok: false, code: "RATE_LIMITED", message: "Too many submissions. Please wait a few minutes and try again." }, { status: 429 });
  }
  let form: FormData;
  try { form = await req.formData(); } catch {
    return NextResponse.json({ ok: false, code: "BAD_REQUEST", message: "We couldn’t read your submission." }, { status: 400 });
  }
  if (looksLikeBot(form)) return NextResponse.json({ ok: true });
  if (!(await verifyTurnstile(form, ip))) {
    return NextResponse.json({ ok: false, code: "CAPTCHA", message: "Please complete the verification and try again." }, { status: 400 });
  }
  const parsed = contactSchema.safeParse(withDefaults(contactSchema.shape, Object.fromEntries([...form.entries()].filter(([, v]) => typeof v === "string"))));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, code: "VALIDATION", message: "Please correct the highlighted fields.", errors: fieldErrors(parsed.error) }, { status: 422 });
  }
  if (!deliveryConfigured()) {
    console.warn("[forms] Contact message received but no delivery integration is configured.");
    return NextResponse.json({ ok: false, code: "NOT_CONFIGURED", message: "Online messaging is not yet active. Please check back soon." }, { status: 503 });
  }
  const d = parsed.data;
  const result = await deliver("contact", {
    "Full Name": d.fullName, Company: d.company || undefined, Email: d.email, Phone: d.phone || undefined,
    "Inquiry Type": d.inquiryType, Message: d.message, Source: "Website contact form",
  }, d.email);
  if (result.delivered === 0) {
    return NextResponse.json({ ok: false, code: "DELIVERY_FAILED", message: "Something went wrong sending your message. Please try again shortly." }, { status: 502 });
  }
  return NextResponse.json({ ok: true, ref: result.ref });
}
