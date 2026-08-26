/* Coastal Modernist Itineraries page: a small set of route spines designed to keep the rest of the day open. */
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import { Link } from "wouter";
import ScrollReveal from "@/components/ScrollReveal";
import { itineraries } from "@/data/siteData";

export default function Itineraries() {
  return (
    <>
      <section className="page-hero"><div className="page-hero-inner"><ScrollReveal><span className="eyebrow">Routes / 03 ways in</span><h1 className="display">A day with<br /><em>good edges.</em></h1><p className="lede">Loose itineraries for first arrivals, longer stays, and anyone who would rather follow the light than the clock.</p><div className="page-hero-meta"><span><CalendarDays size={13} /> 24 hours to 3 days</span><span><Clock3 size={13} /> Flexible by design</span></div><div className="page-route-spine"><span>Route / Pace</span><div className="route-line" /><span>Open / 01</span></div></ScrollReveal></div></section>
      <section className="section-shell"><ScrollReveal><span className="eyebrow">Pick a pace</span><h2 className="section-heading">Choose the <em>spine.</em></h2><p className="section-intro">Every route has one or two things worth planning around. The rest is there to be discovered on the way.</p></ScrollReveal><div className="itinerary-grid">{itineraries.map((route, index) => <ScrollReveal key={route.number} delay={index * 90}><article className={`itinerary-card ${route.featured ? "featured" : ""}`}><div><span className="itinerary-num">ROUTE / {route.number}</span><h3>{route.title}</h3><p>{route.description}</p></div><div><div className="itinerary-footer"><span>{route.duration}</span><span>{route.note}</span></div><ul style={{ listStyle: "none", padding: 0, margin: "17px 0 0", display: "grid", gap: 8 }}>{route.stops.map((stop) => <li key={stop} style={{ display: "flex", gap: 9, alignItems: "center", fontSize: 11, color: route.featured ? "rgba(255,255,255,.7)" : "var(--ink-soft)" }}><span style={{ width: 5, height: 5, borderRadius: "99px", background: route.featured ? "var(--sun)" : "var(--vermillion)" }} />{stop}</li>)}</ul></div></article></ScrollReveal>)}</div></section>
      <section className="section-shell tight"><ScrollReveal><div className="cta-panel calm"><div><span className="eyebrow">One more thing</span><h2>Leave room for a detour.</h2></div><div><p>Use an itinerary as a starting line, not a finish line. Build the rest around what catches your eye.</p><div className="button-row"><Link href="/plan-your-visit" className="button button-light">Build a custom day <ArrowRight size={14} /></Link></div></div></div></ScrollReveal></section>
    </>
  );
}
