/* Coastal Almanac visual layer: a deliberately subtle WebGL tide field that responds to pointer movement without competing with content. */
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CoastalAtmosphere() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 40);
    camera.position.set(0, 0, 5);
    const group = new THREE.Group();
    scene.add(group);

    const count = 180;
    const positions = new Float32Array(count * 3);
    const baseY = new Float32Array(count);
    const phases = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const sea = new THREE.Color("#b7d5cd");
    const sun = new THREE.Color("#f1c56e");

    for (let index = 0; index < count; index += 1) {
      const offset = index * 3;
      const x = (Math.random() - 0.5) * 8.8;
      const y = (Math.random() - 0.5) * 5.2;
      positions[offset] = x;
      positions[offset + 1] = y;
      positions[offset + 2] = (Math.random() - 0.5) * 1.3;
      baseY[index] = y;
      phases[index] = Math.random() * Math.PI * 2;
      const colour = Math.random() > 0.84 ? sun : sea;
      colors[offset] = colour.r;
      colors[offset + 1] = colour.g;
      colors[offset + 2] = colour.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({ size: 0.035, transparent: true, opacity: 0.62, vertexColors: true, depthWrite: false, blending: THREE.AdditiveBlending });
    const particles = new THREE.Points(geometry, material);
    group.add(particles);

    let pointerX = 0;
    let pointerY = 0;
    let frameId = 0;
    let visible = true;
    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      camera.aspect = Math.max(width / Math.max(height, 1), 0.1);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    const onPointerMove = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.05 });
    observer.observe(host);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", resize);
    resize();

    const render = (time: number) => {
      if (visible) {
        const position = geometry.getAttribute("position") as THREE.BufferAttribute;
        for (let index = 0; index < count; index += 1) {
          position.setY(index, baseY[index] + Math.sin(time * 0.001 + phases[index]) * 0.09);
        }
        position.needsUpdate = true;
        group.rotation.x += (pointerY * 0.08 - group.rotation.x) * 0.02;
        group.rotation.y += (pointerX * 0.12 - group.rotation.y) * 0.02;
        group.position.x = Math.sin(time * 0.00023) * 0.12;
        renderer.render(scene, camera);
      }
      frameId = window.requestAnimationFrame(render);
    };
    frameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", resize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className="coastal-atmosphere" aria-hidden="true" />;
}
