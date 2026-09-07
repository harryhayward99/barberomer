import Image from "next/image";
import { aboutImage } from "@/lib/config/images";

export function About() {
  return (
    <section
      id="about"
      className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:py-28"
    >
      <div className="lg:col-span-4">
        <div className="mx-auto w-[200px] overflow-hidden rounded-[1.5rem] sm:w-[240px] lg:mx-0">
          <Image
            src={aboutImage.src}
            alt={aboutImage.alt}
            width={480}
            height={600}
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
      </div>

      <div className="lg:col-span-8">
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
