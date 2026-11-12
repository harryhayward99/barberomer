"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type MarqueeGuard = {
  /** Returns true if the last pointer gesture was a drag (not a tap). */
  wasDrag: () => boolean;
};

const MarqueeGuardContext = createContext<MarqueeGuard>({
  wasDrag: () => false,
});

export function useMarqueeGuard() {
  return useContext(MarqueeGuardContext);
}

type InteractiveMarqueeProps = {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  /** Auto-scroll speed in px/second. Negative reverses direction. */
  speed?: number;
  pauseOnHover?: boolean;
};

export function InteractiveMarquee({
  children,
  className,
  trackClassName,
  speed = 42,
  pauseOnHover = true,
}: InteractiveMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const halfWidthRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const pointerIdRef = useRef<number | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const activeDragRef = useRef(false);
  const lastGestureWasDragRef = useRef(false);
  const pausedRef = useRef(false);
  const reduceMotionRef = useRef(false);

  const normalize = useCallback(() => {
    const half = halfWidthRef.current;
    if (half <= 0) return;
    let offset = offsetRef.current;
    while (offset <= -half) offset += half;
    while (offset > 0) offset -= half;
    offsetRef.current = offset;
  }, []);

  const apply = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
  }, []);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const firstHalf = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstHalf) return;
    halfWidthRef.current = firstHalf.offsetWidth;
    normalize();
    apply();
  }, [apply, normalize]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      reduceMotionRef.current = media.matches;
    };
    syncMotion();
    media.addEventListener("change", syncMotion);

    measure();
    const track = trackRef.current;
    const observer = track ? new ResizeObserver(measure) : null;
    if (track && observer) observer.observe(track);
    window.addEventListener("resize", measure);

    return () => {
      media.removeEventListener("change", syncMotion);
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useEffect(() => {
    const tick = (time: number) => {
      if (lastTimeRef.current == null) lastTimeRef.current = time;
      const delta = Math.min(0.05, (time - lastTimeRef.current) / 1000);
      lastTimeRef.current = time;

      if (
        !activeDragRef.current &&
        !pausedRef.current &&
        !reduceMotionRef.current &&
        halfWidthRef.current > 0
      ) {
        offsetRef.current -= speed * delta;
        normalize();
        apply();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    };
  }, [speed, normalize, apply]);

  const endPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) return;

    lastGestureWasDragRef.current = activeDragRef.current;
    activeDragRef.current = false;
    pointerIdRef.current = null;

    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      /* already released */
    }
  };

  const guard: MarqueeGuard = {
    wasDrag: () => {
      const dragged = lastGestureWasDragRef.current;
      lastGestureWasDragRef.current = false;
      return dragged;
    },
  };

  return (
    <MarqueeGuardContext.Provider value={guard}>
      <div
        ref={viewportRef}
        className={cn(
          "marquee overflow-hidden touch-pan-y select-none cursor-grab active:cursor-grabbing",
          className,
        )}
        onPointerDown={(event) => {
          if (event.pointerType === "mouse" && event.button !== 0) return;
          // Defer capture until the gesture becomes a drag so taps still click.
          pointerIdRef.current = event.pointerId;
          activeDragRef.current = false;
          lastGestureWasDragRef.current = false;
          dragStartXRef.current = event.clientX;
          dragStartOffsetRef.current = offsetRef.current;
        }}
        onPointerMove={(event) => {
          if (pointerIdRef.current !== event.pointerId) return;

          const deltaX = event.clientX - dragStartXRef.current;

          if (!activeDragRef.current) {
            if (Math.abs(deltaX) < 8) return;
            activeDragRef.current = true;
            try {
              event.currentTarget.setPointerCapture(event.pointerId);
            } catch {
              /* capture unavailable */
            }
          }

          offsetRef.current = dragStartOffsetRef.current + deltaX;
          normalize();
          apply();
        }}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        onMouseEnter={() => {
          if (pauseOnHover) pausedRef.current = true;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
        }}
      >
        <div
          ref={trackRef}
          className="flex h-full w-max will-change-transform"
        >
          <div className={cn("flex h-full shrink-0", trackClassName)}>
            {children}
          </div>
          <div
            className={cn("flex h-full shrink-0", trackClassName)}
            aria-hidden
          >
            {children}
          </div>
        </div>
      </div>
    </MarqueeGuardContext.Provider>
  );
}
