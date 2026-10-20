import Image from "next/image";
import { aboutImage } from "@/lib/config/images";
import { cn, pageStartPad, sectionPad, sectionPadBottom } from "@/lib/utils";

export function About({ pageStart = false }: { pageStart?: boolean }) {
  return (
    <section
      id="about"
      className={cn(
        "mx-auto max-w-7xl px-5 sm:px-8",
        pageStart ? `${pageStartPad} ${sectionPadBottom}` : sectionPad,
      )}
    >
      <p className="text-xs uppercase tracking-[0.22em] text-barber">About</p>
      <div className="mt-4 flex items-center gap-4 sm:gap-5">
        <Image
          src={aboutImage.src}
          alt={aboutImage.alt}
          width={560}
          height={560}
          className="h-[4.5rem] w-[4.5rem] shrink-0 rounded-full object-cover sm:h-24 sm:w-24"
          style={{ objectPosition: "32% 42%", border: "1px solid #c4c4c4" }}
        />
        <h2 className="section-title max-w-lg">Your local barber since 2015.</h2>
      </div>
      <div className="mt-8 max-w-lg space-y-5 text-lg leading-8 text-muted">
        <p>
          Barber Omer is built around straightforward good service: taking the
          time to understand how you want your hair, giving you a precise cut
          and creating a place where people actually enjoy coming back.
        </p>
        <p>
          No rush, no upselling, no luxury mark-up. Just reliable modern
          grooming in Kenilworth — friendly, personal and done properly.
          Drinks are available while you wait.
        </p>
      </div>
    </section>
  );
}
