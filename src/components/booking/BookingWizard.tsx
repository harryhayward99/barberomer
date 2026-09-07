"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CallButton } from "@/components/ui/CallButton";
import { business } from "@/lib/config/business";
import {
  formatDuration,
  formatPrice,
  getDeposit,
  getRemaining,
  getService,
  serviceGroups,
  services,
} from "@/lib/config/services";
import { formatFriendlyDate } from "@/lib/booking/time";
import { cn } from "@/lib/utils";

type DaySlots = { date: string; slots: string[] };

type WizardProps = {
  initialServiceId?: string;
};

function CircleArrow({
  direction,
  className,
}: {
  direction: "left" | "right";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
        {direction === "right" ? (
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M13 8H3M7 4 3 8l4 4"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </span>
  );
}

function BackButton({
  onClick,
  label = "Back",
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-11 items-center gap-3 text-[15px] font-medium text-ink transition-colors hover:text-barber"
    >
      <CircleArrow direction="left" />
      {label}
    </button>
  );
}

export function BookingWizard({ initialServiceId }: WizardProps) {
  const [step, setStep] = useState(initialServiceId ? 2 : 1);
  const [serviceId, setServiceId] = useState(initialServiceId ?? "");
  const [days, setDays] = useState<DaySlots[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fallback, setFallback] = useState("");

  const skipAutoAdvance = useRef(false);
  const service = getService(serviceId);

  useEffect(() => {
    if (serviceId && step === 1 && !skipAutoAdvance.current) {
      setStep(2);
    }
  }, [serviceId, step]);

  function selectService(id: string) {
    skipAutoAdvance.current = false;
    setServiceId(id);
    setStep(2);
  }

  useEffect(() => {
    if (!serviceId) return;
    setLoading(true);
    setError("");
    fetch(`/api/availability?serviceId=${serviceId}`)
      .then((response) => response.json())
      .then((payload) => {
        setDays(payload.days ?? []);
        setDate("");
        setTime("");
      })
      .catch(() => setError("Could not load available times."))
      .finally(() => setLoading(false));
  }, [serviceId]);

  const selectedDay = useMemo(
    () => days.find((day) => day.date === date),
    [days, date],
  );

  async function pay() {
    if (!service) return;
    setLoading(true);
    setError("");
    setFallback("");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          date,
          time,
          customerName: name,
          customerPhone: phone,
          customerEmail: email,
          notes,
        }),
      });
      const payload = await response.json();
      if (!response.ok) {
        setError(payload.error || "Could not start payment.");
        return;
      }
      if (payload.url) {
        window.location.href = payload.url;
        return;
      }
      setFallback(payload.message || "Call Omer to confirm this booking.");
    } catch {
      setError("Could not start payment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <ol className="mb-10 flex gap-2 text-xs uppercase tracking-[0.16em] text-muted">
        {["Service", "Time", "Details", "Deposit"].map((label, index) => (
          <li
            key={label}
            className={cn(
              "rounded-full px-3 py-1",
              step === index + 1 && "bg-ink text-cream",
            )}
          >
            {label}
          </li>
        ))}
      </ol>

      {step === 1 && (
        <div>
          <h1 className="section-title">Choose a service</h1>
          <p className="mt-4 text-muted">One service at a time. Fair prices, no extras.</p>
          <div className="mt-10 space-y-10">
            {serviceGroups.map((group) => (
              <div key={group.id}>
                <h2 className="text-sm uppercase tracking-[0.18em] text-muted">
                  {group.label}
                </h2>
                <div className="mt-4 space-y-3">
                  {services
                    .filter((item) => item.group === group.id)
                    .map((item) => {
                      const selected = serviceId === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => selectService(item.id)}
                          className={cn(
                            "flex w-full items-center justify-between gap-4 rounded-2xl border px-5 py-5 text-left transition-colors hover:border-ink",
                            selected
                              ? "border-barber bg-ink text-cream"
                              : "border-line",
                            item.featured && !selected && "border-barber/40 bg-ink/[0.03]",
                          )}
                        >
                          <span>
                            <span className="block text-lg">{item.name}</span>
                            {item.description && (
                              <span
                                className={cn(
                                  "mt-1 block text-sm",
                                  selected ? "text-cream/70" : "text-muted",
                                )}
                              >
                                {item.description}
                              </span>
                            )}
                            <span
                              className={cn(
                                "mt-1 block text-sm",
                                selected ? "text-cream/70" : "text-muted",
                              )}
                            >
                              {formatDuration(item.durationMinutes)}
                            </span>
                          </span>
                          <span className="flex shrink-0 items-center gap-3">
                            <span
                              className={cn(
                                "text-lg tabular-nums",
                                selected ? "text-cream" : "text-barber",
                              )}
                            >
                              {formatPrice(item.pricePence)}
                            </span>
                            <CircleArrow
                              direction="right"
                              className={
                                selected
                                  ? "border-cream/40 text-cream"
                                  : undefined
                              }
                            />
                          </span>
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 2 && service && (
        <div>
          <BackButton
            onClick={() => {
              skipAutoAdvance.current = true;
              setStep(1);
            }}
          />
          <h1 className="section-title mt-6">Choose a time</h1>
          <p className="mt-4 text-muted">
            {service.name} · {formatDuration(service.durationMinutes)} ·{" "}
            {formatPrice(service.pricePence)}
          </p>
          {loading && <p className="mt-8 text-muted">Finding free times…</p>}
          <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
            {days.map((day) => (
              <button
                key={day.date}
                type="button"
                onClick={() => {
                  setDate(day.date);
                  setTime("");
                }}
                className={cn(
                  "min-w-[7.5rem] rounded-2xl border px-4 py-4 text-left",
                  date === day.date
                    ? "border-barber bg-ink text-cream"
                    : "border-line",
                )}
              >
                <span className="block text-sm">{formatFriendlyDate(day.date)}</span>
                <span
                  className={cn(
                    "mt-1 block text-xs",
                    date === day.date ? "text-cream/70" : "text-muted",
                  )}
                >
                  {day.slots.length} times
                </span>
              </button>
            ))}
          </div>
          {selectedDay && (
            <div className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {selectedDay.slots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTime(slot)}
                  className={cn(
                    "min-h-12 rounded-full border tabular-nums",
                    time === slot
                      ? "border-barber bg-barber text-cream"
                      : "border-line hover:border-ink",
                  )}
                >
                  {slot}
                </button>
              ))}
            </div>
          )}
          <button
            type="button"
            disabled={!date || !time}
            onClick={() => setStep(3)}
            className="mt-10 inline-flex min-h-12 items-center rounded-full bg-barber px-6 text-cream disabled:opacity-40"
          >
            Continue
          </button>
        </div>
      )}

      {step === 3 && service && (
        <div>
          <BackButton onClick={() => setStep(2)} />
          <div className="mt-6 rounded-2xl border border-line px-5 py-5">
            <p className="text-lg">{service.name}</p>
            <p className="mt-1 text-muted">
              {formatFriendlyDate(date)} · {time}
            </p>
            <p className="mt-1 text-sm text-muted">
              {formatDuration(service.durationMinutes)} · {formatPrice(service.pricePence)}
            </p>
          </div>
          <h1 className="section-title mt-8">Your details</h1>
          <p className="mt-4 text-muted">No account needed. Book as a guest.</p>
          <form
            className="mt-8 space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              setStep(4);
            }}
          >
            <label className="block">
              <span className="mb-2 block text-sm">Name</span>
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="min-h-12 w-full rounded-2xl border border-line bg-cream px-4 outline-none focus:border-ink"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm">Mobile number</span>
              <input
                required
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="min-h-12 w-full rounded-2xl border border-line bg-cream px-4 outline-none focus:border-ink"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm">Email</span>
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="min-h-12 w-full rounded-2xl border border-line bg-cream px-4 outline-none focus:border-ink"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm">Notes for Omer (optional)</span>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={3}
                className="w-full rounded-2xl border border-line bg-cream px-4 py-3 outline-none focus:border-ink"
              />
            </label>
            <button
              type="submit"
              className="inline-flex min-h-12 items-center rounded-full bg-barber px-6 text-cream"
            >
              Review deposit
            </button>
          </form>
        </div>
      )}

      {step === 4 && service && (
        <div>
          <BackButton onClick={() => setStep(3)} />
          <h1 className="section-title mt-6">Pay the deposit</h1>
          <p className="mt-4 max-w-xl text-muted">
            A 25% deposit holds the chair. The rest is paid when you sit down.
            The booking is only confirmed after payment succeeds.
          </p>
          <dl className="mt-10 space-y-4 text-lg">
            <div className="flex justify-between gap-6 border-b border-line py-3">
              <dt>Service</dt>
              <dd>{service.name}</dd>
            </div>
            <div className="flex justify-between gap-6 border-b border-line py-3">
              <dt>Appointment</dt>
              <dd>
                {formatFriendlyDate(date)} · {time}
              </dd>
            </div>
            <div className="flex justify-between gap-6 border-b border-line py-3">
              <dt>Full price</dt>
              <dd>{formatPrice(service.pricePence)}</dd>
            </div>
            <div className="flex justify-between gap-6 border-b border-line py-3 text-barber">
              <dt>Deposit due today — 25%</dt>
              <dd>{formatPrice(getDeposit(service.pricePence))}</dd>
            </div>
            <div className="flex justify-between gap-6 py-3">
              <dt>Remaining balance</dt>
              <dd>{formatPrice(getRemaining(service.pricePence))} at the appointment</dd>
            </div>
          </dl>
          {error && <p className="mt-6 text-barber">{error}</p>}
          {fallback && (
            <div className="mt-6 rounded-2xl border border-line p-5">
              <p>{fallback}</p>
              <div className="mt-4">
                <CallButton />
              </div>
            </div>
          )}
          <button
            type="button"
            disabled={loading}
            onClick={pay}
            className="mt-8 inline-flex min-h-12 items-center rounded-full bg-barber px-6 text-cream disabled:opacity-40"
          >
            {loading ? "Taking you to payment…" : "Pay deposit"}
          </button>
          <p className="mt-4 text-sm text-muted">
            Or call Omer on {business.phoneDisplay} if you would rather book by phone.
          </p>
        </div>
      )}
    </div>
  );
}
