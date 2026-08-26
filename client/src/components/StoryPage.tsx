/* Coastal Almanac story template: a layered travel feature with serif narrative, image depth, and active exploration prompts. */
import { motion } from "framer-motion";
import { ArrowRight, Clock3, MapPin, MoveUpRight, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { IMG } from "@/data/siteData";

export type StoryConfig = {
  kicker: string;
  title: string;
  lede: string;
  heroImage: string;
  subImage: string;
  imageAlt: string;
  chapter: string;
  intro: string;
  points: { title: string; body: string }[];
  stat: string;
  statLabel: string;
  cta: string;
  ctaHref: string;
  featureTitle: string;
  featureBody: string;
};

const rise = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } };

export default function StoryPage({ config }: { config: StoryConfig }) {
  return (
    <>
      <section className="story-hero">
        <img src={config.heroImage} alt={config.imageAlt} />
        <div className="story-hero-wash" />
        <motion.div className="story-hero-copy" initial="hidden" animate="visible" variants={rise} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
          <span className="almanac-overline">{config.kicker}</span><h1>{config.title}</h1><p>{config.lede}</p>
          <div className="story-hero-meta"><span><MapPin size={13} /> Mangaluru, Karnataka</span><span><Clock3 size={13} /> Read in 4 minutes</span></div>
        </motion.div>
      </section>

      <section className="section-shell story-prologue">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={rise} transition={{ duration: 0.7 }} className="story-prologue-copy"><span className="almanac-label">A local kind of beautiful</span><h2>{config.featureTitle}</h2><p>{config.featureBody}</p><blockquote>“{config.intro}”</blockquote></motion.div>
        <motion.div initial={{ opacity: 0, scale: .94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: .8, ease: [0.16, 1, 0.3, 1] }} className="story-prologue-image"><img src={config.subImage} alt="" /><span>{config.chapter} — in focus</span></motion.div>
      </section>

      <section className="story-notes"><div className="section-shell"><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={rise} transition={{ duration: .7 }} className="story-notes-head"><span className="almanac-label">A better way to experience it</span><p>Three small prompts that turn a stop into a memory.</p></motion.div><div className="story-note-grid">{config.points.map((point, index) => <motion.article key={point.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .55, delay: index * .08 }} whileHover={{ y: -8 }}><span>0{index + 1}</span><h3>{point.title}</h3><p>{point.body}</p><i /></motion.article>)}</div></div></section>

      <section className="story-immersive"><div className="section-shell"><motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .7 }} className="story-immersive-copy"><span className="almanac-label">{config.statLabel}</span><h2>{config.stat}</h2><p>{config.lede}</p><Link href={config.ctaHref} className="almanac-button light">{config.cta} <MoveUpRight size={16} /></Link></motion.div><motion.img initial={{ clipPath: "inset(0 0 100% 0)" }} whileInView={{ clipPath: "inset(0 0 0% 0)" }} viewport={{ once: true, amount: .2 }} transition={{ duration: .9, ease: [0.77, 0, 0.175, 1] }} src={config.heroImage} alt="" /></div></section>

      <section className="section-shell story-next"><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .3 }} variants={rise} transition={{ duration: .7 }} className="story-next-head"><span className="almanac-label">Keep going</span><h2>What this chapter<br /><em>connects to.</em></h2></motion.div><div className="story-next-grid"><Link href="/places"><span>01</span><h3>More places</h3><p>Find the next stop that changes the shape of the day.</p><ArrowRight size={17} /></Link><Link href="/itineraries"><span>02</span><h3>Loose itineraries</h3><p>Let this story become one part of a longer weekend.</p><ArrowRight size={17} /></Link><Link href="/plan-your-visit"><span>03</span><h3>Make it personal</h3><p>Start with your own pace, appetite, and available time.</p><ArrowRight size={17} /></Link></div></section>

      <section className="section-shell story-closing"><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .4 }} variants={rise} transition={{ duration: .7 }}><Sparkles size={18} /><h2>There is always<br />more to <em>notice.</em></h2><p>That is the best reason to return. The city does not change for a visitor; it keeps revealing what was already there.</p><Link href="/plan-your-visit" className="almanac-button primary">Plan your own day <ArrowRight size={16} /></Link></motion.div></section>
    </>
  );
}

