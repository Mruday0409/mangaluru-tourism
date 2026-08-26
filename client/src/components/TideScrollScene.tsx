/* Coastal Almanac image scroll story: real Mangaluru imagery becomes the moving scene as visitors progress through the day. */
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { IMG } from "@/data/siteData";

export default function TideScrollScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const firstOpacity = useTransform(scrollYProgress, [0, .27, .37], [1, 1, 0]);
  const secondOpacity = useTransform(scrollYProgress, [.27, .39, .62, .71], [0, 1, 1, 0]);
  const thirdOpacity = useTransform(scrollYProgress, [.62, .74, .94], [0, 1, 1]);
  const firstY = useTransform(scrollYProgress, [0, .28], [26, -24]);
  const secondY = useTransform(scrollYProgress, [.28, .66], [26, -24]);
  const thirdY = useTransform(scrollYProgress, [.64, 1], [26, -24]);
  const firstImageScale = useTransform(scrollYProgress, [0, .36], [1.16, 1]);
  const secondImageScale = useTransform(scrollYProgress, [.28, .68], [1.18, 1]);
  const thirdImageScale = useTransform(scrollYProgress, [.62, 1], [1.2, 1]);
  const firstImageX = useTransform(scrollYProgress, [0, .36], [-2, 0]);
  const secondImageX = useTransform(scrollYProgress, [.28, .71], [7, 0]);
  const thirdImageX = useTransform(scrollYProgress, [.62, 1], [-5, 0]);

  return <section ref={sectionRef} className="tide-scroll-scene" aria-label="A scroll-driven Mangaluru photo story"><div className="tide-scroll-sticky"><div className="tide-image-stage" aria-hidden="true"><motion.figure style={{ opacity: firstOpacity, scale: firstImageScale, x: firstImageX }} className="tide-image tide-image-one"><img src={IMG.monsoon} alt="" /><figcaption>Monsoon road / Mangaluru</figcaption></motion.figure><motion.figure style={{ opacity: secondOpacity, scale: secondImageScale, x: secondImageX }} className="tide-image tide-image-two"><img src={IMG.harbourDetail} alt="" /><figcaption>Working coast / harbour side</figcaption></motion.figure><motion.figure style={{ opacity: thirdOpacity, scale: thirdImageScale, x: thirdImageX }} className="tide-image tide-image-three"><img src={IMG.kudroli} alt="" /><figcaption>Kudroli / after the rain</figcaption></motion.figure></div><div className="tide-scroll-vignette" /><div className="tide-scroll-index"><img src={IMG.mark} alt="" /><div><span>Coastal image study</span><b>Scroll through the day</b></div></div><motion.div style={{ opacity: firstOpacity, y: firstY }} className="tide-scroll-copy tide-scroll-copy-one"><span>06:15 / first light</span><h2>Before the city<br />finds its <em>volume.</em></h2><p>Markets open, coffee steams, and the coast is still keeping its own time.</p></motion.div><motion.div style={{ opacity: secondOpacity, y: secondY }} className="tide-scroll-copy tide-scroll-copy-two tide-scroll-utility"><span>14:40 / rain on red earth</span><strong>RAIN EDITS<br />THE ITINERARY.</strong><p>When monsoon moves in, a shortcut becomes a scene. Slow down and take the long way.</p><div><small>Field note</small><b>Keep one hour unscheduled.</b></div></motion.div><motion.div style={{ opacity: thirdOpacity, y: thirdY }} className="tide-scroll-copy tide-scroll-copy-three"><span>18:20 / last light</span><h2>Everything faces<br />the sea <em>eventually.</em></h2><p>Leave a final hour open. Mangaluru does its best work when the day is almost over.</p></motion.div><div className="tide-scroll-data"><span><i />Image-led</span><span>Three scenes / one coast</span><span>Scroll to explore</span></div><motion.div className="tide-scroll-meter" style={{ scaleX: scrollYProgress }} /></div></section>;
}
