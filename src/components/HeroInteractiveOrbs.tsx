"use client";

import { useEffect, useRef } from "react";

interface OrbDef {
  id: string;
  className: string;
  basePercentX: number; // 0 to 1
  basePercentY: number; // 0 to 1
  parallaxFactorX: number;
  parallaxFactorY: number;
  idleSpeed: number;
  idleAmpX: number;
  idleAmpY: number;
  influenceRadius: number;
  maxRepel: number;
}

const ORBS: OrbDef[] = [
  {
    id: "orb-top-left",
    className: "hero-orb hero-orb-1",
    basePercentX: 0.10,
    basePercentY: 0.15,
    parallaxFactorX: -90,
    parallaxFactorY: -70,
    idleSpeed: 0.9,
    idleAmpX: 25,
    idleAmpY: 20,
    influenceRadius: 550,
    maxRepel: 130,
  },
  {
    id: "orb-top-right",
    className: "hero-orb hero-orb-2",
    basePercentX: 0.90,
    basePercentY: 0.18,
    parallaxFactorX: 100,
    parallaxFactorY: -75,
    idleSpeed: 1.1,
    idleAmpX: 28,
    idleAmpY: 22,
    influenceRadius: 550,
    maxRepel: 140,
  },
  {
    id: "orb-mid-left",
    className: "hero-orb hero-orb-3",
    basePercentX: 0.12,
    basePercentY: 0.62,
    parallaxFactorX: -110,
    parallaxFactorY: 80,
    idleSpeed: 0.75,
    idleAmpX: 26,
    idleAmpY: 24,
    influenceRadius: 580,
    maxRepel: 150,
  },
  {
    id: "orb-mid-right",
    className: "hero-orb hero-orb-4",
    basePercentX: 0.88,
    basePercentY: 0.58,
    parallaxFactorX: 95,
    parallaxFactorY: 85,
    idleSpeed: 1.0,
    idleAmpX: 30,
    idleAmpY: 22,
    influenceRadius: 580,
    maxRepel: 140,
  },
  {
    id: "orb-center-ambient",
    className: "hero-orb hero-orb-center",
    basePercentX: 0.50,
    basePercentY: 0.32,
    parallaxFactorX: -35,
    parallaxFactorY: -35,
    idleSpeed: 0.5,
    idleAmpX: 16,
    idleAmpY: 14,
    influenceRadius: 400,
    maxRepel: 60,
  },
];

