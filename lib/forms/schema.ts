import { z } from "zod";

/* Shared between the browser (instant feedback) and the server (authoritative validation). */

const phoneRe = /^[+()\-.\s\d]{7,25}$/;
const zipRe = /^\d{5}(-\d{4})?$/;

const trimmed = (max: number) => z.string().trim().max(max, `Please keep this under ${max} characters.`);
const required = (label: string, max = 200) => trimmed(max).min(1, `${label} is required.`);
const optional = (max = 200) => trimmed(max).optional().or(z.literal(""));

export const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO",
  "MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
] as const;

export const SHIPPING_PREFERENCES = ["Not sure — please advise", "Ocean freight (most economical)", "Air freight (faster)", "Express / courier (samples, small orders)"] as const;

export const quoteSchema = z.object({
  fullName: required("Full name", 120),
  company: required("Company / organization", 160),
  email: z.string().trim().toLowerCase().pipe(z.email("Please enter a valid email address.")),
  phone: trimmed(25).regex(phoneRe, "Please enter a valid phone number."),
  website: optional(200).refine((v) => !v || /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(v), "Please enter a valid website."),

  category: required("Product category", 120),
  productDescription: required("Product name or description", 2000),
  quantity: required("Estimated quantity", 120),
  specifications: optional(4000),
  branding: optional(2000),
  deliveryDate: optional(40),

  city: required("Destination city", 100),
  state: z.enum(US_STATES, { error: "Please select a state." }),
  zip: trimmed(10).regex(zipRe, "Please enter a valid 5-digit ZIP code."),
  shippingPreference: optional(80),

  additional: optional(5000),
  consent: z.literal("yes", { error: "Please confirm you agree to the privacy notice." }),
});
export type QuoteInput = z.infer<typeof quoteSchema>;

export const INQUIRY_TYPES = ["General inquiry", "New sourcing project", "Existing project", "Partnership / supplier", "Other"] as const;

export const contactSchema = z.object({
  fullName: required("Full name", 120),
  company: optional(160),
  email: z.string().trim().toLowerCase().pipe(z.email("Please enter a valid email address.")),
  phone: optional(25).refine((v) => !v || phoneRe.test(v), "Please enter a valid phone number."),
  inquiryType: z.enum(INQUIRY_TYPES, { error: "Please choose an inquiry type." }),
  message: required("Message", 5000).refine((v) => v.length >= 10, "Please add a little more detail (10+ characters)."),
  consent: z.literal("yes", { error: "Please confirm you agree to the privacy notice." }),
});
export type ContactInput = z.infer<typeof contactSchema>;

/* -------- File upload rules --------
 * Note: Vercel serverless functions accept request bodies up to ~4.5 MB.
 * Limits below keep submissions within that. For larger files, switch to
 * direct-to-storage uploads (e.g. Vercel Blob / S3 presigned URLs) — see README.
 */
export const FILE_RULES = {
  maxFiles: 5,
  maxFileBytes: 4 * 1024 * 1024,
  maxTotalBytes: 4 * 1024 * 1024,
  extensions: ["pdf", "jpg", "jpeg", "png", "webp", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "csv", "txt"],
  accept: ".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.csv,.txt",
} as const;

/** Fill in missing keys with "" so errors read "X is required" instead of type errors. */
export function withDefaults(shape: Record<string, unknown>, data: Record<string, unknown>) {
  return { ...Object.fromEntries(Object.keys(shape).map((k) => [k, ""])), ...data };
}

export function fieldErrors(err: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
