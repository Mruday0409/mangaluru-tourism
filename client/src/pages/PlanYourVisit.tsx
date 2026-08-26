/* Coastal Almanac planner: a tactile route worksheet with visual choices and a motion-led day reveal instead of a conventional form. */
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, CloudRain, Coffee, Compass, Moon, SunMedium } from "lucide-react";
import { Link } from "wouter";
import { IMG } from "@/data/siteData";

const paces = [
  { id: "slow", label: "Slow & coastal", note: "I want a good breakfast and space around the day.", icon: CloudRain, image: IMG.beach },
  { id: "curious", label: "Curious & urban", note: "I want old streets, market noise, and one thoughtful stop.", icon: Compass, image: IMG.port },
  { id: "warm", label: "Warm & cultural", note: "I want texture, heritage, and an unhurried evening.", icon: SunMedium, image: IMG.kudroli },
];

const planByPace = {
  slow: { title: "A salt-air Saturday.", image: IMG.panambur, stops: [["08:30", "Neer dosa and coffee"], ["12:00", "A slow coastal lunch"], ["17:15", "Panambur in the last light"]], cue: "Leave the afternoon unbooked." },
  curious: { title: "A day that keeps turning.", image: IMG.market, stops: [["08:00", "Central Market before heat"], ["11:30", "A chapel or temple pause"], ["18:00", "Old port and a generous table"]], cue: "Wear shoes for a longer walk." },
  warm: { title: "A city with history underfoot.", image: IMG.kudroli, stops: [["09:00", "A quiet heritage start"], ["13:00", "A meal worth lingering over"], ["18:30", "Blue hour in the old quarter"]], cue: "Save your best light for later." },
};

export default function PlanYourVisit() {
  const [pace, setPace] = useState<keyof typeof planByPace>("slow");
  const [days, setDays] = useState<"one" | "weekend" | "longer">("weekend");
  const [revealed, setRevealed] = useState(false);
  const plan = useMemo(() => planByPace[pace], [pace]);
  return <>
    <section className="planner-hero"><div className="planner-hero-paper"><span className="almanac-label">A little help, not a rigid schedule</span><h1>Shape the day<br />around a <em>feeling.</em></h1><p>Pick the kind of Mangaluru you want to meet. We will give you an opening move, then let the city do the rest.</p><div className="planner-hero-legend"><span><SunMedium size={14} /> Morning-led</span><span><Moon size={14} /> Evening-friendly</span><span><Coffee size={14} /> Always food-aware</span></div></div><div className="planner-hero-photo"><img src={IMG.panambur} alt="Mangaluru coast in warm afternoon light" /><div><strong>Do not rush<br />the coast.</strong><span>— a quiet rule for visiting well</span></div></div></section>

    <section className="section-shell planner-workshop"><div className="planner-workshop-head"><span className="almanac-label">Your travelling style</span><h2>Make two small<br />choices. <em>That’s enough.</em></h2></div><div className="planner-workshop-grid"><div className="planner-choice-area"><div className="planner-choice-label"><span>1</span><strong>What are you hungry for?</strong></div><div className="planner-pace-cards">{paces.map((item) => { const Icon = item.icon; return <button key={item.id} onClick={() => { setPace(item.id as keyof typeof planByPace); setRevealed(false); }} className={pace === item.id ? "active" : ""}><img src={item.image} alt="" /><div><Icon size={17} /><h3>{item.label}</h3><p>{item.note}</p></div></button>; })}</div><div className="planner-choice-label second"><span>2</span><strong>How much room do you have?</strong></div><div className="planner-day-switch">{(["one", "weekend", "longer"] as const).map((item) => <button key={item} onClick={() => { setDays(item); setRevealed(false); }} className={days === item ? "active" : ""}>{item === "one" ? "One day" : item === "weekend" ? "A weekend" : "Three days"}</button>)}</div></div><div className="planner-reveal-area"><AnimatePresence mode="wait"><motion.div key={`${pace}-${days}-${revealed}`} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: .35 }} className="planner-result-card"><img src={plan.image} alt="" /><div className="planner-result-shade" /><div className="planner-result-copy"><span>{days === "one" ? "One day, well-shaped" : days === "weekend" ? "A weekend with breathing room" : "A slower three-day stay"}</span><h3>{revealed ? plan.title : "Your opening move is waiting."}</h3>{revealed ? <><ul>{plan.stops.map(([time, stop]) => <li key={time}><b>{time}</b><span>{stop}</span></li>)}</ul><p className="planner-cue"><Check size={14} /> {plan.cue}</p></> : <p>Choose your pace, then open the day. You can reshape it as many times as the weather changes.</p>}<button className="almanac-button primary" onClick={() => setRevealed(true)}>{revealed ? "Refresh this day" : "Reveal my first day"} <ArrowRight size={16} /></button></div></motion.div></AnimatePresence></div></div></section>

    <section className="planner-aftercare"><div className="section-shell"><div><span className="almanac-label">Useful after you choose</span><h2>Keep these<br />three things <em>loose.</em></h2></div><div className="planner-aftercare-list"><article><span>01</span><h3>Lunch</h3><p>Let the morning tell you where hunger should land.</p></article><article><span>02</span><h3>Weather</h3><p>Monsoon has its own timing. Plan one indoor pause.</p></article><article><span>03</span><h3>Sunset</h3><p>Leave the final hour unclaimed until you see the light.</p></article></div></div></section>

    <section className="section-shell planner-close"><div><span className="almanac-label">Need more specifics?</span><h2>The city is better<br />than a <em>perfect plan.</em></h2><p>Use the travel guide for the practical pieces. Then put the phone away for a while and walk until something catches your eye.</p><Link href="/travel-guide" className="almanac-button primary">Read the travel guide <ArrowRight size={16} /></Link></div></section>
  </>;
}
