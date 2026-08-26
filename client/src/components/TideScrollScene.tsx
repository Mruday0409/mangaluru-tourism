/* Coastal Almanac 3D scroll scene: a compact Three.js tide sculpture synchronized to scroll progress and reduced-motion preferences. */
import { useEffect, useRef } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

export default function TideScrollScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (value) => { progressRef.current = value; });
  const firstOpacity = useTransform(scrollYProgress, [0, .28, .36], [1, 1, 0]);
  const secondOpacity = useTransform(scrollYProgress, [.27, .39, .62, .71], [0, 1, 1, 0]);
  const thirdOpacity = useTransform(scrollYProgress, [.62, .74, .94], [0, 1, 1]);
  const firstY = useTransform(scrollYProgress, [0, .25], [28, -22]);
  const secondY = useTransform(scrollYProgress, [.28, .66], [28, -22]);
  const thirdY = useTransform(scrollYProgress, [.64, 1], [28, -22]);

  useEffect(() => {
    const host = canvasRef.current;
    if (!host || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 40);
    camera.position.set(0, 0, 5.8);
    const sculpture = new THREE.Group();
    scene.add(sculpture);
    const ambient = new THREE.AmbientLight(0xf7ead0, 1.4);
    const light = new THREE.PointLight(0xf6c168, 8, 14);
    light.position.set(2.5, 3.2, 4);
    scene.add(ambient, light);

    const rings: THREE.Mesh[] = [];
    [1.55, 1.2, .88, .58].forEach((radius, index) => {
      const geometry = new THREE.TorusGeometry(radius, .018 + index * .006, 10, 96);
      const material = new THREE.MeshStandardMaterial({ color: index % 2 ? 0xe4bd73 : 0x8ac0b3, transparent: true, opacity: .68, roughness: .42, metalness: .18 });
      const ring = new THREE.Mesh(geometry, material);
      ring.rotation.set(index * .65, index * .32, index * .58);
      sculpture.add(ring);
      rings.push(ring);
    });
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(.46, 4), new THREE.MeshStandardMaterial({ color: 0xe85b3f, emissive: 0x4b170d, emissiveIntensity: .25, roughness: .35, metalness: .25, transparent: true, opacity: .88 }));
    sculpture.add(core);

    const dotCount = 220;
    const positions = new Float32Array(dotCount * 3);
    for (let index = 0; index < dotCount; index += 1) { positions[index * 3] = (Math.random() - .5) * 7.2; positions[index * 3 + 1] = (Math.random() - .5) * 5.2; positions[index * 3 + 2] = (Math.random() - .5) * 2.4; }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({ color: 0xd6e6dd, size: .024, transparent: true, opacity: .43, depthWrite: false });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    let frame = 0;
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: .04 });
    observer.observe(host);
    const resize = () => { const { width, height } = host.getBoundingClientRect(); camera.aspect = Math.max(width / Math.max(height, 1), .1); camera.updateProjectionMatrix(); renderer.setSize(width, height, false); };
    window.addEventListener("resize", resize);
    resize();
    const render = (time: number) => {
      if (visible) {
        const progress = progressRef.current;
        sculpture.rotation.y = time * .00022 + progress * Math.PI * 3.4;
        sculpture.rotation.x = .24 + progress * .7;
        sculpture.rotation.z = Math.sin(time * .00036) * .11;
        sculpture.position.y = (progress - .5) * .5;
        sculpture.scale.setScalar(.82 + progress * .42);
        core.rotation.x = time * .00052;
        core.rotation.y = -time * .00038;
        rings.forEach((ring, index) => { ring.rotation.z += .001 + index * .00022; ring.position.y = Math.sin(time * .0007 + index) * (.035 + progress * .05); });
        particles.rotation.y = -time * .00004 - progress * .4;
        camera.position.z = 5.8 - progress * 1.15;
        renderer.render(scene, camera);
      }
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("resize", resize); rings.forEach((ring) => { ring.geometry.dispose(); (ring.material as THREE.Material).dispose(); }); core.geometry.dispose(); (core.material as THREE.Material).dispose(); particleGeometry.dispose(); particleMaterial.dispose(); renderer.dispose(); renderer.domElement.remove(); };
  }, []);

  return <section ref={sectionRef} className="tide-scroll-scene" aria-label="An animated Mangaluru coast story"><div className="tide-scroll-sticky"><div ref={canvasRef} className="tide-scroll-canvas" aria-hidden="true" /><div className="tide-scroll-vignette" /><div className="tide-scroll-index"><span>Coastal motion study</span><b>Scroll to move through the day</b></div><motion.div style={{ opacity: firstOpacity, y: firstY }} className="tide-scroll-copy tide-scroll-copy-one"><span>06:15 / first tide</span><h2>Before the city<br />finds its <em>volume.</em></h2><p>Markets open, coffee steams, and the coast is still keeping its own time.</p></motion.div><motion.div style={{ opacity: secondOpacity, y: secondY }} className="tide-scroll-copy tide-scroll-copy-two"><span>14:40 / rain on red earth</span><h2>Let the weather<br />rewrite the <em>route.</em></h2><p>When monsoon moves in, a shortcut becomes a scene. Slow down and take the long way.</p></motion.div><motion.div style={{ opacity: thirdOpacity, y: thirdY }} className="tide-scroll-copy tide-scroll-copy-three"><span>18:20 / last light</span><h2>Everything faces<br />the sea <em>eventually.</em></h2><p>Leave a final hour open. Mangaluru does its best work when the day is almost over.</p></motion.div><div className="tide-scroll-data"><span><i />Tide-led</span><span>West coast / 74.856° E</span><span>Monsoon-ready</span></div><motion.div className="tide-scroll-meter" style={{ scaleX: scrollYProgress }} /></div></section>;
}
