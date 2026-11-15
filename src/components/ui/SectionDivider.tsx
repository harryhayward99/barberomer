import { cn } from "@/lib/utils";

const washStyle = {
  background:
    "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--red) 42%, transparent) 0%, color-mix(in srgb, var(--red) 16%, transparent) 46%, transparent 72%)",
} as const;

type WashMode = boolean | "split" | "below" | "above-right";

/** Full-width hairline between page sections — sit between equal section pads. */
export function SectionDivider({
  className = "",
  wash = false,
}: {
  className?: string;
  /**
   * - `true` / `"split"`: 1/3 above-only + 2/3 below-only
   * - `"below"`: one radial, centred, below-only
   * - `"above-right"`: one radial on the right, above-only
   */
  wash?: WashMode;
}) {
  const mode = wash === true ? "split" : wash;

  return (
    <div
      className={cn("relative mx-auto max-w-7xl px-5 sm:px-8", className)}
      aria-hidden
    >
      <div className="relative z-10 h-px w-full bg-line" />

      {mode === "split" ? (
        <>
          {/* Left screen edge — half on / half off, above only */}
          <div className="pointer-events-none absolute bottom-full left-1/2 h-48 w-screen -translate-x-1/2 overflow-hidden sm:h-56">
            <div
              className="absolute left-0 top-full h-44 w-44 -translate-x-1/2 -translate-y-1/2 sm:h-52 sm:w-52"
              style={washStyle}
            />
          </div>
          {/* Right screen edge — half on / half off, below only */}
          <div className="pointer-events-none absolute top-full left-1/2 h-48 w-screen -translate-x-1/2 overflow-hidden sm:h-56">
            <div
              className="absolute right-0 top-0 h-44 w-44 translate-x-1/2 -translate-y-1/2 sm:h-52 sm:w-52"
              style={washStyle}
            />
          </div>
        </>
      ) : null}

      {mode === "below" ? (
        <div className="pointer-events-none absolute inset-x-0 top-full h-48 overflow-hidden sm:h-56">
          <div
            className="absolute left-1/2 top-0 h-44 w-44 -translate-x-1/2 -translate-y-1/2 sm:h-52 sm:w-52"
            style={washStyle}
          />
        </div>
      ) : null}

      {mode === "above-right" ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-full h-48 overflow-hidden sm:h-56">
          <div
            className="absolute right-0 top-full h-44 w-44 translate-x-1/4 -translate-y-1/2 sm:h-52 sm:w-52"
            style={washStyle}
          />
        </div>
      ) : null}
    </div>
  );
}
