import { useEffect, useRef } from 'react';
import { useDeviceCapability } from '../hooks/useDeviceCapability';

/**
 * Lightweight custom cursor: direct DOM mutation (not React state) so
 * mouse-move never triggers a re-render. Disabled on touch devices.
 */
export default function CustomCursor() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { isTouch } = useDeviceCapability();

  useEffect(() => {
    if (isTouch) return;
    const el = ref.current;
    if (!el) return;

    const move = (e: PointerEvent) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };
    const growTargets = 'a, button, [data-cursor-grow]';
    const onOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest?.(growTargets);
      if (target) {
        el.style.width = '48px';
        el.style.height = '48px';
        el.style.backgroundColor = 'var(--color-paper)';
      }
    };
    const onOut = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest?.(growTargets);
      if (target) {
        el.style.width = '22px';
        el.style.height = '22px';
        el.style.backgroundColor = 'transparent';
      }
    };

    window.addEventListener('pointermove', move);
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerout', onOut);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
    };
  }, [isTouch]);

  if (isTouch) return null;
  return <div ref={ref} className="custom-cursor" />;
}
