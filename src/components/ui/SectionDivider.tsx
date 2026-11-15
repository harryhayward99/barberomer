import { cn } from "@/lib/utils";

const washStyle = {
  background:
    "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--red) 42%, transparent) 0%, color-mix(in srgb, var(--red) 16%, transparent) 46%, transparent 72%)",
} as const;

/** Full-width hairline between page sections — sit between equal section pads. */
export function SectionDivider({
  className = "",
  wash = false,
}: {
  className?: string;
  /** Centred oxblood radial, clipped so it only blooms below the line. */
  wash?: boolean;
}) {
  return (
    <div
      className={cn("relative mx-auto max-w-7xl px-5 sm:px-8", className)}
      aria-hidden
    >
      <div className="relative z-10 h-px w-full bg-line" />

      {wash ? (
        <div className="pointer-events-none absolute inset-x-0 top-full h-48 overflow-hidden sm:h-56">
          <div
            className="absolute left-1/2 top-0 h-44 w-44 -translate-x-1/2 -translate-y-1/2 sm:h-52 sm:w-52"
            style={washStyle}
          />
        </div>
      ) : null}
    </div>
  );
}
