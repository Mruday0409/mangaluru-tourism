/* Coastal Modernist not-found state: a useful detour, not a dead end. */
import { ArrowLeft, Compass } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return <section className="page-hero" style={{ minHeight: "72vh", display: "grid", placeItems: "center" }}><div className="page-hero-inner"><span className="eyebrow">Field note / wrong turn</span><h1 className="display">This route<br /><em>isn’t mapped.</em></h1><p className="lede">The good news: Mangaluru has always been kind to a detour. Let’s take you back to the field guide.</p><div className="button-row"><Link href="/" className="button button-primary"><ArrowLeft size={14} /> Back home</Link><Link href="/places" className="button button-ghost"><Compass size={14} /> Explore places</Link></div></div></section>;
}
