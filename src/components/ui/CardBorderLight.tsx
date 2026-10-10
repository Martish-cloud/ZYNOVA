import React from "react";

interface CardBorderLightProps {
  className?: string;
  retriggerKey?: string | number;
}

/**
 * Reusable perimeter-only animated border light for Liquid Glass cards.
 * Uses a masked outer border track so the light travels strictly along
 * the outer edge and rounded corners with ZERO interior glow leakage.
 * All instances animate synchronously in the same direction, speed, and intensity.
 */
export const CardBorderLight: React.FC<CardBorderLightProps> = React.memo(({
  className = "",
  retriggerKey
}) => {
  return (
    <div
      key={retriggerKey}
      className={`card-border-light-mask ${className}`}
      aria-hidden="true"
    >
      <div className="card-border-light-runner" />
    </div>
  );
});

CardBorderLight.displayName = "CardBorderLight";
