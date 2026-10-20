"use client";
import { useEffect } from 'react';

export function ScrollEffects() {
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = matchMedia('(max-width: 700px)');
    const animations = new Set<Animation>();
    if (!('IntersectionObserver' in window)) return;
    // Animate once on entry; never hide content before observation.
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (motion.matches) continue;
        const animation = entry.target.animate([
          { transform: `translateY(${mobile.matches ? 6 : 14}px)`, opacity: 0.82 },
          { transform: 'translateY(0)', opacity: 1 },
        ], { duration: mobile.matches ? 280 : 420, easing: 'cubic-bezier(.2,.65,.3,1)' });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
    }, { threshold: 0.08 });
    document.querySelectorAll('#produto > .section-heading, #recursos > .section-heading, .feature-card, .lia-text-column > h2, .lia-feature-card, .faq-section > div:first-child').forEach(target => observer.observe(target));
    const stop = () => { if (motion.matches) animations.forEach(animation => animation.cancel()); };
    motion.addEventListener('change', stop);
    return () => { observer.disconnect(); motion.removeEventListener('change', stop); animations.forEach(animation => animation.cancel()); };
  }, []);
  return null;
}
