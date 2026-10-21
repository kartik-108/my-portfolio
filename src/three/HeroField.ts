import * as THREE from 'three';

interface HeroFieldOptions {
  lowPower: boolean;
}

/**
 * A small, self-contained particle field used as the hero backdrop.
 * Vanilla three.js (not react-three-fiber) so lifecycle and disposal
 * are explicit and the bundle stays lean.
 */
export class HeroField {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private points: THREE.Points;
  private geometry: THREE.BufferGeometry;
  private material: THREE.PointsMaterial;
  private animationId: number | null = null;
  private targetRotation = { x: 0, y: 0 };
  private currentRotation = { x: 0, y: 0 };
  private visible = true;
  private disposed = false;
  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement, options: HeroFieldOptions) {
    this.canvas = canvas;
    const count = options.lowPower ? 900 : 2400;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, options.lowPower ? 1.25 : 2));

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    this.camera.position.z = 8;

    this.geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    this.material = new THREE.PointsMaterial({
      color: 0xf4f1ea,
      size: options.lowPower ? 0.035 : 0.045,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.points);

    this.resize();
    window.addEventListener('resize', this.resize);
    this.loop();
  }

  private resize = () => {
    const { clientWidth, clientHeight } = this.canvas;
    if (!clientWidth || !clientHeight) return;
    this.camera.aspect = clientWidth / clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(clientWidth, clientHeight, false);
  };

  setPointer(nx: number, ny: number) {
    // nx, ny in [-1, 1]
    this.targetRotation.y = nx * 0.35;
    this.targetRotation.x = ny * 0.2;
  }

  setVisible(visible: boolean) {
    this.visible = visible;
  }

  private loop = () => {
    if (this.disposed) return;
    this.animationId = requestAnimationFrame(this.loop);
    if (!this.visible || document.hidden) return;

    this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.04;
    this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.04;

    this.points.rotation.x = this.currentRotation.x;
    this.points.rotation.y += 0.0007;
    this.points.rotation.y += this.currentRotation.y * 0.001;

    this.renderer.render(this.scene, this.camera);
  };

  dispose() {
    this.disposed = true;
    if (this.animationId) cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.resize);
    this.geometry.dispose();
    this.material.dispose();
    this.renderer.dispose();
  }
}