export function HeroInteractiveOrbs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cursorLightRef = useRef<HTMLDivElement>(null);

  // Mouse coords in screen pixels
  const mouseScreenX = useRef<number | null>(null);
  const mouseScreenY = useRef<number | null>(null);

  // Normalized mouse position (-1 to 1) for global parallax
  const targetNormX = useRef(0);
  const targetNormY = useRef(0);
  const currentNormX = useRef(0);
  const currentNormY = useRef(0);

  // Cursor light coordinates for smooth following
  const cursorX = useRef(0);
  const cursorY = useRef(0);
  const targetCursorX = useRef(0);
  const targetCursorY = useRef(0);
  const cursorActive = useRef(false);

  // Per-orb smoothed dynamic values [repelX, repelY, scale]
  const orbDynamics = useRef(
    ORBS.map(() => ({
      repelX: 0,
      repelY: 0,
      scale: 1,
      targetRepelX: 0,
      targetRepelY: 0,
      targetScale: 1,
    }))
  );

  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      mouseScreenX.current = e.clientX;
      mouseScreenY.current = e.clientY;

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      targetNormX.current = Math.max(-1.5, Math.min(1.5, nx));
      targetNormY.current = Math.max(-1.5, Math.min(1.5, ny));

      // Cursor follower position inside container
      targetCursorX.current = e.clientX - rect.left;
      targetCursorY.current = e.clientY - rect.top;

      // Activate cursor light if within or near hero container
      if (
        e.clientY >= rect.top - 100 &&
        e.clientY <= rect.bottom + 100 &&
        e.clientX >= rect.left - 50 &&
        e.clientX <= rect.right + 50
      ) {
        cursorActive.current = true;
      } else {
        cursorActive.current = false;
      }
    };

    const handlePointerLeave = () => {
      mouseScreenX.current = null;
      mouseScreenY.current = null;
      targetNormX.current = 0;
      targetNormY.current = 0;
      cursorActive.current = false;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave, { passive: true });

    let startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = (now - startTime) * 0.001;
      const container = containerRef.current;

      // 1. Smooth global parallax lerp
      currentNormX.current += (targetNormX.current - currentNormX.current) * 0.08;
      currentNormY.current += (targetNormY.current - currentNormY.current) * 0.08;

      let rect: DOMRect | null = null;
      if (container) {
        rect = container.getBoundingClientRect();
      }

      // Update interactive cursor light follower
      if (cursorLightRef.current) {
        cursorX.current += (targetCursorX.current - cursorX.current) * 0.12;
        cursorY.current += (targetCursorY.current - cursorY.current) * 0.12;
        cursorLightRef.current.style.transform = `translate3d(${cursorX.current.toFixed(1)}px, ${cursorY.current.toFixed(1)}px, 0)`;
        cursorLightRef.current.style.opacity = cursorActive.current ? "0.85" : "0";
      }

      // 2. Update each orb with magnetic repulsion + scale bloom
      ORBS.forEach((orb, i) => {
        const el = orbRefs.current[i];
        if (!el) return;

        // Idle organic floating wave
        const idleX = Math.sin(elapsed * orb.idleSpeed) * orb.idleAmpX;
        const idleY = Math.cos(elapsed * orb.idleSpeed * 0.85) * orb.idleAmpY;

        // Base parallax offset from mouse
        const parallaxX = currentNormX.current * orb.parallaxFactorX;
        const parallaxY = currentNormY.current * orb.parallaxFactorY;

        // Interactive Magnetism: Compute distance to cursor
        const dyn = orbDynamics.current[i];

        if (rect && mouseScreenX.current !== null && mouseScreenY.current !== null) {
          // Center of orb in screen viewport coordinates
          const orbScreenX = rect.left + rect.width * orb.basePercentX + parallaxX + idleX;
          const orbScreenY = rect.top + rect.height * orb.basePercentY + parallaxY + idleY;

          const dx = mouseScreenX.current - orbScreenX;
          const dy = mouseScreenY.current - orbScreenY;
          const distance = Math.hypot(dx, dy);

          if (distance < orb.influenceRadius && distance > 1) {
            // Proximity ratio: 1 when directly on top, 0 at outer boundary
            const proximity = 1 - distance / orb.influenceRadius;
            const force = Math.pow(proximity, 1.3); // smooth responsive curve

            // Push orb away from cursor (magnetic repulsion)
            dyn.targetRepelX = -(dx / distance) * force * orb.maxRepel;
            dyn.targetRepelY = -(dy / distance) * force * orb.maxRepel;

            // Expand and intensify scale on hover
            dyn.targetScale = 1 + force * 0.32;
          } else {
            dyn.targetRepelX = 0;
            dyn.targetRepelY = 0;
            dyn.targetScale = 1;
          }
        } else {
          dyn.targetRepelX = 0;
          dyn.targetRepelY = 0;
          dyn.targetScale = 1;
        }

        // Lerp repulsion & scale for fluid liquid feel
        dyn.repelX += (dyn.targetRepelX - dyn.repelX) * 0.1;
        dyn.repelY += (dyn.targetRepelY - dyn.repelY) * 0.1;
        dyn.scale += (dyn.targetScale - dyn.scale) * 0.1;

        const finalX = parallaxX + idleX + dyn.repelX;
        const finalY = parallaxY + idleY + dyn.repelY;

        // Apply 3D transform with dynamic scale
        el.style.transform = `translate3d(${finalX.toFixed(2)}px, ${finalY.toFixed(2)}px, 0) scale(${dyn.scale.toFixed(3)})`;

        // Dynamic glow boost when mouse is nearby
        if (dyn.scale > 1.02) {
          const boost = Math.min(1, (dyn.scale - 1) * 3);
          el.style.opacity = `${(0.75 + boost * 0.25).toFixed(2)}`;
        } else {
          el.style.opacity = "";
        }
      });

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="hero-orbs-canvas" aria-hidden="true">
      {/* Dynamic Cursor Light Shimmer Follower */}
      <div ref={cursorLightRef} className="hero-cursor-light" />

      {/* 5 Liquid Glowing Orbs */}
      {ORBS.map((orb, index) => (
        <div
          key={orb.id}
          ref={(el) => {
            orbRefs.current[index] = el;
          }}
          className={orb.className}
        />
      ))}
    </div>
  );
}
