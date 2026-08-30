"use client";

interface LogoProps {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}

export default function AchihiLogo({ size = 40, showWordmark = true, className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Circular emblem — sea turtle over wave */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="ACHIHI Media Logo"
      >
        {/* Background circle */}
        <circle cx="50" cy="50" r="48" fill="#0F2A4A" />

        {/* Wave shapes */}
        <ellipse cx="38" cy="68" rx="28" ry="10" fill="#1E88C7" opacity="0.5" />
        <path
          d="M14 65 Q25 58 38 65 Q51 72 62 65 Q73 58 84 65"
          stroke="#1E88C7"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M18 72 Q30 65 43 72 Q56 79 68 72 Q76 67 82 72"
          stroke="#4BB8E8"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />

        {/* Turtle shell */}
        <ellipse cx="48" cy="45" rx="20" ry="15" fill="#2E8B57" />
        {/* Shell pattern lines */}
        <line x1="48" y1="30" x2="48" y2="60" stroke="#1a5c38" strokeWidth="1.5" />
        <line x1="28" y1="45" x2="68" y2="45" stroke="#1a5c38" strokeWidth="1.5" />
        <line x1="33" y1="34" x2="63" y2="56" stroke="#1a5c38" strokeWidth="1" opacity="0.7" />
        <line x1="33" y1="56" x2="63" y2="34" stroke="#1a5c38" strokeWidth="1" opacity="0.7" />
        {/* Shell highlight */}
        <ellipse cx="45" cy="41" rx="8" ry="6" fill="#3dae72" opacity="0.5" />

        {/* Head */}
        <ellipse cx="68" cy="40" rx="8" ry="6" fill="#4CAF50" />
        <circle cx="71" cy="38" r="1.5" fill="#fff" />

        {/* Front flippers */}
        <ellipse cx="34" cy="58" rx="7" ry="4" fill="#2E8B57" transform="rotate(-30 34 58)" />
        <ellipse cx="62" cy="58" rx="7" ry="4" fill="#2E8B57" transform="rotate(30 62 58)" />

        {/* Back flippers */}
        <ellipse cx="36" cy="35" rx="5" ry="3" fill="#2E8B57" transform="rotate(20 36 35)" />
        <ellipse cx="60" cy="35" rx="5" ry="3" fill="#2E8B57" transform="rotate(-20 60 35)" />

        {/* Outer ring */}
        <circle cx="50" cy="50" r="48" stroke="#1E88C7" strokeWidth="2" fill="none" opacity="0.6" />
        <circle cx="50" cy="50" r="46" stroke="#2E8B57" strokeWidth="1" fill="none" opacity="0.4" />
      </svg>

      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span
            className="font-black tracking-wide text-[#0F2A4A] dark:text-white"
            style={{ fontSize: size * 0.45, letterSpacing: "0.05em" }}
          >
            ACHIHI
          </span>
          <span
            className="text-[#1E88C7] font-medium tracking-[0.2em] uppercase"
            style={{ fontSize: size * 0.2 }}
          >
            MEDIA LIMITED
          </span>
        </div>
      )}
    </div>
  );
}
