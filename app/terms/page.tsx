import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({ title: "Terms & Conditions", description: "Terms governing use of the Nour Trading Inc. website.", path: "/terms" });

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" crumbs={[{ label: "Terms & Conditions" }]} intro="Effective date: [To be set at launch]" />
      <article className="container-x prose-nour max-w-3xl py-16">
        <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">These terms are a starting template and should be reviewed by a qualified attorney before the website goes live.</p>
        <h2>1. About these terms</h2>
        <p>These Terms &amp; Conditions govern your use of this website operated by {site.name}. By using the website, you agree to these terms.</p>
        <h2>2. Website information</h2>
        <p>Content on this website is provided for general information about our services. It is not a binding offer. Product descriptions, customization options, and process descriptions are illustrative and may change.</p>
        <h2>3. Quotations and orders</h2>
        <p>Submitting a quote request does not create a contract. Any engagement is governed by a written quotation, proposal, or purchase agreement that specifies products, pricing, responsibilities, shipping terms, payment terms, and timelines. If those documents conflict with these website terms, those documents control.</p>
        <h2>4. Estimates, lead times, and duties</h2>
        <p>Lead times, freight costs, tariffs, and duty amounts provided before shipment are estimates based on available information. Final duties and import requirements are determined by U.S. Customs and Border Protection and other authorities. We do not guarantee specific customs outcomes, delivery dates, or lowest prices.</p>
        <h2>5. Third-party service providers</h2>
        <p>{site.name} is not a licensed customs broker, freight forwarder, NVOCC, or ocean carrier. Customs brokerage and freight transportation are performed by appropriately licensed third parties and coordinated by Nour Trading on the customer’s behalf, subject to those providers’ own terms.</p>
        <h2>6. Intellectual property</h2>
        <p>The Nour Trading name, logo, and website content are our property and may not be used without permission. Customers are responsible for ensuring they have the rights to any logos, designs, or brand materials they ask us to reproduce.</p>
        <h2>7. Acceptable use</h2>
        <p>You agree not to misuse the website, submit false information, upload malicious files, or attempt to interfere with its operation.</p>
        <h2>8. Limitation of liability</h2>
        <p>To the fullest extent permitted by law, the website is provided “as is,” and {site.name} is not liable for indirect or consequential damages arising from use of the website.</p>
        <h2>9. Governing law</h2>
        <p>These terms are governed by the laws of the State of Illinois, without regard to conflict-of-law principles.</p>
        <h2>10. Contact</h2>
        <p>Questions about these terms may be sent through our <a href="/contact">contact page</a>.</p>
      </article>
    </>
  );
}
