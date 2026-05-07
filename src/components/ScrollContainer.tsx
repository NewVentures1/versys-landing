import { useEffect } from "react";
import Lenis from "lenis";

interface Props {
  children: React.ReactNode;
}

export default function ScrollContainer({ children }: Props) {
  useEffect(() => {
    // Touch devices already have native momentum scroll. Lenis on phones
    // adds a constant rAF loop and intercepts every scroll — net negative
    // for performance and battery. Desktop trackpads/mice get the smoothing.
    const isTouch =
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouch) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
