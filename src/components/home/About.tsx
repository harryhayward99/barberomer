import Image from "next/image";
import { aboutImage } from "@/lib/config/images";

export function About() {
  return (
    <section
      id="about"
      className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:gap-20 lg:py-28"
    >
      <div className="relative lg:col-span-6">
        <div className="absolute -left-8 bottom-10 hidden h-28 w-28 rounded-full border border-line lg:block" />
        <div className="overflow-hidden rounded-[2rem]">
          <Image
            src={aboutImage.src}
            alt={aboutImage.alt}
            width={900}
            height={1100}
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
      </div>

      <div className="lg:col-span-6">
        <p className="text-xs uppercase tracking-[0.22em] text-barber">About</p>
        <h2 className="section-title mt-3 max-w-lg">
          Your local barber since 2015.
        </h2>
        <div className="mt-8 max-w-lg space-y-5 text-lg leading-8 text-muted">
          <p>
            Barber Omer is built around straightforward good service: taking the
            time to understand how you want your hair, giving you a precise cut
            and creating a place where people actually enjoy coming back.
          </p>
          <p>
            No rush, no upselling, no luxury mark-up. Just reliable modern
            grooming in Kenilworth — friendly, personal and done properly.
          </p>
        </div>
      </div>
    </section>
  );
}
