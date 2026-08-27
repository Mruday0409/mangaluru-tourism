/* Coastal Almanac image scroll story: real Mangaluru imagery becomes the moving scene as visitors progress through the day. */
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { IMG } from "@/data/siteData";

const sceneImages = {
  monsoon: "/manus-storage/mangaluru-monsoon-scroll_6003d338.webp",
  harbour: "/manus-storage/mangaluru-harbour-scroll_65c676d7.webp",
  coast: "/manus-storage/mangaluru-coast-scroll_131f9d19.webp",
};

function useFallback(event: React.SyntheticEvent<HTMLImageElement>, fallback: string) {
  const image = event.currentTarget;
  image.onerror = null;
  image.src = fallback;
}

export default function TideScrollScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const firstOpacity = useTransform(scrollYProgress, [0, .27, .37], [1, 1, 0]);
  const secondOpacity = useTransform(scrollYProgress, [.27, .39, .62, .71], [0, 1, 1, 0]);
  const thirdOpacity = useTransform(scrollYProgress, [.62, .74, .94], [0, 1, 1]);
  const firstY = useTransform(scrollYProgress, [0, .28], [26, -24]);
  const secondY = useTransform(scrollYProgress, [.28, .66], [26, -24]);
  const thirdY = useTransform(scrollYProgress, [.64, 1], [26, -24]);

  return <section ref={sectionRef} className="tide-scroll-scene" aria-label="A scroll-driven Mangaluru photo story"><div className="tide-scroll-sticky"><div className="tide-image-stage" aria-hidden="true"><motion.figure style={{ opacity: firstOpacity }} className="tide-image tide-image-one"><img src={sceneImages.monsoon} alt="" loading="eager" decoding="async" fetchPriority="high" onError={(event) => useFallback(event, IMG.monsoon)} /><figcaption>Monsoon road / Mangaluru</figcaption></motion.figure><motion.figure style={{ opacity: secondOpacity }} className="tide-image tide-image-two"><img src={sceneImages.harbour} alt="" loading="eager" decoding="async" onError={(event) => useFallback(event, IMG.harbourDetail)} /><figcaption>Working coast / harbour side</figcaption></motion.figure><motion.figure style={{ opacity: thirdOpacity }} className="tide-image tide-image-three"><img src={sceneImages.coast} alt="" loading="eager" decoding="async" onError={(event) => useFallback(event, IMG.hero)} /><figcaption>Arabian Sea / late light</figcaption></motion.figure></div><div className="tide-scroll-vignette" /><div className="tide-scroll-index"><img src={IMG.mark} alt="" /><div><span>Coastal image study</span><b>Scroll through the day</b></div></div><motion.div style={{ opacity: firstOpacity, y: firstY }} className="tide-scroll-copy tide-scroll-copy-one"><span>06:15 / first light</span><h2>Before the city<br />finds its <em>volume.</em></h2><p>Markets open, coffee steams, and the coast is still keeping its own time.</p></motion.div><motion.div style={{ opacity: secondOpacity, y: secondY }} className="tide-scroll-copy tide-scroll-copy-two tide-scroll-utility"><span>14:40 / rain on red earth</span><strong>RAIN EDITS<br />THE ITINERARY.</strong><p>When monsoon moves in, a shortcut becomes a scene. Slow down and take the long way.</p><div><small>Field note</small><b>Keep one hour unscheduled.</b></div></motion.div><motion.div style={{ opacity: thirdOpacity, y: thirdY }} className="tide-scroll-copy tide-scroll-copy-three"><span>18:20 / last light</span><h2>Everything faces<br />the sea <em>eventually.</em></h2><p>Leave a final hour open. Mangaluru does its best work when the day is almost over.</p></motion.div><div className="tide-scroll-data"><span><i />Image-led</span><span>Three scenes / one coast</span><span>Scroll to explore</span></div><motion.div className="tide-scroll-meter" style={{ scaleX: scrollYProgress }} /></div></section>;
}
