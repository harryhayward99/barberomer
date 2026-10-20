"use client";

import { useEffect, useState } from "react";
import { getOpenStatus } from "@/lib/booking/time";
import { displayHours } from "@/lib/config/hours";

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
          <span className="relative h-2.5 w-2.5" style={{ background: "#3DDC78" }} />
        </>
      ) : (
        <span
          className="h-2.5 w-2.5"
          style={{
            background: "#2a2a2a",
            boxShadow: "inset 0 0 0 1px rgba(247,243,236,0.35)",
          }}
        />
      )}
    </span>
  );
}

export function HoursStatus({ compact = false }: { compact?: boolean }) {
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
      className={`mx-auto max-w-7xl scroll-mt-28 px-5 sm:px-8 ${
        compact ? "pb-20 pt-8 lg:pb-28 lg:pt-10" : "py-20 lg:py-28"
      }`}
    >
      <div
        className={
          compact
            ? "mx-auto max-w-xl"
            : "grid items-start gap-12 lg:grid-cols-12"
        }
      >
        <div className={compact ? "text-center" : "lg:col-span-5"}>
          <p className="text-xs uppercase tracking-[0.22em] text-barber">Hours</p>
          <h2 className="section-title mt-3">Open 7 days.</h2>
        </div>
        <ul className={compact ? "mt-8" : "lg:col-span-7"}>
          {displayHours.map((row) => {
            const isToday = row.day === today;
            return (
              <li
                key={row.day}
                className={`flex items-center justify-between gap-4 border-b border-line py-4 text-lg ${
                  isToday ? "text-ink" : "text-muted"
                }`}
              >
                <span className="flex items-center gap-3">
                  {isToday ? <StatusLight open={status.isOpen} /> : null}
                  <span>
                    <span className={`block ${isToday ? "text-barber" : ""}`}>{row.day}</span>
                    {isToday ? (
                      <span className="mt-0.5 block text-xs uppercase tracking-[0.16em] text-ink">
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
