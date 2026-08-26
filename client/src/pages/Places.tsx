/* Coastal Almanac Places index: a visual catalogue of Mangaluru edges, filtered by feeling rather than a generic card grid. */
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CloudSun, MapPinned, Navigation } from "lucide-react";
import { Link } from "wouter";
import { places, type Place, IMG } from "@/data/siteData";

const filters = ["All", "Coast", "Heritage", "Nature", "City", "Eat"];
const notes: Record<string, string> = { Coast: "Best when the heat begins to lift", Heritage: "Arrive with time to look up", Nature: "A soft place between city chapters", City: "Come before the day gets loud", Eat: "Follow the most generous smell" };

function PlaceTile({ place, index }: { place: Place; index: number }) {
  return <motion.article layout initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .97 }} transition={{ duration: .32 }} whileHover={{ y: -7 }} className={`edge-tile edge-${(index % 5) + 1}`}><img src={place.image} alt={place.name} /><div className="edge-tile-shade" /><div className="edge-tile-copy"><span>{place.category} · {place.distance}</span><h3>{place.name}</h3><p>{place.description}</p><Link href={`/places/${place.slug}`}>Open the note <ArrowRight size={15} /></Link></div></motion.article>;
}

export default function Places() {
  const [filter, setFilter] = useState("All");
  const [spot, setSpot] = useState<Place>(places[0]);
  const filtered = useMemo(() => filter === "All" ? places : places.filter((place) => place.category === filter), [filter]);
  return <>
    <section className="places-hero"><div className="places-hero-copy"><motion.span initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="almanac-label">A city of useful detours</motion.span><motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .06 }}><span>Choose an</span><br />edge of the city.</motion.h1><motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .15 }}>Each place below is a good reason to leave space in the day — not an item to collect and move past.</motion.p><motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .23 }} className="places-hero-tags"><span><CloudSun size={14} /> Good in changing weather</span><span><MapPinned size={14} /> 7 places, properly edited</span></motion.div></div><motion.div className="places-hero-image" initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0 0 0)" }} transition={{ duration: .9, ease: [0.77, 0, 0.175, 1] }}><img src={IMG.port} alt="Mangaluru old port" /><span>Old port / a city facing outward</span></motion.div></section>

    <section className="section-shell places-explorer"><div className="places-explorer-head"><div><span className="almanac-label">Browse by feeling</span><h2>Where should<br />the day <em>open?</em></h2></div><p>Choose a chapter. Then hover or tap a place to see the little detail worth carrying with you.</p></div><div className="places-filter-row">{filters.map((item) => <button key={item} onClick={() => setFilter(item)} className={filter === item ? "active" : ""}>{item}</button>)}</div><div className="places-edge-layout"><div className="edge-tile-grid"><AnimatePresence mode="popLayout">{filtered.map((place, index) => <div key={place.slug} onMouseEnter={() => setSpot(place)} onFocus={() => setSpot(place)}><PlaceTile place={place} index={index} /></div>)}</AnimatePresence></div><aside className="places-side-note"><span className="almanac-label">A useful note</span><AnimatePresence mode="wait"><motion.div key={spot.slug} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: .28 }}><img src={spot.image} alt="" /><small>{spot.category}</small><h3>{spot.name}</h3><p>{notes[spot.category] ?? "A quietly considered stop."}</p><Link href={`/places/${spot.slug}`} className="almanac-text-action">Read the full note <ArrowRight size={15} /></Link></motion.div></AnimatePresence></aside></div></section>

    <section className="places-compass"><div className="section-shell"><div className="places-compass-copy"><span className="almanac-label">A place for each mood</span><h2>Choose the<br />city’s <em>temperature.</em></h2><p>No itinerary needs all of this. Pick one temperature and the day will know what to do next.</p></div><div className="places-compass-grid"><Link href="/beaches"><span>Cool</span><strong>Coast &amp;<br />backwaters</strong><Navigation size={17} /></Link><Link href="/culture"><span>Deep</span><strong>Temples &amp;<br />old rooms</strong><Navigation size={17} /></Link><Link href="/food"><span>Generous</span><strong>Food &amp;<br />markets</strong><Navigation size={17} /></Link></div></div></section>

    <section className="section-shell places-close"><motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .65 }}><span className="almanac-label">The most useful map is a loose one</span><h2>Make one place<br />the <em>beginning.</em></h2><p>Everything else can meet you in the gaps: a snack, a small turn, the better light, a conversation worth keeping.</p><Link href="/plan-your-visit" className="almanac-button primary">Shape a day around it <ArrowRight size={16} /></Link></motion.div></section>
  </>;
}
