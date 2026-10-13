import { business, telHref } from "@/lib/config/business";
import { cn } from "@/lib/utils";

type CallButtonProps = {
  className?: string;
  compact?: boolean;
  label?: string;
  numberOnly?: boolean;
};

export function CallButton({
  className,
  compact = false,
  label = "Call Omer",
  numberOnly = false,
}: CallButtonProps) {
  return (
    <a
      href={telHref()}
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-barber text-cream transition-transform duration-200 hover:-translate-y-0.5 hover:bg-barber-deep",
        compact
          ? "min-h-11 px-4 text-sm font-medium"
          : "min-h-12 gap-2 px-5 text-[15px] font-medium",
        className,
      )}
    >
      {numberOnly ? (
        <span className="tabular-nums">{business.phoneDisplay}</span>
      ) : (
        <>
          <span>{label}</span>
          {!compact && (
            <span className="font-normal tabular-nums">
              — {business.phoneDisplay}
            </span>
          )}
        </>
      )}
    </a>
  );
}
