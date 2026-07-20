import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once at module load — safe to call multiple times
gsap.registerPlugin(ScrollTrigger);

// Re-export so consumers import from one place and get the registered plugin
export { gsap, ScrollTrigger };

/**
 * Initialises Lenis smooth scroll driven by GSAP's ticker, preventing a
 * second RAF loop. When `enabled` is false (e.g. the snap-scroll Home page)
 * the hook is a no-op and any previously created Lenis instance is destroyed.
 *
 * Returns a stable ref to the Lenis instance for external use (e.g. programmatic
 * scroll-to). The ref value is null while disabled or before first mount.
 */
export function useLenisGsap(enabled: boolean): React.MutableRefObject<Lenis | null> {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Keep ScrollTrigger in sync with Lenis's smooth position
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker — single RAF loop, no drift
    const tick = (time: number) => {
      lenis.raf(time * 1000); // gsap time is seconds; lenis.raf expects ms
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0); // prevent large jumps after tab switch

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  return lenisRef;
}