export const storyConfigs: Record<string, StoryConfig> = {
  beaches: { kicker: "Beaches & backwaters", title: "Let the water edit the day.", lede: "Mangaluru’s coast is less about one famous beach and more about the changing texture of every edge: river mouth, fishing boat, wind, rock, and the last generous hour of light.", heroImage: IMG.panambur, subImage: IMG.beach, imageAlt: "Mangaluru coast near Panambur Beach", chapter: "Coast", intro: "Follow the western edge until the city thins out and the river begins to answer the sea.", points: [{ title: "Start late", body: "The cooler hours give the shore a softer voice. Save the beach for the part of the day that wants less agenda." }, { title: "Look beyond the sand", body: "The best scenes are often a few steps inland: nets drying, a tea stall, a road ending in palms." }, { title: "Choose the quiet edge", body: "Pair the familiar coast with a river mouth or a smaller shoreline where the city feels less hurried." }], stat: "Three different blues, one long afternoon.", statLabel: "Coastal cue", cta: "See coastal places", ctaHref: "/places", featureTitle: "Start where land gives way.", featureBody: "The coastal rhythm here does not insist on itself. It is discovered in layers — in the breeze, in the fishing boats waiting out the tide, and in the small, perfectly-timed pause before sunset." },
  culture: { kicker: "Culture & heritage", title: "Look up. The city is layered.", lede: "Temple courtyards, painted ceilings, laterite walls, and old streets that still make room for the everyday work of a coastal city.", heroImage: IMG.kudroli, subImage: IMG.church, imageAlt: "Kudroli Gokarnanatheshwara Temple in Mangaluru", chapter: "Culture", intro: "The city’s history is not sealed behind glass. It is part of the street, the roofline, the bell, and the conversation beyond the gate.", points: [{ title: "Read the material", body: "Look for Mangalore tile, red earth, stone, wood, and painted surfaces — a vocabulary built for a wet, warm coast." }, { title: "Give rooms their time", body: "Chapels and temple courtyards are better without a rushed itinerary. Arrive early, listen, then look again." }, { title: "Walk the quieter street", body: "The details that survive longest are often not on the main road: a shutter, a threshold, an old painted sign." }], stat: "A port city carries more than one history.", statLabel: "Heritage cue", cta: "Find heritage stops", ctaHref: "/places", featureTitle: "History that never stopped being used.", featureBody: "The most meaningful cultural places here are not exhibits. They are living rooms, schools, sanctuaries, kitchens, and corners that carry the city’s many languages forward." },
  experiences: { kicker: "Things to do", title: "Make room for the detour.", lede: "Walk the market, take the coastal road, sit beneath a fan, climb for a view, and let the afternoon change shape once or twice.", heroImage: IMG.port, subImage: IMG.market, imageAlt: "Old Mangalore port", chapter: "Wander", intro: "The best activities here are not separate from the city. They are ways of paying closer attention to it.", points: [{ title: "Buy something small", body: "A flower string, a spice packet, a paper cone of snacks. The market is the city’s most generous souvenir shop." }, { title: "Follow the better light", body: "Instead of following the clock, keep one late-afternoon window free. Mangaluru is particularly convincing after heat lifts." }, { title: "Ask for the longer way", body: "The connection between two stops is often better than either pin on a map — palms, tiled roofs, roadside coffee." }], stat: "A good day has one unplanned turn.", statLabel: "Wander cue", cta: "Choose an itinerary", ctaHref: "/itineraries", featureTitle: "The route is part of the attraction.", featureBody: "Mangaluru is not a city to conquer. It is a place to notice with a loose plan in hand and enough time to take the turn that was never in the schedule." },
  travel: { kicker: "Travel guide", title: "Come prepared. Stay open.", lede: "A few clear notes for arriving well: when to come, how to move, and why the weather needs a place in the plan.", heroImage: IMG.kadri, subImage: IMG.port, imageAlt: "Kadri Manjunatha Temple in Mangaluru", chapter: "Practical", intro: "Think of this as the useful part of the almanac — enough information to keep your day easy, but never enough to over-plan it.", points: [{ title: "Let the weather lead", body: "November to February is gentler for first visits. The monsoon is dramatic, green, and worth embracing with flexibility." }, { title: "Start at the right scale", body: "Choose one compact city cluster or one coastal edge per day. The quality of the route is in the space between stops." }, { title: "Stay close to appetite", body: "Markets, breakfast places, and heritage stops connect easily. Use short rides to cross the city, not to rush through it." }], stat: "The weather belongs in the itinerary.", statLabel: "Travel cue", cta: "Shape your visit", ctaHref: "/plan-your-visit", featureTitle: "Useful, not over-planned.", featureBody: "Practical information should disappear once the day begins. Keep a few good anchors, then let the city do what it does best: pull you sideways." },
};
