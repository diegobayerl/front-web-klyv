"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

// Carrega o liquid-glass-react somente no cliente para garantir que o navigator e SVG shaders funcionem perfeitamente
const LiquidGlass = dynamic(() => import("liquid-glass-react"), {
  ssr: false,
});

interface LiquidGlassButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "header";
  displacementScale?: number;
  blurAmount?: number;
  saturation?: number;
  aberrationIntensity?: number;
  elasticity?: number;
  cornerRadius?: number;
  padding?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function LiquidGlassButton({
  children,
  href,
  variant = "secondary",
  displacementScale = 75,
  blurAmount = 0.08,
  saturation = 160,
  aberrationIntensity = 2.5,
  elasticity = 0.35,
  cornerRadius = 999,
  padding = "13px 32px",
  className = "",
  style,
  onClick,
}: LiquidGlassButtonProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const variantClass =
    variant === "primary"
      ? "klyv-liquid-primary"
      : variant === "header"
      ? "klyv-liquid-header"
      : "klyv-liquid-secondary";

  const content = mounted ? (
    <LiquidGlass
      displacementScale={displacementScale}
      blurAmount={blurAmount}
      saturation={saturation}
      aberrationIntensity={aberrationIntensity}
      elasticity={elasticity}
      cornerRadius={cornerRadius}
      padding={padding}
      className={`klyv-liquid-glass ${variantClass} ${className}`}
      style={{
        display: "inline-flex",
        ...style,
      }}
      onClick={onClick}
    >
      <span className="specular-highlight" aria-hidden="true" />
      <span className="klyv-liquid-content">{children}</span>
    </LiquidGlass>
  ) : (
    <div
      className={`klyv-liquid-glass ${variantClass} klyv-liquid-placeholder ${className}`}
      style={{
        display: "inline-flex",
        borderRadius: `${cornerRadius}px`,
        padding,
        ...style,
      }}
    >
      <span className="specular-highlight" aria-hidden="true" />
      <span className="klyv-liquid-content">{children}</span>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="klyv-liquid-link"
        style={{ textDecoration: "none", display: "inline-block" }}
      >
        {content}
      </a>
    );
  }

  return content;
}
