"use client";

import { useEffect, useState } from "react";
import { getOpenStatus } from "@/lib/booking/time";
import { displayHours } from "@/lib/config/hours";

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

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="grid items-start gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-xs uppercase tracking-[0.22em] text-barber">Hours</p>
          <h2 className="section-title mt-3">Open 7 days.</h2>
          <p className="mt-6 inline-flex rounded-full bg-ink px-4 py-2 text-sm text-cream">
            {status.label}
          </p>
        </div>
        <ul className="lg:col-span-7">
          {displayHours.map((row) => {
            const isToday = row.day === today;
            return (
              <li
                key={row.day}
                className={`flex items-center justify-between border-b border-line py-4 text-lg ${
                  isToday ? "text-ink" : "text-muted"
                }`}
              >
                <span className={isToday ? "text-barber" : undefined}>{row.day}</span>
                <span className="tabular-nums">{row.hours}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
