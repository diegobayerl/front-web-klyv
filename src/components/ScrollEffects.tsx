"use client";

import { useEffect } from "react";

export function ScrollEffects() {
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) {
      document.querySelectorAll(".scroll-focus-blur").forEach((el) => {
        el.classList.add("is-focused");
      });
      return;
    }

    // Verifica se o navegador suporta nativamente CSS Scroll-Driven Animations
    const supportsScrollTimeline =
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      CSS.supports("(animation-timeline: view()) and (animation-range: entry)");

    const targets = document.querySelectorAll<HTMLElement>(".scroll-focus-blur");
    if (!targets.length) return;

    if (supportsScrollTimeline) {
      // Navegadores modernos conduzem a animação no thread compositor via CSS
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-focused");
            }
          });
        },
        { threshold: 0.1 }
      );
      targets.forEach((target) => observer.observe(target));
      return () => observer.disconnect();
    }

    // Fallback com IntersectionObserver para navegadores sem CSS Scroll-Driven Animations
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-focused"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-focused");
          } else {
            const rect = entry.boundingClientRect;
            if (rect.top > window.innerHeight) {
              entry.target.classList.remove("is-focused");
            }
          }
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: [0, 0.2, 0.5],
      }
    );

    targets.forEach((target) => observer.observe(target));

    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        targets.forEach((el) => el.classList.add("is-focused"));
        observer.disconnect();
      }
    };
    motion.addEventListener("change", handleMotionChange);

    return () => {
      observer.disconnect();
      motion.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return null;
}
