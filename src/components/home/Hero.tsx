import Image from "next/image";
import Link from "next/link";
import { CallButton } from "@/components/ui/CallButton";
import { business } from "@/lib/config/business";
import { heroImage } from "@/lib/config/images";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-10 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:pb-28 lg:pt-16">
      <div className="lg:col-span-6">
        <div className="mb-8 flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
          <p className="text-xs uppercase tracking-[0.22em] text-muted">
            Kenilworth · Since {business.established}
          </p>
        </div>

        <h1 className="max-w-xl text-[clamp(2.75rem,10vw,5.6rem)] leading-[0.92]">
          Sharp cuts.
          <br />
          No fuss.
        </h1>

        <p className="mt-7 max-w-md text-lg leading-8 text-muted">
          Modern barbering in the heart of Kenilworth. Great cuts, fair prices
          and a friendly atmosphere.
        </p>

        <div className="mt-9 flex flex-col gap-3 md:flex-row md:items-center">
          <CallButton className="w-full md:w-auto" />
          <Link
            href="/book"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-ink px-6 text-[15px] font-medium transition-transform duration-200 hover:-translate-y-0.5"
          >
            Book an Appointment
          </Link>
        </div>

        <p className="mt-6 text-sm text-muted">
          {business.address.line1}, {business.address.city}
          <span className="mx-2 text-barber">·</span>
          Open 7 days
        </p>
      </div>

      <div className="relative lg:col-span-6">
        <div className="absolute -right-6 -top-6 hidden h-40 w-40 rounded-full border border-line lg:block" />
        <div className="relative overflow-hidden rounded-[2rem] bg-ink/5">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            width={980}
            height={1220}
            priority
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
