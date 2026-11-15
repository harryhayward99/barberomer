import { business, telHref } from "@/lib/config/business";
import { btnPrimaryClass, cn } from "@/lib/utils";

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
        btnPrimaryClass,
        compact && "min-h-11 px-4 text-[12px]",
        className,
      )}
    >
      {numberOnly ? (
        <span className="tabular-nums">{business.phoneDisplay}</span>
      ) : (
        <>
          <span>{label}</span>
          {!compact && (
            <span className="ml-2 font-normal normal-case tracking-normal tabular-nums">
              {business.phoneDisplay}
            </span>
          )}
        </>
      )}
    </a>
  );
}
