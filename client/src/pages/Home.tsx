/* Coastal Almanac homepage: a non-template travel editorial with serif atmosphere, responsive image choreography, and tactile content choices. */
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { IMG } from "@/data/siteData";
import CoastalAtmosphere from "@/components/CoastalAtmosphere";
import TideScrollScene from "@/components/TideScrollScene";
import WeatherAlmanac from "@/components/WeatherAlmanac";

const chapters = [
  { title: "First light", copy: "The market is awake, the dosa is still warm, and the city has not decided what kind of day it will be.", image: IMG.market, tag: "06:30 — Central Market" },
  { title: "Salt air", copy: "Walk until the road stops trying to be a city street. The Arabian Sea takes over from there.", image: IMG.panambur, tag: "17:35 — Panambur" },
  { title: "Blue hour", copy: "The final light turns tiled roofs, temple lamps, and ferry wakes into a quieter kind of theatre.", image: IMG.port, tag: "19:10 — Old port" },
];

const tastes = [
  { name: "Neer dosa", note: "Soft, lacy, endlessly capable", image: IMG.breakfastDetail, colour: "#e8b963" },
  { name: "Ghee roast", note: "Deep spice with a long finish", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1600&q=85", colour: "#d26a45" },
  { name: "Catch of the day", note: "The sea decides the menu", image: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=1600&q=85", colour: "#3e8078" },
];

const visitModes = [
  { label: "A slow Saturday", title: "Breakfast, backwater, sunset.", copy: "For long lunches and an ocean-facing last stop.", href: "/itineraries" },
  { label: "A culture-rich day", title: "Painted walls, tiled roofs, a temple bell.", copy: "For slow looking and a few meaningful steps indoors.", href: "/culture" },
  { label: "Food first", title: "Let appetite choose the map.", copy: "For the traveller whose best memories arrive on a plate.", href: "/food" },
];

const rise = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } };

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 96]);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [tasteIndex, setTasteIndex] = useState(0);
  const [modeIndex, setModeIndex] = useState(0);
  const chapter = chapters[chapterIndex];
  const taste = tastes[tasteIndex];
  const mode = useMemo(() => visitModes[modeIndex], [modeIndex]);

  return (
    <>
      <section ref={heroRef} className="almanac-hero">
        <motion.div className="almanac-hero-media" style={{ scale: imageScale, y: imageY }}><img src={IMG.hero} alt="Arabian Sea coast at Mangaluru in warm evening light" /></motion.div>
        <div className="almanac-hero-wash" />
        <CoastalAtmosphere />
        <div className="almanac-hero-content">
          <motion.p initial="hidden" animate="visible" variants={rise} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="almanac-overline">Mangaluru, in its own time</motion.p>
          <motion.h1 initial="hidden" animate="visible" variants={rise} transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}>Meet the coast<br /><em>between the lines.</em></motion.h1>
          <motion.p initial="hidden" animate="visible" variants={rise} transition={{ duration: 0.8, delay: 0.17, ease: [0.16, 1, 0.3, 1] }} className="almanac-hero-intro">Not a checklist of attractions. A living city of red tiles, coconut steam, temple light, and the long walk toward the sea.</motion.p>
          <motion.div initial="hidden" animate="visible" variants={rise} transition={{ duration: 0.8, delay: 0.26, ease: [0.16, 1, 0.3, 1] }} className="almanac-hero-actions"><Link href="/places" className="almanac-button primary">Explore the city <ArrowDownRight size={17} /></Link><Link href="/plan-your-visit" className="almanac-text-action">Build your weekend <ArrowRight size={16} /></Link></motion.div>
        </div>
        <WeatherAlmanac />
      </section>

      <TideScrollScene />

      <section className="almanac-intro section-shell"><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={rise} transition={{ duration: 0.7 }} className="almanac-intro-grid"><span className="almanac-label">The city’s temperament</span><h2>Soft mornings.<br /><em>Electric evenings.</em></h2><p>Mangaluru shifts without warning: a fish market becomes a flower lane, a tiled temple roof breaks the skyline, and the sea stays only one turn away.</p></motion.div></section>

      <section className="almanac-monsoon-section">
        <div className="section-shell almanac-monsoon-grid">
          <motion.div initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }} className="almanac-monsoon-photo"><img src={IMG.monsoon} alt="Rain-washed coastal road in Mangaluru during the monsoon" /><span>Monsoon note — let the road lead</span></motion.div>
          <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }} className="almanac-monsoon-copy"><span className="almanac-label">The season that changes everything</span><h2>When rain turns<br />the city <em>cinematic.</em></h2><p>In Mangaluru, monsoon is not a reason to stay inside. It is a different way of looking: red earth saturated, green edges louder, coffee warmer, and the sea a little more dramatic.</p><div className="almanac-monsoon-notes"><span>Rain walks</span><span>Laterite roads</span><span>Slow coffee</span></div><Link href="/travel-guide" className="almanac-button primary">Travel with the weather <ArrowRight size={16} /></Link></motion.div>
          <motion.figure initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75, delay: 0.15 }} whileHover={{ y: -9, rotate: -1 }} className="almanac-harbour-fragment"><img src={IMG.harbourDetail} alt="Fishing harbour texture in Mangaluru" /><figcaption>Working coast / not a backdrop</figcaption></motion.figure>
        </div>
      </section>

      <section className="almanac-chapter-section">
        <div className="section-shell almanac-chapter-grid">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={rise} transition={{ duration: 0.7 }}><span className="almanac-label">Three ways the city moves</span><h2 className="almanac-section-title">Follow a different<br /><em>hour of the day.</em></h2><div className="almanac-chapter-tabs">{chapters.map((item, index) => <button key={item.title} onClick={() => setChapterIndex(index)} className={index === chapterIndex ? "active" : ""}><span>0{index + 1}</span>{item.title}</button>)}</div></motion.div>
          <motion.div layout className="almanac-chapter-card"><AnimatePresence mode="wait"><motion.img key={chapter.image} src={chapter.image} alt={chapter.title} initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }} /></AnimatePresence><div><span>{chapter.tag}</span><h3>{chapter.title}</h3><p>{chapter.copy}</p><Link href="/experiences" className="almanac-text-action">Follow this mood <ArrowRight size={15} /></Link></div></motion.div>
        </div>
      </section>

      <section className="section-shell almanac-mosaic-section">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.28 }} variants={rise} transition={{ duration: 0.7 }} className="almanac-section-head"><div><span className="almanac-label">Not just the expected</span><h2 className="almanac-section-title">Make the city<br /><em>your own.</em></h2></div><Link href="/places" className="almanac-text-action">All places <ArrowRight size={16} /></Link></motion.div>
        <div className="almanac-mosaic">
          <motion.article whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 260, damping: 22 }} className="mosaic-card tall"><img src={IMG.kudroli} alt="Kudroli temple in Mangaluru" /><div><span>Heritage</span><h3>Keep looking up.</h3><p>Gold, stone, and an old city that refuses to flatten into a single story.</p><Link href="/culture">Explore culture <ArrowRight size={15} /></Link></div></motion.article>
          <motion.article whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 260, damping: 22 }} className="mosaic-card"><img src={IMG.panambur} alt="A beach in Mangaluru" /><div><span>Coast</span><h3>Let the horizon interrupt.</h3><Link href="/beaches">Find the shore <ArrowRight size={15} /></Link></div></motion.article>
          <motion.article whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 260, damping: 22 }} className="mosaic-card ink"><img src={IMG.church} alt="Historic church in Mangaluru" /><div><span>Old quarter</span><h3>Take the long way back.</h3><Link href="/places">Wander slowly <ArrowRight size={15} /></Link></div></motion.article>
        </div>
      </section>

      <section className="almanac-taste-section"><div className="section-shell"><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={rise} transition={{ duration: 0.7 }} className="almanac-taste-head"><span className="almanac-label">The edible city</span><p>Good travel starts with curiosity. In Mangaluru, it starts before breakfast is even over.</p></motion.div><div className="almanac-taste-layout"><div className="almanac-taste-list">{tastes.map((item, index) => <button key={item.name} onMouseEnter={() => setTasteIndex(index)} onFocus={() => setTasteIndex(index)} onClick={() => setTasteIndex(index)} className={index === tasteIndex ? "active" : ""}><span>0{index + 1}</span><strong>{item.name}</strong><i style={{ background: item.colour }} /></button>)}</div><motion.div layout className="almanac-taste-visual"><AnimatePresence mode="wait"><motion.img key={taste.image} src={taste.image} alt={taste.name} initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} exit={{ clipPath: "inset(0 0 0 100%)" }} transition={{ duration: 0.65, ease: [0.77, 0, 0.175, 1] }} /></AnimatePresence><div><span>On the plate</span><h2>{taste.name}</h2><p>{taste.note}</p><Link href="/food" className="almanac-button light">Eat your way in <ArrowRight size={16} /></Link></div></motion.div></div></div></section>

      <section className="section-shell almanac-mode-section"><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={rise} transition={{ duration: 0.7 }} className="almanac-mode-card"><div className="almanac-mode-copy"><span className="almanac-label">Plan without overplanning</span><h2>What kind of<br /><em>Mangaluru</em> do you want?</h2><p>Choose your mood. We’ll start you with a loose, well-shaped day — not a packed itinerary.</p><div className="almanac-mode-pills">{visitModes.map((item, index) => <button key={item.label} className={modeIndex === index ? "active" : ""} onClick={() => setModeIndex(index)}>{item.label}</button>)}</div></div><AnimatePresence mode="wait"><motion.div key={mode.title} className="almanac-mode-result" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.35 }}><Sparkles size={19} /><span>Our first suggestion</span><h3>{mode.title}</h3><p>{mode.copy}</p><Link href={mode.href} className="almanac-text-action">Open this plan <ArrowRight size={15} /></Link></motion.div></AnimatePresence></motion.div></section>

      <section className="almanac-close"><div className="section-shell"><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={rise} transition={{ duration: 0.7 }}><span className="almanac-label">Ready when you are</span><h2>Leave room for<br /><em>one good surprise.</em></h2><p>Save the exact plan for later. The better version of this city will meet you in between the things you meant to do.</p><Link href="/plan-your-visit" className="almanac-button primary">Shape your visit <ArrowDownRight size={17} /></Link></motion.div></div></section>
    </>
  );
}
