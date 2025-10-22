"use client";

import React from "react";

type LoadingOverlayProps = {
  fullScreen?: boolean;
  message?: string;
  zIndex?: number;
};

const LoadingOverlay = ({
  fullScreen = true,
  message,
  zIndex = 40,
}: LoadingOverlayProps) => {
  // bar color requested
  const barColor = "#c83c51";

  return (
    <div
      aria-live="polite"
      role="status"
      className={`${
        fullScreen ? "fixed inset-0" : "absolute inset-0"
      } flex items-center justify-center`}
      style={{ zIndex }}
    >
      {/* translucent white backdrop */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255,255,255,0.10)", // bg-white/30 equivalent
          backdropFilter: "saturate(120%) blur(2px)", // subtle frosted look
        }}
      />

      <div
        style={{
          position: "relative",
          width: "min(720px, 90%)",
          maxWidth: 720,
          padding: "1rem 1.25rem",
          borderRadius: 12,
        }}
      >
        <div
          aria-hidden="true"
          style={{
            height: 12,
            borderRadius: 999,
            background: "rgba(0,0,0,0.06)",
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "-40%",
              top: 0,
              bottom: 0,
              width: "40%",
              background: `linear-gradient(90deg, ${barColor}, ${shade(barColor, -12)})`,
              borderRadius: 999,
              transform: "translateX(0)",
              animation: "loading-slide 1.05s linear infinite",
            }}
          />
        </div>

        {message && (
          <div
            className="mt-3 text-center sm:text-base text-sm text-white/80 font-bold"
            style={{ textAlign: "center" }}
          >
            {message}
          </div>
        )}

        <style>{`
          @keyframes loading-slide {
            0% { transform: translateX(0%); left: -40%; width: 40%; }
            50% { transform: translateX(150%); left: -10%; width: 55%; }
            100% { transform: translateX(300%); left: 100%; width: 40%; }
          }

          /* small responsive tweak: reduce overlay card width on very small screens */
          @media (max-width: 420px) {
            div[role="status"] > div[style] {
              padding-left: 12px;
              padding-right: 12px;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

function shade(hex: string, percent: number) {
  const cleaned = hex.replace("#", "");
  const num = parseInt(cleaned, 16);
  const r = Math.max(
    0,
    Math.min(255, (num >> 16) + Math.round((percent / 100) * 255)),
  );
  const g = Math.max(
    0,
    Math.min(255, ((num >> 8) & 0x00ff) + Math.round((percent / 100) * 255)),
  );
  const b = Math.max(
    0,
    Math.min(255, (num & 0x0000ff) + Math.round((percent / 100) * 255)),
  );
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

export default LoadingOverlay;
