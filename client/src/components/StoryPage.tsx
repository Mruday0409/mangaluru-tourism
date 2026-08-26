/* Coastal Modernist story template: each chapter pairs one strong image with concise field notes and a practical route invitation. */
import { ArrowRight, Clock3, MapPin, MoveUpRight } from "lucide-react";
import { Link } from "wouter";
import ScrollReveal from "@/components/ScrollReveal";
import { IMG } from "@/data/siteData";

export type StoryConfig = {
  kicker: string;
  title: string;
  lede: string;
  heroImage: string;
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
  featureImage?: string;
};

export default function StoryPage({ config }: { config: StoryConfig }) {
  return (
    <>
      <section className="page-hero"><div className="page-hero-inner"><ScrollReveal><span className="eyebrow">{config.kicker}</span><h1 className="display">{config.title}</h1><p className="lede">{config.lede}</p><div className="page-hero-meta"><span><i /> {config.chapter}</span><span><Clock3 size={13} /> Read / 4 min</span><span><MapPin size={13} /> Mangaluru, India</span></div><div className="page-route-spine"><span>Route / {config.chapter}</span><div className="route-line" /><span>Open / 01</span></div></ScrollReveal></div></section>

      <section className="section-shell"><div className="detail-body"><ScrollReveal><aside className="detail-side"><strong>{config.chapter}</strong><p>{config.intro}</p><Link href={config.ctaHref} className="text-link" style={{ marginTop: 25 }}>{config.cta} <ArrowRight size={15} /></Link></aside></ScrollReveal><ScrollReveal delay={100}><div className="detail-richcopy"><h2>{config.featureTitle}</h2><p>{config.featureBody}</p><div className="detail-list">{config.points.map((point, index) => <div className="detail-list-item" key={point.title}><span className="list-dot" /><div><h3>{point.title}</h3><p>{point.body}</p></div></div>)}</div></div></ScrollReveal></div></section>

      <section className="dark-band"><div className="section-shell dark"><div className="detail-hero" style={{ minHeight: 480 }}><ScrollReveal><img className="detail-hero-image" src={config.heroImage} alt={config.imageAlt} /></ScrollReveal><ScrollReveal delay={100}><div className="detail-hero-copy" style={{ paddingTop: 80 }}><span className="eyebrow">Field note / {config.statLabel}</span><h2 style={{ margin: "17px 0 0", maxWidth: 540, fontSize: "clamp(2.8rem, 5vw, 5.4rem)", lineHeight: .9, letterSpacing: "-.08em", fontWeight: 900 }}>{config.stat}</h2><p>{config.lede}</p><div className="button-row"><Link href={config.ctaHref} className="button button-light">{config.cta} <MoveUpRight size={14} /></Link></div></div></ScrollReveal></div></div></section>

      <section className="section-shell tight"><ScrollReveal><div className="cta-panel calm"><div><span className="eyebrow">Next chapter</span><h2>{config.chapter === "Eat" ? "Save room for one more plate." : "Let the route stay open."}</h2></div><div><p>Keep exploring the field guide. The best version of this city is the one that leaves a little room around the plan.</p><div className="button-row"><Link href="/places" className="button button-light">See all places <ArrowRight size={14} /></Link></div></div></div></ScrollReveal></section>
    </>
  );
}

