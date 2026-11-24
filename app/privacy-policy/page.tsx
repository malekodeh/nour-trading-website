import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({ title: "Privacy Policy", description: "How Nour Trading Inc. collects, uses, and protects information submitted through this website.", path: "/privacy-policy" });

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" crumbs={[{ label: "Privacy Policy" }]} intro="Effective date: [To be set at launch]" />
      <article className="container-x prose-nour max-w-3xl py-16">
        <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">This policy is a starting template and should be reviewed by a qualified attorney before the website goes live.</p>
        <p>{site.name} (“Nour Trading,” “we,” “us”) respects your privacy. This policy explains what information we collect through this website, how we use it, and the choices you have.</p>
        <h2>Information we collect</h2>
        <ul>
          <li><strong>Information you provide:</strong> name, company or organization, email, phone number, website, shipping destination, product requirements, and any files you upload when you request a quote or contact us.</li>
          <li><strong>Technical information:</strong> basic data such as IP address, browser type, and pages visited, which may be collected by our hosting provider and any analytics tools we use.</li>
        </ul>
        <h2>How we use information</h2>
        <ul>
          <li>To respond to inquiries and prepare quotations</li>
          <li>To communicate with you about your sourcing projects and orders</li>
          <li>To share product specifications with prospective manufacturers and service providers only as needed to fulfill your request</li>
          <li>To protect the website against spam, fraud, and abuse</li>
          <li>To comply with legal obligations</li>
        </ul>
        <h2>How we share information</h2>
        <p>We do not sell your personal information. We may share information with service providers that help us operate our business — such as hosting, email, customer-relationship-management tools, manufacturers, freight forwarders, and licensed customs brokers — solely to provide our services, or when required by law.</p>
        <h2>Uploaded files</h2>
        <p>Files you upload are used only to evaluate your request. Please do not upload information you are not authorized to share. Tell us if any materials are confidential, and we can discuss a non-disclosure agreement before sharing them with manufacturers.</p>
        <h2>Data retention &amp; security</h2>
        <p>We keep information for as long as needed to respond to you, manage our business relationship, and meet legal requirements. We use reasonable safeguards to protect information, but no method of transmission over the internet is completely secure.</p>
        <h2>Your choices</h2>
        <p>You may ask us to access, correct, or delete the personal information you have submitted by contacting us through the <a href="/contact">contact page</a>.</p>
        <h2>Children</h2>
        <p>This website is intended for business users and is not directed to children under 13.</p>
        <h2>Changes</h2>
        <p>We may update this policy from time to time. The effective date above shows when it was last revised.</p>
        <h2>Contact</h2>
        <p>{site.name}, {site.contact.region}. {site.contact.email ? `Email: ${site.contact.email}.` : "Please reach us through our contact page."}</p>
      </article>
    </>
  );
}
