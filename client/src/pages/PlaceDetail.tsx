/* Coastal Modernist destination detail: a full-width arrival moment followed by practical, human-scale field notes. */
import { ArrowLeft, ArrowRight, Clock3, MapPin, MoveUpRight } from "lucide-react";
import { Link, useRoute } from "wouter";
import ScrollReveal from "@/components/ScrollReveal";
import PlaceCard from "@/components/PlaceCard";
import { getPlace, places } from "@/data/siteData";

export default function PlaceDetail() {
  const [, params] = useRoute("/places/:slug");
  const place = getPlace(params?.slug ?? "");
  const nearby = places.filter((item) => item.slug !== place.slug).slice(0, 3);

  return (
    <>
      <section className="detail-hero"><ScrollReveal><img className="detail-hero-image" src={place.image} alt={place.name} /></ScrollReveal><ScrollReveal delay={100}><div className="detail-hero-copy"><Link href="/places" className="eyebrow" style={{ color: "var(--sun)", textDecoration: "none" }}><ArrowLeft size={14} /> Back to places</Link><h1>{place.name}</h1><p>{place.description} Plan for the light, take the turn, and let the place be more than a photo stop.</p><div className="detail-meta"><span>{place.category}</span><span>{place.distance}</span><span>A considered stop</span></div></div></ScrollReveal></section>
      <section className="section-shell"><div className="detail-body"><ScrollReveal><aside className="detail-side"><strong>What to notice</strong><p>Go with one clear intention, then stay open to the details around it. This is the kind of stop that rewards looking twice.</p><div style={{ display: "grid", gap: 12, marginTop: 28, color: "var(--ink-soft)", fontSize: 11 }}><span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Clock3 size={14} color="var(--vermillion)" /> Best in the cooler hours</span><span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><MapPin size={14} color="var(--vermillion)" /> Easy to pair with a nearby stop</span></div></aside></ScrollReveal><ScrollReveal delay={100}><div className="detail-richcopy"><span className="eyebrow">A slower read</span><h2>{place.name} is a good place to let the day change.</h2><p>{place.description} Mangaluru works best when you give its textures time to surface — the wind across a tiled roof, the blue of water behind a line of palms, the small rituals that begin when the heat lifts.</p><div className="detail-list"><div className="detail-list-item"><span className="list-dot" /><div><h3>Go with the light</h3><p>Early morning or the last two hours of daylight keep the scene gentler and the walk more comfortable.</p></div></div><div className="detail-list-item"><span className="list-dot" /><div><h3>Pair it with appetite</h3><p>A good place gets better when it connects to a meal. Keep one nearby table in reserve.</p></div></div><div className="detail-list-item"><span className="list-dot" /><div><h3>Leave a little margin</h3><p>Do not book the next stop too tightly. The small pause is often the part you remember.</p></div></div></div><div className="button-row"><Link href="/plan-your-visit" className="button button-primary">Add to a day <MoveUpRight size={14} /></Link><Link href="/itineraries" className="text-link">Browse routes <ArrowRight size={15} /></Link></div></div></ScrollReveal></div></section>
      <section className="section-shell tight" style={{ paddingTop: 30 }}><ScrollReveal><div className="section-topline"><div><span className="eyebrow">Nearby / Keep wandering</span><h2 className="section-heading">One place leads to <em>another.</em></h2></div><Link href="/places" className="text-link">All places <ArrowRight size={15} /></Link></div></ScrollReveal><div className="editorial-grid">{nearby.map((item, index) => <PlaceCard key={item.slug} place={item} index={index} />)}</div></section>
    </>
  );
}
