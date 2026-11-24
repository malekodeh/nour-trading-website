import { NextResponse } from "next/server";
import { quoteSchema, fieldErrors, withDefaults } from "@/lib/forms/schema";
import { rateLimit, clientIp, looksLikeBot, verifyTurnstile, validateFiles } from "@/lib/forms/security";
import { deliver, deliveryConfigured } from "@/lib/forms/deliver";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (!rateLimit(`quote:${ip}`)) {
    return NextResponse.json({ ok: false, code: "RATE_LIMITED", message: "Too many submissions. Please wait a few minutes and try again." }, { status: 429 });
  }

  let form: FormData;
  try { form = await req.formData(); } catch {
    return NextResponse.json({ ok: false, code: "BAD_REQUEST", message: "We couldn’t read your submission. If you attached large files, try smaller ones." }, { status: 400 });
  }

  // Silently "accept" obvious bots so they don't retry; nothing is delivered.
  if (looksLikeBot(form)) return NextResponse.json({ ok: true });
  if (!(await verifyTurnstile(form, ip))) {
    return NextResponse.json({ ok: false, code: "CAPTCHA", message: "Please complete the verification and try again." }, { status: 400 });
  }

  const raw = Object.fromEntries([...form.entries()].filter(([, v]) => typeof v === "string"));
  const parsed = quoteSchema.safeParse(withDefaults(quoteSchema.shape, raw));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, code: "VALIDATION", message: "Please correct the highlighted fields.", errors: fieldErrors(parsed.error) }, { status: 422 });
  }

  const fileCheck = await validateFiles(form.getAll("files").filter((f): f is File => f instanceof File));
  if (!fileCheck.ok) {
    return NextResponse.json({ ok: false, code: "VALIDATION", message: fileCheck.error, errors: { files: fileCheck.error } }, { status: 422 });
  }

  if (!deliveryConfigured()) {
    console.warn("[forms] Quote received but no delivery integration is configured. Set RESEND_* and/or AIRTABLE_* env vars.");
    return NextResponse.json({ ok: false, code: "NOT_CONFIGURED", message: "Online submissions are not yet active. Please check back soon." }, { status: 503 });
  }

  const d = parsed.data;
  const result = await deliver(
    "quote",
    {
      "Full Name": d.fullName, Company: d.company, Email: d.email, Phone: d.phone, Website: d.website || undefined,
      "Product Category": d.category, "Product Description": d.productDescription, "Estimated Quantity": d.quantity,
      Specifications: d.specifications || undefined, "Logo / Printing": d.branding || undefined, "Preferred Delivery Date": d.deliveryDate || undefined,
      "Destination City": d.city, "Destination State": d.state, "Destination ZIP": d.zip, "Shipping Preference": d.shippingPreference || undefined,
      "Additional Requirements": d.additional || undefined, Source: "Website quote form",
    },
    d.email,
    fileCheck.files,
  );

  if (result.delivered === 0) {
    return NextResponse.json({ ok: false, code: "DELIVERY_FAILED", message: "Something went wrong sending your request. Please try again shortly." }, { status: 502 });
  }
  return NextResponse.json({ ok: true, ref: result.ref });
}
