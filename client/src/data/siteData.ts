/* Coastal Modernist content model: concise field notes, route metadata, and image-led stories for every page. */

export type Place = {
  slug: string;
  name: string;
  category: string;
  distance: string;
  image: string;
  description: string;
  tags: string[];
  accent?: "sea" | "sand" | "vermillion";
};

export const IMG = {
  hero: "/manus-storage/mangaluru-hero_3e413e38.jpg",
  beach: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85",
  heritage: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1400&q=85",
  food: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1400&q=85",
  mark: "/manus-storage/kudla-route-mark_a0a4bd8c.png",
  coast: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85",
  palms: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85",
  market: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85",
  road: "https://images.unsplash.com/photo-1524498250077-390f9e378fc0?auto=format&fit=crop&w=1400&q=85",
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Places", href: "/places" },
  { label: "Food", href: "/food" },
  { label: "Itineraries", href: "/itineraries" },
  { label: "Travel guide", href: "/travel-guide" },
];

export const featuredPlaces: Place[] = [
  {
    slug: "panambur-beach",
    name: "Panambur Beach",
    category: "Coast",
    distance: "12 min from city",
    image: IMG.hero,
    description: "A wide, easy horizon for sunset walks, warm chai, and the first salt on your skin.",
    tags: ["sunset", "shoreline"],
    accent: "sea",
  },
  {
    slug: "st-aloysius-chapel",
    name: "St. Aloysius Chapel",
    category: "Heritage",
    distance: "In the old quarter",
    image: IMG.heritage,
    description: "A quiet climb into painted ceilings, cool corridors, and the layered memory of the port.",
    tags: ["art", "old quarter"],
    accent: "sand",
  },
  {
    slug: "neer-dosa-trail",
    name: "The Neer Dosa Trail",
    category: "Eat",
    distance: "Best before noon",
    image: IMG.food,
    description: "Thin, lacy, coconut-soft — start here and let breakfast set the pace for the day.",
    tags: ["breakfast", "local"],
    accent: "vermillion",
  },
];

export const places: Place[] = [
  ...featuredPlaces,
  {
    slug: "sasihithlu-beach",
    name: "Sasihithlu Beach",
    category: "Coast",
    distance: "30 min north",
    image: IMG.beach,
    description: "Where the river finds the sea, and the shore feels a little more unhurried.",
    tags: ["river mouth", "quiet"],
    accent: "sea",
  },
  {
    slug: "kadri-park",
    name: "Kadri Park",
    category: "Nature",
    distance: "15 min from city",
    image: IMG.palms,
    description: "A green pause in the middle of town, with old trees and a hilltop temple nearby.",
    tags: ["green", "morning"],
    accent: "sea",
  },
  {
    slug: "central-market",
    name: "Central Market",
    category: "City",
    distance: "In the heart of Kudla",
    image: IMG.market,
    description: "A bright, noisy edit of the coast: flowers, spice, fish, and a hundred small conversations.",
    tags: ["market", "everyday"],
    accent: "vermillion",
  },
  {
    slug: "kateel-temple",
    name: "Kateel",
    category: "Heritage",
    distance: "45 min east",
    image: IMG.road,
    description: "A river island shrine reached through red earth, green roads, and a slower kind of reverence.",
    tags: ["day trip", "river"],
    accent: "sand",
  },
];

export const itineraries = [
  {
    number: "01",
    title: "A first taste",
    duration: "24 hours",
    note: "For the curious first-timer",
    description: "A short loop through old streets, a generous breakfast, and the beach at the exact right hour.",
    stops: ["Neer dosa before 10", "Old quarter walk", "Panambur at golden hour"],
    featured: true,
  },
  {
    number: "02",
    title: "Coast, slowly",
    duration: "3 days",
    note: "For the ones who stay longer",
    description: "Let the tide set the itinerary: river mouths, quiet beaches, and long lunches under fans.",
    stops: ["Sasihithlu morning", "Backwater boat ride", "Local seafood supper"],
    featured: false,
  },
  {
    number: "03",
    title: "Red earth roads",
    duration: "A weekend",
    note: "For a little more distance",
    description: "Move inland through palms and laterite, tracing living heritage beyond the city edge.",
    stops: ["Kateel river island", "Temple architecture", "Monsoon road coffee"],
    featured: false,
  },
];

export const practicalNotes = [
  { title: "Arrive by air", body: "Mangaluru International Airport sits about 14 km from the city. Pre-paid taxis make the first move simple." },
  { title: "Move with the weather", body: "November to February is gentler for beach days. June to September brings the dramatic green of monsoon." },
  { title: "Start early", body: "Markets and breakfast spots are at their liveliest before the heat settles over the afternoon." },
  { title: "Carry a little patience", body: "The best routes are not always the fastest. Leave space for a detour, a conversation, or one more cup of tea." },
];

export function getPlace(slug: string) {
  return places.find((place) => place.slug === slug) ?? places[0];
}
