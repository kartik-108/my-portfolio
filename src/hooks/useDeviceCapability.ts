import { useEffect, useState } from 'react';

interface DeviceCapability {
  isMobile: boolean;
  isTouch: boolean;
  isLowPower: boolean; // few cores / little memory -> dial back effects
  webglAvailable: boolean;
}

function detectWebgl(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export function useDeviceCapability(): DeviceCapability {
  const [state, setState] = useState<DeviceCapability>({
    isMobile: false,
    isTouch: false,
    isLowPower: false,
    webglAvailable: true,
  });

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = window.matchMedia('(max-width: 767px)').matches || isTouch;
    const cores = navigator.hardwareConcurrency ?? 4;
    const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 4;
    const isLowPower = cores <= 4 || memory <= 4 || isMobile;

    document.body.classList.toggle('touch-device', isTouch);

    setState({
      isMobile,
      isTouch,
      isLowPower,
      webglAvailable: detectWebgl(),
    });
  }, []);

  return state;
}
