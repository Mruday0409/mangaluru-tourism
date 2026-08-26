/* Coastal Modernist Places index: a map-like destination archive that stays useful while retaining visual rhythm. */
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import ScrollReveal from "@/components/ScrollReveal";
import PlaceCard from "@/components/PlaceCard";
import { places } from "@/data/siteData";

const filters = ["All", "Coast", "Heritage", "Nature", "City", "Eat"];

export default function Places() {
  const [filter, setFilter] = useState("All");
  const filteredPlaces = useMemo(() => filter === "All" ? places : places.filter((place) => place.category === filter), [filter]);

  return (
    <>
      <section className="page-hero"><div className="page-hero-inner"><ScrollReveal><span className="eyebrow">Atlas / 06 places to begin</span><h1 className="display">The city,<br /><em>edited.</em></h1><p className="lede">A considered list of beaches, old quarters, green pauses, and places that make you want to change the plan.</p><div className="page-hero-meta"><span>03 route types</span><span>07 field notes</span><span>1 good detour</span></div><div className="page-route-spine"><span>Route / Atlas</span><div className="route-line" /><span>Open / 01</span></div></ScrollReveal></div></section>
      <section className="section-shell"><ScrollReveal><div className="section-topline"><div><span className="eyebrow">Choose a chapter</span><h2 className="section-heading">Find your <em>edge.</em></h2></div><Link className="text-link" href="/plan-your-visit">Build a route <ArrowRight size={15} /></Link></div><div className="filter-row" role="tablist" aria-label="Filter destinations">{filters.map((item) => <button key={item} className={`filter-button ${filter === item ? "active" : ""}`} role="tab" aria-selected={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div></ScrollReveal>
        <div className="editorial-grid places-index-grid">{filteredPlaces.map((place, index) => <PlaceCard key={place.slug} place={place} index={index} />)}</div>
      </section>
      <section className="section-shell tight"><ScrollReveal><div className="cta-panel calm"><div><span className="eyebrow">Next / Make it practical</span><h2>Turn a place into a day.</h2></div><div><p>Pick a mood, choose one anchor, then let the city fill in the edges. Your route does not need to be longer than your appetite.</p><div className="button-row"><Link href="/plan-your-visit" className="button button-light">Plan your visit <ArrowRight size={14} /></Link></div></div></div></ScrollReveal></section>
    </>
  );
}