export const storyConfigs: Record<string, StoryConfig> = {
  beaches: {
    kicker: "01 / Coast & backwaters",
    title: "The water is never far away.",
    lede: "A coastline made for long edges: broad beaches, river mouths, fishing boats, and the kind of sunset that makes you miss your dinner reservation.",
    heroImage: IMG.beach,
    imageAlt: "A calm river mouth opening into the sea at Sasihithlu",
    chapter: "Coast",
    intro: "Follow the western edge until the city thins out and the river begins to answer the sea.",
    points: [{ title: "Panambur at golden hour", body: "Wide open sand and an easy horizon. Come late, walk west, and stay until the shoreline turns copper." }, { title: "Sasihithlu’s soft edge", body: "A meeting point for river and sea with a quieter pulse. Bring water, a light layer, and time." }, { title: "Backwater drift", body: "Trade the surf for still water and palms. Ask locally about a short boat ride rather than booking the whole day." }],
    stat: "Three kinds of blue in one afternoon.",
    statLabel: "The coast",
    cta: "See coastal places",
    ctaHref: "/places",
    featureTitle: "Start where land gives way.",
    featureBody: "Mangaluru’s coast is less about a single postcard beach and more about the changing texture of the edge. It is wind, rock, river water, and the small social rituals that gather around all of it.",
  },
  culture: {
    kicker: "02 / Culture & heritage",
    title: "Look up. The city is layered.",
    lede: "Temple courtyards, painted ceilings, laterite walls, and old streets that still make room for everyday life.",
    heroImage: IMG.heritage,
    imageAlt: "Warm light on a coastal temple courtyard in Mangaluru",
    chapter: "Heritage",
    intro: "The city’s history is not sealed away. It sits in the shade, in the roofline, in the sound of a bell behind a market.",
    points: [{ title: "Gokarnanatheshwara Temple", body: "Take your time with the entrance and the details above eye level. Early morning keeps the courtyard gentle." }, { title: "St. Aloysius Chapel", body: "A concentrated lesson in color and devotion, tucked into the old quarter and worth the small climb." }, { title: "Laterite as a local language", body: "Look for the deep red in walls, pathways, and soil — the material palette that makes this coast unmistakably itself." }],
    stat: "The old quarter rewards a slower walk.",
    statLabel: "The old city",
    cta: "Find heritage stops",
    ctaHref: "/places",
    featureTitle: "History, still in use.",
    featureBody: "The most compelling cultural stops here do not feel like exhibits. They are living rooms, prayer halls, classrooms, and corners the city still uses every day.",
  },
  food: {
    kicker: "03 / Food & drink",
    title: "Breakfast is a way in.",
    lede: "Neer dosa, kori ghee roast, fish curry, tender coconut — the coastal table is generous, specific, and best approached hungry.",
    heroImage: IMG.food,
    imageAlt: "Coastal Karnataka breakfast on a dark wood table",
    chapter: "Eat",
    intro: "Do not start with a list of restaurants. Start with what the city makes before noon, then follow your appetite.",
    points: [{ title: "Neer dosa, first", body: "Thin, lacy, and made for taking on flavor. Pair it with a rich curry or a simple coconut chutney." }, { title: "Kori ghee roast", body: "A deep, fragrant Mangaluru classic. Order it with patience — the best versions are not rushed." }, { title: "Markets before heat", body: "For the full color of the city’s ingredients, go early. Flowers, spice, fish, and breakfast all overlap." }],
    stat: "Come hungry. Leave curious.",
    statLabel: "The table",
    cta: "Explore the food route",
    ctaHref: "/itineraries",
    featureTitle: "Flavor with a coastline in it.",
    featureBody: "The food of Mangaluru carries the same contrasts as the city: cooling coconut and sharp spice, sea salt and sweetness, old recipes and very current appetites.",
  },
  experiences: {
    kicker: "04 / Things to do",
    title: "Make a day of the detour.",
    lede: "Walk the market, ride the edge, climb for a view, sit beneath a fan, and give the afternoon permission to change shape.",
    heroImage: IMG.hero,
    imageAlt: "Warm evening light over the Mangaluru coast",
    chapter: "Wander",
    intro: "The best activities here are not separate from the city. They are ways of paying attention to it.",
    points: [{ title: "Take the long way west", body: "Choose one coastal stop and leave your return route undecided. The city is easy to re-enter from the edge." }, { title: "Buy something small", body: "A spice packet, a flower string, a paper cone of snacks. The everyday market is the most generous souvenir." }, { title: "Stay for blue hour", body: "After the heat lifts, the city changes register. Plan your final stop around the light rather than the clock." }],
    stat: "A good day has one unplanned turn.",
    statLabel: "The detour",
    cta: "Choose an itinerary",
    ctaHref: "/itineraries",
    featureTitle: "The route is the attraction.",
    featureBody: "Mangaluru does not need to be conquered in a weekend. Give your day a loose spine, then let small discoveries provide the connective tissue.",
  },
  travel: {
    kicker: "05 / Travel guide",
    title: "Come prepared. Stay open.",
    lede: "A few practical notes for arriving well: when to come, how to move, and why the weather is part of the itinerary.",
    heroImage: IMG.road,
    imageAlt: "A tropical coastal road framed by palms",
    chapter: "Practical",
    intro: "Think of this as the back pocket of the field guide: useful enough to keep your day easy, light enough to leave room for surprise.",
    points: [{ title: "Best window for a first visit", body: "November through February is comfortable for combining coast, city, and day trips without rushing the daylight." }, { title: "Monsoon changes the palette", body: "June through September is wetter, greener, and wonderfully dramatic. Pack for rain and plan with flexibility." }, { title: "Stay close to your appetite", body: "The city’s food and heritage stops are compact enough to combine. Use short rides to connect the chapters." }],
    stat: "The weather is part of the story.",
    statLabel: "Arrive well",
    cta: "Build your visit",
    ctaHref: "/plan-your-visit",
    featureTitle: "Useful, not over-planned.",
    featureBody: "The practical side of travel should disappear once the day starts. Keep a few good anchors, then let the city do what it does best: pull you sideways.",
  },
};
