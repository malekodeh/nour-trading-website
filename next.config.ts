import type { NextConfig } from "next";

// NEXT_OUTPUT=export is used only by `npm run build:preview` to create a
// static, backend-free preview. Normal builds run as a full Next.js server
// so the quote/contact API routes work.
const isStaticPreview = process.env.NEXT_OUTPUT === "export";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  ...(isStaticPreview
    ? { output: "export", trailingSlash: true, images: { unoptimized: true } }
    : {
        images: { formats: ["image/avif", "image/webp"] },
        async headers() {
          return [{ source: "/:path*", headers: securityHeaders }];
        },
      }),
  poweredByHeader: false,
};

export default nextConfig;
