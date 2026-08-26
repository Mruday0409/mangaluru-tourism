/* Coastal Modernist homepage: a cinematic arrival that turns into an asymmetric field guide of routes, appetite, and weather. */
import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Compass, MapPin } from "lucide-react";
import { Link } from "wouter";
import ScrollReveal from "@/components/ScrollReveal";
import PlaceCard from "@/components/PlaceCard";
import { IMG, featuredPlaces } from "@/data/siteData";

const moods = [
  { label: "The coast, unhurried", title: "Let the tide set the itinerary.", copy: "At Sasihithlu, river water and sea water make a softer edge — the kind of place that rewards staying past the obvious photograph.", image: IMG.beach, note: "North of Kudla · 30 min" },
  { label: "A table for the day", title: "Breakfast is a way in.", copy: "Neer dosa, coconut, a little fire. Start with what the city makes every morning and everything else falls into place.", image: IMG.food, note: "Everywhere · best before noon" },
  { label: "In the old quarter", title: "Look up. The city is layered.", copy: "Painted ceilings, red roofs, and the cool hush of old corridors — a different kind of shoreline, made from memory.", image: IMG.heritage, note: "Hampankatta · city centre" },
];

export default function Home() {
  const [moodIndex, setMoodIndex] = useState(0);
  const mood = moods[moodIndex];
  const moveMood = (direction: number) => setMoodIndex((current) => (current + direction + moods.length) % moods.length);

  return (
    <>
      <section className="hero">
        <div className="hero-media"><img className="hero-image" src={IMG.hero} alt="Golden hour coastline at Mangaluru" /></div>
        <div className="hero-content">
          <div className="hero-kicker"><span /> A field guide to Mangaluru</div>
          <h1 className="hero-title">Arrive<br /><em>slowly.</em></h1>
          <p className="hero-copy">A coast of red earth, salt air, old streets, and breakfasts that ask you to stay a little longer.</p>
          <div className="button-row hero-actions"><Link href="/places" className="button button-primary">Start exploring <ArrowRight size={14} /></Link><Link href="/itineraries" className="button button-light">Find your route</Link></div>
          <div className="hero-bottomline">
            <div className="hero-note"><i className="dot" /><span>Today’s cue: <strong>follow the light west</strong></span></div>
            <div className="hero-stamp"><span className="stamp-top">Kudla / 12°52'N</span><span className="stamp-main">Arabian Sea edge</span></div>
          </div>
        </div>
        <div className="scroll-cue"><span>Scroll to wander</span><i /></div>
      </section>

      <section className="intro-band">
        <div className="section-shell">
          <div className="intro-grid">
            <ScrollReveal><span className="intro-number">01 / THE FEEL</span></ScrollReveal>
            <ScrollReveal delay={90}><h2 className="intro-headline">A port city with <span className="tide-underline">room to breathe.</span></h2></ScrollReveal>
            <ScrollReveal delay={180}><p className="intro-side">Mangaluru is not a checklist. It is a change of pace: the first fish market call, a road lined with palms, the exact hour the beach turns copper.</p></ScrollReveal>
          </div>
          <div className="route-strip"><span className="route-strip-label">Your route begins</span><div className="route-line" /><span className="route-strip-end">West / 00:01</span></div>
        </div>
      </section>

      <section className="section-shell">
        <ScrollReveal><div className="section-topline"><div><span className="eyebrow">02 / Start here</span><h2 className="section-heading">Three good reasons to <em>go west.</em></h2></div><Link className="text-link" href="/places">See every place <ArrowRight size={15} /></Link></div></ScrollReveal>
        <div className="editorial-grid">{featuredPlaces.map((place, index) => <ScrollReveal key={place.slug} delay={index * 100} className={`place-slot-${index + 1}`}><PlaceCard place={place} index={index} /></ScrollReveal>)}</div>
      </section>

      <section className="dark-band">
        <div className="section-shell dark">
          <ScrollReveal><span className="eyebrow">03 / Choose a mood</span><h2 className="section-heading">The city changes with the <em>hour.</em></h2></ScrollReveal>
          <ScrollReveal delay={90}><div className="carousel-shell">
            <div className="carousel-viewport"><div className="carousel-track" style={{ transform: `translateX(calc(-${moodIndex * 54}vw - ${moodIndex * 17}px))` }}>
              {moods.map((item) => <article className="carousel-slide" key={item.title}><img src={item.image} alt={item.title} /><div className="carousel-slide-copy"><span className="eyebrow">{item.label}</span><h3>{item.title}</h3><p>{item.copy}</p><small style={{ marginTop: 17, color: "rgba(255,255,255,.58)", fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 700 }}>{item.note}</small></div></article>)}
            </div></div>
            <div className="carousel-controls"><button className="carousel-arrow" aria-label="Previous mood" onClick={() => moveMood(-1)}><ChevronLeft size={17} /></button><button className="carousel-arrow" aria-label="Next mood" onClick={() => moveMood(1)}><ChevronRight size={17} /></button><span className="carousel-count">0{moodIndex + 1} / 0{moods.length}</span></div>
          </div></ScrollReveal>
        </div>
        <div className="marquee-wrap"><div className="marquee"><span>Sea air <i /> Red earth <i /> Soft mornings <i /> Good detours <i /></span><span>Sea air <i /> Red earth <i /> Soft mornings <i /> Good detours <i /></span></div></div>
      </section>

      <section className="section-shell">
        <ScrollReveal><div className="section-topline"><div><span className="eyebrow">04 / Make it yours</span><h2 className="section-heading">Not sure where to start?</h2><p className="section-intro">Tell us the shape of your day. We’ll point you toward a beach, a plate, a quiet street, or all three.</p></div><Link href="/plan-your-visit" className="button button-primary">Build a day <Compass size={15} /></Link></div></ScrollReveal>
        <ScrollReveal delay={120}><div className="cta-panel" style={{ marginTop: 50 }}><div><span className="eyebrow">Field note / 05</span><h2>Leave space for the unexpected.</h2></div><div><p>Some of Mangaluru’s best moments are not attractions. They’re the turn you didn’t plan, the table that still had one seat, the road home at blue hour.</p><div className="button-row"><Link href="/travel-guide" className="button button-light">Read the travel guide <ArrowRight size={14} /></Link></div></div></div></ScrollReveal>
      </section>
    </>
  );
}
