/* Coastal Almanac image story: optimized Mangaluru photography, responsive loading feedback, and a scroll-or-click scene controller. */
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState, type SyntheticEvent } from "react";
import { IMG } from "@/data/siteData";

type ImageScene = {
  source: string;
  fallback: string;
  caption: string;
  context: string;
  time: string;
  title: string;
  copy: string;
  utility?: boolean;
};

const scenes: ImageScene[] = [
  { source: "/manus-storage/mangaluru-monsoon-scroll_6003d338.webp", fallback: IMG.monsoon, caption: "Monsoon road / Mangaluru", context: "Laterite red, coconut green, and a road still shining after rain.", time: "06:15 / first light", title: "Before the city\nfinds its volume.", copy: "Markets open, coffee steams, and the coast is still keeping its own time." },
  { source: "/manus-storage/mangaluru-harbour-scroll_65c676d7.webp", fallback: IMG.harbourDetail, caption: "Working coast / harbour side", context: "Boats, nets, salt, and the quiet work behind a coastal lunch.", time: "14:40 / rain on red earth", title: "Rain edits\nthe itinerary.", copy: "When monsoon moves in, a shortcut becomes a scene. Slow down and take the long way.", utility: true },
  { source: "/manus-storage/mangaluru-coast-scroll_131f9d19.webp", fallback: IMG.hero, caption: "Arabian Sea / late light", context: "At dusk, the coast holds the city’s last and best hour.", time: "18:20 / last light", title: "Everything faces\nthe sea eventually.", copy: "Leave a final hour open. Mangaluru does its best work when the day is almost over." },
];

const targetProgress = [.04, .48, .83];

function replaceWithFallback(event: SyntheticEvent<HTMLImageElement>, fallback: string) {
  const image = event.currentTarget;
  if (image.dataset.fallbackApplied === "true") return;
  image.dataset.fallbackApplied = "true";
  image.src = fallback;
}

function splitHeadline(title: string) {
  return title.split("\n").map((line, index) => <span key={line}>{index === 1 ? <em>{line}</em> : line}{index === 0 && <br />}</span>);
}

export default function TideScrollScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const [loadedScenes, setLoadedScenes] = useState<number[]>([]);
  const [activeScene, setActiveScene] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const firstOpacity = useTransform(scrollYProgress, [0, .27, .37], [1, 1, 0]);
  const secondOpacity = useTransform(scrollYProgress, [.27, .39, .62, .71], [0, 1, 1, 0]);
  const thirdOpacity = useTransform(scrollYProgress, [.62, .74, .94], [0, 1, 1]);
  const firstY = useTransform(scrollYProgress, [0, .28], [18, -14]);
  const secondY = useTransform(scrollYProgress, [.28, .66], [18, -14]);
  const thirdY = useTransform(scrollYProgress, [.64, 1], [18, -14]);
  const sceneOpacities = [firstOpacity, secondOpacity, thirdOpacity];
  const sceneY = [firstY, secondY, thirdY];

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const nextScene = progress < .34 ? 0 : progress < .7 ? 1 : 2;
    setActiveScene((current) => current === nextScene ? current : nextScene);
  });

  const selectScene = (sceneIndex: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const availableScroll = Math.max(section.offsetHeight - window.innerHeight, 0);
    const destination = section.getBoundingClientRect().top + window.scrollY + availableScroll * targetProgress[sceneIndex];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: destination, behavior: reducedMotion ? "auto" : "smooth" });
    setActiveScene(sceneIndex);
  };

  const markLoaded = (sceneIndex: number) => setLoadedScenes((current) => current.includes(sceneIndex) ? current : [...current, sceneIndex]);

  return <section ref={sectionRef} className="tide-scroll-scene" aria-label="A scroll-driven Mangaluru photo story"><div className="tide-scroll-sticky"><div className="tide-image-stage" aria-hidden="true">{scenes.map((scene, index) => <motion.figure key={scene.caption} style={{ opacity: sceneOpacities[index] }} className={`tide-image tide-image-${index + 1} ${loadedScenes.includes(index) ? "is-ready" : ""}`}><div className="tide-image-loader"><span /><small>Loading coastal scene</small></div><img src={scene.source} alt="" loading="eager" decoding="async" fetchPriority={index === 0 ? "high" : "auto"} onLoad={() => markLoaded(index)} onError={(event) => replaceWithFallback(event, scene.fallback)} /><div className="tide-image-context"><span>{scene.caption}</span><p>{scene.context}</p></div></motion.figure>)}</div><div className="tide-scroll-vignette" /><div className="tide-scroll-index"><img src={IMG.mark} alt="" /><div><span>Coastal image study</span><b>Scene {String(activeScene + 1).padStart(2, "0")} of 03 — scroll or choose</b></div></div><div className="tide-scene-selector" aria-label="Choose a coastal image scene" role="group">{scenes.map((scene, index) => <button key={scene.caption} type="button" onClick={() => selectScene(index)} className={activeScene === index ? "active" : ""} aria-label={`Show scene ${index + 1}: ${scene.caption}`} aria-pressed={activeScene === index}><i /><span>{String(index + 1).padStart(2, "0")}</span></button>)}</div>{scenes.map((scene, index) => <motion.div key={scene.time} style={{ opacity: sceneOpacities[index], y: sceneY[index] }} className={`tide-scroll-copy tide-scroll-copy-${index + 1} ${scene.utility ? "tide-scroll-utility" : ""}`}><span>{scene.time}</span>{scene.utility ? <><strong>{splitHeadline(scene.title)}</strong><p>{scene.copy}</p><div><small>Field note</small><b>Keep one hour unscheduled.</b></div></> : <><h2>{splitHeadline(scene.title)}</h2><p>{scene.copy}</p></>}</motion.div>)}<div className="tide-scroll-data"><span><i />{scenes[activeScene].caption}</span><span>Three scenes / one coast</span><span>Scroll or choose</span></div><motion.div className="tide-scroll-meter" style={{ scaleX: scrollYProgress }} /></div></section>;
}
