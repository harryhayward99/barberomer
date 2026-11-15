"use client";

import { useEffect, useState } from "react";
import { getOpenStatus } from "@/lib/booking/time";
import { displayHours } from "@/lib/config/hours";
import { cn, eyebrowClass, sectionPadY } from "@/lib/utils";

function statusLine(status: { isOpen: boolean; label: string }) {
  if (status.isOpen) {
    const until = status.label.replace(/^Open today until\s+/i, "");
    return `Open · until ${until}`;
  }

  if (status.label.startsWith("Opens ")) {
    return `Closed · ${status.label}`;
  }

  return status.label;
}

function StatusLight({ open }: { open: boolean }) {
  return (
    <span className="relative grid h-8 w-8 shrink-0 place-items-center" aria-hidden>
      {open ? (
        <>
          <span className="status-light-glow" />
          <span className="relative h-2.5 w-2.5 bg-[#3DDC78]" />
        </>
      ) : (
        <span className="h-2.5 w-2.5 bg-ink/80 shadow-[inset_0_0_0_1px_rgba(248,243,234,0.35)]" />
      )}
    </span>
  );
}

export function HoursStatus() {
  const [status, setStatus] = useState(() => getOpenStatus());
  const [today, setToday] = useState(() =>
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      weekday: "long",
    }).format(new Date()),
  );

  useEffect(() => {
    const tick = () => {
      setStatus(getOpenStatus());
      setToday(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Europe/London",
          weekday: "long",
        }).format(new Date()),
      );
    };
    tick();
    const id = window.setInterval(tick, 30000);
    return () => window.clearInterval(id);
  }, []);

  const line = statusLine(status);

  return (
    <section
      id="hours"
      className={cn(
        "mx-auto max-w-7xl scroll-mt-28 px-5 sm:px-8",
        sectionPadY,
      )}
    >
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className={eyebrowClass}>Hours</p>
          <h2 className="section-title mt-4">Open 7 days.</h2>
        </div>
        <ul className="border-t border-ink/10 lg:col-span-7">
          {displayHours.map((row) => {
            const isToday = row.day === today;
            return (
              <li
                key={row.day}
                className={cn(
                  "flex items-center justify-between gap-4 border-b border-ink/10 py-4 text-lg",
                  isToday ? "text-ink" : "text-muted",
                )}
              >
                <span className="flex items-center gap-3">
                  {isToday ? <StatusLight open={status.isOpen} /> : null}
                  <span>
                    <span
                      className={cn(
                        "block font-medium",
                        isToday && "text-ink",
                      )}
                    >
                      {row.day}
                    </span>
                    {isToday ? (
                      <span className="mt-0.5 block text-[11px] uppercase tracking-[0.16em] text-muted">
                        {line}
                      </span>
                    ) : null}
                  </span>
                </span>
                <span className="tabular-nums">{row.hours}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
