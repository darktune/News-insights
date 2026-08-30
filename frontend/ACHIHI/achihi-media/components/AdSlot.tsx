"use client";

interface AdSlotProps {
  placement: string;
  className?: string;
  variant?: "banner" | "feed" | "sidebar";
}

export default function AdSlot({ placement, className = "", variant = "feed" }: AdSlotProps) {
  const heights: Record<string, string> = {
    banner: "h-24 sm:h-28",
    feed: "h-[280px]",
    sidebar: "h-[250px]",
  };

  return (
    <div
      className={`ad-slot flex flex-col items-center justify-center ${className}`}
      data-placement={placement}
      aria-label="Advertisement"
    >
      {/* Label */}
      <p className="text-[10px] font-semibold uppercase tracking-widest mb-2"
        style={{ color: "var(--text-tertiary)" }}>
        Advertisement
      </p>

      {/* Placeholder — swap for real ad tag (e.g. Google AdSense ins element) */}
      <div className={`w-full flex items-center justify-center rounded-lg ${heights[variant]}`}
        style={{ background: "var(--bg-hover)", border: "1px dashed var(--border)" }}>
        <div className="text-center px-4">
          <p className="text-xs font-medium" style={{ color: "var(--text-tertiary)" }}>
            [{placement}]
          </p>
          <p className="text-[11px] mt-1" style={{ color: "var(--text-tertiary)" }}>
            Ad goes here
          </p>
        </div>
      </div>
    </div>
  );
}
