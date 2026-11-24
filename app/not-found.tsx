import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow justify-center">Page not found</p>
      <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">This shipment went off course.</h1>
      <p className="mt-4 max-w-md text-slate-text">The page you’re looking for doesn’t exist or has moved.</p>
      <div className="mt-8 flex gap-3"><ButtonLink href="/" variant="navy">Back to home</ButtonLink><ButtonLink href="/request-a-quote" arrow>Request a Quote</ButtonLink></div>
    </section>
  );
}
