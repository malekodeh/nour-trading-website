import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBand({
  title = "Ready to Source Smarter?",
  text = "Tell us what you need, and our team will help you explore sourcing, manufacturing, and delivery solutions tailored to your business.",
  button = "Get Your Custom Quote",
}: { title?: string; text?: string; button?: string }) {
  return (
    <section className="container-x py-20 sm:py-24">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[28px] bg-navy px-6 py-14 text-center sm:px-12 lg:py-20">
          <div className="absolute inset-0 bg-dots" aria-hidden />
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-corporate-light/40 blur-3xl" aria-hidden />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gold/20 blur-3xl" aria-hidden />
          <div className="relative mx-auto max-w-2xl">
            <p className="eyebrow eyebrow-light justify-center">From Factory to Your Door</p>
            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">{title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-blue-100/85">{text}</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/request-a-quote" size="lg" arrow>{button}</ButtonLink>
              <ButtonLink href="/contact" size="lg" variant="outline-light">Talk to a Sourcing Specialist</ButtonLink>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
