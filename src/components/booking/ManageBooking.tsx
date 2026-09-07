"use client";

import { useEffect, useState } from "react";
import { CallButton } from "@/components/ui/CallButton";
import { formatFriendlyDate, formatFriendlyDateTime } from "@/lib/booking/time";
import type { Booking } from "@/lib/booking/types";
import { formatPrice, getService } from "@/lib/config/services";
import { cn } from "@/lib/utils";

type DaySlots = { date: string; slots: string[] };

export function ManageBooking({ token }: { token: string }) {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [days, setDays] = useState<DaySlots[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [mode, setMode] = useState<"view" | "reschedule" | "cancelled">("view");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/bookings/${token}`)
      .then((response) => response.json())
      .then((payload) => setBooking(payload.booking ?? null));
  }, [token]);

  useEffect(() => {
    if (!booking || mode !== "reschedule") return;
    fetch(`/api/availability?serviceId=${booking.serviceId}`)
      .then((response) => response.json())
      .then((payload) => setDays(payload.days ?? []));
  }, [booking, mode]);

  if (!booking) {
    return <p className="text-muted">Looking up your booking…</p>;
  }

  const service = getService(booking.serviceId);

  async function reschedule() {
    setError("");
    const response = await fetch(`/api/bookings/${token}/reschedule`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, time }),
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error || "Could not move this booking.");
      return;
    }
    setBooking(payload.booking);
    setMode("view");
  }

  async function cancel() {
    const response = await fetch(`/api/bookings/${token}/cancel`, {
      method: "POST",
    });
    const payload = await response.json();
    if (response.ok) {
      setBooking(payload.booking);
      setMode("cancelled");
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-xs uppercase tracking-[0.22em] text-barber">Your booking</p>
      <h1 className="mt-3 text-4xl leading-none sm:text-6xl">
        {booking.status === "cancelled" ? "Booking cancelled" : booking.serviceName}
      </h1>
      <p className="mt-5 text-lg text-muted">
        {formatFriendlyDateTime(booking.startIso)}
      </p>
      <p className="mt-6 text-muted">
        Deposit paid: {formatPrice(booking.depositPence)}
        <br />
        Remaining at appointment: {formatPrice(booking.remainingPence)}
      </p>

      {booking.status !== "cancelled" && mode === "view" && (
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setMode("reschedule")}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-barber px-6 text-cream"
          >
            Reschedule appointment
          </button>
          <button
            type="button"
            onClick={cancel}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-ink px-6"
          >
            Cancel appointment
          </button>
        </div>
      )}

      {mode === "reschedule" && service && (
        <div className="mt-10">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {days.map((day) => (
              <button
                key={day.date}
                type="button"
                onClick={() => setDate(day.date)}
                className={cn(
                  "min-w-[7.5rem] rounded-2xl border px-4 py-4 text-left",
                  date === day.date ? "border-barber bg-ink text-cream" : "border-line",
                )}
              >
                {formatFriendlyDate(day.date)}
              </button>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {days
              .find((day) => day.date === date)
              ?.slots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTime(slot)}
                  className={cn(
                    "min-h-12 rounded-full border tabular-nums",
                    time === slot ? "bg-barber text-cream" : "border-line",
                  )}
                >
                  {slot}
                </button>
              ))}
          </div>
          {error && <p className="mt-4 text-barber">{error}</p>}
          <button
            type="button"
            disabled={!date || !time}
            onClick={reschedule}
            className="mt-8 inline-flex min-h-12 items-center rounded-full bg-barber px-6 text-cream disabled:opacity-40"
          >
            Save new time
          </button>
        </div>
      )}

      <div className="mt-10">
        <CallButton />
      </div>
      <p className="mt-6 text-sm text-muted">
        Deposit and cancellation terms are set out on the booking policy page.
      </p>
    </div>
  );
}
