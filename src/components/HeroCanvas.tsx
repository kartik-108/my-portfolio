import { useEffect, useRef } from 'react';
import type { HeroField } from '../three/HeroField';
import { useDeviceCapability } from '../hooks/useDeviceCapability';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Renders the hero's particle backdrop, or nothing (CSS gradient takes
 * over, see Hero.tsx) when WebGL is unavailable or motion is reduced.
 * three.js is dynamically imported so it never ships in the initial,
 * above-the-fold bundle — the page becomes interactive before it loads.
 */
export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fieldRef = useRef<HeroField | null>(null);
  const { isLowPower, webglAvailable } = useDeviceCapability();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!canvasRef.current || !webglAvailable || reducedMotion) return;
    let cancelled = false;
    let cleanupPointer: (() => void) | undefined;
    let cleanupVisibility: (() => void) | undefined;

    import('../three/HeroField').then(({ HeroField }) => {
      if (cancelled || !canvasRef.current) return;
      const field = new HeroField(canvasRef.current, { lowPower: isLowPower });
      fieldRef.current = field;

      const handlePointer = (e: PointerEvent) => {
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = (e.clientY / window.innerHeight) * 2 - 1;
        field.setPointer(nx, ny);
      };
      window.addEventListener('pointermove', handlePointer);
      cleanupPointer = () => window.removeEventListener('pointermove', handlePointer);

      const onVisibility = () => field.setVisible(!document.hidden);
      document.addEventListener('visibilitychange', onVisibility);
      cleanupVisibility = () => document.removeEventListener('visibilitychange', onVisibility);
    });

    return () => {
      cancelled = true;
      cleanupPointer?.();
      cleanupVisibility?.();
      fieldRef.current?.dispose();
      fieldRef.current = null;
    };
  }, [isLowPower, webglAvailable, reducedMotion]);

  if (!webglAvailable || reducedMotion) {
    return (
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(42,92,255,0.25),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(255,90,31,0.18),transparent_50%)]"
      />
    );
  }

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
}
