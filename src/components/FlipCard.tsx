"use client";

import { useState } from "react";

type FlipCardProps = {
  front: React.ReactNode;
  back: React.ReactNode;
  label: string;
  className?: string;
};

/** Reusable 3D flip wrapper: hover (desktop) or tap/Enter (touch + keyboard)
 *  rotates to `back`. Respects prefers-reduced-motion (static front). */
export default function FlipCard({ front, back, label, className = "" }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={`group cursor-pointer [perspective:1200px] ${className}`}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={label}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
    >
      <div
        className={`relative grid transition-transform duration-700 [transform-style:preserve-3d] motion-safe:group-hover:[transform:rotateY(180deg)] ${
          flipped ? "motion-safe:[transform:rotateY(180deg)]" : ""
        }`}
      >
        <div className="col-start-1 row-start-1 min-w-0 [backface-visibility:hidden]">{front}</div>
        <div className="col-start-1 row-start-1 min-w-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">{back}</div>
      </div>
    </div>
  );
}
