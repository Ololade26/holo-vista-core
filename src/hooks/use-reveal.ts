import { useEffect, useRef, useState } from "react";

/** Reveals an element once it scrolls into view. */
export function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    // Elements taller than the viewport can never reach a high ratio, so we
    // watch a small threshold and also accept "mostly visible" panels.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const tallerThanViewport = entry.boundingClientRect.height > window.innerHeight * 0.8;
          if (entry.isIntersecting && (tallerThanViewport || entry.intersectionRatio >= threshold)) {
            setInView(true);
            observer.disconnect();
          }
        }
      },
      { threshold: [0, 0.05, Math.min(threshold, 0.99)], rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(el);
    // Safety net: some embedded/background contexts never fire intersections,
    // which would leave counters showing zeros forever.
    const fallback = window.setTimeout(() => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) setInView(true);
    }, 1200);
    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, [threshold]);

  return { ref, inView };
}

/** Counts up to `target` once `active` turns true. */
export function useCountUp(target: number, active: boolean, duration = 1600) {
  // Never render a bare 0: idle state shows the real figure, the animation
  // simply sweeps up to it once the element is in view.
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!active) {
      setValue(target);
      return;
    }
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setValue(target);
      return;
    }
    let frame = 0;
    const from = Math.round(target * 0.4);
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, duration]);

  return value;
}

/** Cycles an index on an interval — used for feed/step animations. */
export function useCycle(length: number, ms = 2600, active = true) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!active || length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % length), ms);
    return () => clearInterval(id);
  }, [length, ms, active]);
  return index;
}

/** Window scroll offset in px (client only). */
export function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}
