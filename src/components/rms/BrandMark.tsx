import { cn } from "@/lib/utils";

/**
 * RMS360 proprietary brand mark.
 * Hexagonal infrastructure frame + 360° orbit ring + connected
 * node geometry around a central intelligent core.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      role="img"
      aria-hidden="true"
      className={cn("block", className)}
    >
      {/* 360° orbit ring — broken arc suggesting continuous sweep */}
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="1.1"
        strokeDasharray="52 10.8"
        strokeLinecap="round"
        className="origin-center transition-transform duration-700 ease-out group-hover:rotate-45"
      />
      {/* hexagonal frame */}
      <path
        d="M12 4.4 18.6 8.2v7.6L12 19.6 5.4 15.8V8.2L12 4.4Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      {/* node links to core */}
      <path
        d="M12 4.4v4M18.6 15.8l-3.3-1.9M5.4 15.8l3.3-1.9"
        stroke="currentColor"
        strokeOpacity="0.7"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      {/* satellite node */}
      <circle cx="21.2" cy="8.4" r="1.25" fill="currentColor" />
      {/* intelligent core */}
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <circle cx="12" cy="12" r="3.9" stroke="currentColor" strokeOpacity="0.5" strokeWidth="0.8" />
    </svg>
  );
}
