/* Coastal Modernist card: image-led, route-marked, and intentionally editorial rather than a generic tile. */
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import type { Place } from "@/data/siteData";

export default function PlaceCard({ place, index = 1 }: { place: Place; index?: number }) {
  return (
    <Link href={`/places/${place.slug}`} className="place-card">
      <img className="place-card-image" src={place.image} alt={place.name} loading={index > 2 ? "lazy" : "eager"} />
      <div className="place-card-body">
        <div className="place-card-index"><span>{place.category} · {place.distance}</span><b><ArrowUpRight size={12} /></b></div>
        <h3>{place.name}</h3>
        <p>{place.description}</p>
        <div className="place-card-tags">{place.tags.map((tag) => <span className="card-tag" key={tag}>{tag}</span>)}</div>
      </div>
    </Link>
  );
}
